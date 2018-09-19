// ------------------------------------------------------------------------------------------------//
//                                                                                                 //
// DOG EAR MENU                                                                                    //
//                                                                                                 //
// ------------------------------------------------------------------------------------------------//

var dogEarNav = document.getElementById('dogEarNav');
var menuIcons = document.getElementById('menuIcons');
var navList = document.getElementById('nav-list');
var navShade = document.getElementById('navShade');
var firstMenuButton = document.getElementById('firstMenuButton');
var menuContainer = document.getElementById('menu-container');

dogEarNav.style.height = '0%';

function centerMenuButtons() {

    var menuButtonWidth;
    var marLeftNavList;

    menuButtonWidth = firstMenuButton.getBoundingClientRect().width;
    marLeftNavList = ((menuContainer.getBoundingClientRect().width) % menuButtonWidth) / 2;

    navList.style.marginLeft = Math.round(marLeftNavList) + 'px';

}

function openNav() {

    dogEarNav.style.transition = 'height 0.0s linear';
    dogEarNav.style.height = Math.round(navList.getBoundingClientRect().height) + 'px';
    menuIcons.innerHTML = '<i class="fa fa-minus-circle" id="menu-bars" aria-hidden="true" onclick="closeNav()"></i>';
    dogEarNav.style.overflowY = 'auto';
    navShade.style.width = '100%';
    navShade.style.height = '100%';

    centerMenuButtons();

}

function closeNav() {

    dogEarNav.style.transition = 'height 0.0s linear';
    dogEarNav.style.height = '0%';
    dogEarNav.style.overflowY = 'hidden';
    menuIcons.innerHTML = '<i class="fa fa-bars" id="menu-bars" aria-hidden="true" onclick="openNav()"></i>';
    dogEarNav.style.overflowY = 'hidden';
    navShade.style.width = '0%';
    navShade.style.height = '0%';

}

function menuResize() {

    dogEarNav.style.transition = 'height 0.0s linear';

    if (dogEarNav.style.height !== '0%') {
        dogEarNav.style.height = Math.round(navList.getBoundingClientRect().height) + 'px';
    }

}

window.addEventListener('resize', centerMenuButtons);
window.addEventListener('resize', menuResize);


// ------------------------------------------------------------------------------------------------//
//                                                                                                 //
// JUMP TO                                                                                         //
//                                                                                                 //
// ------------------------------------------------------------------------------------------------//

function getYOffset(element) {

    var output;

    output = element.getBoundingClientRect();

    return {
        top: output.top + window.scrollY
    };

}

function navJump(whereTo) {

    var element;

    if (whereTo === 'top') {

        closeNav();
        window.scrollTo(0, 0);

    } else {

        element = document.getElementById(whereTo);
        closeNav();
        window.scrollTo(0, Math.ceil(getYOffset(element).top));

    }

}

// ------------------------------------------------------------------------------------------------//
//                                                                                                 //
// EXPANDABLE TEXT BOXES                                                                           //
//                                                                                                 //
// ------------------------------------------------------------------------------------------------//

var infoBoxTitle = document.getElementsByClassName('infoBoxTitle');
var toggleBarCell = document.getElementsByClassName('toggleBarCell');
var infoBoxTitleNest = document.getElementsByClassName('infoBoxTitleNest');
var toggleBarCellNest = document.getElementsByClassName('toggleBarCellNest');

function titleClick() {

    var textArea;
    var outerArea;
    var barArea;
    var numOfChevrons;
    var i;

    this.parentElement.nextElementSibling.classList.toggle('active-box');
    textArea = this.nextElementSibling;
    outerArea = this.parentElement.nextElementSibling;
    barArea = this.parentElement.nextElementSibling.children[0];

    if (textArea.style.display === 'block') {

        textArea.style.display = 'none';
        barArea.innerHTML = '<i class="fa fa-chevron-down" aria-hidden="true"></i>';

    } else {

        textArea.style.display = 'block';
        numOfChevrons = Math.floor(outerArea.scrollHeight / 40);
        barArea.innerHTML = '';

        for (i = 0; i < numOfChevrons; i += 1) {
            barArea.innerHTML += '<i class="fa fa-chevron-up" aria-hidden="true">';
        }

    }
}

(function () {

    var i;

    for (i = 0; i < infoBoxTitle.length; i += 1) {
        infoBoxTitle[i].onclick = titleClick;
    }

}());

