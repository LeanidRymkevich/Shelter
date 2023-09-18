import { Card } from "./Card.js";
import { randomNumberSet, randomSetExceptOf } from "./add_functions.js";
import { findCardInfo, getJSONData } from "./pop-up.js";

// hot-fix slider rotation direction, i.e. that the button's name don't match the variable name
const button_next = document.querySelector('.slider__button_prev');
const button_prev = document.querySelector('.slider__button_next');
const slider = document.querySelector('.slider__cards');

const bundle_left = document.querySelector('[data-bundle=left]');
const bundle_center = document.querySelector('[data-bundle=center]');
const bundle_right = document.querySelector('[data-bundle=right]');

const start_card_set = randomNumberSet(1, 8, 3);
let current_set = start_card_set;
let isBeginning = true;

// card rendering logic + start rendering________

async function renderCards(cards_id, where){
  where.innerHTML = '';

  let card_info;
  let card;
  let generator;
  const data = await getJSONData();

  for(let id of cards_id){
    card_info = findCardInfo(id, data);
    generator = new Card(card_info);
    card = generator.generateCard();
    where.append(card);
  }
}

renderCards(start_card_set, bundle_center);

// slider logic_______________________

function showPrev() {
  slider.classList.add('show-previous');
}

function showNext() {
  slider.classList.add('show-next');
}

function prevLogic(){
  const new_set = randomSetExceptOf(current_set, 1, 8);
  current_set = new_set;
  let previousHTML = bundle_center.innerHTML;
  bundle_center.innerHTML = bundle_right.innerHTML;
  bundle_left.innerHTML = previousHTML;
  renderCards(new_set, bundle_right);
}

function nextLogic(){
  const new_set = randomSetExceptOf(current_set, 1, 8);
  current_set = new_set;
  let previousHTML = bundle_center.innerHTML;
  bundle_center.innerHTML = bundle_left.innerHTML;
  bundle_right.innerHTML = previousHTML;
  renderCards(new_set, bundle_left);
}

button_prev.addEventListener('click', showPrev);
button_next.addEventListener('click', showNext);

// prevent button events when an animation has started
slider.addEventListener('animationstart', (event) => {
  if(isBeginning){
    const new_set = randomSetExceptOf(current_set, 1, 8);
    current_set = new_set;
    isBeginning = false;

    if(event.animationName === 'previous'){
      renderCards(new_set, bundle_right);
    } else{
      renderCards(new_set, bundle_left);
    }
  }
  
  button_prev.removeEventListener('click', showPrev);
  button_next.removeEventListener('click', showNext);
})

// return button events when an animation has ended
slider.addEventListener('animationend', (event) => {

  if(event.animationName === 'previous'){
    slider.classList.remove('show-previous');
    prevLogic()
  } else {
    slider.classList.remove('show-next');
    nextLogic();
  }

  button_prev.addEventListener('click', showPrev);
  button_next.addEventListener('click', showNext);
})