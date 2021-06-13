<template>
  <div class="progress-list">
    <!-- <div class="score" v-for="(progress, index) in progressList" :key="index">  -->
      <b-progress :max="max" height="2rem">
        <b-progress-bar :value="value">
          <span>Progress: <strong>{{ value.toFixed(2) }} / {{ max }}</strong></span>
        </b-progress-bar>
      </b-progress>
    <!-- </div> -->
  </div>
</template>

<script lang="ts">
  export default {
    name: 'Card',
    props: {
      listProgress: Array
    },
    data() {
      return {
        value: 33.333333333,
        max: 50
      }
    }
  }
</script>

<style scoped>
  .score {
    width: 300px;
    height: 300px;
    background-color: aqua;
  }
</style>