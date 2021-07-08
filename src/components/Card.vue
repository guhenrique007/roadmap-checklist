<template>
  <div class="card">
    <h1 v-html="step.name" class="title-section"></h1>
    <p class="description-section">{{ step.description }}</p>
    <div id="itemList" v-for="(item, index) in listItems" :key="index">
      <Item :item="item" :titleCard="step.name" :id="item.id" />
    </div>
  </div>
</template>

<script>
import Item from "./Item.vue";

export default {
  name: "Card",
  components: {
    Item,
  },
  props: {
    //title: String,
    step: Object,
    listItems: Array,
  },
  created: function () {},
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Yanone+Kaffeesatz&display=swap');

.card {
  background-color: #ffff00;
  border: 2px solid;
  padding: 50px;
}

.title-section {
  width: 600px;
  font-family: 'Yanone Kaffeesatz', sans-serif;
}

.description-section {
  width: 600px;
}
</style>
