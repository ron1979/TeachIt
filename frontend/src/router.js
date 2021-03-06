import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Search from './views/Search.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import Profile from './views/Profile.vue'
import EditClasses from './views/EditClasses.vue'
import Topic from './views/Topic.vue'
import EditProfile from './views/EditProfile.vue'
import Chat from './views/Chat.vue'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', name: 'home', component: Home},
    { path: '/about', name: 'about', component: About},
    { path: '/search', name: 'search', component: Search},
    { path: '/search/:filter', name: 'searchFilter', component: Search},
    { path: '/login', name: 'login', component: Login},
    { path: '/register', name: 'register', component: Register},
    { path: '/profile/user/:userId', name: 'profile', component: Profile},
    { path: '/profile/edit/classes/:userId', name: 'editClasses', component: EditProfile},
    { path: '/profile/edit/:userId', name: 'edit', component: EditProfile},
    // { path: '/profile/classes/edit/:userId', name: 'editClasses', component: EditClasses},
    { path: '/profile/topic/:teacherTopicId', name: 'topic', component: Topic},
    { path: '/chat/:recipientId', name: 'chat', component: Chat}
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})
