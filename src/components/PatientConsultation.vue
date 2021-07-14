<template>
  <div>
    <v-row>
      <v-col>
        <h2>Консультации пациента</h2>
      </v-col>
      <v-col>
        <base-button
          :path-to="`/patients/${patientId}/consultation/add`"
          text="Добавить консультацию"
        />
      </v-col>
    </v-row>

    <v-data-table
      class="mt-10"
      :headers="headers"
      :items="patientConsultations"
    >
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon
          class="mr-2"
          title="Редактировать"
          @click="toEditConsultation(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon title="Удалить" @click="deleteConsultation(item)">
          mdi-delete
        </v-icon>
      </template>
      <template slot="no-data"> Нет консультаций </template>
    </v-data-table>

    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <v-card-title class="text-h5">Удалить консультацию?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDelete">Отмена</v-btn>
          <v-btn color="blue darken-1" text @click="deleteItemConfirm"
            >OK</v-btn
          >
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "PatientConsultation",
  components: {
    BaseButton: () => import("@/components/BaseButton")
  },
  data() {
    return {
      dialogDelete: false,
      deletedIndex: null,
      headers: [
        {
          text: "Дата",
          value: "date"
        },
        {
          text: "Время",
          value: "time"
        },
        {
          text: "Симптомы",
          value: "symptoms"
        },
        {
          text: "Действия",
          value: "actions",
          sortable: false
        }
      ]
    };
  },
  computed: {
    ...mapGetters(["GET_CONSULTATIONS_BY_PATIENT"]),
    patientId() {
      return this.$route.params.patientId;
    },
    patientConsultations() {
      return this.GET_CONSULTATIONS_BY_PATIENT(this.patientId);
    }
  },
  methods: {
    ...mapActions(["DELETE_CONSULTATION"]),
    toEditConsultation(consultationData) {
      this.$router.push({
        name: "ConsultationEdit",
        params: {
          patientId: this.patientId,
          consultationId: consultationData.id
        }
      });
    },
    deleteConsultation(consultationData) {
      this.deletedIndex = this.patientConsultations.indexOf(consultationData);
      this.dialogDelete = true;
    },
    closeDelete() {
      this.dialogDelete = false;
    },
    async deleteItemConfirm() {
      await this.DELETE_CONSULTATION(this.deletedIndex);
      this.dialogDelete = false;
    }
  }
};
</script>