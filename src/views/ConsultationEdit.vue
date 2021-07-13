<template>
  <div>
    <consultation-edit-form mode="edit" />
  </div>
</template>

<script>
export default {
  name: "ConsultationEdit",
  components: {
    ConsultationEditForm: () => import("@/components/ConsultationEditForm")
  }
};
</script>
