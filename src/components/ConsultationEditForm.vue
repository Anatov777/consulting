<template>
  <div>
    <v-form class="form-primary" ref="form" v-model="valid" lazy-validation>
      <v-menu
        ref="dateMenu"
        v-model="dateMenu"
        :close-on-content-click="false"
        :return-value.sync="fields.date"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            :value="dateFormatted"
            :error-messages="dateErrors"
            label="Дата *"
            readonly
            v-bind="attrs"
            v-on="on"
            @blur="$v.fields.date.$touch()"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="fields.date"
          :allowed-dates="allowedDates"
          locale="ru-ru"
          no-title
          scrollable
        >
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="dateMenu = false"> Cancel </v-btn>
          <v-btn text color="primary" @click="$refs.dateMenu.save(fields.date)">
            OK
          </v-btn>
        </v-date-picker>
      </v-menu>

      <v-menu
        v-if="fields.date"
        ref="timeMenu"
        v-model="timeMenu"
        :close-on-content-click="false"
        :nudge-right="40"
        :return-value.sync="fields.time"
        transition="scale-transition"
        offset-y
        max-width="290px"
        min-width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="fields.time"
            :error-messages="timeErrors"
            label="Время *"
            readonly
            v-bind="attrs"
            v-on="on"
            @blur="$v.fields.time.$touch()"
          ></v-text-field>
        </template>
        <v-time-picker
          v-if="timeMenu"
          v-model="fields.time"
          :allowed-hours="allowedHours"
          :allowed-minutes="allowedMinutes"
          format="24hr"
          full-width
          @click:minute="$refs.timeMenu.save(fields.time)"
          @click:hour="setSelectedHour"
        ></v-time-picker>
      </v-menu>

      <v-textarea
        v-model="fields.symptoms"
        :error-messages="symptomsErrors"
        label="Симптомы"
        rows="3"
        outlined
        auto-grow
        @blur="$v.fields.symptoms.$touch()"
      ></v-textarea>

      <v-btn
        :disabled="!valid"
        color="success"
        class="mr-4"
        @click="submitForm"
      >
        <span v-if="isEditMode">Сохранить</span>
        <span v-else>Создать</span>
      </v-btn>

      <v-btn color="error" class="mr-4" @click="reset"> Очистить </v-btn>

      <v-btn color="blue-grey" dark class="mr-4" @click="setTestData">
        Заполнить
      </v-btn>
    </v-form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { required } from "vuelidate/lib/validators";

export default {
  name: "ConsultationEditForm",
  props: {
    mode: String
  },
  validations: {
    fields: {
      date: { required },
      time: { required },
      symptoms: {
        textRule: (value) => /^[^<>]*$/i.test(value)
      }
    }
  },
  data: () => ({
    valid: true,
    fields: {
      date: "",
      time: null,
      symptoms: ""
    },
    dateMenu: false,
    timeMenu: false,
    selectedHour: null
  }),
  created() {
    if (this.isEditMode) {
      const consultationData = this.GET_CONSULTATION_BY_ID(
        `${this.consultationId}`
      );
      this.fields = { ...consultationData };
    }
  },
  computed: {
    ...mapGetters([
      "GET_CONSULTATIONS",
      "GET_CONSULTATION_BY_ID",
      "GET_CONSULTATIONS_BY_PATIENT"
    ]),
    isEditMode() {
      return this.mode === "edit";
    },
    patientId() {
      return this.$route.params.patientId;
    },
    consultationId() {
      return this.$route.params.consultationId;
    },
    dateFormatted() {
      return this.fields.date
        ? this.moment(this.fields.date).format("DD/MM/YYYY")
        : "";
    },
    notAllowedConsultationTimes() {
      return this.GET_CONSULTATIONS.reduce((acc, cur) => {
        if (this.fields.date === cur.date) {
          const time = cur.time.split(":");
          if (!acc[time[0]]) {
            acc[time[0]] = [];
          }

          acc[time[0]].push(`${time[1]}`);
        }
        return acc;
      }, {});
    },

    // Ошибки полей

    dateErrors() {
      const errors = [];
      if (!this.$v.fields.date.$dirty) return errors;
      !this.$v.fields.date.required && errors.push('Поле "Дата" обязательно.');
      return errors;
    },
    timeErrors() {
      const errors = [];
      if (!this.$v.fields.time.$dirty) return errors;
      !this.$v.fields.time.required && errors.push('Поле "Время" обязательно.');
      return errors;
    },
    symptomsErrors() {
      const errors = [];
      if (!this.$v.fields.symptoms.$dirty) return errors;
      !this.$v.fields.symptoms.textRule &&
        errors.push(
          'Поле "Симптомы" может содержать только буквы, цифры, знаки препинания.'
        );
      return errors;
    }
  },

  methods: {
    ...mapActions(["ADD_CONSULTATION", "EDIT_CONSULTATION"]),
    // validate() {
    //   this.$refs.form.validate();
    // },
    reset() {
      this.$refs.form.reset();
      this.fields.date = null;
      this.fields.time = null;
      this.fields.symptoms = "";
    },
    // resetValidation() {
    //   this.$refs.form.resetValidation();
    // },
    async submitForm() {
      await this.$v.$touch();
      if (this.valid) {
        if (this.isEditMode) {
          this.editConsultation();
        } else {
          this.addConsultation();
        }
        this.toPatientInfoPage();
      }
    },
    addConsultation() {
      const consultationData = {
        date: this.fields.date,
        time: this.fields.time,
        symptoms: this.fields.symptoms,
        patientId: this.patientId
      };
      this.ADD_CONSULTATION(consultationData);
    },
    editConsultation() {
      const consultationData = {
        date: this.fields.date,
        time: this.fields.time,
        symptoms: this.fields.symptoms,
        patientId: this.patientId,
        id: `${this.consultationId}`
      };
      this.EDIT_CONSULTATION(consultationData);
    },
    // Формат value = 2021-07-24
    allowedDates(value) {
      const firstAllowedDate =
        this.moment().format("HH:mm") >= "19:45"
          ? this.moment().add(1, "days").format("YYYY-MM-DD")
          : this.moment().format("YYYY-MM-DD");
      return value >= firstAllowedDate;
    },
    allowedHours(value) {
      return (
        value >= 8 &&
        value < 20 &&
        (`${this.getTimeWithInitialZero(value)}-45` >
          this.moment().format("HH-mm") ||
          this.fields.date > this.moment().format("YYYY-MM-DD")) &&
        this.notAllowedConsultationTimes[value]?.length !== 4
      );
    },
    allowedMinutes(value) {
      return (
        value % 15 === 0 &&
        !this.notAllowedConsultationTimes[this.selectedHour]?.includes(
          `${value}`
        )
      );
    },
    getTimeWithInitialZero(value) {
      return value < 10 ? (value = `0${value}`) : value;
    },
    setSelectedHour(value) {
      this.selectedHour = value;
    },
    toPatientInfoPage() {
      return window.history.length > 2
        ? this.$router.go(-1)
        : this.$router.push("/patients");
    },
    // TEST
    setTestData() {
      this.fields.date = "2020-11-11";
      this.fields.time = "15:30";
      this.fields.symptoms = "Кашель, температура. Что-то еще";
    }
  }
};
</script>
