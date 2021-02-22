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

let secondIteration = [];
let arrLeft = [];
let arrMiddle = [];
let arrRight = [];
function renderImg() {


    for (let i = 0; i < 3; i++) {
        arrLeft.push(randomNumber(0, BusMall.all.length - 1));
        for ()
    }

    for (let i = 0; i < 5; i++) {
        arrLeft.push(randomNumber(0, BusMall.all.length - 1));

    }
    console.log('Left', arrLeft);

    for (let j = 0; j < 5; j++) {
        arrMiddle.push(randomNumber(0, BusMall.all.length - 1));
        for (let i = 0; i < 5; i++) {
            if (arrMiddle[i] === arrLeft[j]) {
                arrMiddle.pop();
                arrMiddle.push(randomNumber(0, BusMall.all.length - 1));
            }
        }
    }
    console.log('Middle', arrMiddle);

    for (let j = 0; j < 5; j++) {
        arrRight.push(randomNumber(0, BusMall.all.length - 1));
        for (let i = 0; i < 5; i++) {
            if (arrRight[i] === arrLeft[j] && arrRight[i] === arrMiddle[j]) {
                arrMiddle.pop();
                arrMiddle.push(randomNumber(0, BusMall.all.length - 1));
            }
        }
    }

    console.log('Right', arrRight);

    const leftIndex = randomNumber(0, BusMall.all.length - 1);

    leftImage.src = BusMall.all[leftIndex].path;
    leftImage.title = BusMall.all[leftIndex].name;
    leftImage.alt = BusMall.all[leftIndex].name;
    renderedImgs.push(leftImage.alt);


    const middleIndex = randomNumber(0, BusMall.all.length - 1);

    middleImage.src = BusMall.all[middleIndex].path;
    middleImage.title = BusMall.all[middleIndex].name;
    middleImage.alt = BusMall.all[middleIndex].name;
    renderedImgs.push(middleImage.alt);

    const rightIndex = randomNumber(0, BusMall.all.length - 1);

    rightImage.src = BusMall.all[rightIndex].path;
    rightImage.title = BusMall.all[rightIndex].name;
    rightImage.alt = BusMall.all[rightIndex].name;
    renderedImgs.push(rightImage.alt);

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


    console.log('Before Delete renderedImgs; ', renderedImgs);
    secondIteration = renderedImgs;
    console.log('After add rendered to seconIreration ', secondIteration);
    renderedImgs = new Array();
    console.log('After Delete renderedImg', renderedImgs);


    renderImg();
    renderedImgs.push(leftImage.alt);
    renderedImgs.push(middleImage.alt);
    renderedImgs.push(rightImage.alt);
    console.log('after Push', renderedImgs);

    for (let i = 0; i < renderedImgs.length; i++) {
        for (let j = 0; j < secondIteration.length; j++) {
            if (secondIteration[j] === renderedImgs[i]) {
                renderImg;
            }
        }
    }
    if (event.target.id !== 'right-side') {
        for (let i = 0; i < BusMall.all.length; i++) {
            if (BusMall.all[i].name === event.target.title) {
                BusMall.all[i].votes = BusMall.all[i].votes + 1;

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
    renderedImgs = new Array();
    console.log('renderedImgs', renderedImgs);




}








