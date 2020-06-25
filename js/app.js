

// ------------------------- Tamagotchi Script ------------------------------ //
// last updated 6/25/2020 11:07AM by Nathan J Harris

//used for speeding up the game when debugging.
let ageSpeed = 60;
function handleSpeed (){
    ageSpeed = 1;
}

//----- App State ----- //

// const colorsArr = ['fairy pink','fairy blue','magic purple','magic green','magic white'];


// color options for tamagotchi
const pink = '#f2c4ca';
const blue = '#9cc1db';
const purple = '#A19EC6'; 
const green = '#94D1CE';
const white = 'lightgrey';

// accent color corresponding to above color
const darkPink = null;
const darkBlue = null;
const darkPurple = null;
const darkGreen = null;
const whiteDark = null;

function pickColor(input){
    input = input.toLowerCase();
    if (input !== 'pink'&& input !== 'blue' && input !== 'purple' && input !=='green' && input !== 'white'){
        alert("You may only choose from Pink, Blue, Purple, Green, White");
        return;
    }
    if(input === 'pink'){
        return pink;
    }
    if(input === 'blue'){
        return blue;
    }
    if(input === 'purple'){
        return purple;
    }
    if(input === 'green'){
        return green;
    }
    if(input === 'white'){
        return white;
    }
}


let tamaObjectTemplate = {
    name: ' ',
    age: 0,
    hunger: getRandNum(0,5),
    sleepyness: getRandNum(0,5),
    happiness: getRandNum(0,5),
    tColor: ' ',
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
const speed = document.getElementById('speed');
const submit = document.getElementById('submit');
const feedMe = document.getElementById('feed');
const playMe = document.getElementById('play-btn');
const sleepMe = document.getElementById('lites-out-btn');
const dia = document.getElementById('dialogue'); 


// ----- Event Listeners ----- //

feedMe.addEventListener('click', handleFeed);
playMe.addEventListener('click', handlePlay);
sleepMe.addEventListener('click', handleSleep);
submit.addEventListener('click', handleSubmit);
speed.addEventListener('click',handleSpeed);

// ----- Functions ----- // 

//copied from my space battle to make a random number with min/max
function getRandNum (min,max){
    let num = Math.floor(Math.random()*(max-min)+min);
    return num;
}
// change pet image at certain age marks
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
}

//Update DOM elements when metics are added or subtracted
function updateMetric (){
    document.getElementById('hunger').innerText = `Hunger: ${myTamagotchi.hunger}`;
    document.getElementById('sleepy').innerText = `Sleepy: ${myTamagotchi.sleepyness}`;
    document.getElementById('bored').innerText = `Bored: ${myTamagotchi.happiness}`;
}

// randomly selects a metric and adds 1 point to it.
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
// a function that controls the game over or your pet died state
function deadTama(){
    console.log("he dead");
    document.getElementById('pet').src = './age-images/dead.png';
}
// Win state for when the pet reaches a certain age
function youWin(){
    alert("You win!!!")
    heWasLoved();
    deadTama ();
}

// >>>>>>>>>>>>>>>>>>>> Animations <<<<<<<<<<<<<<<<<<<<<<<<<<<< //

// animate pet left
function moveLeft (){
    $('#pet').animate({'left':'-=200px'},5000);
}
// animare pet right
function moveRight (){
    $('#pet').animate({'left':'+=200px'},5000);
}
//lights out for sleep state
function blackOut (){
    //change color of inner display to black
    const black = document.getElementById('inner-display');
    const blackStr = 'black';
    black.style.backgroundColor = blackStr;
    const myPet = document.getElementById('pet');
    const petDisplay = 'none';
    myPet.style.display = petDisplay;
    zzz();
}
// lights on for coming back to awake state
function lightsOn (){
    const grey = document.getElementById('inner-display');
    const greyStr = 'lightgrey';
    grey.style.backgroundColor = greyStr;
    const myPet = document.getElementById('pet');
    myPet.style.display = null;
    removeZzz();
}
//>>>>>>>>>>>>>>>>>>>>>>>>>>>> Timer Functions <<<<<<<<<<<<<<<<<<<<<<<<<<<<<

