<template>
  <div class="text-end">
    <v-btn :to="pathTo" rounded color="primary" dark>
      {{ text }}
    </v-btn>
  </div>
</template>

<script>
export default {
  name: "BaseButton",
  props: {
    text: String,
    pathTo: String
  }
};
</script>
