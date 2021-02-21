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


console.log(leftImage);
console.log(rightImage);
console.log(middleImage);


function BusMall(imgsName) {
    this.name = imgsName;
    this.path = `./img/${imgsName}`;
    this.votes = 0;
    this.views = 0;
    //BusMalls.push(this);
    BusMall.all.push(this);
}
BusMall.all = [];
for (let i = 0; i < imgsName.length; i++) {
    new BusMall(imgsName[i]);
}
// console.table(BusMall.all);

function renderImg() {
    let renderedImgs = [];
    const leftIndex = randomNumber(0, BusMall.all.length - 1);

    leftImage.src = BusMall.all[leftIndex].path;
    leftImage.title = BusMall.all[leftIndex].name;
    leftImage.alt = BusMall.all[leftIndex].name;
    renderedImgs.push(leftImage.alt);

    const rightIndex = randomNumber(0, BusMall.all.length - 1);

    rightImage.src = BusMall.all[rightIndex].path;
    rightImage.title = BusMall.all[rightIndex].name;
    rightImage.alt = BusMall.all[rightIndex].name;
    renderedImgs.push(rightImage.alt);

    const middleIndex = randomNumber(0, BusMall.all.length - 1);

    middleImage.src = BusMall.all[middleIndex].path;
    middleImage.title = BusMall.all[middleIndex].name;
    middleImage.alt = BusMall.all[middleIndex].name;
    renderedImgs.push(middleImage.alt);

    for (let i = 0; i < BusMall.all.length; i++) {
        for (let j = 0; j < renderedImgs.length; j++) {
            console.log(renderedImgs[j]);
            console.log(BusMall.all[i].name);
            if (BusMall.all[i].name === renderedImgs[j]) {
                BusMall.all[i].views = BusMall.all[i].views + 1;
            }
        }
    }
    console.log(BusMall.all);
    console.log(renderedImgs);
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

let x = 0;
let attempts = 5;
function handleClick(event) {

    if (x === attempts - 1) {
        imagesSection.removeEventListener('click', handleClick);
        renderResults();
    }
    if (event.returnValue === true) {
        x++;
    }
    if (event.target.id !== 'right-side') {
        for (let i = 0; i < BusMall.all.length; i++) {
            if (BusMall.all[i].name === event.target.title) {
                BusMall.all[i].votes = BusMall.all[i].votes + 1;
            }
        }
        renderImg();
        console.log(BusMall.all);
        event.preventDefault();
    }
}