//a timer that controls the game.  Adds age points, triggers other functions.  
let time = 0;
function timer (){
    if (time > 0){
        return;
    }
    let timer = setInterval(function(){
        time++;
        if (time % ageSpeed === 0){
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
// timer function that triggers black out and lightsOn
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

//timer to control the animation for feed button
let fTime = 0
function feedTime (){
    let fTimer = setInterval(function(){
        fTime++;
        if(fTime === 1){
            pet.classList.add('animate__animated','animate__heartBeat');
            yum();
        }
        if (fTime === 3){
            pet.classList.remove('animate__animated','animate__heartBeat');
            removeYum();
            fTime = 0;
            clearInterval(fTimer);
        }
    }, 1000);
}
// a timer that controls the bounce animation adding and removing it.
let bTime = 0
function bounceTime (){
    let bTimer = setInterval(function(){
        bTime++;
        if(bTime === 1){
            pet.classList.add('animate__animated','animate__bounce');
            yay();
        }
        if (bTime === 3){
            pet.classList.remove('animate__animated','animate__bounce');
            removeYay();
            bTime = 0;
            clearInterval(bTimer);
        }
    }, 1000);
}

// >>>>>>>>> Functions for controlling the dialogue of the pet <<<<<<<<<<<

//animate dialogue when eating
function yum(){
    dia.innerText = 'YUM';
    dia.style.display = null;
    dia.classList.add('animate__animated','animate__headShake');
}
//remove dialogue when done eating
function removeYum (){
    dia.innerText = '';
    dia.style.display = null;
    dia.classList.remove('animate__animated','animate__headShake');
}
//animate dialogue when sleeping
function zzz (){
    dia.innerText = 'ZZZ'
    dia.style.color = 'white';
    dia.classList.add('animate__animated','animate__headShake');
}
//remove dialogue when done sleeping
function removeZzz (){
    dia.style.color = 'black';
    dia.innerText = '';
    dia.classList.remove('animate__animated','animate__headShake');
}
//animate dialogue when playing
function yay (){
    dia.innerText = 'YAY'
    dia.classList.add('animate__animated','animate__headShake');
}
//remove dialogue when done playing
function removeYay (){
    dia.innerText = '';
    dia.classList.remove('animate__animated','animate__headShake');
}

// update name and color in object, then in the DOM
function updateNameColor (color){
    // tamaObjectTemplate.name = name;
    tamaObjectTemplate.tColor = color;
    // document.getElementById('name').innerText = `Name: ${tamaObjectTemplate.name}`;
    document.getElementById('console').style.backgroundColor = tamaObjectTemplate.tColor;
}

function heWasLoved (){
    dia.innerText = 'they were loved...'
    dia.classList.add('animate__animated','animate__headShake');
}


// >>>>>>>>>>>>>>>>>>>>>> Launch Functions <<<<<<<<<<<<<<<<<<< //

//set up the pet
// function setUp (){
    // tamaObjectTemplate.name = '';
    // tamaObjectTemplate.tColor = '';
    // document.getElementById('name').innerText = `Name: ${tamaObjectTemplate.name}`;
    // document.getElementById('console').style.backgroundColor = tamaObjectTemplate.tColor; 
// }

//Run SetUp at launch
// setUp();

// Create Tamagotchi object after setUp
const myTamagotchi = new CreateTama(tamaObjectTemplate);


//>>>>>>>>>>>>>>>>>>>>>>>>  Event Handlers <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// function for when you hit the submit button
function handleSubmit (){
    tamaObjectTemplate.name = document.getElementById('TamaName').value;
    // console.log(tamaName);
    const colorInput = document.getElementById('TamaColor').value;
    tamaObjectTemplate.tColor = pickColor(colorInput);
    // console.log(tamaColor);
    document.getElementById('name').innerText = `Name: ${tamaObjectTemplate.name}`;
    document.getElementById('console').style.backgroundImage = `radial-gradient(white 20%, ${tamaObjectTemplate.tColor} 80%)`;
    document.getElementById('greeting').style.backgroundColor = tamaObjectTemplate.tColor;
    document.getElementById('logo').style.color = tamaObjectTemplate.tColor;
    const buttonsArr = document.getElementsByClassName('button')
    buttonsArr[0].style.backgroundColor = tamaObjectTemplate.tColor;
    buttonsArr[1].style.backgroundColor = tamaObjectTemplate.tColor;
    buttonsArr[2].style.backgroundColor = tamaObjectTemplate.tColor;
    // setUp();
    var myTamagotchi = new CreateTama(tamaObjectTemplate);
    updateMetric();
    timer();
}
// feed button handler
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
//play button handler
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
//sleep button handler
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