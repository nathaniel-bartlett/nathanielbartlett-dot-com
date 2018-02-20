//////////////////////////////////////////////////
// DOG EAR MENU //////////////////////////////////
//////////////////////////////////////////////////

// currently not using any transition i.e. 0.0s -- make it snappy!

var dogEarNav = document.getElementById("dogEarNav");
var menuIcons = document.getElementById("menuIcons");
var navList = document.getElementById("nav-list");
var navShade = document.getElementById("navShade");

dogEarNav.style.height = "0%";

function openNav() {
  dogEarNav.style.transition = "height 0.0s linear";
  dogEarNav.style.height = Math.round(navList.getBoundingClientRect().height) + "px";
  menuIcons.innerHTML = '<i class="fa fa-minus-circle" id="menu-bars" aria-hidden="true" onclick="closeNav()"></i>';
  /*
  dogEarNav.addEventListener("transitionend", function() {
    dogEarNav.style.overflowY = "auto";
  }, false);
  */
  dogEarNav.style.overflowY = "auto";
  navShade.style.width = "100%";
  navShade.style.height = "100%";
}

function closeNav() {
  dogEarNav.style.transition = "height 0.0s linear";
  dogEarNav.style.height = "0%";
  dogEarNav.style.overflowY = "hidden";
  menuIcons.innerHTML = '<i class="fa fa-bars" id="menu-bars" aria-hidden="true" onclick="openNav()"></i>';
  /*
  dogEarNav.addEventListener("transitionend", function() {
    dogEarNav.style.overflowY = "hidden";
  }, false);
  */
  dogEarNav.style.overflowY = "hidden";
  navShade.style.width = "0%";
  navShade.style.height = "0%";
}

window.addEventListener("resize", menuResize);

function menuResize() {
  dogEarNav.style.transition = "height 0.0s linear";
  if(dogEarNav.style.height != "0%") {
    dogEarNav.style.height = Math.round(navList.getBoundingClientRect().height) + "px";
  }
}

/////////////////////////////////////////////////
// JUMP TO ////////////////////////////////////
/////////////////////////////////////////////////

function navJump(whereTo) {
  if(whereTo == 'top') {
    closeNav();
    window.scrollTo(0,0);
  } else {
      var element = document.getElementById(whereTo);
      //console.log(getYOffset(element).top);
      closeNav();
      window.scrollTo(0, Math.ceil(getYOffset(element).top));
  }
}

function getYOffset(element) {
  element = element.getBoundingClientRect();
  return {
    top: element.top + window.scrollY
  }
}

/////////////////////////////////////////////////
// TEXT BOXES ///////////////////////////////////
/////////////////////////////////////////////////

var infoBoxContainer = document.getElementsByClassName("infoBoxContainer");
var infoBoxTitle = document.getElementsByClassName("infoBoxTitle");
var toggleBarCell = document.getElementsByClassName("toggleBarCell");

var infoBoxTitleNest = document.getElementsByClassName("infoBoxTitleNest");
var toggleBarCellNest = document.getElementsByClassName("toggleBarCellNest");

for (var i = 0; i < infoBoxTitle.length; i++) {
  infoBoxTitle[i].onclick = function(){
    this.parentElement.nextElementSibling.classList.toggle("active-box");
    var textArea = this.nextElementSibling;
    var outerArea = this.parentElement.nextElementSibling;
    var barArea = this.parentElement.nextElementSibling.children[0];
    if (textArea.style.display === "block") {
      textArea.style.display = "none";
      barArea.innerHTML = '<i class="fa fa-chevron-down" aria-hidden="true"></i>';
    } else {
        textArea.style.display = "block";
        //console.log(this.parentElement.nextElementSibling);
        var numOfChevrons = Math.floor(outerArea.scrollHeight / 40);
        barArea.innerHTML = '';
        for (var x = 0; x < numOfChevrons; x++) {
          barArea.innerHTML += '<i class="fa fa-chevron-up" aria-hidden="true">';
        }
    }
  }
}

var sideBarClickY = 0;
window.addEventListener("click", printMousePos);

function printMousePos(event) {
  sideBarClickY = event.clientY;
}

