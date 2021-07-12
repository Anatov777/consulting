import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/patients'
  },
  {
    path: '/patients',
    name: 'Patients',
    component: () => import('@/views/PatientsPage.vue'),
    meta: {
      metaTitle: 'Пациенты'
    }
  },
  {
    path: '/patients/add',
    name: 'PatientsAdd',
    component: () => import('@/views/PatientAdd.vue'),
    meta: {
      metaTitle: 'Создание пациента'
    }
  },
  {
    path: '/patients/:id',
    name: 'PatientInfo',
    component: () => import('@/views/PatientInfo.vue')
  },
  {
    path: '/patients/:id/edit',
    name: 'PatientsEdit',
    component: () => import('@/views/PatientEdit.vue'),
    meta: {
      metaTitle: 'Редактирование пациента'
    }
  },
  {
    path: '/patients/:patientId/consultation/add',
    name: 'ConsultationAdd',
    component: () => import('@/views/ConsultationAdd.vue'),
    meta: {
      metaTitle: 'Добавление консультации'
    }
  },
  {
    path: '/patients/:patientId/consultation/:consultationId/edit',
    name: 'ConsultationEdit',
    component: () => import('@/views/ConsultationEdit.vue'),
    meta: {
      metaTitle: 'Редактирование консультации'
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
