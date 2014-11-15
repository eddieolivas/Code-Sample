var n = 12;

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

console.log("n = "+n);

console.log("Before: "+baggageList);

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

//This function finds the last AB before a pair of AA or BB
function findLastABbeforePair(list) {
    var startPoint = findFirstOpenSpot(list);
    for( i = startPoint; i <= list.length; i++) {
        var next = i + 1;
        var next2 = i + 2;
        var next3 = i + 3;
        var next4 = i + 4;
        var value = list[i] + list[next];
        var nextValue = list[next3] + list[next4];
            
        if( (value == "AB") && (nextValue == "BB") ) {
            /*console.log("i = "+i);
            console.log("prev = "+list[prev]+" "+prev);
            console.log("before ="+list[before]);
            console.log("beefore ="+list[beefore]);*/
            return i;
        }
        else if(i >= Math.ceil(n/2) && value == "AB" && list[next2] == "B"){
            console.log("vooodooo");
            return i;
        }
    }
}

function findFirstBAafterPair(list) {
    for( i = list.length / 2 - 2; i <= list.length; i++) {
        var next = i + 1;
        var next1 = i + 2;
        var next2 = i + 3;
        var next3 = i + 4;
        var next4 = i + 5;
        if( list[i] == list[next] && (list[next1] != list[next2]) && (list[next2] == "B" && list[next3] == "A") ) {
            return next2;
        }
        else if( list[i] == list[next] && list[next] == "B" && list[next1] == "A" && list[next3] === "" ) {
            return next;
        }
     }
}

function findFirstBBpair(list) {
    for( i = list.length / 2-2; i <= list.length; i++) {
        var next = i + 1;
        if( (list[i] === list[next]) && (list[i] == "B") ) {
            return i;
        }
    }
}

function findFirstAApair(list) {
    for( i = list.length / 2; i <= list.length; i++) {
        var nextto = i + 1;
        var next1 = i - 1;
        var next2 = i - 2;
        var next3 = i - 3;
        if( (list[i] === list[nextto]) && (list[i] == "A") && (list[next1] == "B" && list[next2] == "B" && list[next3]  == "B") ) {
            return i;
        }
    }
}

function findFirstOpenSpot(list) {
    for( i = list.length / 2 - 2; i <= list.length; i++) {
        var next = i + 1;
        if( list[i] === "" && list[next] === "") {
            var index = i;
            return index;
        }
    }
}