for (var i = 0; i < toggleBarCell.length; i++) {
  toggleBarCell[i].onclick = function(clk){

    this.classList.toggle("active-box");
    var textArea = this.previousElementSibling.children[1];
    var outerArea = this;
    var barArea = this.children[0];
    if (textArea.style.display === "block") {
      textArea.style.display = "none";
      barArea.innerHTML = '<i class="fa fa-chevron-down" aria-hidden="true"></i>';

      // COLLAPSE ABOVE-THE-TOP BOX AT CLICK POINT
      var activeBoxTopY = this.getBoundingClientRect().top;
      var activeBoxClickPointY = clk.clientY;
      if(activeBoxTopY < 0) {
        window.scrollTo(0, (window.scrollY + activeBoxTopY - clk.clientY));
      }
      ///

    } else {
        textArea.style.display = "block";
        var numOfChevrons = Math.floor(outerArea.scrollHeight / 40);
        barArea.innerHTML = '';
        for (var x = 0; x < numOfChevrons; x++) {
          barArea.innerHTML += '<i class="fa fa-chevron-up" aria-hidden="true">';
        }
    }
  }
}
//nest
for (var i = 0; i < toggleBarCellNest.length; i++) {
  toggleBarCellNest[i].onclick = function(clk){
    this.classList.toggle("active-box");
    var textArea = this.previousElementSibling.children[1];
    var outerArea = this;
    var barArea = this.children[0];
    var outerAreaNest = this.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.nextElementSibling;
    var barAreaNest = this.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.nextElementSibling.children[0];
    if (textArea.style.display === "block") {
      textArea.style.display = "none";
      barArea.innerHTML = '<i class="fa fa-chevron-down" aria-hidden="true"></i>';

      // COLLAPSE ABOVE-THE-TOP BOX AT CLICK POINT
      var activeBoxTopY = this.getBoundingClientRect().top;
      var activeBoxClickPointY = clk.clientY;
      if(activeBoxTopY < 0) {
        window.scrollTo(0, (window.scrollY + activeBoxTopY - clk.clientY));
      }
      ///

      //nest part
      barAreaNest.innerHTML = '';
      var numOfChevronsNestClose = Math.floor(outerAreaNest.scrollHeight / 40);
      for (var x = 0; x < numOfChevronsNestClose; x++) {
        barAreaNest.innerHTML += '<i class="fa fa-chevron-up" aria-hidden="true">';
      }
    } else {
        textArea.style.display = "block";
        var numOfChevrons = Math.floor(outerArea.scrollHeight / 40);
        barArea.innerHTML = '';
        for (var x = 0; x < numOfChevrons; x++) {
          barArea.innerHTML += '<i class="fa fa-chevron-up" aria-hidden="true">';
        }
        //nest part
        var numOfChevronsNest = Math.floor(outerAreaNest.scrollHeight / 40);
        barAreaNest.innerHTML = '';
        for (var x = 0; x < numOfChevronsNest; x++) {
          barAreaNest.innerHTML += '<i class="fa fa-chevron-up" aria-hidden="true">';
        }
    }
  }
}

//nest title click
for (var i = 0; i < infoBoxTitleNest.length; i++) {
  infoBoxTitleNest[i].onclick = function(){
    this.parentElement.nextElementSibling.classList.toggle("active-box");
    var textArea = this.nextElementSibling;
    var outerArea = this.parentElement.nextElementSibling;
    var barArea = this.parentElement.nextElementSibling.children[0];
    //nest
    var barAreaNest = this.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.nextElementSibling.children[0];
    var outerAreaNest = this.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.nextElementSibling;

    if (textArea.style.display === "block") {
      textArea.style.display = "none";
      barArea.innerHTML = '<i class="fa fa-chevron-down" aria-hidden="true"></i>';
      //nest part
      barAreaNest.innerHTML = '';
      var numOfChevronsNestClose = Math.floor(outerAreaNest.scrollHeight / 40);
      for (var x = 0; x < numOfChevronsNestClose; x++) {
        barAreaNest.innerHTML += '<i class="fa fa-chevron-up" aria-hidden="true">';
      }
    } else {
        textArea.style.display = "block";
        var numOfChevrons = Math.floor(outerArea.scrollHeight / 40);
        barArea.innerHTML = '';
        for (var x = 0; x < numOfChevrons; x++) {
          barArea.innerHTML += '<i class="fa fa-chevron-up" aria-hidden="true">';
        }
        //nest part
        var numOfChevronsNest = Math.floor(outerAreaNest.scrollHeight / 40);
        barAreaNest.innerHTML = '';
        for (var x = 0; x < numOfChevronsNest; x++) {
          barAreaNest.innerHTML += '<i class="fa fa-chevron-up" aria-hidden="true">';
        }
    }
  }
}

