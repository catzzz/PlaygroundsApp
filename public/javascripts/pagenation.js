function prevPage(currentPage){
    const prev = currentPage - 1;
    window.location = `/playgrounds?page=${prev}`; 
}

function nextPage(currentPage){

    const next = currentPage + 1;
    window.location = `/playgrounds?page=${next}`; 

}