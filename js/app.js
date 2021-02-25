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
console.log('---------Before Edit------');
let arr = noIterationRepeat();
let arr2 = noIterationRepeat();
checkRepetition();
// let arr2 = arr2;


function renderImg() {

    arr2 = noIterationRepeat();
    console.log('arr2', arr2);
    checkRepetition();

    leftImage.src = BusMall.all[arr2[0]].path;
    leftImage.title = BusMall.all[arr2[0]].name;
    leftImage.alt = BusMall.all[arr2[0]].name;
    // arr2.shift();
    // arr2.push(leftImage.alt);

    middleImage.src = BusMall.all[arr2[1]].path;
    middleImage.title = BusMall.all[arr2[1]].name;
    middleImage.alt = BusMall.all[arr2[1]].name;
    // arr2.shift();
    // arr2.push(middleImage.alt);

    rightImage.src = BusMall.all[arr2[2]].path;
    rightImage.title = BusMall.all[arr2[2]].name;
    rightImage.alt = BusMall.all[arr2[2]].name;
    // arr2.shift();
    // arr2.push(rightImage.alt);

    console.log(arr2);

    for (let i = 0; i < BusMall.all.length; i++) {
        for (let j = 0; j < arr2.length; j++) {

            if (BusMall.all[i].name === arr2[j]) {
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
        arr = noIterationRepeat();

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



// function noIterationRepeat() {
//     let arrLeft = [];
//     for (let i = 0; i < 3; i++) {
//         arrLeft.push(randomNumber(0, BusMall.all.length - 1));
//     }

//     let i = 0;
//     while (i < 9) {
//         if (arrLeft[0] === arrLeft[1]) {
//             arrLeft.shift();
//             arrLeft.unshift(randomNumber(0, BusMall.all.length - 1));
//         } if (arrLeft[0] === arrLeft[2]) {
//             arrLeft.pop();
//             arrLeft.push(randomNumber(0, BusMall.all.length - 1));
//         } if (arrLeft[1] === arrLeft[0]) {
//             arrLeft.shift();
//             arrLeft.unshift(randomNumber(0, BusMall.all.length - 1));
//         } if (arrLeft[1] === arrLeft[2]) {
//             arrLeft.pop();
//             arrLeft.push(randomNumber(0, BusMall.all.length - 1));
//         }
//         i++;
//     }
//     return arrLeft;
// }

//----------------------------------------------------------------------------------------------


console.log('arr1', arr);
console.log('arr2', arr2);
function noIterationRepeat() {
    let arrLeft = [];
    for (let i = 0; i < 3; i++) {
        arrLeft.push(randomNumber(0, 19));
    }

    let i = 0;
    while (i < 9) {
        if (arrLeft[0] === arrLeft[1]) {
            arrLeft.shift();
            arrLeft.unshift(randomNumber(0, 19));
        } if (arrLeft[0] === arrLeft[2]) {
            arrLeft.pop();
            arrLeft.push(randomNumber(0, 19));
        } if (arrLeft[1] === arrLeft[0]) {
            arrLeft.shift();
            arrLeft.unshift(randomNumber(0, 19));
        } if (arrLeft[1] === arrLeft[2]) {
            arrLeft.pop();
            arrLeft.push(randomNumber(0, 19));
        }
        i++;
    }

    return arrLeft;
}




function checkRepetition() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (arr2[j] === arr[i]) {
                console.log('Array1 index ' + i + ': ', arr2[j], 'Array2 index ', j + ': ', arr[i]);
                arr2.splice(j, 1, randomNumber(0, 19));

            }

        }
    }
}
console.log('---------After Edit------');

console.log('arr1', arr);
console.log('arr2', arr2);