//add starting chevrons
for(var i = 0; i < toggleBarCell.length; i++) {
  toggleBarCell[i].children[0].innerHTML = '<i class="fa fa-chevron-down" aria-hidden="true">';
}
//nest part
for(var i = 0; i < toggleBarCellNest.length; i++) {
  toggleBarCellNest[i].children[0].innerHTML = '<i class="fa fa-chevron-down" aria-hidden="true">';
}

//re-do chevrons for window resize
window.addEventListener("resize", sizeInfoBox);

function sizeInfoBox() {
  var activeBox = document.getElementsByClassName("active-box");

  for (var i = 0; i < activeBox.length; i++) {
    activeBox[i].children[0].innerHTML = '';
    var numOfChevrons = Math.floor(activeBox[i].scrollHeight / 40);
    for (var x = 0; x < numOfChevrons; x++) {
      activeBox[i].children[0].innerHTML += '<i class="fa fa-chevron-up" aria-hidden="true">';
    }
  }
}

///////////////////////////////////////////////////////
// AUDIO PLAYER ///////////////////////////////////
///////////////////////////////////////////////////////////

var discographyTiles = document.getElementById("discography-tiles");
var discCols = document.getElementsByClassName("disc-cols");
var discItems = document.getElementsByClassName("discography-item");
var audioPlayer = document.getElementById("audioPlayer");
var audioPlayerContainer = document.getElementById("audioPlayerContainer");
var nowPlaying = document.getElementById("nowPlaying");
var dotsOuter = document.getElementById("dotsOuter");


var arrayOfDiscItems = [];
var arrayOfColums = [];

// put all albums into an array
for (var i = 0; i < discItems.length; i++) {
  arrayOfDiscItems.push(discItems[i]);
}

// remove disc items from columns
for (var i = 0; i < discCols.length; i++) {
  discCols[i].innerHTML = "";
}

// put all colums (now enpty) into an array
for (var i = 0; i < discographyTiles.children.length; i++) {
  arrayOfColums.push(discCols[i]);
}

windowWidth = window.innerWidth;

// give only one trigger on resize into new column size (4-3-2-1)
var discGate1 = 1;
var discGate12 = 1;
var discGate123 = 1;
var discGate1234 = 1;

// function for creating col/hi pairs
function colHiFunc (col, scrollHeight) {
  this.col = col;  // column number
  this.hi = scrollHeight;  // column height
}

// call resizeDisc right here to initialize colums
resizeDisc();

window.addEventListener("resize", resizeDisc);

