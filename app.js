const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100, 
            monsterHealth: 100,  
        }
    }, 
    computed: {
        updatePlayerHp() {
            return this.playerHealth <= 0?  {width: `${0}%`} : {width: `${this.playerHealth}%`} 
        }, 
        updateMonsterHp() {
            // return {width: `${this.monsterHealth}%`};
            return this.monsterHealth <= 0?  {width: `${0}%`} : {width: `${this.monsterHealth}%`} 
        }
    },
    methods: {
        attackMonster() {
           const attackValue = randomDamage(5, 20)
           this.monsterHealth -= attackValue; 
           console.log('Played Attacked! Damaged caused to monster:', attackValue);
           this.attackPlayer(); 
        }, 
        attackPlayer() {
           const attackValue = randomDamage(10, 30); 
           this.playerHealth -= attackValue; 
           console.log('Monster attacked back! Damaged to player:', attackValue);
        }
    }, 
});


const randomDamage = (max, min) => {
    return Math.floor(Math.random() * ((max + 1) - min)) + min; 
}
app.mount('#game'); 