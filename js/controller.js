window.onload = (event) => {
    instantiateController();
};



function instantiateController() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    console.log(urlParams)
}