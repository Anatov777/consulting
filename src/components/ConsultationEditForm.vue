<template>
  <div>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model="fields.date"
        :rules="requiredRule"
        label="Дата"
      ></v-text-field>

      <v-text-field
        v-model="fields.time"
        :rules="requiredRule"
        label="Время"
      ></v-text-field>

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
      time: "",
      symptoms: ""
    },
    // Fields rules
    requiredRule: [(v) => !!v || "Обязательное поле"]
  }),
  // created() {
  //   if (this.isEditMode) {
  //     const patientData = this.GET_PATIENT_BY_ID(`${this.patientId}`);
  //     this.fields = { ...patientData };
  //   }
  // },
  computed: {
    ...mapGetters(["GET_PATIENT_BY_ID"]),
    isEditMode() {
      return this.mode === "edit";
    },
    patientId() {
      return this.$route.params.id;
    }
  },

  methods: {
    ...mapActions(["ADD_CONSULTATION", "EDIT_PATIENT"]),
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
          this.editPatient();
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
    editPatient() {
      const patientData = {
        id: `${this.patientId}`,
        name: this.fields.name,
        surname: this.fields.surname,
        patronymic: this.fields.patronymic,
        birthday: this.fields.birthday,
        gender: this.fields.gender,
        snils: this.fields.snils,
        weight: this.fields.weight,
        height: this.fields.height,
        age: this.fields.age
      };
      this.EDIT_PATIENT(patientData);
    }
  }
};
</script>
