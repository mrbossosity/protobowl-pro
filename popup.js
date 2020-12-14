window.addEventListener("load", () => {
  document.querySelector("#go").addEventListener("click", exportTxt, false);
  document.querySelector("#anki").addEventListener("click", exportAnkiTxt, false)

  function exportTxt() {
    chrome.tabs.query({currentWindow: true, active: true},
    function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, "export txt", exportLog)
    })
  }

  function exportAnkiTxt() {
    chrome.tabs.query({currentWindow: true, active: true},
      function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, "export anki", exportAnki)
      })
  }

  function cleanStr(str) {
    return str.replace(/\s<span class="inline-icon"><span class="asterisk">\(\*\).*<\/span><i class="label icon-white icon-asterisk"><\/i><\/span>\s/, "")
      .replace(/\s<span class="inline-icon"><i class="label.*i><\/span>\s/, "")
      .replace("Good buzz! Make sure you know the next clue: ", "")
  }

  function exportLog(arr) {
    let d = new Date();
    let date = d.toISOString().substring(0, 19);

    var text = `Protobowl Pro, ${date}\n\n`;
    for (var x = 0; x < arr.length; x++) {
      let number = x + 1;
      let tossup = cleanStr(arr[x].text);
      let buzzedOn = cleanStr(arr[x].buzzedOn);
      let precedingClue = cleanStr(arr[x].precedingClue);

      text += `${number}. ${tossup}\n${arr[x].answer}\n\n${buzzedOn}\n${precedingClue}\n\n----------------------------\n\n`
    }

    let txtBlob = new Blob([text], {
      type : 'text/plain'
    });
    
    saveAs(txtBlob, `pbp-${date}.txt`)
  }

  function exportAnki(arr) {
    let d = new Date();
    let date = d.toISOString().substring(0, 19);

    var text = "";
    for (var x = 0; x < arr.length; x++) {
      let clue = cleanStr(arr[x].clue);
      clue = clue.replace(";", "--");
      let answer = cleanStr(arr[x].answer);
      answer = answer.replace(";", "--");
      text += `${clue}; ${answer}\n`
    }

    let txtBlob = new Blob([text], {
      type : 'text/plain'
    });
    saveAs(txtBlob, `pbp-anki-importable-${date}.txt`)
  }

}, false)