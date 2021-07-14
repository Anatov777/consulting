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
    let lastPatientId = +state.patients[state.patients.length - 1]?.id || 0
    patient.id = `${ lastPatientId + 1 }`
    state.patients.push(patient)
    setLocalStorageData(state)
  },
  EDIT_PATIENT_MUTATION: (state, patientData) => {
    const index = state.patients.findIndex((item) => item.id === patientData.id)
    state.patients.splice(index, 1, patientData)
    setLocalStorageData(state)
  },
  DELETE_PATIENT_MUTATION: (state, index) => {
    state.patients.splice(index, 1)
    setLocalStorageData(state)
  }
}

function setLocalStorageData(state) {
  localStorage.setItem('patients', JSON.stringify(state.patients))
}

export default {
  namespaced: false,
  state,
  getters,
  actions,
  mutations
}
