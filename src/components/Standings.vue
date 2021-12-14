<template>
  <h2>Standings</h2>
  <div id="standings-table">
    <div class="row header">
      <div class="team-name heading">Team</div>
      <div class="wins heading">Wins</div>
      <div class="losses heading">Losses</div> 
      <div class="bowl-points heading">Bowl Points</div>  
    </div>
    <div v-for="team in standings" class="row" :key="team.id">
      <div class="team-name">{{team.name}}</div>
      <div class="wins">{{team.records.overall.wins}}</div>
      <div class="losses">{{team.records.overall.losses}}</div>
      <div class="bowl-points">{{Math.round(team.bowlPoints)}}</div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';

  export default {
    name: 'Standings',
    computed: {
      standings() {
        return _.orderBy(this.$store.getters.teams, 'records.overall.wins', 'desc');
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
  .header {
    font-weight: 700;
    background: none;
    display: flex;
    flex-flow: column no-wrap;
  }
</style>