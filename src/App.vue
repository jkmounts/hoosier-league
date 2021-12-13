<template>
  <div>
    <Standings />
  </div>
</template>

<script>
import League from './models/League';
import Standings from './components/Standings.vue'

export default {
  name: 'App',
  components: {
    Standings
  },
  data() {
    return {
      league: {},
    }
  },
  computed: {
  },
  created () {
    this.$store.dispatch('fetchLeagueInfo')
      .then(data => this.$store.commit('setLeague', new League(data)));
  },
  methods: {
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
