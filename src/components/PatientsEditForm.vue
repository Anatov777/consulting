<template>
  <div>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model="fields.surname"
        :error-messages="surnameErrors"
        label="Фамилия *"
        @blur="$v.fields.surname.$touch()"
      ></v-text-field>

      <v-text-field
        v-model="fields.name"
        :error-messages="nameErrors"
        label="Имя *"
        @blur="$v.fields.name.$touch()"
      ></v-text-field>

      <v-text-field
        v-model="fields.patronymic"
        :error-messages="patronymicErrors"
        label="Отчество"
        @blur="$v.fields.patronymic.$touch()"
      ></v-text-field>

      <v-text-field
        v-model="fields.birthday"
        :error-messages="birthdayErrors"
        label="Дата рождения *"
        @blur="$v.fields.birthday.$touch()"
      ></v-text-field>

      <v-select
        v-model="fields.gender"
        :items="items"
        :error-messages="genderErrors"
        label="Пол *"
        @blur="$v.fields.gender.$touch()"
      ></v-select>

      <v-text-field
        v-model="fields.snils"
        :error-messages="snilsErrors"
        label="СНИЛС *"
        @blur="$v.fields.snils.$touch()"
      ></v-text-field>

      <v-text-field
        v-model="fields.weight"
        :error-messages="weightErrors"
        label="Вес"
        @blur="$v.fields.weight.$touch()"
      ></v-text-field>

      <v-text-field
        v-model="fields.height"
        :error-messages="heightErrors"
        label="Рост"
        @blur="$v.fields.height.$touch()"
      ></v-text-field>

      <v-text-field
        v-model="fields.age"
        :error-messages="ageErrors"
        label="Возраст"
        @blur="$v.fields.age.$touch()"
      ></v-text-field>

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

      <v-btn color="error" class="mr-4" @click="setTestData"> Заполнить </v-btn>
    </v-form>
    {{ valid }}
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { required, numeric } from "vuelidate/lib/validators";
import isValidSnils from "@/functions/checkSnils.js";
import moment from "moment";

export default {
  name: "PatientsEditForm",
  props: {
    mode: String
  },
  validations: {
    fields: {
      surname: { required, alpha: (value) => /^[а-яё]*$/i.test(value) },
      name: { required, alpha: (value) => /^[а-яё]*$/i.test(value) },
      patronymic: { alpha: (value) => /^[а-яё]*$/i.test(value) },
      birthday: {
        required,
        validDate: (value) => moment(value, "DD.MM.YYYY", true).isValid()
      },
      gender: { required },
      snils: { required, numeric },
      weight: { floatNumeric: (value) => /^[0-9.]*$/i.test(value) },
      height: { floatNumeric: (value) => /^[0-9.]*$/i.test(value) },
      age: { numeric }
    }
  },
  data: () => ({
    valid: true,
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
    // requiredRule: [(v) => !!v || "Обязательное поле"],
    // birthdayRules: [(v) => !!v || "Обязательное поле"],
    // snilsRules: [
    //   (v) => !!v || "Обязательное поле",
    //   (v) => isValidSnils(v) || "Неверная контрольная сумма СНИЛС"
    // ],
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
    },

    // Ошибки полей

    surnameErrors() {
      const errors = [];
      if (!this.$v.fields.surname.$dirty) return errors;
      !this.$v.fields.surname.required &&
        errors.push('Поле "Фамилия" обязательно.');
      !this.$v.fields.surname.alpha &&
        errors.push('Поле "Фамилия" должно содержать только буквы.');
      return errors;
    },
    nameErrors() {
      const errors = [];
      if (!this.$v.fields.name.$dirty) return errors;
      !this.$v.fields.name.required && errors.push('Поле "Имя" обязательно.');
      !this.$v.fields.name.alpha &&
        errors.push('Поле "Имя" должно содержать только буквы.');
      return errors;
    },
    patronymicErrors() {
      const errors = [];
      if (!this.$v.fields.patronymic.$dirty) return errors;
      !this.$v.fields.patronymic.alpha &&
        errors.push('Поле "Отчество" должно содержать только буквы.');
      return errors;
    },
    birthdayErrors() {
      const errors = [];
      if (!this.$v.fields.birthday.$dirty) return errors;
      !this.$v.fields.birthday.required &&
        errors.push('Поле "Дата рождения" обязательно.');
      !this.$v.fields.birthday.validDate &&
        errors.push('Поле "Дата рождения" должна быть в формате ДД.ММ.ГГГГ');
      return errors;
    },
    genderErrors() {
      const errors = [];
      if (!this.$v.fields.gender.$dirty) return errors;
      !this.$v.fields.gender.required && errors.push('Поле "Пол" обязательно.');
      return errors;
    },
    snilsErrors() {
      const errors = [];
      if (!this.$v.fields.snils.$dirty) return errors;
      !this.$v.fields.snils.required &&
        errors.push('Поле "СНИЛС" обязательно.');
      !this.$v.fields.snils.numeric &&
        errors.push('Поле "СНИЛС" должно содержать только цифры.');
      this.fields.snils &&
        !isValidSnils(this.fields.snils) &&
        errors.push("Неверная контрольная сумма СНИЛС.");
      return errors;
    },
    weightErrors() {
      const errors = [];
      if (!this.$v.fields.weight.$dirty) return errors;
      this.fields.weight &&
        !this.$v.fields.weight.floatNumeric &&
        errors.push('Поле "Вес" должно содержать только цифры.');
      return errors;
    },
    heightErrors() {
      const errors = [];
      if (!this.$v.fields.height.$dirty) return errors;
      this.fields.height &&
        !this.$v.fields.height.floatNumeric &&
        errors.push('Поле "Рост" должно содержать только цифры.');
      return errors;
    },
    ageErrors() {
      const errors = [];
      if (!this.$v.fields.age.$dirty) return errors;
      !this.$v.fields.age.numeric &&
        errors.push('Поле "Возраст" должно содержать только цифры.');
      return errors;
    }
  },

  methods: {
    ...mapActions(["ADD_PATIENT", "EDIT_PATIENT"]),
    // validate() {
    //   this.$refs.form.validate();
    // },
    reset() {
      this.$refs.form.reset();
    },
    async submitForm() {
      await this.$v.$touch();
      if (this.valid) {
        if (this.isEditMode) {
          this.editPatient();
        } else {
          this.createPatient();
        }
      }
    },
    getPatientData() {
      return {
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
    },
    createPatient() {
      const patientData = this.getPatientData();
      this.ADD_PATIENT(patientData);
    },
    editPatient() {
      const patientData = this.getPatientData();
      patientData.id = `${this.patientId}`;
      this.EDIT_PATIENT(patientData);
    },
    // TEST
    setTestData() {
      this.fields.surname = "Петров";
      this.fields.name = "Петр";
      this.fields.birthday = "02.11.1991";
      this.fields.gender = "Мужской";
      this.fields.snils = "11697338589";
    }
  }
};
</script>
