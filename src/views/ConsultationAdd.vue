<template>
  <div>
    <consultation-edit-form mode="add" />
  </div>
</template>

<script>
export default {
  name: "ConsultationAdd",
  components: {
    ConsultationEditForm: () => import("@/components/ConsultationEditForm")
  }
};
</script>
