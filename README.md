# Protobowl Pro
[Protobowl](https://protobowl.com) (by [neotenic](https://github.com/neotenic/protobowl)) is an online question reader and (arguably underrated) quiz bowl study tool.

One surefire way to improve at quiz bowl is to "climb the pyramid" through packet study. When reading questions, players mark where they would theoretically buzz on each tossup and memorize the preceding clues. This enables them to get progressively earlier buzzes as their knowledge base grows.

The live, fast-paced nature of Protobowl simulates tournament play, which is useful in its own right, but it's difficult to absorb new knowledge from simply playing Protobowl without taking the time to card or write down unfamiliar clues. This is where Protobowl Pro comes in!

Protobowl Pro runs in the background of any Protobowl session. Each time you buzz in with a correct answer, the program will log the tossup, the answerline, where you buzzed, and the sentence preceding your buzz. The regular expressions used to split sentences are usually correct, but they can get thrown off by strings like "Mr. Darcy" and "Robert E. Lee".

The interface has only two buttons: one which allows you to export the entire session log as a.txt file to study later, and one which allows you to export the clues preceding your buzzes and their corresponding answers in a .txt file which can be imported into Anki. 

Export Session Log:

``

Export for Anki:
