const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100, 
            monsterHealth: 100,  
            currentRound: 0, 
            gameFinished: false, 
            winner: null, 
            battleLog: []
        }
    }, 
    watch: {
        currentRound() {
            if (this.playerHealth <= 0 || this.monsterHealth <= 0) this.gameFinished = true;
        }
    },
    computed: {
        updatePlayerHp() {
            return this.playerHealth <= 0?  {width: `${0}%`} : {width: `${this.playerHealth}%`} 
        }, 
        updateMonsterHp() {
            return this.monsterHealth <= 0?  {width: `${0}%`} : {width: `${this.monsterHealth}%`} 
        },
        mayUseSpecialAttack() {
            return this.currentRound % 3 !== 0? true : false;
        },
        gameOverResults() {
            if (this.playerHealth <= 0 && this.monsterHealth <= 0) {
                return 'Draw!'
            } else if (this.playerHealth <= 0 || this.winner === 'monster') {
                return 'Monster Win!'
            } else {
                return 'Player Win!'; 
            }
        },
        showResults() {
            return this.gameFinished === false? false : true;
        },
    },
    methods: {
        attackMonster() {
           this.currentRound++;
           const attackValue = randomDamage(5, 20)
           this.monsterHealth -= attackValue; 
           this.updatingBattleLog('Player', 'attacking', attackValue)
           this.attackPlayer(); 
        }, 
        specialAttackMonster() {
            this.currentRound++; 
            const attackValue= randomDamage(10, 25); 
            this.monsterHealth -= attackValue; 
            this.updatingBattleLog('Player', 'attacking', attackValue)
        },
        attackPlayer() {
           const attackValue = randomDamage(10, 30); 
           this.updatingBattleLog('Monster', 'attacking', attackValue)
           this.playerHealth -= attackValue; 
        }, 
        playerHeal() {
            this.currentRound++; 
            const healingValue = randomDamage(15, 35);
            this.playerHealth + healingValue >= 100? this.playerHealth = 100 : this.playerHealth += healingValue;
            this.updatingBattleLog('Player', 'healing', healingValue)
            this.attackPlayer(); 
        }, 
        startNewGame() {
            this.playerHealth = 100; 
            this.monsterHealth = 100; 
            this.currentRound = 0; 
            this.gameFinished = false; 
        }, 
        surrender() {
            this.winner = 'monster';
            this.gameFinished = true; 
            this.updatingBattleLog = [];
        },
        updatingBattleLog(who, what, value) {
            console.log(who, what, value)
            this.battleLog.unshift({
                who, 
                what, 
                value, 
            })
        }
    }, 
});


const randomDamage = (max, min) => {
    return Math.floor(Math.random() * ((max + 1) - min)) + min; 
}
app.mount('#game'); 