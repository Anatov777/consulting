<template>
  <div>
    <v-card>
      <v-card-title>
        Пациенты
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table :headers="headers" :items="GET_PATIENTS" :search="search">
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon
            class="mr-2"
            title="Данные пациента"
            @click="toPatientInfo(item)"
          >
            mdi-account
          </v-icon>
          <v-icon
            class="mr-2"
            title="Редактировать"
            @click="toEditPatient(item)"
          >
            mdi-pencil
          </v-icon>
          <v-icon title="Удалить" @click="deletePatient(item)">
            mdi-delete
          </v-icon>
        </template>
        <template slot="no-data"> Нет пациентов </template>
      </v-data-table>

      <v-dialog v-model="dialogDelete" max-width="500px">
        <v-card>
          <v-card-title class="text-h5">Удалить пациента?</v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeDelete"
              >Отмена</v-btn
            >
            <v-btn color="blue darken-1" text @click="deletePatientConfirm"
              >OK</v-btn
            >
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "PatientsPage",
  data() {
    return {
      search: "",
      dialogDelete: false,
      deletedPatientIndex: null,
      deletedConsultations: null,
      headers: [
        {
          text: "Фамилия",
          value: "surname"
        },
        { text: "Имя", value: "name" },
        { text: "Отчество", value: "patronymic" },
        { text: "Дата рождения", value: "birthday" },
        { text: "Пол", value: "gender" },
        { text: "СНИЛС", value: "snils" },
        { text: "Вес", value: "weight" },
        { text: "Рост", value: "height" },
        { text: "Возраст", value: "age" },
        { text: "Действия", value: "actions", sortable: false }
      ]
    };
  },
  computed: {
    ...mapGetters([
      "GET_PATIENTS",
      "GET_CONSULTATIONS",
      "GET_CONSULTATIONS_BY_PATIENT"
    ])
  },
  methods: {
    ...mapActions(["DELETE_PATIENT", "DELETE_CONSULTATION"]),
    toEditPatient(patientData) {
      this.$router.push({
        name: "PatientsEdit",
        params: { patientId: patientData.id }
      });
    },
    toPatientInfo(patientData) {
      this.$router.push({
        name: "PatientInfo",
        params: { patientId: patientData.id }
      });
    },
    deletePatient(patientData) {
      this.deletedPatientIndex = this.GET_PATIENTS.indexOf(patientData);
      this.deletedConsultations = [
        ...this.GET_CONSULTATIONS_BY_PATIENT(patientData.id)
      ];
      this.dialogDelete = true;
    },
    closeDelete() {
      this.dialogDelete = false;
    },
    async deletePatientConfirm() {
      await this.DELETE_PATIENT(this.deletedPatientIndex);
      await this.deletePatientConsultations();
      this.dialogDelete = false;
    },
    async deletePatientConsultations() {
      await this.deletedConsultations.forEach((consultation) => {
        let consultationIndex = this.GET_CONSULTATIONS.indexOf(consultation);
        this.DELETE_CONSULTATION(consultationIndex);
      });
    }
  }
};
</script>
