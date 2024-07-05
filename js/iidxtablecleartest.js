//fuck it we ball
//https://www.fusejs.io/
//TODO: replace table definition file with the one from https://bpi.poyashi.me/AAATable
const Fuse = window.Fuse;
import { songlist } from "./songlist.js"
import { tierlistID } from "./tierListID.js"


//search related


const fuseOptions = {
    // isCaseSensitive: false,
    // includeScore: false,
    // shouldSort: true,
    // includeMatches: false,
    // findAllMatches: false,
    // minMatchCharLength: 1,
    // location: 0,
    threshold: 0.2,
    // distance: 100,
    // useExtendedSearch: false,
    // ignoreLocation: false,
    // ignoreFieldNorm: false,
    // fieldNormWeight: 1,
    keys: [
        "name",
        "alias"
    ]
};

const fuse = new Fuse(Object.values(songlist), fuseOptions);

document.getElementById("searchbar").addEventListener("change",searchfn);

function searchfn() {
    var x = document.getElementById("searchbar").value;
    displayResults(fuse.search(x));
}

function displayResults(results) {
    //redraw the table view fuck it
    // if (results.length == 0) {
    //     filltablenew();
    //     return;
    // }
    // var iidxtable = document.getElementById("iidxtable");
    // var tableHTML = ``;

    // tableHTML += injectTableSeperator("search results: " + document.getElementById("searchbar").value);

    // for (var x in results) {
    //     tableHTML += injectTableItem(results[x].item.name, results[x].item.id);
    // }

    // iidxtable.children[0].innerHTML = tableHTML;

    //dont redraw the table not fuck it

    //now that we have the filtered table, do something to the dom

    //implementation of a sorting fuction. 
    //locate the searched songs, 
    //put into a temp array, 
    //then push on the top
    //redraw first
    filltablenew();
    if (results.length == 0) {
        filltablenew();
        return;
    }
    var temp = []
    for(var x in results){
        temp.push(document.getElementById(results[x].refIndex));
    }
    
    for (var x in temp){
        var parent = temp[x].parentNode;
        var detached = parent.removeChild(temp[x]);
        parent.insertBefore(detached, parent.childNodes[0]);
    }

    //hide all other songs
    var table = document.getElementsByClassName("grid-container")[0];
    console.log(table.childNodes.length);

    for(var i=temp.length;i<table.childNodes.length;i++){
        console.log("hiding");
        table.childNodes[i].classList.add("hide");
    }

    table.innerHTML = injectTableSeperator("Search Results: " + document.getElementById("searchbar").value) + table.innerHTML;
    
    return;
}

var tablenodes; //table nodes should be internal list of all songs

//follow this logic for new sorting method:
//load everything, then decide to sort later

function filltablenew() {

    var iidxtable = document.getElementById("iidxtable"); //main shit
    var tableHTML = ``;

    for (var x in tierlistID) {
        tableHTML += injectTableSeperator(x)
        var sortedsongs = tierlistID[x];
        for (var y in tierlistID[x]) {
            //console.log( Object.keys(songlist)[tierlistID[x][y]] );
            tableHTML += injectTableItem(songlist[tierlistID[x][y]].name, Object.keys(songlist)[tierlistID[x][y]]);
        }
    }

    tableHTML += ``

    iidxtable.children[0].innerHTML = tableHTML;
    //make a list stored of these fuckers

    tablenodes = iidxtable.children[0].getElementsByClassName("grid-item");
    massUpdateCount(retrieveStorage());
    return;
}







//bullshit
function injectTableItem(name, tag) {
    return `<div class="grid-item new-box" id=${tag}>${name}</div>`
}

function injectTableSeperator(title) {
    return `<div class="grid-seperator lamped new-box">${title}</div>`
}



function toggleSong(tag) {
    if(document.getElementById(tag).classList.contains("secured")){
        document.getElementById(tag).classList = "grid-item new-box maxminus"
    }else if (document.getElementById(tag).classList.contains("maxminus")){
        document.getElementById(tag).classList = "grid-item new-box"
    }else {
        document.getElementById(tag).classList = "grid-item new-box secured"
    }

}

function updateCount() {
    document.getElementById("count").innerHTML = document.getElementsByClassName("secured").length + document.getElementsByClassName("maxminus").length + " / " + document.getElementsByClassName("grid-item").length;
    document.getElementById("count").innerHTML += " (" + (((document.getElementsByClassName("secured").length + document.getElementsByClassName("maxminus").length) / document.getElementsByClassName("grid-item").length) * 100).toFixed(1) + "%" + ")";
    document.getElementById("count").innerHTML += "<br />"
    document.getElementById("count").innerHTML += document.getElementsByClassName("maxminus").length + " / " + document.getElementsByClassName("grid-item").length;
    document.getElementById("count").innerHTML += " (" + ((document.getElementsByClassName("maxminus").length) / document.getElementsByClassName("grid-item").length * 100).toFixed(1) + "%" + ")";

}


function generatePassword() { //strings in javascript are immutable, ridiculous.
    var pwString = '';
    for(var i=0; i<Object.keys(songlist).length;i++){
        if(document.getElementById(i).classList.contains("secured")){
            pwString +=1
        }
        else if(document.getElementById(i).classList.contains("maxminus")){
            pwString +=2
        }
        else{
            pwString += 0
        }
    }
    return pwString;
}

function massUpdateCount(string) { //assuming this is the binary string of 500+
    if (!string) { return; }

    for (var i = 0; i < string.length; i++) {

        if (string[i] == 1) {
            document.getElementById(i).classList.add("secured");
        }
        if (string[i] == 2) {
            document.getElementById(i).classList.add("maxminus");
        }

    }

    updateCount();
}

function updateStorage(pwString) { //allah
    console.log("updating");
    localStorage.setItem('songscleartable', pwString); //lmao
}

function retrieveStorage() {
    return localStorage.getItem('songscleartable');
}

function compressStringOptimized(str) {
    const compressed = [];
    let count = 1;
    for (let i = 0; i < str.length; i++) {
      if (str[i] === str[i + 1]) {
        count++;
      } else {
        compressed.push(str[i] + count);
        count = 1;
      }
    }
    const compressedString = compressed.join('');
    return compressedString.length < str.length ? compressedString : str;
 }


//begin bullshit

filltablenew(songlist);

//TnKYeKaq7]]%ZuECpk0!=Q'[q.3Lqa&9&O(LI[%-&:d:O8H]GU8Hjj""Loj`6:irK1_j_4


//add event listeners

iidxtable.addEventListener("click", function (e) { // e = event object
    if (event.target.classList.contains("grid-item")) {
        toggleSong(event.target.id);
        updateCount();

        updateStorage(generatePassword());

    }
    // if (e.target && e.target.matches(".video-container")) {
    //   const clickedVideoContainer = e.target;
    //   // do stuff with `clickedVideoContainer`
    // }
}, { passive: true });

window.addEventListener('load', (event) => {
    massUpdateCount(retrieveStorage());
});
