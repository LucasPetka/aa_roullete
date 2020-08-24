<template>
    <div>
        <div class="progress mt-3">
            <div class="progress-bar progress-bar-striped progress-bar-animated bg-danger" role="progressbar" v-bind:aria-valuenow="this.incomingGame.fakeStartDelta" aria-valuemin="0" aria-valuemax="140" v-bind:style="'width:'+ this.incomingGame.fakeStartDelta * 100 / 140 + '%'"></div>
        </div>

        <h5 class="mt-3">Events</h5>

        <ul id="eventList" class="list-group">
            <li id='liveItem' class="list-group-item">Game {{this.incomingGame.id}} will start in {{this.incomingGame.fakeStartDelta}} sec</li>
        </ul>
    </div>
</template>

<script>
import configAPI from '../../apiValidations'
import { getNextGame, getGameById } from '../../api/roulette.api';

export default {
  name: 'Events',

  data: () => ({
       incomingGame: {} //Incoming game object which will be shown Live on EventList
  }),

  methods: {

    async getIncomingGame(gameBeforeId){

        this.sendMessageToLog(`Checking for new game`);
        this.sendMessageToLog(`GET .../nextGame`);

        try {
            const response = await getNextGame();
            //Checks if api is Valid
            configAPI.isValidSpinConfig(response.data);     
            this.incomingGame = response.data;

            //checks if its a first game and if its not returning the same game
            if(this.$store.state.firstGame == false && gameBeforeId == this.incomingGame.id){ 
                setTimeout(() => { this.getIncomingGame(gameBeforeId); }, 2000);
            }else{
                this.gameCountDown();
            }

        } catch (error) {
            this.sendMessageToLog(`GET .../nextGame - failed: ${error}`);
        }
       
    },

    //CountDown for incoming game
    gameCountDown(){

        this.sendMessageToLog(`sleeping for fakeStartDelta ${this.incomingGame.fakeStartDelta} sec`);

        let interval = setInterval(() => { 
            this.incomingGame.fakeStartDelta--;
            if(this.incomingGame.fakeStartDelta == 0){
                clearInterval(interval);
                this.spinRoulette(this.incomingGame.id);
            }
        }, 1000); 

    },

    async spinRoulette(currentGameId){
        this.sendMessageToLog(`Spinning the wheel`);

        //updates that first game already played
        this.$store.commit('setFirstGame', false);

        if(this.$store.getters.isRouletteSpinning == true){   
            this.sendMessageToLog(`Wheel is already spinning ;/`);
        }

        let playedGame = {}; 
        this.$store.commit('setRouletteSpinningState', true);
        this.sendMessageToLog(`GET .../game/${currentGameId}`);

        try {
            const response = await getGameById(currentGameId);
            playedGame = response.data;

            if(playedGame.result == null){
                this.sendMessageToLog(`Still no result continue spinning`);
                
                //if its still no result it will spin Roulette again
                setTimeout(() => { 
                    this.spinRoulette(this.incomingGame.id); 
                }, 2000);

            }else{ 
                this.$store.commit('setRouletteSpinningState', false);
                this.$store.state.lastSpinResult = playedGame.result;
                this.addPastGamesToAnEventsWindow(`Game ${playedGame.id} ended, result is ${playedGame.result}`);
                this.sendMessageToLog(`Result is ${playedGame.result}`);
                this.getIncomingGame();

            }

        } catch (error) {
            this.sendMessageToLog(`GET .../game/${currentGameId} - failed: ${error}`);
            this.addPastGamesToAnEventsWindow(`Game ${currentGameId} ended, result corrupted by an error`);
            this.$store.commit('setRouletteSpinningState', false);
            this.getIncomingGame(currentGameId);
        }

    },

    //Add past game results to an event list
    addPastGamesToAnEventsWindow(gameResultResponse){
        const eventList = document.getElementById('eventList');
        const liveItem = document.getElementById('liveItem');

        let listItem = document.createElement("li");
        listItem.className = 'list-group-item';

        listItem.appendChild(document.createTextNode(gameResultResponse)); 
        eventList.insertBefore(listItem, liveItem);
    }

  }
}
</script>


