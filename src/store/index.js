import { createStore } from 'vuex';
import axios from 'axios';
const fantasyApi = axios.create({
  baseURL: 'http://localhost:7000/api',
});

export default createStore({
  state: {
    leagueInfo: {},
    matchupScores: {},
  },
  mutations: {
    setLeagueInfo(state, leagueInfo) {
      state.leagueInfo = leagueInfo;
    },
    setMatchupScores(state, matchupScores) {
      state.matchupScores = matchupScores;
    },
  },
  actions: {
    fetchLeagueInfo(context) {
      fantasyApi.get('/leagueInfo')
        .then(({ data }) => {
          context.commit('setLeagueInfo', data);
        })
    },
    fetchMatchupScores(context) {
      fantasyApi.get('/matchupScore')
        .then(({ data }) => {
          context.commit('setMatchupScores', data);
        })
    },
  },
  getters: {
    standings: state => {
      const records = state.leagueInfo.teams
        .map((team) => {
          return {
            team: team.abbrev,
            id: team.id,
            wins: 0,
            losses: 0,
          }
        })
      state.matchupScores.schedule.forEach((matchup) => {
        if (matchup.winner.toLowerCase() === 'home') {
          let winnerId = matchup.home.teamId;
          let loserId = matchup.away.teamId;
          let winnerIndex = records.findIndex(team => team.id === winnerId);
          let loserIndex = records.findIndex(team => team.id === loserId);
          records[winnerIndex].wins += 1;
          records[loserIndex].losses += 1;
        }
        if (matchup.winner.toLowerCase() === 'away') {
          let winnerId = matchup.away.teamId;
          let loserId = matchup.home.teamId;
          let winnerIndex = records.findIndex(team => team.id === winnerId);
          let loserIndex = records.findIndex(team => team.id === loserId);
          records[winnerIndex].wins += 1;
          records[loserIndex].losses += 1;
        }
      })
      return records;
    },
  },
  modules: {
  }
})
