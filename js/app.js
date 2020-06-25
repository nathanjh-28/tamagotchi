

// ------------------------- Tamagotchi Script ------------------------------ //
// last updated 6/25/2020 3:00PM by Nathan J Harris

/* 

--- Table of Contents ---
A. App State
    a. Color Variables
    b. Tamagotchi Object Template
    c. Tamagotchi Class

B. Cached Dom Elements

C. Event Listeners

D. Functions
    1. getRandNum, get a random number with min and max
    2. pickColor, function that converts color input in to pre selected color.
    3. setColorPalette, Takes the color input and makes a color palette out of it.  
    4. changePetPic change pet image at certain age marks
    5. updateMetric, Update DOM elements when metics are added or subtracted
    6. addMetric, Randomly selects a metric and adds 1 point to it.
    7. deadTama, a function that controls the game over or your pet died state
    8. youWin, Win state for when the pet reaches a certain age
        
        ANIMATIONS
        11. moveLeft, animate pet left
        12. moveRight, animate pet right
        13. blackOut, Lights out for sleep state
        14. lightsOn, lights on for coming back to awake state
            
            TIMER FUNCTIONS
            21. timer, a timer that controls the game.  Adds age points, triggers other functions.
            22. lightsOutTimer, timer function that triggers black out and lightsOn
            23. feedTime, timer to control the animation for feed button
            24. bounceTime a timer that controls the bounce animation adding and removing it.

                DIALOGUE FUNCTIONS
                31. yum, 32. removeYum, 33. zzz, 34. removeZzz, 35. yay, 36. removeYay, 
                37. heWasLoved, dialogue when the pet lived a happy life.

                    EVENT HANDLERS
                    41. handleSubmit
                    42. handleFeed
                    43. handlePlay
                    44. handleSleep
                    45. handleSpeed
*/

//--A----- App State ----- //

//--a.-- color variables for tamagotchi
const pink = '#f2c4ca';
const blue = '#9cc1db';
const purple = '#A19EC6'; 
const green = '#94D1CE';
const white = 'lightgrey';

//--b.--starting point for our tamagotchi
let tamaObjectTemplate = {
    name: ' ',
    age: 0,
    hunger: getRandNum(0,5),
    sleepyness: getRandNum(0,5),
    happiness: getRandNum(0,5),
    tColor: ' ',
}
//--c.--class for tamagotchi
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

// I don't know why I have this here but if it's not here the whole thing doesn't work.
// create object myTamagotchi
const myTamagotchi = new CreateTama(tamaObjectTemplate);

// --B----- Cached DOM Elements ----- //
// variables for all buttons
const speed = document.getElementById('speed');
const submit = document.getElementById('submit');
const feedMe = document.getElementById('feed');
const playMe = document.getElementById('play-btn');
const sleepMe = document.getElementById('lites-out-btn');
const dia = document.getElementById('dialogue'); 


// --C----- Event Listeners ----- //
// event listeners for all buttons
feedMe.addEventListener('click', handleFeed);
playMe.addEventListener('click', handlePlay);
sleepMe.addEventListener('click', handleSleep);
submit.addEventListener('click', handleSubmit);
speed.addEventListener('click',handleSpeed);

// --D----- Functions ----- // 

//--1-- copied from my space battle to make a random number with min/max
function getRandNum (min,max){
    let num = Math.floor(Math.random()*(max-min)+min);
    return num;
}

