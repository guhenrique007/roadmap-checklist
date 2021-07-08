<template>
  <div class="progress-list row mb-1">
    <div class="progress-div" v-for="(progress, index) in listProgress" :key="index"> 
      <span class="col-sm-3 progress-roadmap-title">{{ adjustRoadmapTitle(progress.roadmap) }}</span>
      <b-progress :max="progress.total" height="2rem" class="progress col-sm-5 pt-1">
        <b-progress-bar :value="progress.completedItems" variant="success">
          <!-- <span><strong>{{ ((progress.completedItems / progress.total) * 100).toFixed(1) }} %</strong></span> -->
          <span class="progress-value"><strong>{{ progress.completedItems }} / {{ progress.total }} </strong></span>
        </b-progress-bar>
      </b-progress>
    </div>
  </div>
</template>

<script lang="ts">
  import {capitalizeFirstLetter} from "../../shared/utils";

  export default {
    name: 'Card',
    props: {
      listProgress: Array
    },
    methods: {
      created: function() {
      },
      adjustRoadmapTitle: function(roadmapTitle) {
        return capitalizeFirstLetter(roadmapTitle)
          .replaceAll('-',' ');
      }
    }
  }
</script>

<style scoped>
  .progress-div{
    display: flex;
    margin-top: 20px;
    justify-content: space-evenly;
  }
  .progress {
    position: relative;
    background-color: rgb(126, 133, 133);
  }
  .progress-value {
    position: absolute;
    left: 50px;
  }
  .progress-roadmap-title{
    text-align: left;
  }
</style>