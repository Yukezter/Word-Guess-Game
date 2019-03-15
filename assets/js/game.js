// Animal-themed word guessing game!!!
const ANIMALS_OG = [
  "aardvark",
  "albatross",
  "alligator",
  "ant",
  "anteater",
  "antelope",
  "ape",
  "armadillo",
  "baboon",
  "badger",
  "barracuda",
  "bat",
  "bear",
  "beaver",
  "bee",
  "bison",
  "boar",
  "buffalo",
  "butterfly",
  "camel",
  "cat",
  "caterpillar",
  "cattle",
  "cheetah",
  "chicken",
  "chimpanzee",
  "chinchilla",
  "clam",
  "cobra",
  "cockroach",
  "cod",
  "coyote",
  "crab",
  "crocodile",
  "crow",
  "deer",
  "dinosaur",
  "dog",
  "dogfish",
  "dolphin",
  "donkey",
  "dotterel",
  "dove",
  "dragonfly",
  "duck",
  "dugong",
  "dunlin",
  "eagle",
  "echidna",
  "eel",
  "eland",
  "elephant",
  "elk",
  "emu",
  "falcon",
  "ferret",
  "fish",
  "flamingo",
  "fly",
  "fox",
  "frog",
  "gaur",
  "gazelle",
  "gerbil",
  "giraffe",
  "goat",
  "goose",
  "goldfish",
  "gorilla",
  "grasshopper",
  "hamster",
  "hare",
  "hawk",
  "hedgehog",
  "heron",
  "hippopotamus",
  "hornet",
  "horse",
  "hummingbird",
  "hyena",
  "jackal",
  "jaguar",
  "jay",
  "jellyfish",
  "kangaroo",
  "koala",
  "lark",
  "lemur",
  "leopard",
  "lion",
  "llama",
  "lobster",
  "manatee",
  "mandrill",
  "mantis",
  "marten",
  "meerkat",
  "mink",
  "mole",
  "mongoose",
  "monkey",
  "moose",
  "mouse",
  "mosquito",
  "mule",
  "octopus",
  "opossum",
  "ostrich",
  "otter",
  "owl",
  "ox",
  "oyster",
  "panther",
  "parrot",
  "pelican",
  "penguin",
  "pig",
  "pigeon",
  "pony",
  "porcupine",
  "quail",
  "rabbit",
  "raccoon",
  "ram",
  "rat",
  "raven",
  "reindeer",
  "rhinoceros",
  "salamander",
  "salmon",
  "sandpiper",
  "sardine",
  "scorpion",
  "seaurchin",
  "seahorse",
  "seal",
  "shark",
  "sheep",
  "skunk",
  "snail",
  "snake",
  "spider",
  "squid",
  "squirrel",
  "starling",
  "stingray",
  "stinkbug",
  "swallow",
  "swan",
  "termite",
  "tiger",
  "toad",
  "trout",
  "turkey",
  "turtle",
  "viper",
  "vulture",
  "wallaby",
  "walrus",
  "wasp",
  "weasel",
  "whale",
  "wolf",
  "wolverine",
  "wombat",
  "woodpecker",
  "worm",
  "zebra"
];

// HTML elements--------------------------------------------

var animalEl = document.getElementById("animal");
var lettersTriedEl = document.getElementById("letters-tried");
var winsEl = document.getElementById("wins");
var lossesEl = document.getElementById("losses");
var guessesLeftEl = document.getElementById("guesses-left");
var winToLossRatioEl = document.getElementById("ratio");
var startGameEl = document.getElementById("start-game");
var nextWordEd = document.getElementById("next-word");
// Hide 'next-word' button
nextWordEd.style.visibility = "hidden";

// Game variables--------------------------------------------
// Declare all variable before defined;
// They are define when user starts game
var animals;
var lettersTriedEl;
var wins;
var losses;
var guessesLeft;
var winToLossRatio;
var randomIndex;
var animal;
var underscores;
var flag;

// Functions-------------------------------------------------