/* The sortBaggage function take all of the previous functions and puts them together to effectively solve the problem.*/
function sortBaggage(list) {
    var listLength = list.length;
    var startPoint = listLength / 2;
    var firstMove = startPoint - 2;
    console.log("move "+findLastAB(list)+" to "+firstMove);
    moveBaggage(list, firstMove, findLastAB(list));
    //moveBaggage(list, 14, 29);
    console.log("After move 1 : " + list);
    console.log("move "+findFirstBA(list)+" to "+findFirstOpenSpot(list));
    moveBaggage(list, findFirstOpenSpot(list), findFirstBA(list)); 
    //moveBaggage(list, 29, 18);
    console.log("After move 2 : " + list);
    
    var otherHalf= null;
    var half = null;
    
    if(isOdd(n))
    {
        if(n % 4 == 1) {
            otherHalf = Math.ceil(n / 2);
            half = Math.ceil(n / 2)-1;
        }
        else {
            otherHalf = Math.ceil(n / 2)+1;
            half = Math.ceil((n - 2) / 2);
        }
    }
    else
    {
        otherHalf = Math.ceil(n / 2);
        half = Math.ceil((n - 2) / 2);
    }
    
    console.log("half = "+half);
    console.log("otherHalf = "+otherHalf);
    
    if(isOdd(n)){
        
        for( e = 1; e < half; e++ ) {
            if( isOdd(e) ){
                console.log("Last AB. e = "+e+" | Move "+findLastABbeforePair(list)+" to "+findFirstOpenSpot(list));
                moveBaggage(list, findFirstOpenSpot(list), findLastABbeforePair(list));
                //moveBaggage(list, 18, 25);
                console.log("After move : " + list);
            }
            else if( !isOdd(e) ) {
                 console.log("First BA. e = "+e+" | Move "+findFirstBAafterPair(list)+" to "+findFirstOpenSpot(list));
                 moveBaggage(list, findFirstOpenSpot(list), findFirstBAafterPair(list));
                 console.log("After move : " + list);
                 //moveBaggage(list, 25, 22);
            }
        }
        
        for( f = 1; f < otherHalf; f++ ) {
            if( isOdd(f) ){
                console.log("First BB. f = "+f+" | Move "+findFirstBBpair(list)+" to "+findFirstOpenSpot(list));
                moveBaggage(list, findFirstOpenSpot(list), findFirstBBpair(list));
                console.log("After move : " + list);
                //moveBaggage(list, 22, 15);
            }
            else if( !isOdd(f)  ){
                console.log("Last AA. f = "+f+" | Move "+findFirstAApair(list)+" to "+findFirstOpenSpot(list));
                moveBaggage(list, findFirstOpenSpot(list), findFirstAApair(list));
                console.log("After move : " + list);
                //moveBaggage(list, 15, 26);
            }
           /* else if( isOdd(f) ){
                console.log("5th IF. f = "+f+" | Move "+findFirstAltPair(list)+" to "+findFirstOpenSpot(list));
                moveBaggage(list, findFirstOpenSpot(list), findFirstAltPair(list));
                console.log("After move : " + list);
                //moveBaggage(list, 26, 19);
            }
            else if( !isOdd(f) ){
                console.log("6th IF. f = "+f+" | Move "+findLastAltPair(list)+" to "+findFirstOpenSpot(list));
                moveBaggage(list, findFirstOpenSpot(list), findLastAltPair(list));
                console.log("After move : " + list);
                //moveBaggage(list, 19, 30);
            } */
            else {
                console.log("For loop finished. e = "+e);
            }
        
        }
    }
    else {
        
        for( e = 1; e < half; e++ ) {
            if( isOdd(e) ){
                console.log("Last AB. e = "+e+" | Move "+findLastABbeforePair(list)+" to "+findFirstOpenSpot(list));
                moveBaggage(list, findFirstOpenSpot(list), findLastABbeforePair(list));
                //moveBaggage(list, 18, 25);
                console.log("After move : " + list);
            }
            else if( !isOdd(e) ) {
                 console.log("First BA. e = "+e+" | Move "+findFirstBAafterPair(list)+" to "+findFirstOpenSpot(list));
                 moveBaggage(list, findFirstOpenSpot(list), findFirstBAafterPair(list));
                 console.log("After move : " + list);
                 //moveBaggage(list, 25, 22);
            }
        }
        
        for( f = 1; f <= otherHalf; f++ ) {
            if( isOdd(f) ){
                console.log("First BB. f = "+f+" | Move "+findFirstBBpair(list)+" to "+findFirstOpenSpot(list));
                moveBaggage(list, findFirstOpenSpot(list), findFirstBBpair(list));
                console.log("After move : " + list);
                //moveBaggage(list, 22, 15);
            }
            else if( !isOdd(f)  ){
                console.log("Last AA. f = "+f+" | Move "+findFirstAApair(list)+" to "+findFirstOpenSpot(list));
                moveBaggage(list, findFirstOpenSpot(list), findFirstAApair(list));
                console.log("After move : " + list);
                //moveBaggage(list, 15, 26);
            }
           /* else if( isOdd(f) ){
                console.log("5th IF. f = "+f+" | Move "+findFirstAltPair(list)+" to "+findFirstOpenSpot(list));
                moveBaggage(list, findFirstOpenSpot(list), findFirstAltPair(list));
                console.log("After move : " + list);
                //moveBaggage(list, 26, 19);
            }
            else if( !isOdd(f) ){
                console.log("6th IF. f = "+f+" | Move "+findLastAltPair(list)+" to "+findFirstOpenSpot(list));
                moveBaggage(list, findFirstOpenSpot(list), findLastAltPair(list));
                console.log("After move : " + list);
                //moveBaggage(list, 19, 30);
            } */
            else {
                console.log("For loop finished. e = "+e);
            }
            
        }
    }
    /* moveBaggage(list, findFirstOpenSpot(list), findLastABbeforePair(list));
    //moveBaggage(list, 18, 25);
    console.log("After move 3 : " + list);
    moveBaggage(list, findLastABbeforePair(list), findFirstBAafterOne(list));
    console.log("After move 4 : " + list);
    //moveBaggage(list, 25, 22); */
    /* moveBaggage(list, findFirstOpenSpot(list), findFirstPair(list));
    console.log("After move 5 : " + list);
    //moveBaggage(list, 22, 15);
    moveBaggage(list, findFirstOpenSpot(list), findLastPair(list));
    console.log("After move 6 : " + list);
    //moveBaggage(list, 15, 26); */
    /*moveBaggage(list, findFirstOpenSpot(list), findFirstAltPair(list));
    console.log("After move 7 : " + list);
    //moveBaggage(list, 26, 19);
    moveBaggage(list, findFirstOpenSpot(list), findLastAltPair(list));
    //moveBaggage(list, 19, 30);*/
    console.log("After: " + list);
}

sortBaggage(baggageList);

// http://keet.wordpress.com/2014/06/28/acm-icpc-2014-solution-to-problem-a-baggage/

// http://icpc.baylor.edu/download/worldfinals/problems/icpc2014.pdf
