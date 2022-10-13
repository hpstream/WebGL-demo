<template>
  <div class="">
    <!-- <div class="gronps">
      <div class="gronp" v-for="(gronp, index) of gronps" :key="index">
        <div
          class="card"
          v-for="(card, i) of gronp"
          :key="i"
          :style="{
            top: card.top + 'px',
            left: card.left + 'px',
            zIndex: i,
          }"
          @click.stop="cardEvent(card, i, gronp)"
        >
          <img :src="card.img" alt="" />
        </div>
      </div>
    </div> -->

    <div class="gronps">
      <div
        class="card"
        v-for="(card, index) of cards"
        :key="index"
        @click.stop="card1Event(card, i, gronp)"
      >
        <img :src="card.img" alt="" />
      </div>
    </div>

    <div class="slots">
      <div
        class="gronp"
        v-for="(slot, key) of slots"
        :key="key"
        style="margin: 10px"
      >
        <div class="card">
          <img v-if="slot" :src="slot.img" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {defineComponent, reactive} from "@vue/runtime-core";

import {getCards} from "./utils";
let slotsCount = 7;
let removeCount = 3;
let gronpCount = 25;
let type = 4;
let count = 3 * 2;
let rate = 1000;
const postion = 29;
const minpostion = 13;
let allCount = 1000 * 1000;
// filter: contrast(0.7);
// 750.900,80,120

export default defineComponent({
  setup() {
    let cards = reactive(getCards(type, count));

    let gronps = reactive(new Array(gronpCount).fill(0).map(() => []));
    for (let i = 0; i < cards.length; i++) {
      gronps[i % gronpCount].push(cards[i]);
    }
    return {
      reault: 0,
      cards,
      gronps,
      slots: new Array(),
    };
  },
  methods: {
    card1Event(card) {},
    dragEvent(e, card) {
      // console.log(e, card);
    },
  },
});
</script>

<style scoped>
.slots {
  width: 740px;
  margin: 0 auto;
  margin-top: 40px;
  height: 142px;
  border-radius: 20px;
  background-color: #fefbfb;
  display: flex;
  border: 1px solid #dbdbdb;
}

.gronps {
  display: flex;
  flex-wrap: wrap;
  /* width: 540px; */

  min-height: 940px;
  align-items: center;
  justify-content: center;
  position: relative;
}
.gronp {
  position: relative;
  width: 80px;
  height: 80px;
  margin: 30px;
}
.card {
  position: absolute;
  left: 0;
  top: 0;
  /* width: 100%;
  height: 100%; */
  width: 80px;
  height: 80px;
  margin: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 5px;
  background: whitesmoke;
  border-radius: 5px;
  border: 1px solid #dbdbdb;
}
img {
  width: 100%;
}
</style>
