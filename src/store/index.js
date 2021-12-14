import { createStore } from 'vuex';
import axios from 'axios';
const fantasyApi = axios.create({
  baseURL: 'http://localhost:7000/api',
});

export default createStore({
  state: {
    league: {},
  },
  mutations: {
    setLeague(state, league) {
      state.league = league;
    },
  },
  actions: {
    fetchLeagueInfo() {
      return fantasyApi.get('/leagueInfo')
        .then(({ data }) => {
          return data;
        })
    },
  },
  getters: {
    teams: state => state.league.teams,
  },
  modules: {
  }
})
