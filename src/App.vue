<template>
  <v-app>
    <app-bar />
    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import "@/styles/style.scss";

export default {
  name: "App",
  components: {
    AppBar: () => import("@/components/AppBar")
  }
};
</script>
