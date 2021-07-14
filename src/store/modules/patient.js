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
  },
  EDIT_PATIENT(context, patientData) {
    context.commit('EDIT_PATIENT_MUTATION', patientData)
  },
  DELETE_PATIENT(context, index) {
    context.commit('DELETE_PATIENT_MUTATION', index)
  }
}

const mutations = {
  ADD_PATIENT_MUTATION: (state, patient) => {
    patient.id = `${+state.patients[state.patients.length - 1].id + 1 }`
    state.patients.push(patient)
    localStorage.setItem('patients', JSON.stringify(state.patients))
  },
  EDIT_PATIENT_MUTATION: (state, patientData) => {
    const index = state.patients.findIndex((item) => item.id === patientData.id)
    state.patients.splice(index, 1, patientData)
    localStorage.setItem('patients', JSON.stringify(state.patients))
  },
  DELETE_PATIENT_MUTATION: (state, index) => {
    state.patients.splice(index, 1)
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
