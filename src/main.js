import Vue from 'vue'
import Main from './components/MainRoulette.vue'

import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuex from 'vuex'
import store from './store'

Vue.use(Vuex)
Vue.use(VueAxios, axios)

Vue.config.productionTip = false

Vue.mixin({
  methods: {
    //Adds message to Log, in Vuex store
    sendMessageToLog: function (message) {
      this.$store.commit('insertLogMessage', `${new Date().toISOString()} ${message}`);
    }
  }
})

new Vue({
  render: h => h(Main),
  store: store,
}).$mount('#app')
