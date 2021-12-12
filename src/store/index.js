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
    scoresByWeek: state => {
      const currentMatchupWeek = state.leagueInfo.status.currentMatchupPeriod;
      const scoresByWeek = [];
      for (let matchupWeek = 1; matchupWeek < currentMatchupWeek; matchupWeek++) {
        let matchupScores = state.matchupScores.schedule
          .filter(matchup => matchup.matchupPeriodId === matchupWeek)
          .map(matchup => {
            return [
              {teamId: matchup.home.teamId, totalPoints: matchup.home.totalPoints},
              {teamId: matchup.away.teamId, totalPoints: matchup.away.totalPoints},
            ]
          })
        scoresByWeek.push({
          matchupPeriodId: matchupWeek,
          matchups: matchupScores});
      }
    return scoresByWeek;
    },
    h2hRecords: state => {
      const records = state.leagueInfo.teams
        .map((team) => {
          return {
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
      });
      return records;
    },
    topHalfRecords: (state, getters) => {
      const records = state.leagueInfo.teams
      .map((team) => {
        return {
          id: team.id,
          wins: 0,
          losses: 0,
        }
      });
      getters.scoresByWeek.forEach((week) => {
        let sortedWeeklyScores = week.matchups
          .reduce((accum, currValue) => {
            accum.push(currValue[0], currValue[1]);
            return accum;
          }, [])
          .sort((a,b) => a.totalPoints - b.totalPoints)
        let winnerThreshold = sortedWeeklyScores.length / 2;
        let bottomHalf = sortedWeeklyScores.slice(0, winnerThreshold);
        let topHalf = sortedWeeklyScores.slice(-winnerThreshold);
        bottomHalf.forEach((loser) => {
          let index = records.findIndex(team => team.id ===loser.teamId);
          records[index].losses++
        })
        topHalf.forEach((winner) => {
          let index = records.findIndex(team => team.id === winner.teamId);
          records[index].wins++
        })
      })
      return records;
    },
    overallRecords: (state, getters) => {
      let overallRecords = getters.h2hRecords;
      getters.topHalfRecords.forEach((record) => {
        let index = overallRecords.findIndex(team => team.id === record.id );
        overallRecords[index].wins += record.wins;
        overallRecords[index].losses += record.losses;
      });
      return overallRecords.sort((a, b) => b.wins - a.wins);
    }
  },
  modules: {
  }
})
