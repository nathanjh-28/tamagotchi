

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

function youWin(){
    alert("You win!!!")
}

function moveLeft (){
    $('#pet').animate({'left':'-=100px'},5000);
}

function moveRight (){
    $('#pet').animate({'left':'+=100px'},5000);
}
let bTime = 0
function bounceTime (){
    let bTimer = setInterval(function(){
        bTime++;
        if(bTime === 1){
            pet.classList.add('animate__animated','animate__bounce');
        }
        if (bTime === 3){
            pet.classList.remove('animate__animated','animate__bounce');
            bTime = 0;
            clearInterval(bTimer);
        }
    }, 1000);
}

let time = 0;
function timer (){
    let timer = setInterval(function(){
        time++;
        if (time % 1 === 0){
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
        if (myTamagotchi.hunger > 9 ||myTamagotchi.sleepyness > 9 || myTamagotchi.happiness > 9 ){
           deadTama();
           clearInterval(timer); 
        }
        if(myTamagotchi.age >= 30){
            youWin();
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
    if(myTamagotchi.hunger===10||myTamagotchi.happiness===10||myTamagotchi.sleepyness===10){
        return;
    }
    myTamagotchi.hunger--;
    updateMetric();
    feedTime();

}
function handlePlay(){
    // console.log('play button has been clicked');
    if (myTamagotchi.happiness === 0){
        return;
    }
    if(myTamagotchi.hunger===10||myTamagotchi.happiness===10||myTamagotchi.sleepyness===10){
        return;
    }
    myTamagotchi.happiness--;
    updateMetric();
    bounceTime();
}
function handleSleep(){
    // console.log('sleep button has been clicked');
    if (myTamagotchi.sleepyness === 0){
        return;
    }
    if(myTamagotchi.hunger===10||myTamagotchi.happiness===10||myTamagotchi.sleepyness===10){
        return;
    }
    lightsOutTimer();
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

function blackOut (){
    //change color of inner display to black
    const black = document.getElementById('inner-display');
    const blackStr = 'black';
    black.style.backgroundColor = blackStr;
    const myPet = document.getElementById('pet');
    const petDisplay = 'none';
    myPet.style.display = petDisplay;
    //set display to none for #pet
    // timer, change back after 3 seconds.
}

function lightsOn (){
    const grey = document.getElementById('inner-display');
    const greyStr = 'lightgrey';
    grey.style.backgroundColor = greyStr;
    const myPet = document.getElementById('pet');
    myPet.style.display = null;
}
let lTime = 0;
function lightsOutTimer (){
    blackOut();
    let lTimer = setInterval(function(){
        lTime++;
        if (lTime === 2){
            lightsOn();
            lTime = 0;
            clearInterval(lTimer);
        }
    }, 1000);
}

let fTime = 0
function feedTime (){
    let fTimer = setInterval(function(){
        fTime++;
        if(fTime === 1){
            pet.classList.add('animate__animated','animate__heartBeat');
        }
        if (fTime === 3){
            pet.classList.remove('animate__animated','animate__heartBeat');
            fTime = 0;
            clearInterval(fTimer);
        }
    }, 1000);
}