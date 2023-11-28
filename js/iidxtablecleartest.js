//fuck it we ball
//https://www.fusejs.io/
//TODO: replace table definition file with the one from https://bpi.poyashi.me/AAATable
const Fuse = window.Fuse;
import { tierList } from "./cleartable2.js" //get the tierlist array
import { songlist } from "./songlist.js"


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

const fuse = new Fuse(songlist, fuseOptions);

document.getElementById("searchbar").addEventListener("change", searchfn);

function searchfn(){
    console.log("awooga");
    var x = document.getElementById("searchbar").value;
    console.log(fuse.search(x));
    displayResults(fuse.search(x));
}

function displayResults(results){
    //redraw the table view fuck it
    if(results.length == 0){
        filltablenew();
        return;
    }
    var iidxtable = document.getElementById("iidxtable");
    var tableHTML = ``;
    for(var x in results){
        tableHTML += injectTableItem(results[x].item.name, results[x].item.id);
    }

    tableHTML += ``

    iidxtable.children[0].innerHTML = tableHTML; 

    return;
}


//follow this logic for new sorting method:
//load everything, then decide to sort later

function filltablenew(){
    var iidxtable = document.getElementById("iidxtable"); //main shit
    var tableHTML = ``;

    for(var x in songlist){
        tableHTML += injectTableItem(songlist[x].name, songlist[x].id);
    }

    tableHTML += ``

    iidxtable.children[0].innerHTML = tableHTML;
    return;
}







//bullshit
function injectTableItem(name, tag) {
    return `<div class="grid-item" id=${tag}>${name}</div>`
}

function injectTableSeperator(title) {
    return `<div class="grid-seperator lamped">${title}</div>`
}


//abang
function fillTable(tierList) {
    var songtag = 0
    var iidxtable = document.getElementById("iidxtable"); //main shit
    var tableHTML = "";

    //look at the array
    //janky hack to invert json
    for (var i = 0; i < Object.keys(tierList).length; i++) {

        //injection of the seperators
        tableHTML += injectTableSeperator(Object.keys(tierList)[i]);

        //the below part uses name matching, watch out.
        //watch out right here VVVVVV TODO:
        for (var j = 0; j < tierList[Object.keys(tierList)[i]].length; j++) { //makes the songs

            if (j == 0) {
                tableHTML += `<div class="grid-container">`;
            }

            if (j % 4 == 0) {
                tableHTML += `</div>
               <div class="grid-container">`
            }

            tableHTML += injectTableItem(tierList[Object.keys(tierList)[i]][j].name, songtag);
            songtag++;
        }

        tableHTML += `</div>`

    }

    iidxtable.innerHTML += tableHTML;
}

function toggleSong(tag) {
    document.getElementById(tag).classList.toggle("secured");
}

function updateCount() {
    document.getElementById("count").innerHTML = document.getElementsByClassName("secured").length + " / " + document.getElementsByClassName("grid-item").length;
    document.getElementById("count").innerHTML += " (" + ((document.getElementsByClassName("secured").length / document.getElementsByClassName("grid-item").length)*100).toFixed(1) +"%" + ")";
}

function generatePassword() {
    var songList = document.getElementsByClassName("grid-item");
    var pwString = ""
    for (var i = 0; i < songList.length; i++) {
        songList[i].classList.contains("secured") ? pwString += "1" : pwString += "0";
    }
    //after the loop, it becomes a binary representation of your songlist

    return pwString;
}

function massUpdateCount(string) { //assuming this is the binary string of 400+
    if (!string) { return; }

    for (var i = 0; i < string.length; i++) {
        var songGridItem = document.getElementById(i);

        if (!songGridItem) {
            continue;
        }

        if (string[i] == 1) {
            songGridItem.classList.add('secured');
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

