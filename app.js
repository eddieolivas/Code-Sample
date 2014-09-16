var n = 5;

function isOdd(num) { return num % 2;}

//Function for moving items from one array index to another
Array.prototype.move = function (old_index, new_index) {
    while (old_index < 0) {
        old_index += this.length;
    }
    while (new_index < 0) {
        new_index += this.length;
    }
    if (new_index >= this.length) {
        var k = new_index - this.length;
        while ((k--) + 1) {
            this.push(undefined);
        }
    }
    this.splice(new_index, 0, this.splice(old_index, 1)[0]);
    return this; // for testing purposes
};

function setupBaggage() {
    var baggage = [];
    //Setup the baggage list with n*2 baggage spaces and n*2 extra space with alternating B/A values starting at index n*2
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

//console.log(baggageList[-8]);
console.log(baggageList);
//Testing out the answer for n = 5
function sortBaggage(list) {
    list[8] = list[17];
    list[17] = "";
    list[9] = list[18];
    list[18] = "";
    list[17] = list[12];
    list[12] = "";
    list[18] = list[13];
    list[13] = "";
    list[12] = list[15];
    list[15] = "";
    list[13] = list[16];
    list[16] = "";
    list[15] = list[9];
    list[9] = "";
    list[16] = list[10];
    list[10] = "";
    list[9] = list[18];
    list[18] = "";
    list[10] = list[19];
    list[19] = "";
    console.log(list);
}

sortBaggage(baggageList);