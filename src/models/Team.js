import TeamMatchup from "./TeamMatchups";

export default class Team {
  constructor(team, schedule, currentMatchupPeriod, weeklyRankings, totalTeams) {
    this.id = team.id;
    this.name = `${team.location} ${team.nickname}`;
    this.abbrev = team.abbrev;
    this.owners = team.owners;
    this.records = {h2h: {wins: 0, losses: 0}, topHalf: {wins:0, losses:0}};
    this.matchups = schedule.filter(matchup => matchup.home && matchup.away && (matchup.home.teamId === team.id || matchup.away.teamId === team.id) && matchup.matchupPeriodId < currentMatchupPeriod)
    .map(filteredMatchup => new TeamMatchup(team.id, filteredMatchup, weeklyRankings));
    this.bowlPoints = 0;
    this.addOver100BowlPoints();
    this.addH2HRecord();
    this.addTopHalfRecord(totalTeams);
  }
  addOver100BowlPoints() {
    this.bowlPoints += this.matchups.reduce((accum, currentWeek) => {
      if (currentWeek.pointsScored > 100) {
        return accum + (currentWeek.pointsScored - 100);
      } else {
        return accum;
      }
    }, 0)
  }
  addH2HRecord() {
    this.matchups.forEach(matchup => {
      if (matchup.won) {
        this.records.h2h.wins++;
      }
      else {
        this.records.h2h.losses++;
      }
    });
  }
  addTopHalfRecord(totalTeams) {
    this.matchups.forEach(matchup => {
      if (matchup.ranking <= totalTeams / 2) {
        this.records.topHalf.wins++
      } else {
        this.records.topHalf.losses++
      }
    })
  }
}