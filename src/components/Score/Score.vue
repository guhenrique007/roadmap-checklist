<template>
  <div class="score">
    <div v-for="(progress, index) in progressList" :key="index"> 
      <li>
        <ProgressBarList :listProgress="progressList" />
      </li>
    </div>
  </div>  
</template>

<script>
  import backEndRoadmap from '../../assets/jsons/back-end.json'
  import frontEndRoadmap from '../../assets/jsons/front-end.json'
  import devOpsRoadmap from '../../assets/jsons/dev-ops.json'
  import designAndArchRoadmap from '../../assets/jsons/design-and-arch.json'

  import ProgressBarList from './ProgressBarList.vue';

  const roadmapList = {
    'back-end': backEndRoadmap,
    'front-end': frontEndRoadmap,
    'dev-ops': devOpsRoadmap,
    'design-and-arch': designAndArchRoadmap
  }

  export default {
    name: 'Score',
    components: {
      ProgressBarList
    },
    methods: {
      listRoadmaps: function () {
        const progressList = [];
        for(const roadmap in roadmapList) {
          const progress = this.calculateProgress(roadmap);
          progressList.push({
            roadmap,
            progress,
          })
        }
        this.progressList = progressList;
      },
      calculateProgress: function (roadmap) {
        const roadmapObj = JSON.parse(localStorage.getItem(`${roadmap}-roadmap`));
        let total = 0;
        let completedItems = 0;

        for(const section of roadmapObj){
          for(const item of section.items) {
            if(item.done) completedItems += 1;
          }
          total += section.items.length
        } 
        return completedItems / total;
      }
    },
    created: function() {
      this.listRoadmaps();
    }    
  }
</script>

<style scoped>
  .score {
    width: 300px;
    height: 300px;
    background-color: aqua;
    position: fixed;
    right: 100px;
    top: 100px;
  }
</style>