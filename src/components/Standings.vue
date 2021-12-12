<template>
  <div>
    <ul>
      <li v-for="team in standings" :key="team.id">
        Team: {{getTeamName(team.id)}}, Wins: {{team.wins}}, Losses: {{team.losses}}
      </li>
    </ul>

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

<style lang="scss" scoped>

</style>