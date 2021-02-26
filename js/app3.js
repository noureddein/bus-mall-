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
    localStorage.setItem('views', JSON.stringify(BusMall.views));


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

// --------------- Get Random Numbers Without Repeated in the Same Array ------------------
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

let attempts = 15;
let attemptsCounter = 1;

const imagesSection = document.getElementById('right-side');
imagesSection.addEventListener('click', handleClick);

// console.log(BusMall.all);
function handleClick(event) {
    //add views
    for (let j = 0; j < 3; j++) {
        // console.log('after click', notRepeatedArray);
        // if (BusMall.all[usedImgs[j]].name) {
        // console.log('busmall for ' + j + ' name', BusMall.all[usedImgs[j]].name);
        // console.log('target title', event.target.title);
        BusMall.all[usedImgs[j]].views = BusMall.all[usedImgs[j]].views + 1;
        // }
    }
    // console.log('Before Click', usedImgs);

    // Change Imgs By clicks
    event.preventDefault();
    if (event.target.id !== 'right-side') {
        for (let i = 0; i < BusMall.all.length; i++) {
            if (BusMall.all[i].name === event.target.title) {
                BusMall.all[i].votes = BusMall.all[i].votes + 1;
                // pass NEW Array by Click


                notRepeatedArray = arrayWithoutRepeat();
                renderImg();
                // console.log(BusMall.all[i].votes);
                // console.log('After Click', notRepeatedArray);
                // console.log(BusMall.all);
                break;
            }
        }

        //Remove Event Listener
        if (attemptsCounter !== attempts) {
            attemptsCounter++;
        } else {
            imagesSection.removeEventListener('click', handleClick);
            renderResults();
            renderChart();
            storeData();
            console.log('views: ', JSON.parse(localStorage.getItem('views')));


        }
    }

}

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


//---------------- Cahrt render ------------------

//add all Views and Votes to array
let viewResults = [];
let votesResults = [];
let imgNameWithoutExtension = [];
function renderChart() {
    //this for loop PUSH results to the array
    for (let i = 0; i < imgsName.length; i++) {

        viewResults.push(BusMall.all[i].views);
        votesResults.push(BusMall.all[i].votes);
        imgNameWithoutExtension.push(imgsName[i].replace('.jpg', ' ').replace('.png', ' ').replace('gif', ' '));
    }

    const ctx = document.getElementById('myChart').getContext('2d');

    ctx.height = 100;
    const chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'bar',

        // The data for our dataset
        data: {
            labels: imgNameWithoutExtension,
            datasets: [{
                barThickness: 30,
                borderWidth: 2,
                minBarLength: 2,
                label: 'Votes',
                backgroundColor: 'rgba(20, 19, 132,0.66)',
                borderColor: 'rgba(255, 99, 13,1)',
                data: votesResults,
            }, {
                label: 'View',
                minBarLength: 2,
                borderWidth: 2,
                data: viewResults,
                backgroundColor: 'green',
                borderColor: '#eee',
                order: 1
            }]
        },


        // Configuration options go here
        options: {
            legend: {
                labels: {
                    fontColor: '#eee',
                    fontSize: 16,
                }
            },
        }
    });
}

//---------------- Save data in Local Storage -----------------------
let dataStoreAsObject = [];
function storeData() {
    for (let i = 0; i < 20; i++) {
        dataStoreAsObject.push(localStorage.setItem('views', JSON.stringify(BusMall.all)));
    }

}
console.log(BusMall.all);
