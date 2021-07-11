<template>
  <div>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model="fields.surname"
        :rules="requiredRule"
        label="Фамилия"
      ></v-text-field>

      <v-text-field
        v-model="fields.name"
        :rules="requiredRule"
        label="Имя"
      ></v-text-field>

      <v-text-field v-model="fields.patronymic" label="Отчество"></v-text-field>

      <v-text-field
        v-model="fields.birthday"
        :rules="birthdayRules"
        label="Дата рождения"
      ></v-text-field>

      <v-select
        v-model="fields.gender"
        :items="items"
        :rules="[(v) => !!v || 'Item is required']"
        label="Пол"
      ></v-select>

      <v-text-field
        v-model="fields.snils"
        :rules="snilsRules"
        label="СНИЛС"
      ></v-text-field>

      <v-text-field v-model="fields.weight" label="Вес"></v-text-field>

      <v-text-field v-model="fields.height" label="Рост"></v-text-field>

      <v-text-field v-model="fields.age" label="Возраст"></v-text-field>

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
  name: "PatientsEditForm",
  props: {
    mode: String
  },
  data: () => ({
    valid: true,
    // Fields
    // name: "",
    // surname: "",
    // patronymic: "",
    // birthday: "",
    // gender: "",
    // snils: "",
    // weight: null,
    // height: null,
    // age: null,
    fields: {
      name: "",
      surname: "",
      patronymic: "",
      birthday: "",
      gender: "",
      snils: "",
      weight: null,
      height: null,
      age: null
    },
    // Fields rules
    requiredRule: [(v) => !!v || "Обязательное поле"],
    birthdayRules: [(v) => !!v || "Обязательное поле"],
    snilsRules: [(v) => !!v || "Обязательное поле"],
    // select: null,
    items: ["Мужской", "Женский"]
  }),
  created() {
    if (this.isEditMode) {
      const patientData = this.GET_PATIENT_BY_ID(`${this.patientId}`);
      this.fields = { ...patientData };
    }
  },
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
    ...mapActions(["ADD_PATIENT", "EDIT_PATIENT"]),
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
          this.createPatient();
        }
      }
    },
    createPatient() {
      const patientData = {
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
      this.ADD_PATIENT(patientData);
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
