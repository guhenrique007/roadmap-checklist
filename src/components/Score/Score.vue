<template>
  <div class="score">
    <h5>Your Roadmaps:</h5>
    <ProgressBarList :listProgress="progressList" />
  </div>
</template>

<script>
import backEndRoadmap from "../../assets/jsons/back-end.json";
import frontEndRoadmap from "../../assets/jsons/front-end.json";
import devOpsRoadmap from "../../assets/jsons/dev-ops.json";
import designAndArchRoadmap from "../../assets/jsons/design-and-arch.json";

import ProgressBarList from "./ProgressBarList.vue";

const roadmapList = {
  "back-end": backEndRoadmap,
  "front-end": frontEndRoadmap,
  "dev-ops": devOpsRoadmap,
  "design-and-arch": designAndArchRoadmap,
};

export default {
  name: "Score",
  components: {
    ProgressBarList,
  },
  methods: {
    listRoadmaps: function () {
      const progressList = [];
      for (const roadmap in roadmapList) {
        const { progress, total, completedItems } = this.calculateProgress(roadmap);
        if (completedItems > 0) {
          progressList.push({
            completedItems,
            roadmap,
            progress,
            total,
          });
        }
      }
      this.progressList = progressList;
    },
    calculateProgress: function (roadmap) {
      const roadmapObj = JSON.parse(localStorage.getItem(`${roadmap}-roadmap`));
      let total = 0;
      let completedItems = 0;

      for (const section of roadmapObj) {
        if (!section.items) continue;
        for (const item of section.items) {
          if (item.done) completedItems += 1;

          if(item.items) {
            total -=1;
            item.items.map(subitem => {
              total += 1;
              if(subitem.done) {
                completedItems += 1;
              }
            })
          }
        }
        total += section.items.length;
      }
      return {
        completedItems,
        progress: completedItems / total,
        total,
      };
    },
  },
  created: function () {
    this.listRoadmaps();
  },
};
</script>

<style scoped>
.score {
  background-color: rgb(226 236 236);
  position: fixed;
  right: 100px;
  top: 100px;
  width: 320px;
  padding: 30px 10px 0px;
}

h5 {
  margin-bottom: 15px;
}

@media only screen and (max-width: 1650px) {
  .score {
    right: 0px;
    top: 0px;
  }
}
</style>