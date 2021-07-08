<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <Score />
    <h1>DEV ROADMAP</h1>
    <div id="link-roadmap-type">
      <a href="?type=back-end" :style="{ color: setRandomColor() }">Back End</a>
      <a href="?type=front-end" :style="{ color: setRandomColor() }"
        >Front End</a
      >
      <a href="?type=dev-ops" :style="{ color: setRandomColor() }">Dev Ops</a>
      <a href="?type=design-and-arch" :style="{ color: setRandomColor() }"
        >Design & Architecture</a
      >
    </div>
    <div class="roadmap" v-for="(step, index) in roadmap" :key="index">
      <Card :step="step" :listItems="step.items" />
      <div class="line"></div>
    </div>
  </div>
</template>

<script>
import { getItem, save } from "./shared/utils";

import Card from "./components/Card.vue";
import Score from "./components/Score/Score.vue";

import backEndRoadmap from "./assets/jsons/back-end.json";
import frontEndRoadmap from "./assets/jsons/front-end.json";
import devOpsRoadmap from "./assets/jsons/dev-ops.json";
import designAndArchRoadmap from "./assets/jsons/design-and-arch.json";

const roadmapList = {
  "back-end": backEndRoadmap,
  "front-end": frontEndRoadmap,
  "dev-ops": devOpsRoadmap,
  "design-and-arch": designAndArchRoadmap,
};
console.log(roadmapList);

let roadmapType;
let roadmap;
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const type = urlParams.get("type");
const roadmapName = `${type}-roadmap`;

export default {
  name: "App",
  data() {
    return {
      roadmap,
      roadmapType,
    };
  },
  components: {
    Card,
    Score,
  },
  methods: {
    selectRoadmapType: function () {
      if (!type) return;
      const roadmapStorage = getItem(`${type}-roadmap`);

      this.roadmap = JSON.parse(roadmapStorage);
      this.roadmapType = type;
    },
    setRoadmapsToStorage: function () {
      for (const roadmap of Object.keys(roadmapList)) {
        const roadmapStorageKey = `${roadmap}-roadmap`;
        const roadmapStorage = getItem(roadmapStorageKey);
        if (!roadmapStorage) {
          save(roadmapStorageKey, roadmapList[roadmap]);
          save(`${roadmap}-progress`, []);
        }
      }
    },
    checkVersion: function () {
      const newRoadmapVersion = roadmapList[type];
      const roadmapStorage = JSON.parse(getItem(roadmapName));
      if(!roadmapStorage) return;

      if (roadmapStorage[0].version !== roadmapList[type][0].version) {
        save(roadmapName, newRoadmapVersion);
        this.fillRoadmapWithProgress(newRoadmapVersion);
      }
    },
    fillRoadmapWithProgress: function (roadmap) {
      const progress = getItem(`${type}-progress`);
      const latestProgress = JSON.parse(progress);

      const updatedStorage = roadmap.map((section) => {
        if (section.items) {
          section.items.some((item) => {
            item.done = latestProgress.includes(item.id) ? true : false;
            return item;
          });
        }
        return section;
      });

      save(roadmapName, updatedStorage);
    },
    setRandomColor: function () {
      return "#" + (((1 << 24) * Math.random()) | 0).toString(16);
    },
  },

  created: function () {
    this.checkVersion();
    this.setRoadmapsToStorage();
    this.selectRoadmapType();
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Tourney:ital,wght@0,100;0,400;1,600&display=swap");

* {
  padding:0;
  margin:0;
  vertical-align:baseline;
  list-style:none;
  border:0
}

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
  margin: 100px 0px;
}

#link-roadmap-type a {
  font-family: "Tourney", cursive;
  text-decoration: none;
  color: #42a917;
  font-size: 30px;
  font-weight: 600;
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