function toggleBarClick(clk) {

    var textArea;
    var outerArea;
    var barArea;
    var numOfChevrons;
    var i;

    this.classList.toggle('active-box');

    textArea = this.previousElementSibling.children[1];
    outerArea = this;
    barArea = this.children[0];
    
    if (textArea.style.display === 'block') {

        var activeBoxTopY;

        textArea.style.display = 'none';
        barArea.innerHTML = '<i class="fa fa-chevron-down" aria-hidden="true"></i>';
        activeBoxTopY = this.getBoundingClientRect().top;

        if (activeBoxTopY < 0) {
            window.scrollTo(0, ((window.scrollY + activeBoxTopY) - clk.clientY));
        }

    } else {
        
        textArea.style.display = 'block';
        numOfChevrons = Math.floor(outerArea.scrollHeight / 40);
        barArea.innerHTML = '';
        
        for (i = 0; i < numOfChevrons; i += 1) {
            barArea.innerHTML += '<i class="fa fa-chevron-up" aria-hidden="true">';
        }
    }
}

(function () {

    var i;

    for (i = 0; i < toggleBarCell.length; i += 1) {
        toggleBarCell[i].onclick = toggleBarClick;
    }

}());

function nestToggleBarClick(clk) {

    this.classList.toggle('active-box');

    var textArea;
    var outerArea;
    var barArea;
    var outerAreaNest;
    var barAreaNest;
    var numOfChevrons;
    var numOfChevronsNest;
    var numOfChevronsNestClose;
    var activeBoxTopY;
    var i;

    textArea = this.previousElementSibling.children[1];
    outerArea = this;
    barArea = this.children[0];
    outerAreaNest = this.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.nextElementSibling;
    barAreaNest = this.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.nextElementSibling.children[0];

    if (textArea.style.display === 'block') {

        textArea.style.display = 'none';
        barArea.innerHTML = '<i class="fa fa-chevron-down" aria-hidden="true"></i>';
        activeBoxTopY = this.getBoundingClientRect().top;

        if (activeBoxTopY < 0) {
            window.scrollTo(0, ((window.scrollY + activeBoxTopY) - clk.clientY));
        }

        // Nest
        barAreaNest.innerHTML = '';
        numOfChevronsNestClose = Math.floor(outerAreaNest.scrollHeight / 40);

        for (i = 0; i < numOfChevronsNestClose; i += 1) {
            barAreaNest.innerHTML += '<i class="fa fa-chevron-up" aria-hidden="true">';
        }

    } else {

        textArea.style.display = 'block';
        numOfChevrons = Math.floor(outerArea.scrollHeight / 40);
        barArea.innerHTML = '';

        for (i = 0; i < numOfChevrons; i += 1) {
            barArea.innerHTML += '<i class="fa fa-chevron-up" aria-hidden="true">';
        }

        // Nest
        numOfChevronsNest = Math.floor(outerAreaNest.scrollHeight / 40);
        barAreaNest.innerHTML = '';

        for (i = 0; i < numOfChevronsNest; i += 1) {
            barAreaNest.innerHTML += '<i class="fa fa-chevron-up" aria-hidden="true">';
        }
    }
}

(function () {

    var i;

    for (i = 0; i < toggleBarCellNest.length; i += 1) {
        toggleBarCellNest[i].onclick = nestToggleBarClick;
    }

}());

function nestTitleClick() {

    this.parentElement.nextElementSibling.classList.toggle('active-box');

    var textArea;
    var outerArea;
    var barArea;
    var barAreaNest;
    var outerAreaNest;
    var numOfChevronsNestClose;
    var numOfChevrons;
    var numOfChevronsNest;
    var i;

    textArea = this.nextElementSibling;
    outerArea = this.parentElement.nextElementSibling;
    barArea = this.parentElement.nextElementSibling.children[0];
    barAreaNest = this.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.nextElementSibling.children[0];
    outerAreaNest = this.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.nextElementSibling;

    if (textArea.style.display === 'block') {
        textArea.style.display = 'none';
        barArea.innerHTML = '<i class="fa fa-chevron-down" aria-hidden="true"></i>';

        barAreaNest.innerHTML = '';
        numOfChevronsNestClose = Math.floor(outerAreaNest.scrollHeight / 40);

        for (i = 0; i < numOfChevronsNestClose; i += 1) {
            barAreaNest.innerHTML += '<i class="fa fa-chevron-up" aria-hidden="true">';
        }

    } else {

        textArea.style.display = 'block';
        numOfChevrons = Math.floor(outerArea.scrollHeight / 40);
        barArea.innerHTML = '';

        for (i = 0; i < numOfChevrons; i += 1) {
            barArea.innerHTML += '<i class="fa fa-chevron-up" aria-hidden="true">';
        }

        numOfChevronsNest = Math.floor(outerAreaNest.scrollHeight / 40);
        barAreaNest.innerHTML = '';

        for (i = 0; i < numOfChevronsNest; i += 1) {
            barAreaNest.innerHTML += '<i class="fa fa-chevron-up" aria-hidden="true">';
        }
    }
}

