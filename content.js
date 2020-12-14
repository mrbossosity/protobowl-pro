chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request == "export txt") {
    sendResponse(tossupDataLog)
  } else {
    sendResponse(ankiLog)
  }
})

var tossupDataLog = [];
var ankiLog = [];

class tossupData {
  constructor(text, buzzedOn, precedingClue, answer) {
    this.text = text;
    this.buzzedOn = `BUZZED ON: ${buzzedOn}`;
    this.precedingClue = `CLUE TO LEARN: ${precedingClue}`;
    this.answer = `ANSWER: ${answer}`
  }
}

class ankiCard {
  constructor(clue, answer) {
    this.clue = clue;
    this.answer = answer
  }
}

function getTossupText() {
  var children = document.querySelector(".well").childNodes;
  var text = "";
  for (var x = 0; x < children.length; x++) { 
    text += children[x].innerHTML
  }
  return text
}

function getAnswerText() {
  return document.querySelector("li.answer").textContent.trim();
}

function getBuzzAndPrecedingClues(text) {
  var sentences = text.match(/[^.?!]+[.!?]+[\])'"`’”]*/g);
  var precedingClue;
  var buzzedOn = sentences.reduce((acc, sentence, index, arr) => {
    if (!(/label icon-white icon-bell/).test(sentence)) return acc;

    let preBuzz = sentence.split("<span")[0];
    let words = preBuzz.split(" ");
    if (index > 0 && words.length < 9) {
      acc += `${arr[index - 1]} ${preBuzz}`;
      precedingClue = (index > 1) ? arr[index - 2] : arr[index - 1]
    } else if (index > 0 && words.length > 9) {
      acc += `${preBuzz}`;
      precedingClue = arr[index - 1]
    } else if (index == 0) {
      acc = `${preBuzz}`;
      precedingClue = `Good buzz! Make sure you know the next clue:${arr[1]}`
    }

    return acc

  }, "");

  let returnVal = (buzzedOn == "") ? ["LAST LINE", sentences[sentences.length - 2]]:[buzzedOn, precedingClue];
  return returnVal
}

function logTossupData() {
  var tossupText = getTossupText();
  var answer = getAnswerText();
  var buzzAndPreceding = getBuzzAndPrecedingClues(tossupText);

  if (tossupText == undefined || answer == undefined || buzzAndPreceding == undefined) return;
  var buzzedOn = buzzAndPreceding[0].trim();
  var precedingClue = buzzAndPreceding[1].trim();

  let obj = new tossupData(tossupText, buzzedOn, precedingClue, answer);
  tossupDataLog.push(obj);
}

function logAnkiData() {
  var currentTossup = tossupDataLog[tossupDataLog.length - 1];
  var answer = currentTossup.answer.substring(8);
  var precedingClue = currentTossup.precedingClue;

  if (precedingClue == undefined || answer == undefined) return;
  var cleanClue = precedingClue.substring(15);
  var cleanAnswer = ((/\[.*\]/).test(answer)) ? answer.split("[")[0]:answer;
  
  let card = new ankiCard(cleanClue, cleanAnswer)
  ankiLog.push(card)
}

document.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    let wait = setTimeout(function() {
      if (document.querySelector("div.annotations > p > a").classList.contains("label-success")) {
          logTossupData();
          logAnkiData();
      } 
    }, 300) 
  }
})