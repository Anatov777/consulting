<template>
  <div>
    <patients-edit-form mode="add" />
  </div>
</template>

<script>
export default {
  name: "PatientAdd",
  components: {
    PatientsEditForm: () => import("@/components/PatientsEditForm")
  }
};
</script>
