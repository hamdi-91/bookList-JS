//book contructor
function Book (title,author,year){
this.title=title;
this.author=author;
this.year=year;
}


//effacer le livre de la liste
UI.prototype.deleteBook=function(target){
    if(target.className==="delete"){
        target.parentElement.parentElement.remove();
    }
}

//UI constrcutor
function UI(){
}

//ajout un livre a la liste
UI.prototype.addBookToListe=function(book){
    const list=document.getElementById("book-list");

    //cree un element tr
    const row=document.createElement('tr');
    //cree le contenu de tr
    row.innerHTML=`
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.year}</td>
 <td><a class="delete" href="#" >X</a></td>
    `
    list.appendChild(row);
}

//nettoyer les chammps
UI.prototype.clearFileds=function(){
document.getElementById('title').value='';
document.getElementById('author').value='';
document.getElementById('year').value='';
}


// montrez alert
UI.prototype.showAlert=function(message,className){
    //cree div
    const div=document.createElement('div');
    //ajouter une class
    div.className=`alert ${className}`
    //ajoutez du text
    div.appendChild(document.createTextNode(message));
    //prendre le parent
    const container=document.querySelector('.container');
    //prendre le form
    const form=document.querySelector('#book-form');
    //inserer notre alerte
    container.insertBefore(div,form);
    //timeout pour faire parti l'alert en 3 secondes
    setTimeout(function(){
        document.querySelector('.alert').remove();
    },3000);
}


// Event listener pour ajouter livre / succes/ error

document.getElementById('book-form').addEventListener('submit',function(e){
 //on prends tous les valeurs
 const title=document.getElementById('title').value,
 author=document.getElementById('author').value,
 year=document.getElementById('year').value
//instancier un nouveau book
const book=new Book(title,author,year);
//instancier un nouveau UI
const ui =new UI();
//validation
 if (title===''|| author===''|| year===''){
     ui.showAlert('the cas are empty fill in the field','error');
 }else{
     // ajout livre a la liste
     ui.addBookToListe(book)

     //success
     ui.showAlert('your book is added to the list','success')

     //clear fileds
     ui.clearFileds();
 }

    e.preventDefault();
});


//evenement pour supprimer les lignes 

document.getElementById('book-list').addEventListener('click',function(e){

//instancier und nouvelle ui
const ui=new UI();
//effacer le livre
ui.deleteBook(e.target);
//montrer un message de success
ui.showAlert('your book is removed from list succefly','success')



    e.preventDefault();
})