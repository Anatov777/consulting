<template>
  <div>
    <v-form ref="form" v-model="valid" lazy-validation>
      <!-- <v-text-field
        v-model="fields.date"
        :rules="requiredRule"
        label="Дата"
      ></v-text-field> -->

      <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :return-value.sync="fields.date"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            :value="dateFormatted"
            label="Дата"
            readonly
            v-bind="attrs"
            v-on="on"
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
          <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
          <v-btn text color="primary" @click="$refs.menu.save(fields.date)">
            OK
          </v-btn>
        </v-date-picker>
      </v-menu>

      <!-- <v-text-field
        v-model="fields.time"
        :rules="requiredRule"
        label="Время"
      ></v-text-field> -->

      <v-menu
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
            label="Время"
            readonly
            v-bind="attrs"
            v-on="on"
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
        ></v-time-picker>
      </v-menu>

      <v-text-field v-model="fields.symptoms" label="Симптомы"></v-text-field>

      <!-- <v-textarea
        v-model="fields.symptoms"
        filled
        label="Симптомы"
        rows="2"
        auto-grow
      ></v-textarea> -->

      <v-btn
        :disabled="!valid"
        color="success"
        class="mr-4"
        @click="submitForm"
      >
        <span v-if="isEditMode">Сохранить</span>
        <span v-else>Создать</span>
      </v-btn>

      <v-btn color="error" class="mr-4" @click="reset"> Reset Form </v-btn>

      <v-btn color="warning" @click="resetValidation"> Reset Validation </v-btn>
    </v-form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "ConsultationEditForm",
  props: {
    mode: String
  },
  data: () => ({
    valid: true,
    fields: {
      date: "",
      time: null,
      symptoms: ""
    },
    menu: false,
    timeMenu: false,
    // Fields rules
    requiredRule: [(v) => !!v || "Обязательное поле"]
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
    // patientConsultations() {
    //   return this.GET_CONSULTATIONS_BY_PATIENT(this.patientId);
    // },
    dateFormatted() {
      return this.fields.date
        ? this.moment(this.fields.date).format("DD/MM/YYYY")
        : "";
    }
  },

  methods: {
    ...mapActions(["ADD_CONSULTATION", "EDIT_CONSULTATION"]),
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    submitForm() {
      if (this.$refs.form.validate()) {
        if (this.isEditMode) {
          this.editConsultation();
        } else {
          this.addConsultation();
        }
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
      return value >= 8 && value <= 20;
    },
    allowedMinutes(value) {
      return value % 15 === 0;
    }
  }
};
</script>
