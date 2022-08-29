// Object Oriented programming
const {log} = console


class User{
    static getUser(){
        const url = 'https://jsonplaceholder.typicode.com/users'
        fetch(url).then((response)=> response.json()).then((data)=> {
          localStorage.setItem('users', JSON.stringify(data))
        }).catch(err =>log(err))
    }
}

// Book class : Handle Books
class Book{
    constructor(title, author, isbn){
        this.title = title,
        this.author = author,
        this.isbn = isbn
    }
    // methods
}

// UI class : Handles user interface related tasks
class UI{
    // methods
   static lightModeHandler (e){
       let isLightMode = Store.getMode()
       if(isLightMode !== 'enabled'){
         e.target.classList.add('light-mode-switch');
         document.body.classList.add('lightModeEnabled');
         Store.enableLightMode()
       }else{
        e.target.classList.remove('light-mode-switch');
        document.body.classList.remove('lightModeEnabled');
        Store.disableLightMode()
       }
    }

    static displayBooks(){
        const storeBooks = Store.getBooks()
        const books = storeBooks;
        books.forEach((book)=> UI.addBookToList(book))

    }

    static addBookToList({title,author, isbn}){
        // book.title
        // book.author
        // book.isbn
       const lists = document.getElementsByClassName('booklist')[0]
          const tr = document.createElement('tr');
          const trContent = `
             <td>${title}</td>
            <td>${author}</td>
            <td class='book-isbn'>${isbn}</td>
            <td><button class="delete">X</button></td>
          `
        tr.innerHTML = trContent;
        lists.appendChild(tr)
        tr.getElementsByClassName('delete')[0].addEventListener('click', UI.deleteBookHandler )

    // add success alert

    }

    static addBookHandler(e){
        e.preventDefault()
        const title = document.getElementsByClassName('book-title')[0].value
        const author = document.getElementsByClassName('book-author')[0].value
        const isbn = document.getElementsByClassName('book-isbn')[0].value

       if(!title || !author || !isbn){
            UI.alertMsg('All fields are required!', 'danger')
            return
       }

    const book = new Book(title, author, isbn)
       UI. addBookToList(book)
       log(Store.getUsers())
       Store.addBooks(book)
       UI.clearFields()
       UI.alertMsg('Book successfully added', 'success')
    }

    // delete book
    static deleteBookHandler(e){
            const btn = e.target;
                 btn.parentElement.parentElement.remove();
            const isbn = btn.parentElement.parentElement.getElementsByClassName('book-isbn')[0].innerText
    
                 Store.removeBook(isbn)
                 UI.alertMsg('Successfully Deleted', 'success')
            
    }

    static alertMsg(message, className){
        const div = document.createElement('div')
             div.className = `alert alert-${className} `
             const txt = `
                <p>${message}</p>
             `
            div.innerHTML = txt

            const container = document.getElementsByClassName('container')[0]
           const tableContainer = document.getElementsByClassName('table-container')[0]

           container.insertBefore(div, tableContainer)

           setTimeout(()=>{
            document.getElementsByClassName('alert')[0].remove()
         }, 3000)
    }

    static clearFields(){
         document.getElementsByClassName('book-title')[0].value = ''
        document.getElementsByClassName('book-author')[0].value = ''
        document.getElementsByClassName('book-isbn')[0].value = ''
    }

}

// Store class : Handles saving and retrieving data from storage
class Store{
    // getBooks
    static getBooks(){
        let books = localStorage.getItem('books');
        if(!books){
            books = []
        }else{
            books = JSON.parse(books)
    }
    return books
}

  // getBooks
  static getUsers(){
    let users = localStorage.getItem('users');
    if(!users){
        users = []
    }else{
        users = JSON.parse(users)
}
return users
}

    // adding Book

    static addBooks(book){
        let books = Store.getBooks();
        books.push(book)
        localStorage.setItem('books', JSON.stringify(books))
    }


    // removing Book
  static removeBook(isbn){
        let books = Store.getBooks();
        books.forEach((book, i) => {
                if(book.isbn === isbn){
                    books.splice(i, 1)
                }
        })
        localStorage.setItem('books', JSON.stringify(books))
  }
    // methods
    static getMode(){
        const mode = localStorage.getItem('light-mode')
        return mode
    }

    static enableLightMode(){
        // update the localstorage to enabled
        localStorage.setItem('light-mode', 'enabled')
    }

    static disableLightMode(){
        localStorage.setItem('light-mode', null)
    }

}

// Events : Handles event related actions

// Event: on page loaded
document.addEventListener('DOMContentLoaded', (e) =>{
    User.getUser();
//   handle display books on document load
UI.displayBooks()


    // update the UI mode to what was the last mode for the user
    let isLightMode = Store.getMode()
    log(isLightMode)
   if(isLightMode === 'enabled'){
       const lightModeElement = document.getElementsByClassName('light-mode-container')[0]
    lightModeElement.classList.add('light-mode-switch');
    document.body.classList.add('lightModeEnabled');
   }
})

// Events : listening to light mode switcher
const darkModeSwicther = document.getElementsByClassName('light-mode-container')[0]
    darkModeSwicther.addEventListener('click', UI.lightModeHandler)


    // Events : Add book
    document.getElementsByClassName('submit')[0].addEventListener('click', UI.addBookHandler)

    // Events: Remove book from list
const deleteBtn = document.getElementsByClassName('delete');
// log(deleteBtn)
for(let i=0; i<deleteBtn.length; i++){
        const btnClicked = deleteBtn[i]
        btnClicked.addEventListener('click', UI.deleteBookHandler)
 }

