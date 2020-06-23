

//----- App State ----- //

//name of the pet
let name = null;
// age of the pet
let age = 0;
//Metrics
let hunger = 0;
let sleepyness = 0;
let happiness = 0;
// color of the tamagotchi
let tColor = null;

// ----- Cached DOM Elements ----- //

const feedMe = document.getElementById('feed');
const playMe = document.getElementById('play-btn');
const sleepMe = document.getElementById('lites-out-btn'); 


// ----- Event Listeners ----- //

function addEventListeners (){
    feedMe.addEventListener('click', handleFeed);
    playMe.addEventListener('click', handlePlay);
    sleepMe.addEventListener('click', handleSleep);
}

// ----- Functions ----- // 

function setUp (){
    name = prompt("Enter the name of your pet");
    tColor = prompt("Select one of the following colors: Pink, Blue, Purple, Green, White");
    document.getElementById('name').innerText = `Name: ${name}`;
    document.getElementById('console').style.backgroundColor = tColor;
    addEventListeners();
}
setUp();

function handleFeed (){
    console.log('feed button has been clicked');
}

function handlePlay(){
    console.log('play button has been clicked');
}

function handleSleep(){
    console.log('sleep button has been clicked');
}