function resizeDisc() {

  windowWidth = window.innerWidth;

  if (windowWidth > 1400) {

    var columsInDisc = 4;

    //console.log("1234");

    discGate1 = 1;
    discGate12 = 1;
    discGate123 = 1;
    discGate1234 = 0;

    // remove disc items from columns
    for (var i = 0; i < discCols.length; i++) {
      discCols[i].innerHTML = "";
    }

    //remove other HTML
    discographyTiles.innerHTML = "";

    //add columns
    for (var i = 0; i < columsInDisc; i++) {
      discographyTiles.appendChild(arrayOfColums[i]);
    }

    //calulate size in %
    for (var i = 0; i < discographyTiles.children.length; i++) {
      discographyTiles.children[i].style.width = (100 / columsInDisc) + "%";
    }

    //add disc items
    var itemCounter = 0;

    // array of column and height pairs, objects
    var colHiArr = [];

    // put items in first row
    for (var i = 0; i < columsInDisc; i++) {
      discographyTiles.children[i].appendChild(arrayOfDiscItems[i]);
      itemCounter++;
    }

    // put col height pairs into an array of objects
    for (var z = 0; z < columsInDisc && z < (arrayOfDiscItems.length - itemCounter); z++) {
      var colHiObj = new colHiFunc(z, arrayOfColums[z].scrollHeight);
      colHiArr.push(colHiObj);
    }

    // sort from shortest to tallest
    colHiArr.sort(function (a, b) {
      return a.hi - b.hi;
    });

    // put in columns
    var itemsLeft = arrayOfDiscItems.length - itemCounter; // 7 for 1-2-3-4

    for (var z = 0; z < itemsLeft; z++) {

      var putInColumn = colHiArr[0].col; // put in first one
      discographyTiles.children[putInColumn].appendChild(arrayOfDiscItems[itemCounter]);

      // put col height pairs into an array of objects
      colHiArr = []; // clear old array

      // recalculate column heights after new item added
      for (var x = 0; x < columsInDisc; x++) {
        var colHiObj = new colHiFunc(x, arrayOfColums[x].scrollHeight);
        colHiArr.push(colHiObj);
      }

      // sort from shortest to tallest
      colHiArr.sort(function (a, b) {
        return a.hi - b.hi;
      });

      itemCounter++;
    } // end of add disc items

  }

  if (windowWidth > 1050 && windowWidth < 1400) {

    var columsInDisc = 3;

    //console.log("123");

    discGate1 = 1;
    discGate12 = 1;
    discGate123 = 0;
    discGate1234 = 1;

    for (var i = 0; i < discCols.length; i++) {
      discCols[i].innerHTML = "";
    }

    discographyTiles.innerHTML = "";

    for (var i = 0; i < columsInDisc; i++) {
      discographyTiles.appendChild(arrayOfColums[i]);
    }

    for (var i = 0; i < discographyTiles.children.length; i++) {
      discographyTiles.children[i].style.width = (100 / columsInDisc) + "%";
    }

    var itemCounter = 0;

    var colHiArr = [];

    for (var i = 0; i < columsInDisc; i++) {
      discographyTiles.children[i].appendChild(arrayOfDiscItems[i]);
      itemCounter++;
    }

    for (var z = 0; z < columsInDisc && z < (arrayOfDiscItems.length - itemCounter); z++) {
      var colHiObj = new colHiFunc(z, arrayOfColums[z].scrollHeight);
      colHiArr.push(colHiObj);
    }

    colHiArr.sort(function (a, b) {
      return a.hi - b.hi;
    });

    var itemsLeft = arrayOfDiscItems.length - itemCounter;

    for (var z = 0; z < itemsLeft; z++) {

      var putInColumn = colHiArr[0].col;
      discographyTiles.children[putInColumn].appendChild(arrayOfDiscItems[itemCounter]);

      colHiArr = [];

      for (var x = 0; x < columsInDisc; x++) {
        var colHiObj = new colHiFunc(x, arrayOfColums[x].scrollHeight);
        colHiArr.push(colHiObj);
      }

      colHiArr.sort(function (a, b) {
        return a.hi - b.hi;
      });

      itemCounter++;
    }

  }

  if (windowWidth > 700 && windowWidth < 1050) {

    var columsInDisc = 2;

    //console.log("12");

    discGate1 = 1;
    discGate12 = 0;
    discGate123 = 1;
    discGate1234 = 1;

    for (var i = 0; i < discCols.length; i++) {
      discCols[i].innerHTML = "";
    }

    discographyTiles.innerHTML = "";

    for (var i = 0; i < columsInDisc; i++) {
      discographyTiles.appendChild(arrayOfColums[i]);
    }

    for (var i = 0; i < discographyTiles.children.length; i++) {
      discographyTiles.children[i].style.width = (100 / columsInDisc) + "%";
    }

    var itemCounter = 0;

    var colHiArr = [];

    for (var i = 0; i < columsInDisc; i++) {
      discographyTiles.children[i].appendChild(arrayOfDiscItems[i]);
      itemCounter++;
    }

    for (var z = 0; z < columsInDisc && z < (arrayOfDiscItems.length - itemCounter); z++) {
      var colHiObj = new colHiFunc(z, arrayOfColums[z].scrollHeight);
      colHiArr.push(colHiObj);
    }

    colHiArr.sort(function (a, b) {
      return a.hi - b.hi;
    });

    var itemsLeft = arrayOfDiscItems.length - itemCounter;

    for (var z = 0; z < itemsLeft; z++) {

      var putInColumn = colHiArr[0].col;
      discographyTiles.children[putInColumn].appendChild(arrayOfDiscItems[itemCounter]);

      colHiArr = [];

      for (var x = 0; x < columsInDisc; x++) {
        var colHiObj = new colHiFunc(x, arrayOfColums[x].scrollHeight);
        colHiArr.push(colHiObj);
      }

      colHiArr.sort(function (a, b) {
        return a.hi - b.hi;
      });

      itemCounter++;
    }

  }

  if (windowWidth < 700) {

    var columsInDisc = 1;

    //console.log("1");

    discGate1 = 0;
    discGate12 = 1;
    discGate123 = 1;
    discGate1234 = 1;

    for (var i = 0; i < discCols.length; i++) {
      discCols[i].innerHTML = "";
    }

    discographyTiles.innerHTML = "";

    for (var i = 0; i < columsInDisc; i++) {
      discographyTiles.appendChild(arrayOfColums[i]);
    }

    for (var i = 0; i < discographyTiles.children.length; i++) {
      discographyTiles.children[i].style.width = (100 / columsInDisc) + "%";
    }

    for (var i = 0; i < arrayOfDiscItems.length; i++) {
      discographyTiles.children[0].appendChild(arrayOfDiscItems[i]);
    }

  }
}

