<template>
  <Standings />
</template>

<script>
import Standings from './components/Standings.vue'

export default {
  name: 'App',
  components: {
    Standings,
  },
  computed: {
  },
  created () {
    this.$store.dispatch('fetchLeagueInfo');
    this.$store.dispatch('fetchMatchupScores');
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@200;400;700&display=swap');
body {
    background: #EDEBEB; 
}
#app {
  font-family: 'Nunito', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  background: #EDEBEB;
}
</style>
