<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <Score />
    <h1>DEV ROADMAP</h1>
    <div id="link-roadmap-type">
      <a href="?type=back-end">Back End</a>
      <a href="?type=front-end">Front End</a>
      <a href="?type=dev-ops">Dev Ops</a>
      <a href="?type=design-and-arch">Design & Architecture</a>
    </div>
    <div class="roadmap" v-for="(step, index) in roadmap" :key="index">
      <Card :step="step" :listItems="step.items" />
      <div class="line"></div>
    </div>
  </div>
</template>

<script>
  import Card from './components/Card.vue'
  import Score from './components/Score/Score.vue'

  import backEndRoadmap from './assets/jsons/back-end.json'
  import frontEndRoadmap from './assets/jsons/front-end.json'
  import devOpsRoadmap from './assets/jsons/dev-ops.json'
  import designAndArchRoadmap from './assets/jsons/design-and-arch.json'
  

  const roadmapList = {
    'back-end': backEndRoadmap,
    'front-end': frontEndRoadmap,
    'dev-ops': devOpsRoadmap,
    'design-and-arch': designAndArchRoadmap
  }
  console.log(roadmapList);

  let roadmapType;
  let roadmap;

  export default {
    name: 'App',
    data() {
      return {
        roadmap,
        roadmapType
      }
    },
    components: {
      Card,
        Score
    },
    methods: {
      selectRoadmapType: function () {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const type = urlParams.get('type');

        if(!type) return;
        const roadmapStorage = localStorage.getItem(`${type}-roadmap`);

        this.roadmap = JSON.parse(roadmapStorage);
        this.roadmapType = type;
      },
      setRoadmapsToStorage: function () {
        for(const roadmap of Object.keys(roadmapList)) {
          const roadmapStorage = localStorage.getItem(`${roadmap}-roadmap`);
          if(!roadmapStorage) {
            localStorage.setItem(`${roadmap}-roadmap`, JSON.stringify(roadmapList[roadmap]));
          }
        }
      },
      mergeRoadmaps: function (oldRoadmap, newRoadmap) {
        console.log(oldRoadmap, newRoadmap)
        //check if 

        // newRoadmap.map((item, i) => {

        // });
      }
    },
    created: function() {
      this.setRoadmapsToStorage();
      this.selectRoadmapType();
    },
  }
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  #link-roadmap-type {
    margin: 20px 0px;
  }

  #link-roadmap-type a{
    margin: 20px;  
  }

  .roadmap {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 0 100;
  }


  .line {
    width: 1px;
    height: 40px;
    background-color: black;
  }
</style>
