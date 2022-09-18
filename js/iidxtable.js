//fuck it we ball
//stolen from jone chau
//TODO: replace table definition file with the one from https://bpi.poyashi.me/AAATable

import { tierList } from "./tierList2.js" //get the tierlist array

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
    document.getElementsByClassName("secured").length
}

//begin bullshit

fillTable(tierList);




//add event listeners

iidxtable.addEventListener("click", function (e) { // e = event object
    if (event.target.classList.contains("grid-item")) {
        toggleSong(event.target.id);
        updateCount();
    }
    // if (e.target && e.target.matches(".video-container")) {
    //   const clickedVideoContainer = e.target;
    //   // do stuff with `clickedVideoContainer`
    // }
}, {passive:true});