(function () {

    var i;

    for (i = 0; i < infoBoxTitleNest.length; i += 1) {
        infoBoxTitleNest[i].onclick = nestTitleClick;
    }
    
    for (i = 0; i < toggleBarCell.length; i += 1) {
        toggleBarCell[i].children[0].innerHTML = '<i class="fa fa-chevron-down" aria-hidden="true">';
    }
    
    for (i = 0; i < toggleBarCellNest.length; i += 1) {
        toggleBarCellNest[i].children[0].innerHTML = '<i class="fa fa-chevron-down" aria-hidden="true">';
    }

}());

function sizeInfoBox() {

    var activeBox;
    var numOfChevrons;
    var i;
    var x;

    activeBox = document.getElementsByClassName('active-box');

    for (i = 0; i < activeBox.length; i += 1) {

        activeBox[i].children[0].innerHTML = '';
        numOfChevrons = Math.floor(activeBox[i].scrollHeight / 40);

        for (x = 0; x < numOfChevrons; x += 1) {
            activeBox[i].children[0].innerHTML += '<i class="fa fa-chevron-up" aria-hidden="true">';
        }
    }
}

window.addEventListener('resize', sizeInfoBox);


// ------------------------------------------------------------------------------------------------//
//                                                                                                 //
// DISCOGRAPHY BOXES                                                                               //
//                                                                                                 //
// ------------------------------------------------------------------------------------------------//

var discographyTiles = document.getElementById('discography-tiles');
var discCols = document.getElementsByClassName('disc-cols');
var discItems = document.getElementsByClassName('discography-item');
var audioPlayer = document.getElementById('audioPlayer');
var audioPlayerContainer = document.getElementById('audioPlayerContainer');
var nowPlaying = document.getElementById('nowPlaying');
var dotsOuter = document.getElementById('dotsOuter');
var arrayOfDiscItems = [];
var arrayOfColums = [];

(function () {

    var i;

    // Put all albums into an array
    for (i = 0; i < discItems.length; i += 1) {
        arrayOfDiscItems.push(discItems[i]);
    }

    // Remove disc items from columns
    for (i = 0; i < discCols.length; i += 1) {
        discCols[i].innerHTML = '';
    }

    // Put all colums (now enpty) into an array
    for (i = 0; i < discographyTiles.children.length; i += 1) {
        arrayOfColums.push(discCols[i]);
    }

}());

var windowWidth = window.innerWidth;

// function for creating col/hi pairs
function ColHiFunc(col, scrollHeight) {
    this.col = col;
    this.hi = scrollHeight;
}

