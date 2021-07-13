<template>
  <div>
    <!-- {{ GET_PATIENTS }} -->
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
      </v-data-table>

      <v-dialog v-model="dialogDelete" max-width="500px">
        <v-card>
          <v-card-title class="text-h5"
            >Are you sure you want to delete this item?</v-card-title
          >
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeDelete"
              >Cancel</v-btn
            >
            <v-btn color="blue darken-1" text @click="deleteItemConfirm"
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
  components: {
    // BaseButton: () => import("@/components/BaseButton")
  },
  data() {
    return {
      search: "",
      dialogDelete: false,
      deletedIndex: null,
      headers: [
        {
          text: "Фамилия",
          align: "start",
          value: "surname"
        },
        { text: "Имя", value: "name" },
        { text: "Отчество", value: "patronymic" },
        { text: "СНИЛС", value: "snils" },
        { text: "Действия", value: "actions", sortable: false }
      ],
      patients: [
        {
          surname: "Иванов",
          name: "Иван",
          patronymic: "Иванович",
          snils: "111-222"
        },
        {
          surname: "Иванов",
          name: "Петр",
          patronymic: "Иванович",
          snils: "333-444"
        }
      ]
    };
  },
  computed: {
    ...mapGetters(["GET_PATIENTS"])
  },
  methods: {
    ...mapActions(["DELETE_PATIENT"]),
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
      this.deletedIndex = this.GET_PATIENTS.indexOf(patientData);
      this.dialogDelete = true;
    },
    closeDelete() {
      this.dialogDelete = false;
    },
    deleteItemConfirm() {
      this.DELETE_PATIENT(this.deletedIndex);
      this.dialogDelete = false;
    }
  }
};
</script>
