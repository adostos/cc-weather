import Vue from 'vue'
import VueRouter from 'vue-router'

// views
import WeatherReport from '../views/WeatherReport.vue'
import LocationCities from '../views/LocationCities.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'LocationCities',
    component: LocationCities,
    meta: { theNavigation: true }
  },
  {
    path: '/weather',
    name: 'WeatherReport',
    props: true,
    component: WeatherReport,
    //component: () => import(/* webpackPreload: true *//* webpackChunkName: "weather" */'../views/WeatherReport.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