function resizeDisc() {

    var columsInDisc;
    var itemCounter;
    var colHiArr;
    var colHiObj;
    var itemsLeft;
    var putInColumn;
    var i;
    var x;

    windowWidth = window.innerWidth;

    if (windowWidth > 1400) {
       
        columsInDisc = 4;

        // remove disc items from columns
        for (i = 0; i < discCols.length; i += 1) {
            discCols[i].innerHTML = '';
        }

        // Remove other HTML
        discographyTiles.innerHTML = '';

        // Add columns
        for (i = 0; i < columsInDisc; i += 1) {
            discographyTiles.appendChild(arrayOfColums[i]);
        }

        // Calulate size in %
        for (i = 0; i < discographyTiles.children.length; i += 1) {
            discographyTiles.children[i].style.width = (100 / columsInDisc) + '%';
        }

        // Add disc items
        itemCounter = 0;

        // Array of column and height pairs, objects
        colHiArr = [];

        // Put items in first row
        for (i = 0; i < columsInDisc; i += 1) {
            discographyTiles.children[i].appendChild(arrayOfDiscItems[i]);
            itemCounter += 1;
        }

        // Put col height pairs into an array of objects
        for (i = 0; i < columsInDisc && i < (arrayOfDiscItems.length - itemCounter); i += 1) {
            colHiObj = new ColHiFunc(i, arrayOfColums[i].scrollHeight);
            colHiArr.push(colHiObj);
        }

        // Sort from shortest to tallest
        colHiArr.sort(function (a, b) {
            return a.hi - b.hi;
        });

        // Put in columns
        itemsLeft = arrayOfDiscItems.length - itemCounter;

        for (i = 0; i < itemsLeft; i += 1) {

            putInColumn = colHiArr[0].col; // put in first one
            discographyTiles.children[putInColumn].appendChild(arrayOfDiscItems[itemCounter]);

            // Put col height pairs into an array of objects
            colHiArr = []; // clear old array

            // Recalculate column heights after new item added
            for (x = 0; x < columsInDisc; x += 1) {
                colHiObj = new ColHiFunc(x, arrayOfColums[x].scrollHeight);
                colHiArr.push(colHiObj);
            }

            // Sort from shortest to tallest
            colHiArr.sort(function (a, b) {
                return a.hi - b.hi;
            });

            itemCounter += 1;
        }

    }

    if (windowWidth > 1050 && windowWidth < 1400) {

        columsInDisc = 3;

        for (i = 0; i < discCols.length; i += 1) {
            discCols[i].innerHTML = '';
        }

        discographyTiles.innerHTML = '';

        for (i = 0; i < columsInDisc; i += 1) {
            discographyTiles.appendChild(arrayOfColums[i]);
        }

        for (i = 0; i < discographyTiles.children.length; i += 1) {
            discographyTiles.children[i].style.width = (100 / columsInDisc) + '%';
        }

        itemCounter = 0;
        colHiArr = [];

        for (i = 0; i < columsInDisc; i += 1) {
            discographyTiles.children[i].appendChild(arrayOfDiscItems[i]);
            itemCounter += 1;
        }

        for (i = 0; i < columsInDisc && i < (arrayOfDiscItems.length - itemCounter); i += 1) {
            colHiObj = new ColHiFunc(i, arrayOfColums[i].scrollHeight);
            colHiArr.push(colHiObj);
        }

        colHiArr.sort(function (a, b) {
            return a.hi - b.hi;
        });

        itemsLeft = arrayOfDiscItems.length - itemCounter;

        for (i = 0; i < itemsLeft; i += 1) {

            putInColumn = colHiArr[0].col;
            discographyTiles.children[putInColumn].appendChild(arrayOfDiscItems[itemCounter]);

            colHiArr = [];

            for (x = 0; x < columsInDisc; x += 1) {
                colHiObj = new ColHiFunc(x, arrayOfColums[x].scrollHeight);
                colHiArr.push(colHiObj);
            }

            colHiArr.sort(function (a, b) {
                return a.hi - b.hi;
            });

            itemCounter += 1;
        }

    }

    if (windowWidth > 700 && windowWidth < 1050) {

        columsInDisc = 2;

        for (i = 0; i < discCols.length; i += 1) {
            discCols[i].innerHTML = '';
        }

        discographyTiles.innerHTML = '';

        for (i = 0; i < columsInDisc; i += 1) {
            discographyTiles.appendChild(arrayOfColums[i]);
        }

        for (i = 0; i < discographyTiles.children.length; i += 1) {
            discographyTiles.children[i].style.width = (100 / columsInDisc) + '%';
        }

        itemCounter = 0;
        colHiArr = [];

        for (i = 0; i < columsInDisc; i += 1) {
            discographyTiles.children[i].appendChild(arrayOfDiscItems[i]);
            itemCounter += 1;
        }

        for (i = 0; i < columsInDisc && i < (arrayOfDiscItems.length - itemCounter); i += 1) {
            colHiObj = new ColHiFunc(i, arrayOfColums[i].scrollHeight);
            colHiArr.push(colHiObj);
        }

        colHiArr.sort(function (a, b) {
            return a.hi - b.hi;
        });

        itemsLeft = arrayOfDiscItems.length - itemCounter;

        for (i = 0; i < itemsLeft; i += 1) {

            putInColumn = colHiArr[0].col;
            discographyTiles.children[putInColumn].appendChild(arrayOfDiscItems[itemCounter]);

            colHiArr = [];

            for (x = 0; x < columsInDisc; x += 1) {
                colHiObj = new ColHiFunc(x, arrayOfColums[x].scrollHeight);
                colHiArr.push(colHiObj);
            }

            colHiArr.sort(function (a, b) {
                return a.hi - b.hi;
            });

            itemCounter += 1;
        }

    }

    if (windowWidth < 700) {
        
        columsInDisc = 1;

        for (i = 0; i < discCols.length; i += 1) {
            discCols[i].innerHTML = '';
        }

        discographyTiles.innerHTML = '';

        for (i = 0; i < columsInDisc; i += 1) {
            discographyTiles.appendChild(arrayOfColums[i]);
        }

        for (i = 0; i < discographyTiles.children.length; i += 1) {
            discographyTiles.children[i].style.width = (100 / columsInDisc) + '%';
        }

        for (i = 0; i < arrayOfDiscItems.length; i += 1) {
            discographyTiles.children[0].appendChild(arrayOfDiscItems[i]);
        }

    }
}

