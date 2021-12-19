<template>
  <div>
    <header>
      <div class="header-content">
        <img src="./assets/HL-darkbg.png" alt="Hoosier League Logo">
      </div>
      <nav>
        <hamburger />
      </nav>
    </header>
    <NewsFeed />
    <Standings />
    <!-- <Playoffs /> -->
  </div>
</template>

<script>
import 'normalize.css';
import hamburger from './components/hamburger.vue';
import League from './models/League';
import Standings from './components/Standings.vue';
import NewsFeed from './components/NewsFeed.vue';
// import Playoffs from './components/Playoffs.vue';

export default {
  name: 'App',
  components: {
    hamburger,
    Standings,
    NewsFeed,
    // Playoffs,
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
@import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&display=swap');
:root {
  --light: #EDEBEB;
  --dark: #2c3e50;
  --crimson: #990000;
}
body {
    background: #EDEBEB; 
}
#app {
  font-family: 'Nunito', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: #EDEBEB;
  display: flex;
  flex-flow: column nowrap;
}
header {
  font-family: 'Libre Baskerville', serif;
  background: var(--dark);
  color: var(--light);
  font-size: .6rem;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 2px black;
}
.header-content {
  display: flex;
  flex-flow: row nowrap;
}
.header-content img{
  height: 90px;
  padding: 5px;
  filter: drop-shadow(2px 2px 2px black);
}

</style>
