<template>
  <div id="playoffs">
    <h2>Playoffs</h2>
    <div class="bracket">
      <div class="round">
        <div class="matchup">
          <div class="team">
            {{standings[0].name}}
          </div>
          vs.
          <div class="team">
            BYE
          </div>
        </div>
        <div class="matchup">
          <div class="team">
            {{standings[6].name}}
          </div>
          vs.
          <div class="team">
            {{standings[3].name}}
          </div>
        </div>
        <div class="matchup">
          <div class="team">
            {{standings[4].name}}
          </div>
          vs.
          <div class="team">
            {{standings[5].name}}
          </div>
        </div>
        <div class="matchup">
          <div class="team">
            BYE
          </div>
          vs.
          <div class="team">
            {{standings[1].name}}
          </div>
        </div>
      </div>
      <div class="round">
        <div class="matchup">
          <div class="team">
            {{standings[0].name}}
          </div>
          vs.
          <div class="team">
            Winner of Previous Round
          </div>
        </div>
        <div class="matchup">
          <div class="team">
            Winner of Previous Round
          </div>
          vs.
          <div class="team">
            {{standings[1].name}}
          </div>
        </div>
      </div>
      <div class="round">
        <div class="matchup">
          <div class="team">
            Winner of Previous Round
          </div>
          vs.
          <div class="team">
            Winner of Previous Round
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
  export default {
    name: 'Playoffs',
    computed: {
      standings() {
        return _.orderBy(this.$store.getters.teams, 'records.overall.wins', 'desc');
      }
    },
  }
</script>

<style>
.bracket {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  color:#EDEBEB;
  border: 3px solid #2c3e50;
  border-radius: .5rem;
  margin: 10px;
  background: #2c3e50;
  padding: 5px;
}
.round {
  display: flex;
  flex-flow: column nowrap;
}
.matchup {
 border-radius: .5rem;
 margin: 10px;
 background: #2c3e50;
 padding: 5px;
}
.team {
  font-weight: 200;
  background: #990000;
  border: 1px solid #EDEBEB;;
  border-radius: .5rem;
}
</style>