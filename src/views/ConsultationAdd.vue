<template>
  <div>
    <h1>Добавить консультацию</h1>
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
