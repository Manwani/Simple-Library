let myLibrary = [];
let addBookButton = document.querySelector(".addBook");
let pushBookButton = document.querySelector(".pushBook");
let cancelButton = document.querySelector(".cancel");



function updateDisplay(){

    let container = document.createElement("div");
    let addBookForm = document.querySelector(".addBookForm");
    container.className = "flex-container";
    document.body.insertBefore(container, addBookForm);


    for(var i = 0; i < myLibrary.length; i++){

        let flexItem = document.createElement("div");
        flexItem.className = "flex-item";
        container.appendChild(flexItem);

        let containerContent = document.createElement("div")
        containerContent.className = "container-content";
        flexItem.appendChild(containerContent);

        let content = document.createElement("ul");
        content.className = "content";
        containerContent.appendChild(content);

        let deleteArea = document.createElement("li");
        content.appendChild(deleteArea);

        let deleteButton = document.createElement("button");
        deleteButton.className = "deleteButton";
        deleteButton.innerText = "Delete";
        deleteButton.dataset.key = i;
        deleteButton.addEventListener("click", function(e){
            myLibrary.splice(deleteButton.dataset.key, 1);
            updateStorage();
            deleteAll();
            updateDisplay();
        });
        deleteArea.appendChild(deleteButton);

        let titleArea = document.createElement("li");
        titleArea.innerText = myLibrary[i].title;
        content.appendChild(titleArea);

        let authorArea = document.createElement("li");
        authorArea.innerText = myLibrary[i].author;
        content.appendChild(authorArea);

        let pagesArea = document.createElement("li");
        pagesArea.innerText = myLibrary[i].pages;
        content.appendChild(pagesArea);

        let readArea = document.createElement("li");
        readArea.innerText = myLibrary[i].read;
        content.appendChild(readArea);

        let readButtonArea = document.createElement("li");
        content.appendChild(readButtonArea);

        let readButton = document.createElement("button");
        readButton.className = "readButton";
        readButton.innerText = "Read";
        readButton.dataset.key = i;
        readButton.addEventListener("click", function(){

            /* console.log(readArea); */
            if(myLibrary[readButton.dataset.key].read){
                myLibrary[readButton.dataset.key].read = false;
                readArea.innerText = myLibrary[readButton.dataset.key].read;
                updateStorage();
                
            }
            else{
                myLibrary[readButton.dataset.key].read = true;
                readArea.innerText = myLibrary[readButton.dataset.key].read;
                updateStorage();
             }
        
        });
        readButtonArea.appendChild(readButton);
    }
}

addBookButton.addEventListener("click", function(){
    let showForm = document.querySelector(".addBookForm");
    showForm.style.display = "block";

});


pushBookButton.addEventListener("click", function(){
    
    let title = document.querySelector("#bookName");
    let author = document.querySelector("#author");
    let pages = document.querySelector("#pages");
    let read;
    let newBook;
    

    if(document.querySelector("#read").checked){
        read = true;
    }
    else if (document.querySelector("#notRead").checked){
        read = false;
    }
    else{
        alert("read box is empty");
        return;
    }

    if(!checkForEmpty(title.value,author.value,pages.value)){
       newBook = new Book(title.value, author.value, pages.value, read);
       addBookToLibrary(newBook);
       deleteAll();
       updateDisplay();
       hidePopup();
       clearForm();
    }

}); 


cancelButton.addEventListener("click", function(){
    hidePopup();
    clearForm();
});

function addBookToLibrary(book){
    myLibrary.push(book);
    updateStorage();

}

function updateStorage(){
    localStorage.setItem('books', JSON.stringify(myLibrary));
}

function hidePopup(){
    let showForm = document.querySelector(".addBookForm");
    showForm.style.display = "none";
}

function clearForm(){
    document.querySelector(".inputFields").reset();
}

function checkForEmpty(a,b,c){
    
    if(a.trim() === "" || b.trim() === "" || c.trim() === ""){
        alert("please fill in all of the necessary details");
        return true;
    }
    return false;
    
}


function deleteAll(){
    let all = document.querySelector(".flex-container");
    all.remove();
}


class Book{
    constructor(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    }
}

let lord = new Book("lord of the rings", "tolkien", 2302, true);
let lord2 = new Book("help me bro", "zapad", 223, false );
let lord3 = new Book("hey i like pasta", "an italian guy", 20, true);

//Check if local storage is null, if not check if the length is greater than 0 if so array exists so grab it from local storage
if(localStorage.getItem('books')){
    if(JSON.parse(localStorage.getItem('books')).length > 0){
        myLibrary = JSON.parse(localStorage.getItem('books'));
    }
    //if length 0 default books
    else{
    addBookToLibrary(lord);
    addBookToLibrary(lord2);
    addBookToLibrary(lord3);
    }
}
//if null default books and local storage is created.
else{
addBookToLibrary(lord);
addBookToLibrary(lord2);
addBookToLibrary(lord3);
}

updateDisplay();