var dogEarBottomButton = document.getElementById("dogEarBottomButton");
var audioExpand = document.getElementById("audioExpand");
var audioGhostButton = document.getElementById("audioGhostButton");

audioPlayerContainer.style.height = "0%";

function maxPlayerArea() {
  audioPlayerContainer.style.borderTop = "10px solid #000000";
  audioPlayerContainer.style.height = audioPlayer.scrollHeight + "px";
  audioPlayerContainer.style.overflowY = "auto";
  dogEarBottomButton.style.bottom = "-100px";
  audioExpand.style.bottom = "-93px";
  audioGhostButton.style.bottom = "-120px";
}

function minPlayerArea() {
  //audioPlayerContainer.style.transition = "height 0.0s linear";
  audioPlayerContainer.style.borderTop = "0px solid #000000";
  audioPlayerContainer.style.height = "0%";
  audioPlayerContainer.style.overflowY = "hidden";
  dogEarBottomButton.style.bottom = "0px";
  audioExpand.style.bottom = "7px";
  audioGhostButton.style.bottom = "-20px";
}

window.addEventListener("resize", playerResize);

function playerResize() {
  audioPlayerContainer.style.transition = "height 0.0s linear";
  if(audioPlayerContainer.style.height != "0%") {
    audioPlayerContainer.style.height = Math.round(audioPlayer.getBoundingClientRect().height) + "px";
  }
}

dotsOuter.style.paddingLeft = "12px";
dotsOuter.style.paddingRight = "12px";

shiftDots();

window.addEventListener("resize", shiftDots);

function shiftDots() {

  dotsOuter.style.paddingLeft = "12px";
  dotsOuter.style.paddingRight = "12px";

  var minusPadding = (parseInt(dotsOuter.style.paddingLeft, 10) + parseInt(dotsOuter.style.paddingRight, 10));

  var dotModulo = (dotsOuter.getBoundingClientRect().width - minusPadding) % 16;

  var minDotsPadding = 12;

  if (dotModulo != 0) {
    dotsOuter.style.paddingLeft = Math.round(dotModulo / 2) + minDotsPadding + "px";
  }

}

// audio data objects
// START TIME CAN ONLY BE MULTIPLES OF 10!