// --2--function that converts color input in to pre selected color.  
function pickColor (input){
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

//--3-- Takes the color input and makes a color palette out of it.  
function setColorPalette (){
    const colorInput = document.getElementById('TamaColor').value;
    tamaObjectTemplate.tColor = pickColor(colorInput);
    document.getElementById('console').style.backgroundImage = `radial-gradient(white 20%, ${tamaObjectTemplate.tColor} 80%)`;
    document.getElementById('greeting').style.backgroundColor = tamaObjectTemplate.tColor;
    document.getElementById('logo').style.color = tamaObjectTemplate.tColor;
    const buttonsArr = document.getElementsByClassName('button')
    buttonsArr[0].style.backgroundColor = tamaObjectTemplate.tColor;
    buttonsArr[1].style.backgroundColor = tamaObjectTemplate.tColor;
    buttonsArr[2].style.backgroundColor = tamaObjectTemplate.tColor;
    document.getElementById('signature').style.backgroundColor = tamaObjectTemplate.tColor;
}

//--4-- change pet image at certain age marks
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

//--5--Update DOM elements when metics are added or subtracted
function updateMetric (){
    document.getElementById('hunger').innerText = `Hunger: ${myTamagotchi.hunger}`;
    document.getElementById('sleepy').innerText = `Sleepy: ${myTamagotchi.sleepyness}`;
    document.getElementById('bored').innerText = `Bored: ${myTamagotchi.happiness}`;
}

//--6-- Randomly selects a metric and adds 1 point to it.
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
//--7-- a function that controls the game over or your pet died state
function deadTama(){
    console.log("he dead");
    document.getElementById('pet').src = './age-images/dead.png';
}
//--8--Win state for when the pet reaches a certain age
function youWin(){
    alert("You win!!!")
    heWasLoved();
    deadTama ();
}

// >>>>>>>>>>>>>>>>>>>> Animations <<<<<<<<<<<<<<<<<<<<<<<<<<<< //

//--11--animate pet left
function moveLeft (){
    $('#pet').animate({'left':'-=200px'},5000);
}
//--12--animate pet right
function moveRight (){
    $('#pet').animate({'left':'+=200px'},5000);
}
//--13--lights out for sleep state
function blackOut (){
    //change color of inner display to black
    const black = document.getElementById('inner-display');
    black.style.backgroundColor = '#474747';
    const myPet = document.getElementById('pet');
    const petDisplay = 'none';
    myPet.style.display = petDisplay;
    zzz();
}
//--14--lights on for coming back to awake state
function lightsOn (){
    const grey = document.getElementById('inner-display');
    const greyStr = 'lightgrey';
    grey.style.backgroundColor = greyStr;
    const myPet = document.getElementById('pet');
    myPet.style.display = null;
    removeZzz();
}
//>>>>>>>>>>>>>>>>>>>>>>>>>>>> Timer Functions <<<<<<<<<<<<<<<<<<<<<<<<<<<<<

//--21-- a timer that controls the game.  Adds age points, triggers other functions.  
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
//--22-- timer function that triggers black out and lightsOn
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

//--23-- timer to control the animation for feed button
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
//--24-- a timer that controls the bounce animation adding and removing it.
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

//--31-- animate dialogue when eating
function yum(){
    dia.innerText = 'YUM';
    dia.style.display = null;
    dia.classList.add('animate__animated','animate__headShake');
}
//--32-- remove dialogue when done eating
function removeYum (){
    dia.innerText = '';
    dia.style.display = null;
    dia.classList.remove('animate__animated','animate__headShake');
}
//--33-- animate dialogue when sleeping
function zzz (){
    dia.innerText = 'ZZZ'
    dia.style.color = 'white';
    dia.classList.add('animate__animated','animate__headShake');
}
//--34-- remove dialogue when done sleeping
function removeZzz (){
    dia.style.color = 'black';
    dia.innerText = '';
    dia.classList.remove('animate__animated','animate__headShake');
}
//--35-- animate dialogue when playing
function yay (){
    dia.innerText = 'YAY'
    dia.classList.add('animate__animated','animate__headShake');
}
//--36-- remove dialogue when done playing
function removeYay (){
    dia.innerText = '';
    dia.classList.remove('animate__animated','animate__headShake');
}
//--37-- dialogue for ending of the game
function heWasLoved (){
    dia.innerText = 'they were loved...'
    dia.classList.add('animate__animated','animate__headShake');
}

//>>>>>>>>>>>>>>>>>>>>>>>>  Event Handlers <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<



//--41-- function for when you hit the submit button
function handleSubmit (){
    // update the name in the object and the DOM
    tamaObjectTemplate.name = document.getElementById('TamaName').value;
    document.getElementById('name').innerText = `Name: ${tamaObjectTemplate.name}`;
    setColorPalette();
    updateMetric();
    timer();
}
//--42-- feed button handler
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
//--43-- play button handler
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
//--44-- sleep button handler
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
//--45-- used for speeding up the game when debugging.
let ageSpeed = 60;
function handleSpeed (){
    ageSpeed = 1;
}