window.addEventListener('resize', resizeDisc);

// call resizeDisc right here to initialize colums
resizeDisc();


// ------------------------------------------------------------------------------------------------//
//                                                                                                 //
// AUDIO FILES                                                                                     //
//                                                                                                 //
// ------------------------------------------------------------------------------------------------//

// Audio data objects (start time in multiples of 10s)
var audioFiles = [
    // 0
    {
        file: 'audio/mp3/LM_1644_ST.mp3',
        dots: 79,
        start: 280,
        duration: '13:03',
        title: 'luminous machine'
    },
    // 1
    {
        file: 'audio/mp3/SOL_1644_ST_C.mp3',
        dots: 92,
        start: 500,
        duration: '15:15',
        title: 'solar sequence'
    },
    // 2
    {
        file: 'audio/mp3/AT_1644_B.mp3',
        dots: 74,
        start: 260,
        duration: '12:11',
        title: 'apical topography'
    },
    // 3
    {
        file: 'audio/mp3/NET_1644_ST_MIN.mp3',
        dots: 47,
        start: 280,
        duration: '07:48',
        title: 'networks'
    },
    // 4
    {
        file: 'audio/mp3/CR_palter_qrt_1644_ST_B.mp3',
        dots: 33,
        start: 0,
        duration: '05:22',
        title: 'cronometro_palter_quartet'
    },
    // 5
    {
        file: 'audio/mp3/IR_1644_ST_B.mp3',
        dots: 64,
        start: 30,
        duration: '10:32',
        title: 'impulse response'
    },
    // 6
    {
        file: 'audio/mp3/CR_palter_solo_1644_ST_B.mp3',
        dots: 32,
        start: 0,
        duration: '05:18',
        title: 'cronometro_palter_solo'
    },
    // 7
    {
        file: 'audio/mp3/WE_1644_ST_B.mp3',
        dots: 40,
        start: 50,
        duration: '06:37',
        title: 'wave energy'
    },
    // 8
    {
        file: 'audio/mp3/CR_bugbee_duo_1644_ST.mp3',
        dots: 32,
        start: 0,
        duration: '05:12',
        title: 'cronometro_bugbee_duo'
    },
    // 9
    {
        file: 'audio/mp3/BP_1644_ST_B.mp3',
        dots: 18,
        start: 50,
        duration: '02:52',
        title: 'bright points'
    },
    // 10
    {
        file: 'audio/mp3/NT_1644_ST_C.mp3',
        dots: 226,
        start: 390,
        duration: '37:38',
        title: 'neoteric topology'
    },
    // 11
    {
        file: 'audio/mp3/TSP-A_1644_ST.mp3',
        dots: 134,
        start: 460,
        duration: '22:15',
        title: 'timeSpacePlace (a-side)'
    },
    // 12
    {
        file: 'audio/mp3/TSP-B_1644_ST.mp3',
        dots: 134,
        start: 850,
        duration: '22:15',
        title: 'timeSpacePlace (b-side)'
    },
    // 13
    {
        file: 'audio/mp3/CLANG_1644_ST.mp3',
        dots: 242,
        start: 0,
        duration: '40:12',
        title: '(((clang)))'
    },
    // 14
    {
        file: 'audio/mp3/TE_1644_ST.mp3',
        dots: 258,
        start: 480,
        duration: '42:54',
        title: 'trichotomic ecology'
    },
    // 15
    {
        file: 'audio/mp3/star_birth_1644_ST.mp3',
        dots: 121,
        start: 150,
        duration: '20:04',
        title: 'star_birth'
    },
    // 16
    {
        file: 'audio/mp3/heap_1644_ST_1730_clip.mp3',
        dots: 106,
        start: 440,
        duration: '17:30',
        title: 'heap'
    },
    // 17
    {
        file: 'audio/mp3/glass_opening_1644_ST.mp3',
        dots: 40,
        start: 0,
        duration: '06:31',
        title: 'opening'
    },
    // 18
    {
        file: 'audio/mp3/schindler_precipice_1644_ST.mp3',
        dots: 107,
        start: 0,
        duration: '17:43',
        title: 'precipice'
    },
    // 19
    {
        file: 'audio/mp3/wilder_interlude_1644_ST.mp3',
        dots: 35,
        start: 0,
        duration: '05:41',
        title: 'interlude'
    },
    // 20
    {
        file: 'audio/mp3/thomas_silhouettes_1_1644_ST.mp3',
        dots: 12,
        start: 0,
        duration: '01:57',
        title: 'Silhouettes: 1. Like Toru Takemitsu Crossed With Bill Evans'
    },
    // 21
    {
        file: 'audio/mp3/thomas_silhouettes_2_1644_ST.mp3',
        dots: 12,
        start: 0,
        duration: '01:52',
        title: 'Silhouettes: 2. Like Igor Stravinsky Crossed With Thelonious Monk'
    },
    // 22
    {
        file: 'audio/mp3/thomas_silhouettes_3_1644_ST.mp3',
        dots: 23,
        start: 0,
        duration: '03:44',
        title: 'Silhouettes: 3. Like Igor Stravinsky Crossed With Thelonious Monk'
    },
    // 23
    {
        file: 'audio/mp3/thomas_silhouettes_4_1644_ST.mp3',
        dots: 16,
        start: 0,
        duration: '02:37',
        title: 'Silhouettes: 4. Like Igor Stravinsky Crossed With Thelonious Monk'
    },
    // 24
    {
        file: 'audio/mp3/reich_vermont_1644_ST.mp3',
        dots: 69,
        start: 170,
        duration: '11:21',
        title: 'vermont counterpoint'
    },
    // 25
    {
        file: 'audio/mp3/interviews/jul14PI.mp3',
        dots: 358,
        start: 0,
        duration: '59:18',
        title: 'patch in'
    },
    // 26
    {
        file: 'audio/mp3/interviews/jan10ST.mp3',
        dots: 177,
        start: 0,
        duration: '29:29',
        title: 'Studio Tulsa'
    },
    // 27
    {
        file: 'audio/mp3/interviews/sept106MM.mp3',
        dots: 159,
        start: 0,
        duration: '26:22',
        title: 'The Midday'
    },
    // 28
    {
        file: 'audio/mp3/interviews/01-30-18_WORT_Interivew.mp3',
        dots: 261,
        start: 0,
        duration: '43:29',
        title: 'Back Porch Serenade'
    },
    // 29
    {
        file: 'audio/mp3/two_sec_silence.mp3',
        dots: 0,
        start: 0,
        duration: '0',
        title: '0'
    }
];


