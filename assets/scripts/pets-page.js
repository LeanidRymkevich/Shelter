import { Card } from "./Card.js";
import { randomNumberSet, randomSetExceptOf } from "./add_functions.js";
import { findCardInfo, getJSONData } from "./pop-up.js";

const slider_container = document.querySelector('.slider__container');
const slider = document.querySelector('.slider__pages');
const card = document.querySelector('.card');

const button_prev = document.querySelector('.slider__button_prev');
const button_next = document.querySelector('.slider__button_next');
const button_start = document.querySelector('.slider__button_start');
const button_end = document.querySelector('.slider__button_end');
const button_numbered = document.querySelector('.slider__button_numbered');

// pagination logic section______________

let pages_num = getPagesNum();
let current_page = 1;

function getPagesNum(){
  return Math.floor(slider.offsetWidth / slider_container.offsetWidth);
}

function getLeftPropInPercent() {
  const left_px = +getComputedStyle(slider).left.slice(0, -2); 
  const left_percent = Math.ceil(left_px / slider_container.offsetWidth) * 100;
  return left_percent;
}

function btnNextHandler() {
  const left = getLeftPropInPercent();
  const shift = left - 100;
  current_page += 1;

  if(Math.abs(shift) === 100 * (pages_num - 1)){
    button_next.classList.add('slider__button_inactive');
    button_end.classList.add('slider__button_inactive');
  }
  button_prev.classList.remove('slider__button_inactive');
  button_start.classList.remove('slider__button_inactive');
  button_numbered.textContent = `${current_page}`;

  slider.style.left = `${shift}%`;
}

function btnPrevHandler() {
  const left = getLeftPropInPercent();
  const shift = left + 100;
  current_page -= 1;

  if(Math.abs(shift) === 0){
    button_prev.classList.add('slider__button_inactive');
    button_start.classList.add('slider__button_inactive');
  }
  button_next.classList.remove('slider__button_inactive');
  button_end.classList.remove('slider__button_inactive');
  button_numbered.textContent = `${current_page}`;

  slider.style.left = `${shift}%`;
}

function btnEndHandler() {
  const end = slider.offsetWidth;
  const visible_width = slider_container.offsetWidth;
  current_page = pages_num;
  
  button_next.classList.add('slider__button_inactive');
  button_end.classList.add('slider__button_inactive');
  button_prev.classList.remove('slider__button_inactive');
  button_start.classList.remove('slider__button_inactive');
  button_numbered.textContent = `${current_page}`;

  slider.style.left = `${visible_width-end}px`;
}

function btnStartHandler() {
  current_page = 1;

  button_prev.classList.add('slider__button_inactive');
  button_start.classList.add('slider__button_inactive');
  button_next.classList.remove('slider__button_inactive');
  button_end.classList.remove('slider__button_inactive');
  button_numbered.textContent = current_page;

  slider.style.left = `0px`;
}

button_next.addEventListener('click', btnNextHandler);
button_prev.addEventListener('click', btnPrevHandler);
button_end.addEventListener('click', btnEndHandler);
button_start.addEventListener('click', btnStartHandler);

slider.addEventListener('transitionstart', () => {
  button_next.removeEventListener('click', btnNextHandler);
  button_prev.removeEventListener('click', btnPrevHandler);
  button_end.removeEventListener('click', btnEndHandler);
  button_start.removeEventListener('click', btnStartHandler);
})

slider.addEventListener('transitionend', () => {
  button_next.addEventListener('click', btnNextHandler);
  button_prev.addEventListener('click', btnPrevHandler);
  button_end.addEventListener('click', btnEndHandler);
  button_start.addEventListener('click', btnStartHandler);
})

window.addEventListener('resize', () => {
  pages_num = getPagesNum();
  btnStartHandler();
})

// start card rendering _____________

const card_num = slider.querySelectorAll('.card').length;
const card_num_on_page = card_num / (slider.offsetWidth / slider_container.offsetWidth);
const page_col_num = Math.floor(slider.offsetWidth / card.offsetWidth / pages_num);
const page_row_num = card_num_on_page / page_col_num;
const pages_id_array = [];
const render_id_array = [];

let ids;

for(let i = 1; i <= pages_num; i++){
  ids = randomNumberSet(1, 8, card_num_on_page);
  pages_id_array.push(ids);
}

for(let i = 0; i < page_row_num; i++){
  for(let j = 0; j < pages_num; j++){
    render_id_array.push(...pages_id_array[j].slice(i * page_col_num, (i + 1) * page_col_num));
  }
}

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

renderCards(render_id_array, slider);