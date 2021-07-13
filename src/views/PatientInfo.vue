<template>
  <div>
    <v-simple-table class="mt-10">
      <template v-slot:default>
        <!-- <thead>
          <tr>
            <th class="text-left">Свойство</th>
            <th class="text-left">Значение</th>
          </tr>
        </thead> -->
        <tbody>
          <tr v-for="item in headers" :key="item.id">
            <td>{{ item.text }}</td>
            <td>{{ patientData[item.value] }}</td>
          </tr>
        </tbody>
      </template>
      <template slot="no-data"> Нет данных </template>
    </v-simple-table>

    <patient-consultation class="mt-10" />
  </div>
</template>

<script>
// import HelloWorld from "@/components/HelloWorld.vue";
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
          align: "start",
          value: "surname"
        },
        { text: "Имя", value: "name" },
        { text: "Отчество", value: "patronymic" },
        { text: "СНИЛС", value: "snils" }
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