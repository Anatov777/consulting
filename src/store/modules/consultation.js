const state = {
  consultations: JSON.parse(localStorage.getItem('consultations')) || []
}

const getters = {
  GET_CONSULTATIONS: (state) => state.consultations,
  GET_CONSULTATIONS_BY_PATIENT: (state) => (patientId) => {
    return state.consultations.filter((item) => item.patientId === patientId)
  },
  GET_CONSULTATIONS_BY_ID: (state) => (id) => {
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
    consultationData.id = `${state.consultations.length + 1}`
    state.consultations.push(consultationData)
    localStorage.setItem('consultations', JSON.stringify(state.consultations))
  },
  EDIT_CONSULTATION_MUTATION: (state, consultationData) => {
    const index = state.consultations.findIndex((item) => item.id === +consultationData.id)
    state.consultations.splice(index, 1, consultationData)
    localStorage.setItem('consultations', JSON.stringify(state.consultations))
  },
  DELETE_CONSULTATION_MUTATION: (state, index) => {
    state.consultations.splice(index, 1)
    localStorage.setItem('consultations', JSON.stringify(state.consultations))
  }
}

export default {
  namespaced: false,
  state,
  getters,
  actions,
  mutations
}
