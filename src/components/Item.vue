<template>
  <div class="item" :class="item.items ? 'has-sub-items' : ''">
    <div style="display: flex">
      <input
        type="checkbox"
        name="option"
        :checked="item.done"
        @change="saveChoice($event)"
        v-if="!item.items"
      />
      <div class="text-container">
        <span v-html="item.title" class="item-text"></span><br />
        <span class="item-description">{{ item.description }}</span>
      </div>
      <span v-if="item.priority === 'optional'" class="priority">
        <i>(Optional)</i>
      </span>
      <span
        class="external-links"
        v-if="item.links"
        v-on:click="openLinks(item.links)"
      >
      <LinkIcon/>
      </span>
    </div>
    <div class="sub-items" v-if="item.items">
      <div
        v-for="(subitem, index) in item.items"
        :key="index"
        class="sub-item-container"
      >
        <input
          type="checkbox"
          name="option"
          :checked="subitem.done"
          @change="saveSubChoice($event, item.title)"
        />
        <div class="sub-text-container">
          <span v-html="subitem.title" class="item-text"></span>
          <span class="item-description">{{ subitem.description }}</span>
          <span v-if="subitem.priority === 'optional'" class="priority">
            <i>(Optional)</i>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const type = urlParams.get("type");

import LinkIcon from './Buttons/LinkIcon.vue';

export default {
  name: "Item",
  components: {
    LinkIcon,
  },
  props: {
    item: Object,
    titleCard: String,
  },
  methods: {
    saveChoice: function (e) {
      const itemChecked = e.target;
      const itemContent = itemChecked.nextSibling.firstElementChild.innerHTML;
      let myjson = JSON.parse(localStorage.getItem(`${type}-roadmap`));
      let progress = JSON.parse(localStorage.getItem(`${type}-progress`));
      const idItem = e.target.closest(".item").id;

      if (itemChecked.checked) {
        progress.push(idItem);
      } else {
        progress = progress.filter((item) => item !== idItem);
      }
      localStorage.setItem(`${type}-progress`, JSON.stringify(progress));

      myjson.map((section) => {
        if (section.name === this.titleCard) {
          section.items.some((item) => {
            if (item.title == itemContent) {
              item.done = itemChecked.checked;
              return item;
            }
          });
        }
      });

      localStorage.setItem(`${type}-roadmap`, JSON.stringify(myjson));
    },
    saveSubChoice: function (e, parentTitle) {
      const itemChecked = e.target;
      const itemContent = itemChecked.nextSibling.firstElementChild.innerHTML;
      let myjson = JSON.parse(localStorage.getItem(`${type}-roadmap`));

      myjson.map((section) => {
        if (section.name === this.titleCard) {
          section.items.some((item) => {
            if (item.title == parentTitle) {
              item.items.some((subitem) => {
                if (subitem.title == itemContent) {
                  subitem.done = itemChecked.checked;
                  return subitem;
                }
              });
            }
          });
        }
      });

      localStorage.setItem(`${type}-roadmap`, JSON.stringify(myjson));
    },
    openLinks: function (links) {
      console.log(links);
      links.map((link) => {
        window.open(link, "_blank").focus();
      });
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Assistant&family=Yanone+Kaffeesatz&display=swap");

.item {
  display: flex;
  flex-direction: column;
  background-color: #ffe599;
  padding: 10px;
  margin-bottom: 10px;
  position: relative;
  box-shadow: 0 10px 10px rgb(126 126 126 / 10%);
}

.item.has-sub-items {
  padding: 20px;
  margin-bottom: 30px;
}

.item:not(.has-sub-items):hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

.sub-items {
  display: flex;
  flex-direction: column;
}

.sub-item-container:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

.sub-item-container {
  padding: 10px;
  margin-left: 40px;
  margin-bottom: 10px;
  background-color: #e8c86b;
  display: flex;
  box-shadow: 0 10px 10px rgb(126 126 126 / 10%);
}

.text-container {
  display: flex;
  flex-direction: column;
}

.item-text {
  text-align: left;
  font-family: "Assistant", sans-serif;
}

.item-description {
  font-style: italic;
  font-weight: bold;
  max-width: 500px;
  opacity: 0.5;
}

input {
  margin-right: 20px;
}

.priority {
  margin-left: 50px;
}

.external-links {
  position: absolute;
  right: 10px;
  cursor: pointer;
}
</style>
