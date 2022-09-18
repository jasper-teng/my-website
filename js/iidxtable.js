//fuck it we ball
//stolen from jone chau
import { tierList } from "./tierList.js" //get the tierlist array

//bullshit
function injectTableItem(name) {
    return `<div class="grid-item">${name}</div>`
}

function injectTableSeperator(title) {
    return `<div class="grid-seperator lamped">${title}</div>`
}


//abang
function fillTable(tierList) {
    var iidxtable = document.getElementById("iidxtable"); //main shit
    var tableHTML = "";

    //look at the array
    for (var i = 0; i < Object.keys(tierList).length; i++) {

        //injection of the seperators
        tableHTML += injectTableSeperator(Object.keys(tierList)[i]);

        //the below part uses name matching, watch out.
        //watch out right here VVVVVV TODO:
        for (var j = 0; j < tierList[i+1].length; j++) { //makes the songs
            
            if(j==0){
                tableHTML += `<div class="grid-container">`;
            }

            if (j % 4 == 0) {
                tableHTML += `</div>
               <div class="grid-container">`
           }

            tableHTML += injectTableItem(tierList[i+1][j].name);

        }
        
        tableHTML += `</div>`

    }

    iidxtable.innerHTML += tableHTML;
}
//begin bullshit

fillTable(tierList);

