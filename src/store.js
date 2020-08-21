import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(Vuex);
Vue.use(VueAxios, axios)

export default new Vuex.Store({
    state: {
      log: [],
      rouletteConfiguration: {},
      roulleteSpinning: false,
      lastSpinResult: null,
      firstGame: true,
    },
    mutations: {
      insertLogMessage (state, message) {
        state.log.push(message);
      },
      setRouletteConfig(state, config) {
        state.rouletteConfiguration = config;
      },
      setRouletteSpinningState(state, config) {
        state.roulleteSpinning = config;
      },
      setFirstGame(state, config) {
        state.firstGame = config;
      }
    },
    getters: {
        getLog: state => state.log,
        getRouletteConfig: state => state.rouletteConfiguration,
        isRouletteSpinning: state => state.roulleteSpinning,
    }
})