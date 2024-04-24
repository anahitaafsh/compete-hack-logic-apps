export const handler = async (event, context) => {
    var myAstral = event.astral;
    var myCreature = event.creature;
    var myTime = event.time; 
    var deliberation = event.message;
    if (myAstral === "moon" && myTime === "dusk") {
        var result = deliberation + "... Well... upon much thought... I, the Sorting Hat, have placed you in SLYTHERIN!";
    }
    else if (myAstral === "moon" && myTime === "dawn") {
        var result = deliberation + "... Well... upon much thought... I, the Sorting Hat, have placed you in RAVENCLAW!";
    }
    else if (myAstral === "stars" && myCreature === "centaur") {
        var result = deliberation + "... Well... upon much thought... I, the Sorting Hat, have placed you in HUFFLEPUFF!";
    }
    else {
       var result = deliberation + "... Well... upon much thought... " + "Your answers would lead me to believe you'd be in Gryffindor, but they are not currently accepting any applicants. Try again next year!";
    }
    return result;   
 };