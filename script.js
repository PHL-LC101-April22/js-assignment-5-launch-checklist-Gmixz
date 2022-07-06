// Write your JavaScript code here!

//import * as helpers from './scriptHelper';

window.addEventListener("load", function() {
   let listedPlanets;
   // Set listedPlanetsResponse equal to the value returned by calling myFetch()
   let listedPlanetsResponse = myFetch();
   listedPlanetsResponse.then(function (result) {
       listedPlanets = result;
       console.log(listedPlanets);
   }).then(function () {
       console.log(listedPlanets);
       // Below this comment call the appropriate helper functions to pick a planet fom the list of planets and add that information to your destination.
       let planet = pickPlanet(listedPlanets);
       addDestinationInfo(document, planet.name, planet.diameter, planet.star, planet.distance, planet.moons, planet.image);
       
   })
   
});


function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    document.getElementById('missionTarget').innerHTML = `<h2>Mission Destination</h2>    <ol>        <li>Name: ${name}</li>        <li>Diameter: ${diameter}</li>        <li>Star: ${star}</li>        <li>Distance from Earth: ${distance}</li>        <li>Number of Moons: ${moons}</li>    </ol>    <img src="${imageUrl}">`
}

function validateInput(testInput, checkForNumbersOnly = false) {
    let numbersOnlyRegex = /[0-9]/g;
    
    if(testInput === '')
    {  
        // alert('Empty');
        return false;
    }

    if (checkForNumbersOnly)
    {
        if (isNaN(testInput))
        {
            // alert('Not a Number');
            return false;
        }
    }
    else
    {
        if (testInput.match(numbersOnlyRegex))
        {
            // alert('Is a number');
            return false;
        }
    }

    return true;
}

function formSubmission(e) {
    
    e.preventDefault();
    let isPilotNameValid = validateInput(document.myForm.pilotName.value);
    let isCopilotNameValid = validateInput(document.myForm.copilotName.value);
    let isCargoMassValid = validateInput(document.myForm.cargoMass.value, true);
    let isFuelLevelValid = validateInput(document.myForm.fuelLevel.value, true);
   

    if (isPilotNameValid && isCopilotNameValid && isCargoMassValid && isFuelLevelValid)
    {
        document.getElementById('pilotStatus').text = `${document.myForm.pilotName.value} is Ready`;
        document.getElementById('copilotStatus').text = `${document.myForm.copilotName.value} is Ready`;
    }
    else if((isPilotNameValid && !isCopilotNameValid && isCargoMassValid && !isFuelLevelValid) || (!isPilotNameValid && isCopilotNameValid && !isCargoMassValid && isFuelLevelValid ))
    {
        alert('Make sure to enter valid information for each field!')
        return;
    }
    else
    {
        alert('All fields are required!.')
        return;
    }

    document.getElementById('faultyItems').style.visibility = 'visible';

    if (!isFuelValid(document.myForm.fuelLevel.value))
    {
        document.getElementById('launchStatus').textContent = 'Shuttle not ready for launch';
        document.getElementById('launchStatus').style.color = 'red';
        document.getElementById('fuelStatus').textContent = `Fuel level too low for launch`;
        // document.getElementById('fuelStatus').style.color = 'red';
        return;
        
    }
    else
    {
        document.getElementById('fuelStatus').style.color = 'black';
        document.getElementById('fuelStatus').textContent = 'Fuel level high enough for launch';
    }

    if (!isCargoValid(document.myForm.cargoMass.value))
    {
        document.getElementById('launchStatus').textContent = 'Shuttle not ready for launch';
        document.getElementById('launchStatus').style.color = 'red';
        document.getElementById('cargoStatus').textContent = `Cargo mass to high for launch`;
        // document.getElementById('cargoStatus').style.color = 'red';
        return;
    }    
    else
    {
        document.getElementById('cargoStatus').textContent = 'Cargo mass low enough for launch';
        document.getElementById('cargoStatus').style.color = 'black';
    }

    document.getElementById('launchStatus').style.color = 'green';
    document.getElementById('launchStatus').textContent = 'Shuttle is ready for launch';

}

function isFuelValid(fuel)
{
    return fuel >= 10000;
}

function isCargoValid(cargo)
{
    return cargo < 10000; 
}

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch('https://handlers.education.launchcode.org/static/planets.json').then( function(response) {
        return response.json();    
    });

    return planetsReturned;
}

function pickPlanet(planets) {
    return planets[Math.round(Math.random() * 5)];
}