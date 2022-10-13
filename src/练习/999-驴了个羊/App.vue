<template>
  <div class="">
    <div class="gronps">
      <div class="gronp" v-for="(gronp, index) of myData.gronps" :key="index">
        <div
          class="card"
          v-for="(card, i) of gronp"
          :key="i"
          :style="{
            top: 1 * i + 'px',
            left: 0 + 'px',
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
        v-for="(slot, key) of myData.slots"
        :key="key"
        style="margin: 10px"
      >
        <div class="card" style="margin: 0">
          <img v-if="slot" :src="slot.img" alt="" />
        </div>
      </div>
    </div>

    <div>
      <!-- <button @click="restart">重新开始</button> -->
    </div>
  </div>
</template>

<script setup>
import {defineComponent, reactive, ref} from "@vue/runtime-core";

import {getCards, range} from "./utils";
let slotsCount = 7;
let removeCount = 3;
let gronpCount = 24;
let type = 10;
let count = 3 * 2;
let rate = 1000;
const postion = 29;
const minpostion = 13;
let allCount = 1000 * 10;
// filter: contrast(0.7);
// 750.900,80,120

let pass = [
  {
    type: 5,
    count: 3 * 3,
    gronpCount: 24,
    rate: 0,
    range: [0, 24],
  },
  // {
  //   type: 6,
  //   count: 3 * 4,
  //   gronpCount: 24,
  //   rate: 0,
  //   devide: 1,
  // },
  {
    type: 9,
    count: 3 * 5,
    gronpCount: 24,
    rate: 0,
    range: [0, 24],
  },
  {
    type: 15,
    count: 3 * 6,
    gronpCount: 24,
    rate: 0.6,
    range: [12, 18],
  },
];

let passIndex = ref(0);
let reault = ref(0);

let myData = reactive({
  cards: getCards(pass[passIndex.value].type, pass[passIndex.value].count),
  gronps: new Array(pass[passIndex.value].gronpCount).fill(0).map(() => []),
  slots: [],
});

for (let i = 0; i < myData.cards.length; i++) {
  let cards = myData.cards;
  let s =
    Math.random() > pass[passIndex.value].rate
      ? i
      : range(pass[passIndex.value].range[0], pass[passIndex.value].range[1]);
  myData.gronps[s % pass[passIndex.value].gronpCount].push(myData.cards[i]);
}
function getRate(passIndex) {
  let cards = getCards(pass[passIndex].type, pass[passIndex].count);
  let gronps = new Array(pass[passIndex].gronpCount).fill(0).map(() => []);
  for (let i = 0; i < cards.length; i++) {
    let s =
      Math.random() > pass[passIndex].rate
        ? i
        : range(pass[passIndex].range[0], pass[passIndex].range[1]);
    gronps[s % pass[passIndex].gronpCount].push(cards[i]);
  }

  let map = {};
  let result = 0;
  while (result < cards.length) {
    let has = true;
    for (let i = 0; i < gronps.length; i++) {
      let gronp = gronps[i];
      if (gronp.length == 0) {
        continue;
      } else {
        let card = gronp[gronp.length - 1];
        if (!map[card.value]) {
          map[card.value] = [];
        }
        map[card.value].push(i);
        if (map[card.value].length === 3) {
          for (let i = 0; i < map[card.value].length; i++) {
            gronps[map[card.value][i]].pop();
          }
          map[card.value] = [];
          has = false;
          result += 3;
        }
      }
    }
    if (has) {
      return false;
    }
  }
  return true;
}

// 计算概率;
let failCount = 0;
let starTime = new Date().getTime();
for (let i = 0; i < allCount; i++) {
  if (!getRate(passIndex.value)) {
    failCount++;
  }
}
console.log(
  `时间：${(new Date().getTime() - starTime) / 1000}s,总次数：${
    allCount / 10000
  }万，失败率：${(failCount / allCount) * 100}%,成功率：${
    (1 - failCount / allCount) * 100
  }%`
);

function restart() {
  passIndex.value = 0;
  reault.value = 0;
  let cards = getCards(pass[passIndex.value].type, pass[passIndex.value].count);
  let gronps = new Array(pass[passIndex.value].gronpCount)
    .fill(0)
    .map(() => []);
  for (let i = 0; i < cards.length; i++) {
    let s =
      Math.random() > pass[passIndex.value].rate
        ? i
        : range(pass[passIndex.value].range[0], pass[passIndex.value].range[1]);
    gronps[s % pass[passIndex.value].gronpCount].push(cards[i]);
  }
  myData.cards = cards;
  myData.gronps = gronps;
}
function nextPass() {
  reault.value = 0;
  passIndex.value++;
  let cards = getCards(pass[passIndex.value].type, pass[passIndex.value].count);
  let gronps = new Array(pass[passIndex.value].gronpCount)
    .fill(0)
    .map(() => []);
  for (let i = 0; i < cards.length; i++) {
    let s =
      Math.random() > pass[passIndex.value].rate
        ? i
        : range(pass[passIndex.value].range[0], pass[passIndex.value].range[1]);
    gronps[s % pass[passIndex.value].gronpCount].push(cards[i]);
  }

  myData.cards = cards;
  myData.gronps = gronps;
}
function cardEvent(card, i, gronp) {
  // 判断是否失败
  if (myData.slots.length >= slotsCount) {
    if (confirm("失败，重新开始？")) {
      restart();
    }
  }
  // 1. 往卡槽里面添加卡片
  let c = gronp.pop();
  myData.slots.push(c);

  // 2.检查是否存在3张一样的卡片
  if (myData.slots.length >= 3) {
    let myCards = JSON.parse(JSON.stringify(myData.slots));
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
        reault.value += removeCount;
      }
    }
    // 收拢数组
    let temCards = [];
    for (let i = 0; i < myCards.length; i++) {
      if (myCards[i].value === undefined) {
      } else {
        temCards.push(myCards[i]);
      }
    }
    myData.slots = temCards;
  }

  // 3. 判断是否失败
  if (myData.slots.length >= slotsCount) {
    setTimeout(() => {
      if (confirm("失败，重新开始？")) {
        restart();
      }
    }, 19);
  }
  // 4.判断是否胜利
  if (reault.value === myData.cards.length) {
    if (passIndex.value == pass.length - 1) {
      alert("恭喜通关");
    }
    setTimeout(() => {
      if (confirm("胜利，进入下一关")) {
        nextPass();
      }
    }, 10);
  }
}
</script>

<style scoped>
.slots {
  width: 710px;
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

  /* min-height: 940px; */
  align-items: center;
  justify-content: center;
  position: relative;
}
.gronp {
  position: relative;
  width: 80px;
  height: 80px;
  margin: 30px 20px;
}
.card {
  position: absolute;
  left: 0;
  top: 0;
  /* width: 100%;
  height: 100%; */
  width: 80px;
  height: 80px;
  /* margin: 10px; */
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 5px;
  background: whitesmoke;
  border-radius: 5px;
  border: 0.5px solid #dbdbdb;
}
img {
  width: 100%;
}
</style>
