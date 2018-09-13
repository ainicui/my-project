import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/index.vue'
import TalkList from './views/talk_list/index.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: '/talk_list',
          name: 'talk_list',
          component: TalkList
        }
      ]
    }
  ]
})
