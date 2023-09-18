export class Card{

  constructor(info){
    this.id = info.id;
    this.img_src = info.img;
    this.name = info.name;
  }

  generateCard() {
    const card = document.createElement('div');
    card.classList.add('slider__card','card');
    card.dataset.cardId = this.id;

    const card_picture = document.createElement('div');
    const img = document.createElement('img');
    card_picture.classList.add('card__picture');
    img.src = this.img_src;
    img.alt = this.name;
    card_picture.append(img);
    card.append(card_picture);

    const card_name = document.createElement('p');
    card_name.classList.add('card__name');
    card_name.textContent = this.name;
    card.append(card_name);

    const card_button = document.createElement('button');
    card_button.classList.add('card__button', 'button','button_bordered');
    card_button.textContent = 'Learn more';
    card.append(card_button);

    return card;
  }
}