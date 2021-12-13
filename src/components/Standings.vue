<template>
  <h2>Standings</h2>
  <div id="standings-table">
    <div class="row header">
      <div class="team-name">Team</div>
      <div class="wins">Wins</div>
      <div class="losses">Losses</div>   
    </div>
    <div v-for="team in standings" class="row" :key="team.id">
      <div class="team-name">{{getTeamName(team.id)}}</div>
      <div class="wins">{{team.wins}}</div>
      <div class="losses">{{team.losses}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Standings',
    computed: {
      standings() {
        return this.$store.getters.overallRecords; 
      }
    },
    methods: {
      getTeamName(teamId) {
        let teamInfo = this.$store.state.leagueInfo.teams.find(team => team.id === teamId);
        return `${teamInfo.location} ${teamInfo.nickname}`;
      }
    },
  }
</script>

<style lang="css">
  #standings-table {
    display: flex;
    flex-flow: column nowrap;
    row-gap: .25rem;
    color: #EDEBEB;
    border: 3px solid #2c3e50;
    padding: 2px;
    border-radius: .5rem;
    background: #2c3e50;
  }
  .row {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    background: #990000;
    border-radius: .25rem;
    padding: .5rem;
  }
  .row > div {
    flex-basis: 10%;
  }
  .row > .team-name {
    flex-basis: 50%;
    font-weight: 700;
  }
  .row.header {
    font-weight: 700;
    background: none;
  }
</style>