<template>
  <div class="">
    <div class="gronps">
      <div class="gronp" v-for="(gronp, index) of gronps" :key="index">
        <div
          class="card"
          v-for="(card, i) of gronp"
          :key="i"
          :style="{
            top: 2 * i + 'px',
            left: -30 + 'px',
            zIndex: i,
          }"
          @click.stop="cardEvent(card, i, gronp)"
        >
          <img :src="card.img" alt="" />
        </div>
      </div>
    </div>

    <div class="slots">
      <div
        class="gronp"
        v-for="(slot, key) of slots"
        :key="key"
        style="margin: 10px"
      >
        <div class="card" style="margin: 0">
          <img v-if="slot" :src="slot.img" alt="" />
        </div>
      </div>
    </div>

    <div>
      <button @click="nextPass">nextPass</button>
    </div>
  </div>
</template>

<script>
import {defineComponent, reactive, ref} from "@vue/runtime-core";

import {getCards} from "./utils";
let slotsCount = 7;
let removeCount = 3;
let gronpCount = 25;
let type = 10;
let count = 3 * 2;
let rate = 1000;
const postion = 29;
const minpostion = 13;
let allCount = 1000 * 1000;
// filter: contrast(0.7);
// 750.900,80,120

let pass = [
  {
    type: 1,
    count: 3,
  },
  {
    type: 6,
    count: 3 * 4,
  },
  {
    type: 9,
    count: 3 * 6,
  },
];

export default defineComponent({
  setup() {
    let passIndex = ref(0);
    let cards = reactive(
      getCards(pass[passIndex.value].type, pass[passIndex.value].count)
    );

    let gronps = reactive(new Array(gronpCount).fill(0).map(() => []));
    for (let i = 0; i < cards.length; i++) {
      gronps[i % gronpCount].push(cards[i]);
    }
    return {
      passIndex,
      reault: 0,
      cards,
      gronps,
      slots: new Array(),
    };
  },
  methods: {
    restart() {
      this.passIndex.value = 0;
      this.reault = 0;
      let cards = getCards(type, count);
      let gronps = new Array(gronpCount).fill(0).map(() => []);
      for (let i = 0; i < cards.length; i++) {
        gronps[i % gronpCount].push(cards[i]);
      }
      this.cards.value = cards;
      this.gronps.value = cards;
    },
    nextPass() {
      this.reault = 0;
      this.passIndex++;
      let cards = getCards(
        pass[this.passIndex].type,
        pass[this.passIndex].count
      );
      let gronps = new Array(gronpCount).fill(0).map(() => []);
      for (let i = 0; i < cards.length; i++) {
        gronps[i % gronpCount].push(cards[i]);
      }
      console.log(cards, gronps);
      this.cards.value = cards;
      this.gronps.value = gronps;
    },
    cardEvent(card, i, gronp) {
      // 判断是否失败
      if (this.slots.length >= slotsCount) {
        if (confirm("失败，重新开始？")) {
          this.restart();
        }
      }
      // 1. 往卡槽里面添加卡片
      let c = gronp.pop();
      // console.log(c, gronp.length);
      this.slots.push(c);
      // console.log(this.slots)

      // 2.检查是否存在3张一样的卡片
      if (this.slots.length >= 3) {
        let myCards = JSON.parse(JSON.stringify(this.slots));
        let tem = {};
        // 如果卡牌等于三张，就删除三张；
        for (let i = 0; i < myCards.length; i++) {
          if (!tem[myCards[i].value]) {
            tem[myCards[i].value] = 0;
          }
          tem[myCards[i].value]++;
          if (tem[myCards[i].value] === removeCount) {
            for (let j = 0; j <= i; j++) {
              if (myCards[j].value === myCards[i].value) {
                myCards[j].value = undefined;
              }
            }
            this.reault += removeCount;
          }
        }
        // 收拢数组
        let temCards = reactive([]);
        for (let i = 0; i < myCards.length; i++) {
          if (myCards[i].value === undefined) {
          } else {
            temCards.push(myCards[i]);
          }
        }
        this.slots = temCards;
      }

      // 3. 判断是否失败
      if (this.slots.length >= slotsCount) {
        setTimeout(() => {
          if (confirm("失败，重新开始？")) {
            this.restart();
          }
        }, 0);
      }
      // 4.判断是否胜利
      if (this.reault === this.cards.length) {
        setTimeout(() => {
          if (confirm("胜利，进入下一关")) {
            this.nextPass();
          }
        }, 0);
      }
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
  height: 120px;
  margin: 30px;
}
.card {
  position: absolute;
  left: 0;
  top: 0;
  /* width: 100%;
  height: 100%; */
  width: 80px;
  height: 120px;
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
