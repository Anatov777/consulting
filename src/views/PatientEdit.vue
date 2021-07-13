<template>
  <div>
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