// ------------------------------------------------------------------------------------------------//
//                                                                                                 //
// DOT MATRIX AUDIO FILE PLAYER                                                                    //
//                                                                                                 //
// ------------------------------------------------------------------------------------------------//

// Behavior Observation:
//
// Long files (40min+) are having touble loading if chosen first on mobile browsers.
// If a shorter file is played first, then the longer files will play
//
// Fix: load short inaudible audio first (two_sec_silence.mp3)

var dogEarBottomButton = document.getElementById('dogEarBottomButton');
var audioExpand = document.getElementById('audioExpand');
var audioGhostButton = document.getElementById('audioGhostButton');
var audio = document.getElementById('audio');
var audioPlayerClock = document.getElementById('audioPlayerClock');
var playAudioPlayer = document.getElementById('playAudioPlayer');
var audioDotInnerBack = document.getElementsByClassName('audioDotInnerBack');
var newFileLoaded = 0;
var currentFileLoaded = 999;
var dotPressPlayBlock = 0;
var blockWhileLoading = 0;

audioPlayerContainer.style.height = '0%';

function maxPlayerArea() {

    audioPlayerContainer.style.borderTop = '10px solid #000000';
    audioPlayerContainer.style.height = audioPlayer.scrollHeight + 'px';
    audioPlayerContainer.style.overflowY = 'auto';
    dogEarBottomButton.style.bottom = '-100px';
    audioExpand.style.bottom = '-93px';
    audioGhostButton.style.bottom = '-120px';

}

function minPlayerArea() {

    audioPlayerContainer.style.borderTop = '0px solid #000000';
    audioPlayerContainer.style.height = '0%';
    audioPlayerContainer.style.overflowY = 'hidden';
    dogEarBottomButton.style.bottom = '0px';
    audioExpand.style.bottom = '7px';
    audioGhostButton.style.bottom = '-20px';

}

