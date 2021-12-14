import TeamMatchup from "./TeamMatchups";

export default class Team {
  constructor(team, schedule, currentMatchupPeriod, weeklyRankings, totalTeams) {
    this.id = team.id;
    this.name = `${team.location} ${team.nickname}`;
    this.abbrev = team.abbrev;
    this.owners = team.owners;
    this.matchups = schedule.filter(matchup => matchup.home && matchup.away && (matchup.home.teamId === team.id || matchup.away.teamId === team.id) && matchup.matchupPeriodId < currentMatchupPeriod)
    .map(filteredMatchup => new TeamMatchup(team.id, filteredMatchup, weeklyRankings));
    this.bowlPoints = this.calculateBowlPoints();
    this.records = {
      h2h: this.getH2HRecord(),
      topHalf: this.getTopHalfRecord(totalTeams),
      overall: {wins: 0, losses: 0},
    };
    this.records.overall = this.getOverallRecord();
  }
  calculateBowlPoints() {
    return this.matchups.reduce((accum, currentWeek) => {
      if (currentWeek.pointsScored > 100) {
        accum += (currentWeek.pointsScored - 100);
      }
      if (currentWeek.ranking === 1) {
        accum += 250;
      }
      if (currentWeek.ranking === 2) {
        accum += 180;
      }
      if (currentWeek.ranking === 3) {
        accum += 150;
      }
      if (currentWeek.ranking === 4) {
        accum += 120;
      }
      if (currentWeek.ranking === 5) {
        accum += 100;
      }
      if (currentWeek.ranking === 6) {
        accum += 80;
      }
      if (currentWeek.ranking === 7) {
        accum += 60;
      }
      if (currentWeek.ranking === 8) {
        accum += 40;
      }
      if (currentWeek.ranking === 9) {
        accum += 20;
      }
      if (currentWeek.ranking === 10) {
        accum += 10;
      }
      return accum;
    }, 0)
  }
  getH2HRecord() {
    return this.matchups.reduce((record, week) => {
      week.won === true ? record.wins++ : record.losses++;
      return record;
    }, {wins: 0, losses: 0})
  }
  getTopHalfRecord(totalTeams) {
    return this.matchups.reduce((record, week) => {
      week.ranking <= (totalTeams / 2) ? record.wins++ : record.losses++;
      return record;
    }, {wins: 0, losses: 0})
  }
  getOverallRecord() {
    return {
      wins: this.records.h2h.wins + this.records.topHalf.wins,
      losses: this.records.h2h.losses + this.records.topHalf.losses,
    }
  }
}