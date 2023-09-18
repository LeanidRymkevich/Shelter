async function renderPopUp(id){
  const data = await getJSONData();
  const card_info = findCardInfo(id, data);
  const pop_up = generatePopUp(card_info);

  showPopUp(pop_up);  
  popUpHiding(pop_up);
}

async function getJSONData(){
  const path = '../../assets/scripts/pets.json';
  const res = await fetch(path);
  const data = await res.json();
  return data;
}

function generatePopUp(info){
  // creating a pop-up and its main parts
  const pop_up = document.createElement('div');
  pop_up.classList.add('pop-up');

  const pop_up_article = document.createElement('article');
  pop_up_article.classList.add('pop-up__article');
  pop_up.append(pop_up_article);

  const pop_up_content = document.createElement('div');
  const pop_up_button = document.createElement('button');
  pop_up_content.classList.add('pop-up__content');
  pop_up_button.classList.add('pop-up__button');
  pop_up_article.append(pop_up_content);
  pop_up_article.append(pop_up_button);

  // pop-up content filling
  const pop_up_img = document.createElement('div');
  const img = document.createElement('img');
  pop_up_img.classList.add('pop-up__img');
  img.src = info.img;
  img.alt = info.name;
  pop_up_content.append(pop_up_img);
  pop_up_img.append(img);

  const pop_up_description = document.createElement('div');
  pop_up_description.classList.add('pop-up__description');
  pop_up_content.append(pop_up_description);

  // pop-up description filling

  const pop_up_pet_name = document.createElement('p');
  pop_up_pet_name.classList.add('pop-up__pet-name');
  pop_up_pet_name.textContent = info.name;
  pop_up_description.append(pop_up_pet_name);

  const pop_up_pet_type = document.createElement('p');
  pop_up_pet_type.classList.add('pop-up__pet-type');
  pop_up_pet_type.textContent = `${info.type} - ${info.breed}`;
  pop_up_description.append(pop_up_pet_type);

  const pop_up_pet_about = document.createElement('p');
  pop_up_pet_about.classList.add('pop-up__pet-about');
  pop_up_pet_about.textContent = info.description;
  pop_up_description.append(pop_up_pet_about);

  const pop_up_additional = document.createElement('ul');
  pop_up_additional.classList.add('pop-up__additional');
  pop_up_description.append(pop_up_additional);

  const pop_up_pet_age = document.createElement('li');
  pop_up_pet_age.classList.add('pop-up__pet-age');
  pop_up_pet_age.innerHTML = `<span>Age:</span> <span>${info.age}</span>`;
  pop_up_additional.append(pop_up_pet_age);

  const pop_up_pet_inoculations = document.createElement('li');
  pop_up_pet_inoculations.classList.add('pop-up__pet-inoculations');
  pop_up_pet_inoculations.innerHTML = `<span>Inoculations:</span> <span>${stringFromArrayBuilder(info.inoculations)}</span>`;
  pop_up_additional.append(pop_up_pet_inoculations);

  const pop_up_pet_diseases = document.createElement('li');
  pop_up_pet_diseases.classList.add('pop-up__pet-diseases');
  pop_up_pet_diseases.innerHTML = `<span>Diseases:</span> <span>${stringFromArrayBuilder(info.diseases)}</span>`;
  pop_up_additional.append(pop_up_pet_diseases);

  const pop_up_pet_parasites = document.createElement('li');
  pop_up_pet_parasites.classList.add('pop-up__pet-parasites');
  pop_up_pet_parasites.innerHTML = `<span>Parasites:</span> <span>${stringFromArrayBuilder(info.parasites)}</span>`;
  pop_up_additional.append(pop_up_pet_parasites);

  return pop_up;
}

function stringFromArrayBuilder(array){
  let result = '';
  for(let i = 0; i < array.length; i++){
    if(i === array.length - 1){
      result += `${array[i]}.`
    }else {
      result += `${array[i]}, `
    }
  }
  return result;
}

function findCardInfo(id, data){
  return data.find(item => +item.id === +id);
}

function popUpBehavior(wrapper){
  wrapper.addEventListener('click', (event) => {
    let card;
    let id;
    if(!(card = event.target.closest('.card'))){
      return;
    }
    id = card.dataset.cardId;
    renderPopUp(id);
  })
}

function popUpHiding(pop_up){
  pop_up.addEventListener('click', (event)=>{
    const target = event.target;
    if(target === event.currentTarget || target.closest('.pop-up__button')){
      hidePopUp(pop_up);
    }
  })
}

function showPopUp(pop_up) {
  document.body.append(pop_up);
  document.body.classList.add('_no-scroll');
}

function hidePopUp(pop_up) {
  pop_up.remove();
  document.body.classList.remove('_no-scroll');
}

// the pop-up behavior _____________________________________

const our_friends_slider = document.querySelector('.our-friends__slider');

popUpBehavior(our_friends_slider);

export {findCardInfo, getJSONData};