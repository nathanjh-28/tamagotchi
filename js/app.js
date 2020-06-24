

//----- App State ----- //

const colorsArr = ['fairy pink','fairy blue','magic purple','magic green','magic white'];

let tamaObjectTemplate = {
    // name: null,
    age: 0,
    hunger: getRandNum(0,5),
    sleepyness: getRandNum(0,5),
    happiness: getRandNum(0,5),
    // tColor: ,
}

class CreateTama {
    constructor(object) {
        this.name = object.name;
        this.age = object.age;
        this.hunger = object.hunger;
        this.sleepyness = object.sleepyness;
        this.happiness = object.happiness;
        this.tColor = object.tColor;
    }
}


// ----- Cached DOM Elements ----- //

const feedMe = document.getElementById('feed');
const playMe = document.getElementById('play-btn');
const sleepMe = document.getElementById('lites-out-btn'); 


// ----- Event Listeners ----- //

feedMe.addEventListener('click', handleFeed);
playMe.addEventListener('click', handlePlay);
sleepMe.addEventListener('click', handleSleep);

// ----- Functions ----- // 

function getRandNum (min,max){
    let num = Math.floor(Math.random()*(max-min)+min);
    return num;
}

// function getBooleanAnswer (Question){
//     let answer = prompt(`Yes or No: ${Question}`);
//     answer = answer.toLowerCase();
//     while (answer !== 'yes' && answer !== 'no'){
//         answer = prompt(Question);
//     }
//     if (answer === 'yes'){
//         return true;
//     }
//     if (answer === 'no'){
//         return false;
//     }
// }

// change pet image
function changePetPic (){
    if (myTamagotchi.age > 3){
        document.getElementById('pet').src = './age-images/1.png';
    }
    if (myTamagotchi.age > 7){
        document.getElementById('pet').src = './age-images/2.png';
    }
    if (myTamagotchi.age > 12){
        document.getElementById('pet').src = './age-images/3.png';
    }
    if (myTamagotchi.age > 15){
        document.getElementById('pet').src = './age-images/4.png';
    }
    // if (myTamagotchi.age > 18){
    //     document.getElementById('pet').src = './age-images/5.png';
    // }
    // if (myTamagotchi.age > 25){
    //     document.getElementById('pet').src = './age-images/6.png';
    // }
}

function updateMetric (){
    document.getElementById('hunger').innerText = `Hunger: ${myTamagotchi.hunger}`;
    document.getElementById('sleepy').innerText = `Sleepy: ${myTamagotchi.sleepyness}`;
    document.getElementById('bored').innerText = `Bored: ${myTamagotchi.happiness}`;
}

function addMetric (){
    let num = getRandNum(1,3);
    if (num === 1){
        myTamagotchi.hunger += 1;
    }
    if (num === 2){
        myTamagotchi.sleepyness += 1;
    }
    if (num === 3){
        myTamagotchi.happiness += 1;
    }
    updateMetric();
}

function deadTama(){
    console.log("he dead");
    document.getElementById('pet').src = './age-images/dead.png';
}

function moveLeft (){
    $('#pet').animate({'left':'-=100px'},5000);
}

function moveRight (){
    $('#pet').animate({'left':'+=100px'},5000);
}


let time = 0;
function timer (){
    let timer = setInterval(function(){
        time++;
        if (time % 12 === 0){
            myTamagotchi.age++;
            document.getElementById('age').innerText = `Age: ${myTamagotchi.age}`
        }
        changePetPic();
        if (time % 5 === 0){
            addMetric ();
        }
        if(time % 20 !== 0 && time % 10 === 0){
            moveLeft(); 
        }
        if (time % 20 === 0){
            moveRight();
        }
        console.log(time);

        // if (time % 2 === 0){
        //     pet.classList.add('animate__animated','animate__bounce');
        //     // pet.style.animation = 'bounce';
        //     // const aniDur = "animation-duration"
        //     // pet.style.animation.aniDur = '2s';
        // }
        // if(time % 3 === 0){
        //     pet.classList.remove('animate__animated', 'animate__bounce');
        // }
        if (myTamagotchi.hunger > 9 ||myTamagotchi.sleepyness > 9 || myTamagotchi.happiness > 9 ){
           deadTama();
           clearInterval(timer); 
        }
        if(myTamagotchi.age > 30){
            clearInterval(timer);
        }
    }, 1000);
}

//set up the pet
function setUp (){
tamaObjectTemplate.name = prompt("Enter the name of your pet");
tamaObjectTemplate.tColor = prompt(`Select one of the following colors: ${colorsArr}`);
    document.getElementById('name').innerText = `Name: ${tamaObjectTemplate.name}`;
    document.getElementById('console').style.backgroundColor = tamaObjectTemplate.tColor;
    
}

//Run SetUp at launch
setUp();
// Create Tamagotchi object after setUp
const myTamagotchi = new CreateTama(tamaObjectTemplate);
//Start Age Timer
updateMetric();
timer();

function handleFeed (){
    // console.log('feed button has been clicked');
    if (myTamagotchi.hunger === 0){
        return;
    }
    myTamagotchi.hunger--;
    updateMetric();

}
function handlePlay(){
    // console.log('play button has been clicked');
    if (myTamagotchi.happiness === 0){
        return;
    }
    myTamagotchi.happiness--;
    updateMetric();
}
function handleSleep(){
    // console.log('sleep button has been clicked');
    if (myTamagotchi.sleepyness === 0){
        return;
    }
    myTamagotchi.sleepyness--;
    updateMetric();
}

let aTime = 0
// function addBouncePet (){
//     const pet = document.getElementById('pet');
//     pet.classList.add('animate__animated', 'animate__bounce');
//     function animationTimer () {
//         let aTimer = setInterval(function(){
//             aTime++;
//             if (aTime === 1){
//                 pet.classList.remove('animate__animated', 'animate__bounce');   
//             }
//             if (aTime === 2){
//                 clearInterval(aTimer);
//             }
//         }, 1000);
//     }
//     animationTimer ();
// }

// function removeBouncePet (){
//     pet.classList.remove('animate__animated', 'animate__bounce');
// }

// const animateCC = (element, animation, prefix = 'animate__') =>
//     new Promise(resolve,reject )


