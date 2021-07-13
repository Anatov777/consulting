<template>
  <div>
    <v-app-bar color="#f2f2f2">
      <v-btn icon title="Назад" :disabled="isPatientsPage" @click="goBack">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-btn
        icon
        title="Список пациентов"
        :disabled="isPatientsPage"
        @click="toPatientsPage"
      >
        <v-icon>mdi-account-group</v-icon>
      </v-btn>
      <v-toolbar-title class="ml-5">{{ pageTitle }}</v-toolbar-title>

      <v-spacer></v-spacer>

      <base-button
        v-if="isPatientsPage"
        path-to="/patients/add"
        text="Добавить пациента"
      />
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: "AppBar",
  components: {
    BaseButton: () => import("@/components/BaseButton")
  },
  data: () => ({}),
  watch: {
    $route() {
      this.setTitle();
    }
  },
  created() {
    this.setTitle();
  },
  computed: {
    isPatientsPage() {
      return this.$route.path === "/patients";
    },
    pageTitle() {
      return this.$route.meta.metaTitle;
    }
  },
  methods: {
    goBack() {
      return window.history.length > 2
        ? this.$router.go(-1)
        : this.$router.push("/");
    },
    toPatientsPage() {
      this.$router.push({ name: "PatientsPage" });
    },
    setTitle() {
      this.$route.meta.metaTitle ? (document.title = this.pageTitle) : "";
    }
  }
};
</script>



