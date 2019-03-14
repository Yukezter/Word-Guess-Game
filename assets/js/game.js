var animals = ["alligator", "tiger", "giraffe"];
var animalsAlreadyPlayed = [];

var wins = 0;
var guesses = 5;

var addSpaces = (word) => {
  return word.split("").join(" ");
}
var replaceAt = (animal, index, replace) => {
  return animal.substring(0, index) + replace + animal.substring(index + 1);
}

var randomIndex = Math.floor(Math.random() * animals.length);
var animal = animals[randomIndex];
var underscores = "_".repeat(animal.length);

document.getElementById("animal").innerHTML = addSpaces(underscores);
document.getElementById("wins").innerHTML = wins;
document.getElementById("guesses-left").innerHTML = guesses;



document.onkeyup = (e) => {
  var userInput = e.key;
  
  if (animal.includes(userInput)) {
    for (i = 0; i < animal.length; i++) {
      if (animal[i] === userInput) {
        var updateUnderscores = replaceAt(underscores, i, userInput);
        underscores = updateUnderscores;
      }
    }
    document.getElementById("animal").innerHTML = addSpaces(updateUnderscores);
    if (animal === updateUnderscores) {
      alert("You got it!");
      wins++;
      animalsAlreadyPlayed.push(animals.pop());
      randomIndex = Math.floor(Math.random() * animals.length);
      animal = animals[randomIndex];
      underscores = "_".repeat(animal.length);
      document.getElementById("animal").innerHTML = addSpaces(underscores);
    }
  } else {
    guesses--;
    console.log(guesses);
    if (guesses === 0) {
      alert("You lost!");
      guesses = 5;
      animalsAlreadyPlayed.push(animals.pop());
      randomIndex = Math.floor(Math.random() * animals.length);
      animal = animals[randomIndex];
      underscores = "_".repeat(animal.length);
      document.getElementById("animal").innerHTML = addSpaces(underscores);
    }
  }
  
  document.getElementById("wins").innerHTML = wins;
  document.getElementById("guesses-left").innerHTML = guesses;
}