// Adds spaces to underscored string
var addSpaces = word => {
  return word.split("").join(" ");
};
var replaceAt = (animal, index, replace) => {
  return animal.substring(0, index) + replace + animal.substring(index + 1);
};
var removeAnimal = currentAnimal => {
  var index = animals.indexOf(currentAnimal);
  if (index > -1) {
    animals.splice(index, 1)
  };
};
var nextAnimal = () => {
  randomIndex = Math.floor(Math.random() * animals.length);
  animal = animals[randomIndex];
};
var updateHtmlInfo = () => {
  lettersTriedEl.innerHTML = lettersTried;
  winsEl.innerHTML = wins;
  lossesEl.innerHTML = losses;
  guessesLeftEl.innerHTML = guessesLeft;
  winToLossRatioEl.innerHTML = winToLossRatio;
};
var defineVars = () => {
  // Game variables
  // Copy array on animals from original array
  animals = ANIMALS_OG.slice();
  // Letters tried for word
  lettersTried = "";
  // Wins variable (starts at 0)
  wins = 0;
  // Losses variable (starts at 0)
  losses = 0;
  // User is allowed 10 tries before they lose
  guessesLeft = 10;
  // Win to loss ratio
  winToLossRatio = 0;
  // Generate random number - range is length of animals array
  randomIndex = Math.floor(Math.random() * animals.length);
  // Use random number as index for animals array
  animal = animals[randomIndex];
  // Make a sequence of underscores the length of chosen animal
  underscores = "_".repeat(animal.length);
  // The flag is a boolean that stops script until user
  // clicks on the 'next word' button
  flag = true;
};
function nextWord() {
  flag = true;
  underscores = "_".repeat(animal.length);
  animalEl.innerHTML = addSpaces(underscores);
  nextWordEd.style.visibility = "hidden";
  lettersTried = "";
  lettersTriedEl.innerHTML = lettersTried;
}

// Game script--------------------------------------
var startGame = function() {
  defineVars();
  animalEl.innerHTML = addSpaces(underscores);
  startGameEl.innerHTML = "Start over";
  updateHtmlInfo();

  // Every time a key is pressed by the user
  // The function below is executed
  document.onkeyup = e => {
    // First check if they user pressed a letter before proceeding
    // Use ASCII reference instead of strings
    // Uppercase letters: 65-90 Lowercase letters: 97-122
    var upperLetterPressed = e.which <= 90 && e.which >= 65;
    var lowerLetterPressed = e.which <= 122 && e.which >= 97;
    inputIsLetter = upperLetterPressed || lowerLetterPressed;

    if (inputIsLetter && flag) {
      // Store letter pressed by user in a variable
      var userInput = e.key;
      if (animal.includes(userInput)) {
        for (i = 0; i < animal.length; i++) {
          if (animal[i] === userInput) {
            underscores = replaceAt(underscores, i, userInput);
          }
        }
        animalEl.innerHTML = addSpaces(underscores);
        if (animal === underscores) {
          wins++;
          winToLossRatio = wins / (wins + losses);
          flag = false;
          nextWordEd.style.visibility = "visible";
          animalEl.innerHTML = animal;
          removeAnimal(animal);
          if (animals.length > 0) {
            nextAnimal();
            guessesLeft = 10;
          } else {
            document.onkeyup = null;
            startGameEl.innerHTML = "Start game!";
          }
        }
      } else {
        guessesLeft--;
      }
      if (guessesLeft === 0) {
        losses++;
        winToLossRatio = wins / (wins + losses);
        flag = false;
        nextWordEd.style.visibility = "visible";
        animalEl.innerHTML = animal;
        removeAnimal(animal);
        if (animals.length > 0) {
          nextAnimal();
          guessesLeft = 10;
        } else {
          document.onkeyup = null;
          startGameEl.innerHTML = "Start game!";
        }
      }
      if (!lettersTried.includes(userInput)) {
        lettersTried += userInput;
      }
      updateHtmlInfo();
    }
  };
};

startGameEl.addEventListener("click", startGame);
