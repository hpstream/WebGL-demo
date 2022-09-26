

import img01 from "../img/boluo.png";
import img02 from "../img/caomei.png";
import img03 from "../img/hamigua.png";
import img04 from "../img/huolongguo.png";
import img05 from "../img/juzi.png";
import img06 from "../img/lizi.png";
import img07 from "../img/ningmeng.png";
import img08 from "../img/pingguo.png";
import img09 from "../img/putao.png";
import img10 from "../img/shengnvguo.png";
import img11 from "../img/taozi.png";
import img12 from "../img/xiangjiao.png";
import img13 from "../img/xigua.png";
import img14 from "../img/yingtao.png";
import img15 from "../img/zao.png";

// 750, 900, 80, 120
let imgs = [
  img01,
  img02,
  img03,
  img04,
  img05,
  img06,
  img07,
  img08,
  img09,
  img10,
  img11,
  img12,
  img13,
  img14,
  img15,
]

export function range(start: number, end: number) {
  return Math.floor(start) + Math.floor(Math.random() * (end - start))
}

// 判断两个举性是否重叠
function isReacOverlap(card1: any, card2: any) {
  let len = 40;
  let left1 = card1.left - len;
  let right1 = card1.left + len;
  let top1 = card1.top - len;
  let bottom1 = card1.top + len;
  let left2 = card2.left - len;
  let right2 = card2.left + len;
  let top2 = card2.top - len;
  let bottom2 = card2.top + len;

  // true 代表重叠
  return !((right1 < left2) || (bottom1 > top2)) ||
    ((right2 < left1) || (bottom2 > top1))
}

let cardSlots = [{
  card: null,
  x: 280,
  y: 300,
  pre: [],
  next: []
}, {
  card: null,
  x: 440,
  y: 300,
  pre: [],
  next: []
},
{
  card: null,
  x: 280,
  y: 420,
  pre: [],
  next: []
},
{
  card: null,
  x: 440,
  y: 420,
  pre: [],
  next: []
}
]

function getCardSlot() {
  let i = 0;
  while (cardSlots.length <= 270) {

    let card = cardSlots[i++];

    if (card.next.length > 2) {
      let newP = {
        card: null,
        x: 0,
        y: 0,
        pre: [],
        next: []
      }
      card.pre.push(newP);
      cardSlots.push(newP)
      continue;
    }
    let count = range(1, 5);
    for (let i = 0; i < count; i++) {
      if (cardSlots.length >= 270) {
        return;
      }
      let newP = {
        card: null,
        x: card.x + range(-40, 41),
        y: card.y + range(-40, 41),
        pre: [card],
        next: []
      }
      card.next.push(newP);
      cardSlots.push(newP)
    }
  }
}
// getCardSlot()
// console.log(cardSlots)

export function getCards(type: number, count: number, rate = 1000): { value: number, img: string }[] {
  let cardMap = {};
  for (let i = 1; i <= type; i++) {
    for (let j = 0; j < count; j++) {
      let p = -1;
      while (!cardMap[p]) {
        p = Math.floor(Math.random() * type * count * rate);
        cardMap[p] = {
          value: i - 1,
          img: imgs[i - 1],
        };
      }
    }
  }
  return Object.values(cardMap);
}