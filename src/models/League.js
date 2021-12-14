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
  }
}