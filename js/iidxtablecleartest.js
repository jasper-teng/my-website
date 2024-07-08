//fuck it we ball
//https://www.fusejs.io/
//TODO: replace table definition file with the one from https://bpi.poyashi.me/AAATable
const Fuse = window.Fuse;

var list = "";
var fuse;
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
        "name"
    ]
};

function searchfn() {
    var x = document.getElementById("searchbar").value;
    displayResults(fuse.search(x));
}

function displayResults(results) {
    filltablenew(list, "normal");
    if (results.length == 0) {
        filltablenew(list);
        return;
    }
    var temp = []
    for (var x in results) {
        temp.push(document.getElementById(results[x].item.name.replace(/\s/g, '')));
    }

    for (var x in temp) {
        var parent = temp[x].parentNode;
        var detached = parent.removeChild(temp[x]);
        parent.insertBefore(detached, parent.childNodes[0]);
    }

    //hide all other songs
    var table = document.getElementsByClassName("grid-container")[0];
    console.log(table.childNodes.length);

    for (var i = temp.length; i < table.childNodes.length; i++) {
        table.childNodes[i].classList.add("hide");
    }

    table.innerHTML = injectTableSeperator("Search Results: " + document.getElementById("searchbar").value) + table.innerHTML;

    return;
}

//follow this logic for new sorting method:
//load everything, then decide to sort later

function filltablenew(list, normalorhard) {
    var tiers = ["未定","個人差F","地力F","個人差E","地力E","個人差D","地力D","個人差C","地力C","個人差B","地力B","個人差B+","地力B+","個人差A","地力A","個人差A+","地力A+","個人差S","地力S","個人差S+","地力S+"]
    
    var iidxtable = document.getElementById("iidxtable"); //main shit
    var tableHTML = ``;

    for(var x in tiers){
        tableHTML += injectTableSeperator(tiers[x]);
        for(var y in list){
            if(list[y][normalorhard] == tiers[x]){ //TODO: should allow hard clear here change it
                tableHTML += injectTableItem(list[y].difficulty == "L" ? list[y].name+"[L]" : list[y].difficulty == "H" ? list[y].name+"[H]" : list[y].name, y);
            }else if(list[y][normalorhard] == ""){//handling unrated
                if(tiers[x] == "未定"){
                    tableHTML += injectTableItem(list[y].difficulty == "L" ? list[y].name+"[L]" : list[y].name, y);
                }
            }
        }
    }

    iidxtable.children[0].innerHTML = tableHTML;
    //make a list stored of these fuckers
    massUpdateCount(retrieveStorage());
    return;
}







//bullshit
function injectTableItem(name, tag) {
    return `<div class="grid-item new-box" id=${name.replace(/\s/g, '')}>${name}</div>`
}

function injectTableSeperator(title) {
    return `<div class="grid-seperator lamped new-box">${title}</div>`
}



function toggleSong(tag) {
    if (document.getElementById(tag).classList.contains("secured")) {
        document.getElementById(tag).classList = "grid-item new-box maxminus"
    } else if (document.getElementById(tag).classList.contains("maxminus")) {
        document.getElementById(tag).classList = "grid-item new-box"
    } else {
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
    // for (var i = 0; i < list.length; i++) {
    //     if (document.getElementById(i).classList.contains("secured")) {
    //         pwString += 1
    //     }
    //     else if (document.getElementById(i).classList.contains("maxminus")) {
    //         pwString += 2
    //     }
    //     else {
    //         pwString += 0
    //     }
    // }

    var password = []
    var songblocks = Array.from(document.getElementsByClassName("grid-item"));
    for(var x in songblocks){
        var status = 0;
        if (songblocks[x].classList.contains("secured")) {
            status = 1
        }
        else if (songblocks[x].classList.contains("maxminus")) {
            status = 2
        }
        else {
            status = 0
        }

        password.push({name: songblocks[x].innerHTML.replace(/\s/g, ''), status: status})
    }

    return JSON.stringify(password);
}

function massUpdateCount(string) { //assuming this is the binary string of 500+
    if (!string) { return; }

    var jsonString = JSON.parse(string);

    for(var x in jsonString){
        if(document.getElementById(jsonString[x].name) == null){
            continue
        }
        
        if (jsonString[x].status == 1) {
            document.getElementById(jsonString[x].name).classList.add("secured");
        }
        if (jsonString[x].status == 2) {
            document.getElementById(jsonString[x].name).classList.add("maxminus");
        }

    }

    updateCount();
}

function updateStorage(pwString) { //allah
    console.log("updating");
    localStorage.setItem('songscleartableNEW', pwString); //lmao
}

function retrieveStorage() {
    return localStorage.getItem('songscleartableNEW');
}
//begin bullshit

function b64DecodeUnicode(str) { //thank you stack overflow
    // Going backwards: from bytestream, to percent-encoding, to original string.
    return decodeURIComponent(atob(str).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}

function sortGaugeNormal(){
    filltablenew(list,"normal")
}

function sortGaugeHard(){
    filltablenew(list,"hard")
}

//testing part here
const apiUrl = 'https://api.github.com/repos/iidx-sp12/iidx-sp12.github.io/contents/songs.json';

fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        //stack overflow gaming
        list = JSON.parse(b64DecodeUnicode(data.content));
        filltablenew(list, "normal") //TODO: <- IT STARTS HERE
    })
    .catch(error => {
        console.log(error);
        console.error('Error:', error);
    })
    .finally(data =>{
        massUpdateCount(retrieveStorage());


    //add searcher    
    // fuse = new Fuse(Object.values(list), fuseOptions);

    // document.getElementById("searchbar").addEventListener("change", searchfn);

    });

//add event listeners

iidxtable.addEventListener("click", function (e) { // e = event object
    if (event.target.classList.contains("grid-item")) {
        toggleSong(event.target.id);
        updateCount();

        updateStorage(generatePassword());

    }
}, { passive: true });
//add button listeners
document.getElementById("normalbutton").addEventListener("click",sortGaugeNormal);
document.getElementById("hardbutton").addEventListener("click",sortGaugeHard);

