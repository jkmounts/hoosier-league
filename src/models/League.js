import Team from "./Team";

export default class League {
  constructor(leagueData) {
    this.id = leagueData.id;
    this.name = leagueData.settings.name;
    this.currentMatchupPeriod = leagueData.status.currentMatchupPeriod;
    const weeklyRankings = [];
    for(let matchupPeriod = 1; matchupPeriod < this.currentMatchupPeriod; matchupPeriod++) {
      weeklyRankings.push(leagueData.schedule
        .filter((matchup) => matchup.matchupPeriodId === matchupPeriod)
        .reduce((scores, matchup) => {
          scores.push({teamId: matchup.home.teamId, totalPoints: matchup.home.totalPoints});
          scores.push({teamId: matchup.away.teamId, totalPoints: matchup.away.totalPoints});
          return scores;
        }, [])
        .sort((a,b) => b.totalPoints - a.totalPoints)
      );
    }
    this.weeklyRankings = weeklyRankings;
    this.teams = leagueData.teams.map(team => {
      let teamObject = new Team(team, leagueData.schedule, this.currentMatchupPeriod, this.weeklyRankings, leagueData.teams.length);
      return teamObject;
    });
    this.addTopTenBowlPoints();
  }
  addTopTenBowlPoints() {
    this.weeklyRankings.forEach((week) => {
      week.forEach((teamScore, ranking) => {
        const teamIndex = this.teams.findIndex((team) => team.id === teamScore.teamId)
        if (ranking === 0) {
          this.teams[teamIndex].bowlPoints += 250;
        }
        if (ranking === 1) {
          this.teams[teamIndex].bowlPoints += 180;
        }
        if (ranking === 2) {
          this.teams[teamIndex].bowlPoints += 150;
        }
        if (ranking === 3) {
          this.teams[teamIndex].bowlPoints += 120;
        }
        if (ranking === 4) {
          this.teams[teamIndex].bowlPoints += 100;
        }
        if (ranking === 5) {
          this.teams[teamIndex].bowlPoints += 80;
        }
        if (ranking === 6) {
          this.teams[teamIndex].bowlPoints += 60;
        }
        if (ranking === 7) {
          this.teams[teamIndex].bowlPoints += 40;
        }
        if (ranking === 8) {
          this.teams[teamIndex].bowlPoints += 20;
        }
        if (ranking === 9) {
          this.teams[teamIndex].bowlPoints += 10;
        }
      })
    })
  }
}