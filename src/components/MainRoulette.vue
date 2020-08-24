<template>
  <div id="app">
    
    <div class="container">

      <div class="row">
        <Stats id="stats" ref="stats"> </Stats>
      </div>

      <div class="row">
        <div id="gameboardAndEvents" class="col-lg-6">
          <GameBoard ref="gameBoard"> </GameBoard>
          <Events ref="events"> </Events>
        </div>
        <div class="col-lg-6">
          <Log> </Log>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
import Stats from './roulette/Stats.vue'
import GameBoard from './roulette/GameBoard.vue'
import Log from './roulette/Log.vue'
import Events from './roulette/Events.vue'
import { getRouletteConfig } from '../api/roulette.api';
import configAPI from '../apiValidations'

export default {
  name: 'Main',

  components: {
    Stats, GameBoard, Log, Events
  },

  created(){
    this.$store.commit('insertLogMessage', `${new Date().toISOString()} Loading game board`);
    this.getRouletteConfiguration();
  },

  methods: {

    async getRouletteConfiguration(){
      try {
        const response = await getRouletteConfig();

        configAPI.isValidConfigurationsConfig(response.data);

        this.$store.commit('setRouletteConfig', response.data);
        this.sendMessageToLog('GET .../configuration');
        this.$refs.gameBoard.gameBoardGeneration();
        this.$refs.stats.getRouletteStats(200);
        this.$refs.events.getIncomingGame();

      } catch (error) {
        this.sendMessageToLog(`GET .../configuration - failed: ${error}`);
      }

    }
    

  }

}
</script>

<style>

.cold { background-color: #D9EDF7; }
.neutral { background-color: #F5F5F5; }
.hot { background-color: #F2DEDE; }

.btn-red, .bg-red{
  background-color: rgb(224, 72, 72);
}

.btn-green, .bg-green{
  background-color: rgb(84, 190, 84);
}

.btn-black, .bg-black{
  background-color: rgb(70, 70, 70);
}

.btn-black, .btn-green, .btn-red, .bg-black, .bg-green, .bg-red{
  color:white;
}

</style>
