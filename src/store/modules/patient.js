const state = {
  patients: JSON.parse(localStorage.getItem('patients')) || []
}

const getters = {
  GET_PATIENTS: (state) => state.patients,
  GET_PATIENT_BY_ID: (state) => (patientId) => {
    return state.patients.find((item) => item.id === patientId)
  }
}

const actions = {
  ADD_PATIENT(context, patient) {
    context.commit('ADD_PATIENT_MUTATION', patient)
  }
}

const mutations = {
  ADD_PATIENT_MUTATION: (state, patient) => {
    console.log(`Add patient`)
    patient.id = state.patients.length + 1
    state.patients.push(patient)
    localStorage.setItem('patients', JSON.stringify(state.patients))
  }
}

export default {
  namespaced: false,
  state,
  getters,
  actions,
  mutations
}
