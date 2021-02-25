'use strict';

//--------Imgs Name-----------
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

// -----------------Call Imgs By IDs ----------------------

const leftImage = document.getElementById('left-image');
const rightImage = document.getElementById('right-image');
const middleImage = document.getElementById('middle-image');

//--------------------- Constructore Function --------------

function BusMall(imgsName) {
    this.name = imgsName;
    this.path = `./img/${imgsName}`;
    this.votes = 0;
    this.views = 0;
    BusMall.all.push(this);
}

// ------- Create New Objects ----------
BusMall.all = [];
for (let i = 0; i < imgsName.length; i++) {
    new BusMall(imgsName[i]);
}

// --------- Get Random Numbers -----------------
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let usedImgs = [];
function randNum() {
    var num = getRandomNumber(0, 19);
    if (usedImgs.includes(num)) {
        return randNum();
    } else {
        usedImgs.push(num);
        return num;
    }
}


// --------------- Get Random Numbers Without Repeated in the Same Array ------------------
function arrayWithoutRepeat() {
    let arr = [];

    // This for loop generates random numbers without CHECK
    for (let i = 0; i < 3; i++) {
        arr.push(randNum());
    }
    usedImgs = arr;
    return arr;
}

// -------------- This Array are have NO Repeated Numbers ---------------------
let notRepeatedArray = arrayWithoutRepeat();

// ------------- Rendering Images ---------------

function renderImg() {

    // Left Imag
    leftImage.src = BusMall.all[notRepeatedArray[0]].path;
    leftImage.alt = BusMall.all[notRepeatedArray[0]].name;
    leftImage.title = BusMall.all[notRepeatedArray[0]].name;

    // Middle Img
    middleImage.src = BusMall.all[notRepeatedArray[1]].path;
    middleImage.alt = BusMall.all[notRepeatedArray[1]].name;
    middleImage.title = BusMall.all[notRepeatedArray[1]].name;

    // Right Img
    rightImage.src = BusMall.all[notRepeatedArray[2]].path;
    rightImage.alt = BusMall.all[notRepeatedArray[2]].name;
    rightImage.title = BusMall.all[notRepeatedArray[2]].name;


}
renderImg();


// ------- This Function Change Imgs By Clicking ---------------



// function handleClick(event) {
//     console.log(usedImgs);
//     // Change Imgs By clicks
//     event.preventDefault();
//     if (event.target.id !== 'right-side') {
//         for (let i = 0; i < BusMall.all.length; i++) {
//             if (BusMall.all[i].name === event.target.title) {
//                 BusMall.all[i].votes = BusMall.all[i].votes + 1;
//                 // pass NEW Array by Click
//                 notRepeatedArray = arrayWithoutRepeat();
//                 renderImg();
//             }
//         }

//     }
//     //Remove Event Listener
//     if (x !== attempts) {
//         x++;
//     } else {
//         imagesSection.removeEventListener('click', handleClick);
//         renderResults();
//     }

// }
// const imagesSection = document.getElementById('right-side');
// imagesSection.addEventListener('click', handleClick);


// ----------- This Function Show the result of Views and Votes --------------
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







let attempts = 5;
let x = 1;

function handleClick() {
    console.log(usedImgs);
    console.log(x);
    //Remove Event Listener
    if (x !== attempts) {
        // Change Imgs By clicks
        for (let i = 0; i < BusMall.all.length; i++) {
            if (BusMall.all[i].name === this.title) {
                console.log(BusMall.all[i].name);
                console.log(this.title);
                BusMall.all[i].votes = BusMall.all[i].votes + 1;
                // pass NEW Array by Click
                notRepeatedArray = arrayWithoutRepeat();
                renderImg();
                break;
            }
        }
        x++;
    } if (x === attempts) {
        // Change Imgs By clicks
        for (let i = 0; i < BusMall.all.length; i++) {
            if (BusMall.all[i].name === this.title) {
                console.log(BusMall.all[i].name);
                console.log(this.title);
                BusMall.all[i].votes = BusMall.all[i].votes + 1;
                // pass NEW Array by Click
                notRepeatedArray = arrayWithoutRepeat();
                renderImg();
                break;
            }
        }
        this.removeEventListener('click', handleClick);
        renderResults();
        x++;
    } else {
        this.removeEventListener('click', handleClick);
    }

}
const imagesRight = document.getElementById('right-image');
const imagesLeft = document.getElementById('left-image');
const imagesMiddle = document.getElementById('middle-image');
imagesRight.addEventListener('click', handleClick);
imagesLeft.addEventListener('click', handleClick);
imagesMiddle.addEventListener('click', handleClick);


const btn = document.getElementById('btn');
btn.addEventListener('click', function () {
    randNum();
    console.log(BusMall.all);
});
