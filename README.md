# Protobowl Pro
[Protobowl](https://protobowl.com) by [neotenic](https://github.com/neotenic/protobowl) is an online question reader and (criminally underrated) quiz bowl study tool.

One surefire way to improve at quiz bowl is to "climb the pyramid" through packet study. When reading questions, players mark where they would theoretically buzz on each tossup and memorize the preceding clues. This enables them to get progressively earlier buzzes as their knowledge base grows.

The live, fast-paced nature of Protobowl simulates tournament play, which is useful in its own right, but it's difficult to absorb new knowledge from simply playing Protobowl without taking the time to card or write down unfamiliar clues. This is where Protobowl Pro comes in!

## Features
Protobowl Pro runs in the background of any Protobowl session. Each time you buzz in with a correct answer, the program will log the tossup, the answerline, where you buzzed, and the sentence preceding your buzz. The regular expressions used to split sentences are usually correct, but they can get thrown off by mid-sentence periods (e.g. "Mr. Darcy" or "Robert E. Lee"). 

The interface has only two buttons. One allows you to export the entire session log as a .txt file to study later. The other allows you to export the clues preceding your buzzes and their corresponding answers in a .txt file which can be easily imported into Anki. Such a file looks like this:
```
Joseph Warren was killed during this battle.; Battle of Bunker Hill
This monarch faced Wyatt's Rebellion.; Queen Mary I
```
Each line becomes a card--the clue (preceding the semicolon) becomes the front, and the answer (following the semicolon) becomes the back. Ideally, you could import cards from all of your Protobowl sessions into a cumulative "Protobowl" deck!

N.B. Exporting from Protobowl Pro works best in solo rooms, since multiple buzzes on questions make it difficult to parse your buzz point and preceding clue (unless you always ring in first!).

## Installation
I don't have a Chrome Developer Account, so...
1. Grab the .zip from the Releases section and unpack it into a new folder.
2. In Chrome, navigate to chrome://extensions and toggle on Developer Mode (upper-right corner). 
3. Click "Load unpacked" (upper left) and choose the directory you just unzipped the contents into. Protobowl Pro should now be available in your extensions bar! Pin it for maximum convenience.
