import Vue from "vue";
import Vuex from "vuex";

import patient from '@/store/modules/patient.js'
import consultation from '@/store/modules/consultation.js'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    patient,
    consultation
  },
});
