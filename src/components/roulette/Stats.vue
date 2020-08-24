<template>
  <div>
   <h5 class="mt-5">Stats (last 200)</h5>

   <table id="rouletteStats" class="table table-sm" style="text-align: center;">
     <thead>
       <td></td>
       <td colspan="5" class="cold" >Cold</td>
       <td colspan="27" class="neutral" >Neutral</td>
       <td colspan="5" class="hot" >Hot</td>
     </thead>
     <tbody>
       <tr id="result"></tr>
       <tr id="count"></tr>
     </tbody>
   </table>

  </div>
</template>

<script>
import { getRouletteStatistics } from '../../api/roulette.api';
import configAPI from '../../apiValidations'

export default {
  name: 'Stats',

  watch: {
    //Listening roulette spinning state
    "$store.state.roulleteSpinning"(spinningState) {
      //If roulette stops Roulette stats updates
        if(spinningState == false){
          this.getRouletteStats();
        }
    }
  },

  data: () => ({
       stats: []  //Array of statistics
  }),

  methods: {

    //fetches roulette stats
    async getRouletteStats(){

      this.sendMessageToLog(`GET .../stats?limit=200`);

        
      try {
        const response =  await getRouletteStatistics(200);
        configAPI.isValidStatisticsConfig(response.data); //Checks if api is Valid
        this.stats = response.data;
        this.generateStatsTable();
      } catch (error) {
        this.sendMessageToLog(`GET .../stats?limit=200 - failed: ${error}`);
      }

    },

    //generates Statistics table
    generateStatsTable(){

      const configuration = this.$store.getters.getRouletteConfig;
      let rowSlot = document.getElementById('result');
      let rowHits = document.getElementById('count');

      rowSlot.innerHTML = '<th>Slot</th>';
      rowHits.innerHTML = '<th>Hits</th>';

      this.stats.forEach(function (stat, i) {
          let cellResult = rowSlot.insertCell();
          let cellCount = rowHits.insertCell();

          cellResult.style.width = "40px";
          cellCount.style.width = "40px";

          let colorName = configuration.colors[configuration.results.indexOf(stat.result.toString())];

          cellResult.className = `bg-${colorName} text-white`;

          if(i < 5){
            cellCount.className = "cold"; 
          }else if(i > 31){
            cellCount.className = "hot";
          }

          cellResult.appendChild(document.createTextNode(stat.result));
          cellCount.appendChild(document.createTextNode(stat.count));
      });

    }

  }
}
</script>

<style scoped>

</style>