var audioFiles = [
  // 0
  {
    file: "audio/mp3/LM_1644_ST.mp3",
    dots: 79,
    start: 280,
    duration: "13:03",
    title: "luminous machine"
  },
  // 1
  {
    file: "audio/mp3/SOL_1644_ST_C.mp3",
    dots: 92,
    start: 500,
    duration: "15:15",
    title: "solar sequence"
  },
  // 2
  {
    file: "audio/mp3/AT_1644_B.mp3",
    dots: 74,
    start: 260,
    duration: "12:11",
    title: "apical topography"
  },
  // 3
  {
    file: "audio/mp3/NET_1644_ST_MIN.mp3",
    dots: 47,
    start: 280,
    duration: "07:48",
    title: "networks"
  },
  // 4
  {
    file: "audio/mp3/CR_palter_qrt_1644_ST_B.mp3",
    dots: 33,
    start: 0,
    duration: "05:22",
    title: "cronometro_palter_quartet"
  },
  // 5
  {
    file: "audio/mp3/IR_1644_ST_B.mp3",
    dots: 64,
    start: 30,
    duration: "10:32",
    title: "impulse response"
  },
  // 6
  {
    file: "audio/mp3/CR_palter_solo_1644_ST_B.mp3",
    dots: 32,
    start: 0,
    duration: "05:18",
    title: "cronometro_palter_solo"
  },
  // 7
  {
    file: "audio/mp3/WE_1644_ST_B.mp3",
    dots: 40,
    start: 50,
    duration: "06:37",
    title: "wave energy"
  },
  // 8
  {
    file: "audio/mp3/CR_bugbee_duo_1644_ST.mp3",
    dots: 32,
    start: 0,
    duration: "05:12",
    title: "cronometro_bugbee_duo"
  },
  // 9
  {
    file: "audio/mp3/BP_1644_ST_B.mp3",
    dots: 18,
    start: 50,
    duration: "02:52",
    title: "bright points"
  },
  // 10
  {
    file: "audio/mp3/NT_1644_ST_C.mp3",
    dots: 226,
    start: 390,
    duration: "37:38",
    title: "neoteric topology"
  },
  // 11
  {
    file: "audio/mp3/TSP-A_1644_ST.mp3",
    dots: 134,
    start: 460,
    duration: "22:15",
    title: "timeSpacePlace (a-side)"
  },
  // 12
  {
    file: "audio/mp3/TSP-B_1644_ST.mp3",
    dots: 134,
    start: 850,
    duration: "22:15",
    title: "timeSpacePlace (b-side)"
  },
  // 13
  {
    file: "audio/mp3/CLANG_1644_ST.mp3",
    dots: 242,
    start: 0,
    duration: "40:12",
    title: "(((clang)))"
  },
  // 14
  {
    file: "audio/mp3/TE_1644_ST.mp3",
    dots: 258,
    start: 480,
    duration: "42:54",
    title: "trichotomic ecology"
  },
  // 15
  {
    file: "audio/mp3/star_birth_1644_ST.mp3",
    dots: 121,
    start: 150,
    duration: "20:04",
    title: "star_birth"
  },
  // 16
  {
    file: "audio/mp3/heap_1644_ST_1730_clip.mp3",
    dots: 106,
    start: 440,
    duration: "17:30",
    title: "heap"
  },
  // 17
  {
    file: "audio/mp3/glass_opening_1644_ST.mp3",
    dots: 40,
    start: 0,
    duration: "06:31",
    title: "opening"
  },
  // 18
  {
    file: "audio/mp3/schindler_precipice_1644_ST.mp3",
    dots: 107,
    start: 0,
    duration: "17:43",
    title: "precipice"
  },
  // 19
  {
    file: "audio/mp3/wilder_interlude_1644_ST.mp3",
    dots: 35,
    start: 0,
    duration: "05:41",
    title: "interlude"
  },
  // 20
  {
    file: "audio/mp3/thomas_silhouettes_1_1644_ST.mp3",
    dots: 12,
    start: 0,
    duration: "01:57",
    title: "Silhouettes: 1. Like Toru Takemitsu Crossed With Bill Evans"
  },
  // 21
  {
    file: "audio/mp3/thomas_silhouettes_2_1644_ST.mp3",
    dots: 12,
    start: 0,
    duration: "01:52",
    title: "Silhouettes: 2. Like Igor Stravinsky Crossed With Thelonious Monk"
  },
  // 22
  {
    file: "audio/mp3/thomas_silhouettes_3_1644_ST.mp3",
    dots: 23,
    start: 0,
    duration: "03:44",
    title: "Silhouettes: 3. Like Igor Stravinsky Crossed With Thelonious Monk"
  },
  // 23
  {
    file: "audio/mp3/thomas_silhouettes_4_1644_ST.mp3",
    dots: 16,
    start: 0,
    duration: "02:37",
    title: "Silhouettes: 4. Like Igor Stravinsky Crossed With Thelonious Monk"
  },
  // 24
  {
    file: "audio/mp3/reich_vermont_1644_ST.mp3",
    dots: 69,
    start: 170,
    duration: "11:21",
    title: "vermont counterpoint"
  },
  // 25
  {
    file: "audio/mp3/interviews/jul14PI.mp3",
    dots: 358,
    start: 0,
    duration: "59:18",
    title: "patch in"
  },
  // 26
  {
    file: "audio/mp3/interviews/jan10ST.mp3",
    dots: 177,
    start: 0,
    duration: "29:29",
    title: "Studio Tulsa"
  },
  // 27
  {
    file: "audio/mp3/interviews/sept106MM.mp3",
    dots: 159,
    start: 0,
    duration: "26:22",
    title: "The Midday"
  },
  // 28
  {
    file: "audio/mp3/interviews/01-30-18_WORT_Interivew.mp3",
    dots: 261,
    start: 0,
    duration: "43:29",
    title: "Back Porch Serenade"
  },
  // 29
  {
    file: "audio/mp3/two_sec_silence.mp3",
    dots: 0,
    start: 0,
    duration: "0",
    title: "0"
  }
];

