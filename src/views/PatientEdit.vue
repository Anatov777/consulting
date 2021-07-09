<template>
  <div>
    <h1>Редактирование пациента</h1>
    <patients-edit-form mode="edit" />
  </div>
</template>

<script>
export default {
  name: "PatientEdit",
  components: {
    PatientsEditForm: () => import("@/components/PatientsEditForm")
  }
};
</script>