window.addEventListener('resize', playerResize);

function playerResize() {

    audioPlayerContainer.style.transition = 'height 0.0s linear';

    if (audioPlayerContainer.style.height !== '0%') {
        audioPlayerContainer.style.height = Math.round(audioPlayer.getBoundingClientRect().height) + 'px';
    }

}

dotsOuter.style.paddingLeft = '12px';
dotsOuter.style.paddingRight = '12px';

function shiftDots() {

    var minusPadding;
    var dotModulo;
    var minDotsPadding;

    dotsOuter.style.paddingLeft = '12px';
    dotsOuter.style.paddingRight = '12px';

    minusPadding = (parseInt(dotsOuter.style.paddingLeft, 10) + parseInt(dotsOuter.style.paddingRight, 10));
    dotModulo = (dotsOuter.getBoundingClientRect().width - minusPadding) % 16;
    minDotsPadding = 12;

    if (dotModulo !== 0) {
        dotsOuter.style.paddingLeft = Math.round(dotModulo / 2) + minDotsPadding + 'px';
    }

}

shiftDots();

window.addEventListener('resize', shiftDots);

function calculateCurrentValue(currentTime) {

    var currentMinute = parseInt(currentTime / 60, 10) % 60;
    var currentSecondsLong = currentTime % 60;
    var currentSeconds = currentSecondsLong.toFixed();
    var currentTimeOutput = (currentMinute < 10 ? '0' + currentMinute : currentMinute) + ':' + (currentSeconds < 10 ? '0' + currentSeconds : currentSeconds);

    return currentTimeOutput;

}

function timeUpdate() {

    if (playAudioPlayer.classList.contains('audioIsPlaying') && audio.currentTime > 0.5) {

        var currentDotIndex;
        var opacityAmount;

        if (newFileLoaded === 1) {

            audio.pause();

            playAudioPlayer.classList.remove('audioIsPlaying');
            audio.currentTime = audioFiles[currentFileLoaded].start;
            audio.volume = 1;
            audio.play();
            playAudioPlayer.classList.add('audioIsPlaying');

            newFileLoaded = 0;

        }

        blockWhileLoading = 1;
        audioPlayerClock.innerHTML = calculateCurrentValue(audio.currentTime);
        currentDotIndex = Math.floor(audio.currentTime / 10);
        opacityAmount = 1 - ((audio.currentTime / 10) - currentDotIndex);
        audioDotInnerBack[currentDotIndex].style.opacity = opacityAmount;

        if (audioDotInnerBack[currentDotIndex - 1] > 0) {
            audioDotInnerBack[currentDotIndex - 1].style.opacity = 0;
        }
    }
}

audio.addEventListener('timeupdate', timeUpdate, false);

function setCurrentDot(startDot) {

    var i;
    
    for (i = 0; i < startDot; i += 1) {
        audioDotInnerBack[i].style.opacity = '0';
    }

    for (i = startDot; i < audioDotInnerBack.length; i += 1) {
        audioDotInnerBack[i].style.opacity = '1';
    }

}

function onEnded() {
    
    audioDotInnerBack[audioDotInnerBack.length - 1].style.opacity = 0;
    playAudioPlayer.innerHTML = '<i class="fa fa-play-circle playerButtons" aria-hidden="true"></i>';
    playAudioPlayer.classList.remove('audioIsPlaying');
    setCurrentDot(0);
    audioPlayerClock.innerHTML = '00:00';

}

function dotClick(ind) {

    return function () {

        var i;

        if (blockWhileLoading === 1) {

            dotPressPlayBlock = 1;
            audio.pause();
            audio.currentTime = (ind * 10);
            audioPlayerClock.innerHTML = 'SEEKING';

            for (i = 0; i < ind; i += 1) {
                audioDotInnerBack[i].style.opacity = '0';
            }

            for (i = ind; i < audioDotInnerBack.length; i += 1) {
                audioDotInnerBack[i].style.opacity = '1';
            }

            if (playAudioPlayer.classList.contains('audioIsPlaying')) {
                audio.play();
            }

        }

    };

}

function launchAudioNext(fileNumber) {

    var i;
    
    audio.pause();

    newFileLoaded = 1;
    dotPressPlayBlock = 0;
    currentFileLoaded = fileNumber;
    blockWhileLoading = 0;

    audio.src = audioFiles[fileNumber].file;
    audio.volume = 0;

    audio.load();

    for (i = 0; i < dotsOuter.children.length; i += 1) {
        dotsOuter.children[i].onclick = dotClick(i);
    }

}

