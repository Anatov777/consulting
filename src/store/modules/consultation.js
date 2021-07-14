const state = {
  consultations: JSON.parse(localStorage.getItem('consultations')) || []
}

const getters = {
  GET_CONSULTATIONS: (state) => state.consultations,
  GET_CONSULTATIONS_BY_PATIENT: (state) => (patientId) => {
    return state.consultations.filter((item) => item.patientId === patientId)
  },
  GET_CONSULTATION_BY_ID: (state) => (id) => {
    return state.consultations.find((item) => item.id === id)
  }
}

const actions = {
  ADD_CONSULTATION(context, consultationData) {
    context.commit('ADD_CONSULTATION_MUTATION', consultationData)
  },
  EDIT_CONSULTATION(context, consultationData) {
    context.commit('EDIT_CONSULTATION_MUTATION', consultationData)
  },
  DELETE_CONSULTATION(context, index) {
    context.commit('DELETE_CONSULTATION_MUTATION', index)
  }
}

const mutations = {
  ADD_CONSULTATION_MUTATION: (state, consultationData) => {
    const lastElementId = +state.consultations[state.consultations.length - 1]?.id || 0
    consultationData.id = `${ lastElementId + 1}`
    state.consultations.push(consultationData)
    setLocalStorageData(state)
  },
  EDIT_CONSULTATION_MUTATION: (state, consultationData) => {
    const index = state.consultations.findIndex((item) => item.id === consultationData.id)
    state.consultations.splice(index, 1, consultationData)
    setLocalStorageData(state)
  },
  DELETE_CONSULTATION_MUTATION: (state, index) => {
    state.consultations.splice(index, 1)
    setLocalStorageData(state)
  }
}

function setLocalStorageData(state) {
  localStorage.setItem('consultations', JSON.stringify(state.consultations))
}

export default {
  namespaced: false,
  state,
  getters,
  actions,
  mutations
}
