export default class TeamMatchup {
  constructor(teamId, matchupData, weeklyRankings) {
    this.week = matchupData.matchupPeriodId;
    if (matchupData.away.teamId === teamId) {
      this.pointsScored = matchupData.away.totalPoints;
      this.opponentPointsScored = matchupData.home.totalPoints;
      this.opponentId = matchupData.home.teamId;
      this.won = matchupData.winner === 'AWAY';
    }
    if (matchupData.home.teamId === teamId) {
      this.pointsScored = matchupData.home.totalPoints;
      this.opponentPointsScored = matchupData.away.totalPoints;
      this.opponentId = matchupData.away.teamId;
      this.won = matchupData.winner === 'HOME';
    }
    this.ranking = weeklyRankings[this.week-1].findIndex((score) => score.teamId === teamId) + 1;
  }
}