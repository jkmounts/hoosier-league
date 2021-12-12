<template>
  <Standings />
</template>

<script>
import Standings from './components/Standings.vue';
import League from './models/League.js';

export default {
  name: 'App',
  components: {
    Standings,
  },
  computed: {
    standings() {
      return this.$store.getters.standings
    },
  },
  created () {
    this.$store.dispatch('fetchLeagueInfo');
    this.$store.dispatch('fetchMatchupScores');
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
