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
    path: '/patients/:id/edit',
    name: 'PatientsEdit',
    component: () => import('@/views/PatientEdit.vue'),
    meta: {
      metaTitle: 'Редактирование пациента'
    }
  },
  // {
  //   path: '/consulting',
  //   name: 'Consulting',
  //   component: () => import('@/views/ConsultingPage.vue'),
  //   meta: {
  //     metaTitle: 'Консультации'
  //   }
  // }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