// end audio data objects

// start audio player code body

var audio = document.getElementById("audio");
var audioPlayerClock = document.getElementById("audioPlayerClock");
var playAudioPlayer = document.getElementById("playAudioPlayer");

audio.addEventListener("timeupdate", timeUpdate, false);

// Long files (40min+) are having touble loading if chosen first.
// If a shorter file is played first, then the longer files will play

function onEnded() {
  var audioDotInnerBack = document.getElementsByClassName("audioDotInnerBack");
  audioDotInnerBack[audioDotInnerBack.length - 1].style.opacity = 0;
  playAudioPlayer.innerHTML = '<i class="fa fa-play-circle playerButtons" aria-hidden="true"></i>';
  playAudioPlayer.classList.remove('audioIsPlaying');
  setCurrentDot(0);
  audioPlayerClock.innerHTML = '00:00';
}

var newFileLoaded = 0; // gate to initilise time skip on firt play of file
var currentFileLoaded = 999;
var dotPressPlayBlock = 0;
var blockWhileLoading = 0;

function timeUpdate() {

  if(playAudioPlayer.classList.contains('audioIsPlaying') && audio.currentTime > 0.5) {

    if(newFileLoaded == 1) {
      audio.pause();

      playAudioPlayer.classList.remove('audioIsPlaying');
      //console.log(playAudioPlayer);
      audio.currentTime = audioFiles[currentFileLoaded].start;
      audio.volume = 1;
      audio.play();
      playAudioPlayer.classList.add('audioIsPlaying');

      newFileLoaded = 0;
    }

    blockWhileLoading = 1;
  	audioPlayerClock.innerHTML = calculateCurrentValue(audio.currentTime);
    var currentDotIndex = Math.floor(audio.currentTime / 10);
    var opacityAmount = 1 - ((audio.currentTime / 10) - currentDotIndex);
    var audioDotInnerBack = document.getElementsByClassName("audioDotInnerBack");
    audioDotInnerBack[currentDotIndex].style.opacity = opacityAmount;
    if (audioDotInnerBack[currentDotIndex - 1] > 0) {
      audioDotInnerBack[currentDotIndex - 1].style.opacity = 0;
    }
  }
}

function launchAudio(fileNumber) {
  // console.log('longAudio()');
  var audioDelay;

  audio.volume = 0.5;
  audio.src = audioFiles[29].file;
  audio.play();
  audioDelay = setTimeout(function(){ launchAudioNext(fileNumber); }, 200);

  audioPlayerClock.innerHTML = 'LOADING';

  if(playAudioPlayer.classList.contains('audioIsPlaying')) {
    playAudioPlayer.classList.remove('audioIsPlaying');
  }

  nowPlaying.innerHTML = '' + audioFiles[fileNumber].title + ' <span class="discDuration">' + audioFiles[fileNumber].duration + '</span>';

  var numberOfDots = audioFiles[fileNumber].dots;
  dotsOuter.innerHTML = '';

  for(var i = 0; i < numberOfDots; i++) {
    dotsOuter.innerHTML += '<div class="audioDotOutter"><div class="audioDotInner"><div class="audioDotInnerBack"></div></div></div>';
  }

  setCurrentDot(audioFiles[fileNumber].start / 10);
  playAudioPlayer.innerHTML = '<i class="fa fa-pause-circle playerButtons" aria-hidden="true"></i>';
  maxPlayerArea();
}

function launchAudioNext(fileNumber) {
  // console.log('launchAudio()');
  audio.pause();

  newFileLoaded = 1;
  dotPressPlayBlock = 0;
  currentFileLoaded = fileNumber;
  blockWhileLoading = 0;

  audio.src = audioFiles[fileNumber].file;
  audio.volume = 0;

  var audioDotInnerBack = document.getElementsByClassName("audioDotInnerBack");

  audio.load();

  for (var i = 0; i < dotsOuter.children.length; i++) {

    (function(index){
      dotsOuter.children[i].onclick = function(){
        if(blockWhileLoading == 1) {
          dotPressPlayBlock = 1;
          audio.pause();
          audio.currentTime = (index * 10);
          audioPlayerClock.innerHTML = 'SEEKING';
          for(var x = 0; x < index; x++) {
            audioDotInnerBack[x].style.opacity = "0";
          }
          for(var y = index; y < audioDotInnerBack.length; y++) {
            audioDotInnerBack[y].style.opacity = "1";
          }

          if(playAudioPlayer.classList.contains('audioIsPlaying')) {
            audio.play();
          }
        }
      }
    })(i);
  }

}

