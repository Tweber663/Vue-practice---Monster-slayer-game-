const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100, 
            monsterHealth: 100,  
            currentRound: 0, 
            gameFinished: false, 
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
            } else if (this.playerHealth <= 0) {
                return 'Monster Win!'
            } else {
                return 'Player Win!'; 
            }
        },
        showResults() {
            return this.gameFinished === false? false : true;
        }
    },
    methods: {
        attackMonster() {
           this.currentRound++;
           const attackValue = randomDamage(5, 20)
           this.monsterHealth -= attackValue; 
           this.attackPlayer(); 
        }, 
        specialAttackMonster() {
            this.currentRound++; 
            const attackValue= randomDamage(10, 25); 
            this.monsterHealth -= attackValue; 

        },
        attackPlayer() {
           const attackValue = randomDamage(10, 30); 
           this.playerHealth -= attackValue; 
        }, 
        playerHeal() {
            this.currentRound++; 
            const healingValue = randomDamage(15, 35);
            console.log(this.playerHealth + healingValue); 
            this.playerHealth + healingValue >= 100? this.playerHealth = 100 : this.playerHealth += healingValue;
            this.attackPlayer(); 
        }, 
        startNewGame() {
            this.playerHealth = 100; 
            this.monsterHealth = 100; 
            this.currentRound = 0; 
            this.gameFinished = false; 
        }

    }, 
});


const randomDamage = (max, min) => {
    return Math.floor(Math.random() * ((max + 1) - min)) + min; 
}
app.mount('#game'); 