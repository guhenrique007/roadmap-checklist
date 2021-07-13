<template>
  <div class="progress-list row mb-1">
    <div class="progress-div" v-for="(progress, index) in listProgress" :key="index"> 
      <span class="col-sm-3 progress-roadmap-title">{{ adjustRoadmapTitle(progress.roadmap) }}</span>
      <b-progress :max="progress.total" class="progress col-sm-5">
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
  .progress-list {
    margin: 0px;
  }
  .progress-div {
    display: flex;
    padding: 10px 0px;
    justify-content: space-evenly;
    background-color: white;
    box-shadow: 0 10px 10px rgb(126 126 126 / 10%);
    margin-bottom: 10px;
  }
  .progress {
    position: relative;
    height: 20px;
    background-color: rgb(161 169 169);
  }
  .progress-value {
    position: absolute;
    left: 50px;
  }
  .progress-roadmap-title{
    text-align: left;
  }
</style>