function launchAudio(fileNumber) {

    var numberOfDots;
    var i;

    audio.volume = 0.5;
    audio.src = audioFiles[29].file; // 29 = inaudible file two_sec_silence.mp3
    audio.play();
    setTimeout(function () { launchAudioNext(fileNumber); }, 200);

    audioPlayerClock.innerHTML = 'LOADING';

    if (playAudioPlayer.classList.contains('audioIsPlaying')) {
        playAudioPlayer.classList.remove('audioIsPlaying');
    }

    nowPlaying.innerHTML = '' + audioFiles[fileNumber].title + ' <span class="discDuration">' + audioFiles[fileNumber].duration + '</span>';

    numberOfDots = audioFiles[fileNumber].dots;
    dotsOuter.innerHTML = '';

    for (i = 0; i < numberOfDots; i += 1) {
        dotsOuter.innerHTML += '<div class="audioDotOutter"><div class="audioDotInner"><div class="audioDotInnerBack"></div></div></div>';
    }

    setCurrentDot(audioFiles[fileNumber].start / 10);
    playAudioPlayer.innerHTML = '<i class="fa fa-pause-circle playerButtons" aria-hidden="true"></i>';
    maxPlayerArea();

}

audio.onseeked = function () {
    audioPlayerClock.innerHTML = calculateCurrentValue(audio.currentTime);
};

audio.addEventListener('loadeddata', function () {

    if (audio.readyState >= 2) {

        if (dotPressPlayBlock === 0) {

            audio.play();
            playAudioPlayer.classList.add('audioIsPlaying');

        }
    }

});

function closeAudio() {

    audio.pause();
    playAudioPlayer.classList.remove('audioIsPlaying');
    audioPlayerContainer.style.height = '0%';
    audioPlayerContainer.style.overflowY = 'hidden';

}

function playAudio() {

    if (blockWhileLoading === 1) {

        if (playAudioPlayer.classList.contains('audioIsPlaying')) {

            audio.pause();
            playAudioPlayer.classList.remove('audioIsPlaying');
            playAudioPlayer.innerHTML = '<i class="fa fa-play-circle playerButtons" aria-hidden="true"></i>';

        } else {

            audio.play();
            playAudioPlayer.classList.add('audioIsPlaying');
            playAudioPlayer.innerHTML = '<i class="fa fa-pause-circle playerButtons" aria-hidden="true"></i>';

        }

    }

}

// INFO BUTTON POPUP ---------------

var audioPlayerInfoDiv = document.getElementById('audioPlayerInfoDiv');
var audioPlayerInfoDivIn = document.getElementById('audioPlayerInfoDivIn');
var audioInfoShade = document.getElementById('audioInfoShade');

audioPlayerInfoDiv.style.display = 'none';

function infoAudio() {

    if (audioPlayerInfoDiv.style.display === 'none') {

        audioPlayerInfoDivIn.style.maxHeight = (window.innerHeight - 60) + 'px';
        audioInfoShade.style.width = '100%';
        audioInfoShade.style.height = '100%';
        audioPlayerInfoDiv.style.display = 'block';

    } else {

        audioPlayerInfoDiv.style.display = 'none';
        audioInfoShade.style.width = '0%';
        audioInfoShade.style.height = '0%';

    }

}

function audioInfoPopupHeight() {

    if (audioPlayerInfoDiv.style.display === 'block') {
        audioPlayerInfoDivIn.style.maxHeight = (window.innerHeight - 60) + 'px';
    }
}

window.addEventListener('resize', audioInfoPopupHeight);


// ------------------------------------------------------------------------------------------------//
//                                                                                                 //
// LOGO                                                                                            //
//                                                                                                 //
// ------------------------------------------------------------------------------------------------//

var logo = document.getElementById('logo');

function logoPosition() {

    var x = window.innerWidth;
    var y = window.innerHeight;

    if (logo.hasAttribute('width')) {
        logo.removeAttribute('width');
    }

    if (logo.hasAttribute('height')) {
        logo.removeAttribute('height');
    }

    if ((x / y) >= 1.4) {
        logo.setAttribute('height', '100%');
    } else {
        logo.setAttribute('width', '100%');
    }
}

logoPosition();

window.addEventListener('resize', logoPosition);