audio.onseeked = function() {
    audioPlayerClock.innerHTML = calculateCurrentValue(audio.currentTime);
};

audio.addEventListener('loadeddata', function() {

  if(audio.readyState >= 2) {
    if(dotPressPlayBlock == 0) {
      audio.play();
      playAudioPlayer.classList.add('audioIsPlaying');
    }
  }
});

function closeAudio() {
  audio.pause();
  playAudioPlayer.classList.remove('audioIsPlaying');
  audioPlayerContainer.style.height = "0%";
  audioPlayerContainer.style.overflowY = "hidden";
}

function setCurrentDot(startDot) {
  var audioDotInnerBack = document.getElementsByClassName("audioDotInnerBack");
  for(var x = 0; x < startDot; x++) {
    audioDotInnerBack[x].style.opacity = "0";
  }
  for(var y = startDot; y < audioDotInnerBack.length; y++) {
    audioDotInnerBack[y].style.opacity = "1";
  }
}

function playAudio() {
  if(blockWhileLoading == 1) {
    if(playAudioPlayer.classList.contains('audioIsPlaying')) {
      audio.pause();
      playAudioPlayer.classList.remove('audioIsPlaying');
      playAudioPlayer.innerHTML = '<i class="fa fa-play-circle playerButtons" aria-hidden="true"></i>';
    }
    else {
      audio.play();
      playAudioPlayer.classList.add('audioIsPlaying');
      playAudioPlayer.innerHTML = '<i class="fa fa-pause-circle playerButtons" aria-hidden="true"></i>';
    }
  }
}

function durMinSec(length) {
  var minutes = Math.floor(length / 60),
    seconds_int = length - minutes * 60,
    seconds_str = seconds_int.toString(),
    seconds = seconds_str.substr(0, 2),
    time = minutes + ':' + seconds

  return time;
}

function calculateCurrentValue(currentTime) {
  var current_hour = parseInt(currentTime / 3600) % 24,
    current_minute = parseInt(currentTime / 60) % 60,
    current_seconds_long = currentTime % 60,
    current_seconds = current_seconds_long.toFixed(),
    current_time = (current_minute < 10 ? "0" + current_minute : current_minute) + ":" + (current_seconds < 10 ? "0" + current_seconds : current_seconds);

  return current_time;
}

// INFO BUTTON POPUP

var audioPlayerInfoDiv = document.getElementById("audioPlayerInfoDiv");
var audioPlayerInfoDivIn = document.getElementById("audioPlayerInfoDivIn");
var audioInfoShade = document.getElementById("audioInfoShade");

audioPlayerInfoDiv.style.display = "none";

function infoAudio() {
  if (audioPlayerInfoDiv.style.display === "none") {
    audioPlayerInfoDivIn.style.maxHeight = window.innerHeight - 60 + "px";
    audioInfoShade.style.width = "100%";
    audioInfoShade.style.height = "100%";
    audioPlayerInfoDiv.style.display = "block";
  }
  else {
    audioPlayerInfoDiv.style.display = "none";
    audioInfoShade.style.width = "0%";
    audioInfoShade.style.height = "0%";
  }
}

window.addEventListener("resize", audioInfoPopupHeight);

function audioInfoPopupHeight() {
  if(audioPlayerInfoDiv.style.display === "block") {
    audioPlayerInfoDivIn.style.maxHeight = window.innerHeight - 60 + "px";
  }
}

//////////////////////////////////////////////////
// LOGO //////////////////////////////////////////
//////////////////////////////////////////////////

var logo = document.getElementById("logo");

// initialize
logoPosition();

window.addEventListener("resize", logoPosition);

function logoPosition() {

  var x = window.innerWidth;
  var y = window.innerHeight;

  if(logo.hasAttribute("width")) {
    logo.removeAttribute("width");
  }
  if(logo.hasAttribute("height")) {
    logo.removeAttribute("height");
  }
  if((x / y) >= 1.4) {
    logo.setAttribute("height", "100%");
    //console.log("X");
  }
  else {
    logo.setAttribute("width", "100%");
    //console.log("Y");
  }
}
