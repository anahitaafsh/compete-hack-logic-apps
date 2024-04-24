export const handler = async (event, context) => {
    var introduction = "I am the Sorting Hat, the smartest hat in all wizardkind! Now, now, what do we have here? Let's see... "
    var myAstral = event.astral;
    var myCreature = event.creature;
    var myTime = event.time; 
    if (myAstral === "moon" && myTime === "dusk") {
        var result = introduction + "you like the " + myAstral + "... what, are you a witch? And " + myTime + ", and so a night owl too?";
    }
    else if (myAstral === "moon" && myTime === "dawn") {
        var result = introduction + "you like the " + myAstral + "... you must think you're so original... and " + myTime + ", and you know what they say, the early bird gets the worm... intriguing indeed...";
    }
    else if (myAstral === "stars" && myCreature === "centaur") {
        var result = introduction + "you like " + myAstral + "... your third grade teacher must have said you were a joy to have in class... and " + myCreature + "... well we all have our quirks, don't we?";
    }
    else {
        var result = introduction + "you like the " + myAstral + "... is that because you think of yourself as a star? And " + myCreature + ", you'd think you'd want to howl at the moon?";
    }
    return {astral: myAstral, creature: myCreature, time: myTime, message: result};   
 };