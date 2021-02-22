'use strict';
const imgsName = [
    'bag.jpg',
    'banana.jpg',
    'bathroom.jpg',
    'boots.jpg',
    'breakfast.jpg',
    'bubblegum.jpg',
    'chair.jpg',
    'cthulhu.jpg',
    'dog-duck.jpg',
    'dragon.jpg',
    'pen.jpg',
    'pet-sweep.jpg',
    'scissors.jpg',
    'shark.jpg',
    'tauntaun.jpg',
    'unicorn.jpg',
    'water-can.jpg',
    'wine-glass.jpg',
    'usb.gif',
    'sweep.png'

];


const leftImage = document.getElementById('left-image');
const rightImage = document.getElementById('right-image');
const middleImage = document.getElementById('middle-image');


function BusMall(imgsName) {
    this.name = imgsName;
    this.path = `./img/${imgsName}`;
    this.votes = 0;
    this.views = 0;
    BusMall.all.push(this);
}
BusMall.all = [];
for (let i = 0; i < imgsName.length; i++) {
    new BusMall(imgsName[i]);
}


let renderedImgs = [];


function renderImg() {

    renderedImgs = noReeat();
    console.log('renderedImgs', renderedImgs);

    leftImage.src = BusMall.all[renderedImgs[0]].path;
    leftImage.title = BusMall.all[renderedImgs[0]].name;
    leftImage.alt = BusMall.all[renderedImgs[0]].name;
    renderedImgs.shift();
    renderedImgs.push(leftImage.alt);

    middleImage.src = BusMall.all[renderedImgs[0]].path;
    middleImage.title = BusMall.all[renderedImgs[0]].name;
    middleImage.alt = BusMall.all[renderedImgs[0]].name;
    renderedImgs.shift();
    renderedImgs.push(middleImage.alt);

    rightImage.src = BusMall.all[renderedImgs[0]].path;
    rightImage.title = BusMall.all[renderedImgs[0]].name;
    rightImage.alt = BusMall.all[renderedImgs[0]].name;
    renderedImgs.shift();
    renderedImgs.push(rightImage.alt);

    console.log(renderedImgs);

    for (let i = 0; i < BusMall.all.length; i++) {
        for (let j = 0; j < renderedImgs.length; j++) {

            if (BusMall.all[i].name === renderedImgs[j]) {
                BusMall.all[i].views = BusMall.all[i].views + 1;
            }
        }
    }

}

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
renderImg();



function renderResults() {
    const results = document.getElementById('left-side');
    const ulEl = document.createElement('ol');
    results.appendChild(ulEl);
    for (let i = 0; i < BusMall.all.length; i++) {
        const liEl = document.createElement('li');
        ulEl.appendChild(liEl);
        liEl.textContent = ` ${imgsName[i].replace('.jpg', ' ').replace('.png', ' ').replace('gif', ' ')} had ${BusMall.all[i].votes} vots, and was seen ${BusMall.all[i].views}  times`;

    }
}


const imagesSection = document.getElementById('right-side');

imagesSection.addEventListener('click', handleClick);

let x = 1;
let attempts = 5;

function handleClick(event) {

    if (event.target.id !== 'right-side') {
        for (let i = 0; i < BusMall.all.length; i++) {
            if (BusMall.all[i].name === event.target.title) {
                BusMall.all[i].votes = BusMall.all[i].votes + 1;
                renderImg();
            }
        }
        event.preventDefault();

    }

    if (x !== attempts) {
        x++;
    } else {
        imagesSection.removeEventListener('click', handleClick);
        renderResults();
    }

}



function noReeat() {
    let arrLeft = [];
    for (let i = 0; i < 3; i++) {
        arrLeft.push(randomNumber(0, BusMall.all.length - 1));
    }

    let i = 0;
    while (i < 9) {
        if (arrLeft[0] === arrLeft[1]) {
            arrLeft.shift();
            arrLeft.unshift(randomNumber(0, BusMall.all.length - 1));
        } if (arrLeft[0] === arrLeft[2]) {
            arrLeft.pop();
            arrLeft.push(randomNumber(0, BusMall.all.length - 1));
        } if (arrLeft[1] === arrLeft[0]) {
            arrLeft.shift();
            arrLeft.unshift(randomNumber(0, BusMall.all.length - 1));
        } if (arrLeft[1] === arrLeft[2]) {
            arrLeft.pop();
            arrLeft.push(randomNumber(0, BusMall.all.length - 1));
        }
        i++;
    }
    return arrLeft;
}



