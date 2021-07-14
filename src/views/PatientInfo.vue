<template>
  <div>
    <v-container>
      <v-simple-table class="mt-10 patient-info-table">
        <template v-slot:default>
          <tbody>
            <tr v-for="item in headers" :key="item.id">
              <td>
                <strong>{{ item.text }}</strong>
              </td>
              <td>{{ patientData[item.value] }}</td>
            </tr>
          </tbody>
        </template>
        <template slot="no-data"> Нет данных </template>
      </v-simple-table>
    </v-container>

    <patient-consultation class="mt-10" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "PatientInfo",
  components: {
    PatientConsultation: () => import("@/components/PatientConsultation")
  },
  data() {
    return {
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
        { text: "Возраст", value: "age" }
      ]
    };
  },
  computed: {
    ...mapGetters(["GET_PATIENT_BY_ID"]),
    patientId() {
      return this.$route.params.patientId;
    },
    patientData() {
      return this.GET_PATIENT_BY_ID(this.patientId);
    }
  }
};
</script>
