<template>
  <div>
    <h1>Список пациентов</h1>
    <base-button path-to="/patients/add" text="Добавить пациента" />
    {{ GET_PATIENTS }}
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
          <v-icon small class="mr-2" @click="toEditPatient(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deletePatient(item)"> mdi-delete </v-icon>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "PatientsPage",
  components: {
    BaseButton: () => import("@/components/BaseButton")
  },
  data() {
    return {
      search: "",
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
    toEditPatient(patientData) {
      console.log(patientData);
      this.$router.push({
        name: "PatientsEdit",
        params: { id: patientData.id }
      });
    }
  }
};
</script>
