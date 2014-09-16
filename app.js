var n = 5;

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

var lastAB = findLastAB(baggageList);

function sortBaggage(list) {
    listLength = list.length;
    startPoint = listLength / 2 - 1;
    moveOne = listLength - 3;
    moveBaggage(list, 8, 17);
    moveBaggage(list, 17, 12);
    moveBaggage(list, 12, 15);
    moveBaggage(list, 15, 9);
    moveBaggage(list, 9, 18);
    console.log("After: " + list);
}

sortBaggage(baggageList);
