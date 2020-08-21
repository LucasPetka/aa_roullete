<template>
  <div>
    <h5>Game Board</h5>

    <div class="row">
      <div class="col-10">
        <div id="gameBoard"></div>
      </div>
      <div class="col-2">
        <div v-if="this.$store.getters.isRouletteSpinning" class="spinner-border text-dark" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'GameBoard',

  data: () => ({
    configuration: {}
  }),

  watch: {
    //Listening roulette spinning state
    "$store.state.roulleteSpinning"(spinningState) {
      //If roulette stops gameboard shows answer
        if(spinningState == false){
          this.displaySpinResult();
        }
    }
  },

  methods: {

    //gameboard generation
    gameBoardGeneration: function(){
      let gameBoard = document.getElementById('gameBoard');
      this.configuration = this.$store.getters.getRouletteConfig;

      this.configuration.positionToId.forEach(number => {
          let newButton = document.createElement("button");
          newButton.id = number;
          let buttonNumber = document.createTextNode(number);  

          //gets color name of number by the position
          let colorName = this.configuration.colors[this.configuration.results.indexOf(number.toString())];

          newButton.className = `btn btn-${colorName}`;

          newButton.style.width = '45px';
          newButton.appendChild(buttonNumber); 
          gameBoard.appendChild(newButton);
      });
    },

    //display result by blinking after game is done
    displaySpinResult(){
      try {
        let className = document.getElementById(this.$store.state.lastSpinResult).cloneNode(false).className;
        let resultButton = document.getElementById(this.$store.state.lastSpinResult);
        this.$store.state.lastSpinResult = null;
        resultButton.className = "btn blinking";
        setTimeout(() => { resultButton.className = className}, 4000); 
      } catch (error) {
        this.$store.state.roulleteSpinning = false;
      }

    }
  }
}
</script>

<style>


@keyframes glowing {
  0% {
    background-color: #ffffff;
    box-shadow: 0 0 2px #ffffff;
    color: black;
  }
  50% {
    background-color: #383838;
    box-shadow: 0 0 10px #383838;
    color: white;
  }
  100% {
    background-color: #ffffff;
    box-shadow: 0 0 2px #ffffff;
    color: black;
  }
}

.blinking {
  animation: glowing 1300ms infinite;
}


</style>
