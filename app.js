var n = 8;

function isOdd(num) { return num % 2;}

//Setup the baggage list with n*2 baggage spaces and n*2 extra space with alternating B/A values starting at index n*2
function setupBaggage() {
    var baggage = [];
    var twoN = n * 2;
    for ( i = 0 ; i < twoN*2; i++) {
        if( i > twoN - 1) {
            if( isOdd(i) ) {
                baggage[i] = "A";
            }
            else {
                baggage[i] = "B";
            }
        }
        else {
            baggage[i] = "";
        }
    }
    return baggage;
}

var baggageList = setupBaggage();

console.log("Before: " + baggageList);

function moveBaggage(list, old_index, new_index) {
    nextToOld = old_index + 1;
    nextToNew = new_index + 1;
    list[old_index] = list[new_index], list[new_index] = "";
    list[nextToOld] = list[nextToNew], list[nextToNew] = "";
}

function findLastAB(list) {
    for( i = list.length; i <= list.length; i--) {
        if( list[i] == "B" ) {
            var index = i - 1;
            return index;
        }
    }
}

function findFirstBA(list) {
    for( i = list.length /2+1; i <= list.length; i++) {
        if( list[i] == "B" ) {
            var index = i;
            return index;
        }
    }
}

function findFirstBag(list) {
    for( i = 0; i <= list.length; i++) {
        if( list[i] == "B" || list[i] == "A") {
            var index = i;
            return index;
        }
    }
}

function findLastABbeforePair(list) {
    for( i = list.length - 1; i <= list.length; i--) {
        var prev = i - 1;
        var before = i - 2;
        var beefore = i - 3;
        var index = i - 2;
        var listBefore = list[before];
        var listBeefore = list[beefore];
            
        if( (list[i] == list[prev]) && (listBefore != listBeefore) ) {
            /*console.log("i = "+i);
            console.log("prev = "+list[prev]+" "+prev);
            console.log("before ="+list[before]);
            console.log("beefore ="+list[beefore]);*/
            return index;
        }
        else {
            continue;
        }
        
    }
}

function findFirstBAafterOne(list) {
     for( i = list.length /2; i <= list.length; i++) {
        var next = i + 1;
        if( list[i] == "B" && list[next] == "A" ) {
            var index = i;
            return index;
        }
     }
}

var lastAB = findLastAB(baggageList);
var firstBA = findFirstBA(baggageList);
var firstBag = findFirstBag(baggageList);

function sortBaggage(list) {
    listLength = list.length;
    startPoint = listLength / 2;
    firstMove = startPoint - 2;
    moveBaggage(list, firstMove, lastAB);
    console.log("move "+lastAB+" to "+firstMove);
    console.log("After move 1 : " + list);
    moveBaggage(list, lastAB, firstBA); 
    console.log("move "+firstBA+" to "+lastAB);
    console.log("After move 2 : " + list);
    /*var lastABbeforePair = findLastABbeforePair(baggageList);
    moveBaggage(list, firstBA, lastABbeforePair);
    console.log("move "+lastABbeforePair+" to "+firstBA);
    console.log("After move 3 : " + list);*/
    //moveBaggage(list, 14, 29);
    //moveBaggage(list, 29, 18);
    moveBaggage(list, 18, 25);
    moveBaggage(list, 25, 22);
    moveBaggage(list, 22, 15);
    moveBaggage(list, 15, 26);
    moveBaggage(list, 26, 19);
    moveBaggage(list, 19, 30);
    
    /*firstBAafterOne = findFirstBAafterOne(baggageList);
    if( firstBAafterOne > startPoint ) {
        moveBaggage(list, 15, firstBAafterOne);
    }
    else {
        moveBaggage(list, 15, 9);
    }
    console.log("firstBAafterOne = "+firstBAafterOne);
    console.log("move 9 to 15");
    console.log("After move 4 : " + list);
    moveBaggage(list, 9, 18);
    console.log("move 18 to 9");*/
    console.log("After: " + list);
}

sortBaggage(baggageList);

// http://keet.wordpress.com/2014/06/28/acm-icpc-2014-solution-to-problem-a-baggage/

// http://icpc.baylor.edu/download/worldfinals/problems/icpc2014.pdf
