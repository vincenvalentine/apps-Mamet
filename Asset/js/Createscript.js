

////////////////////////////////////////////////////////////////////////////////////////

// parse category list
function displayRadioBtn() {
    let categoryList = localStorage.getItem('categoryList');
    categoryList = JSON.parse(categoryList);


    let idRadio = document.getElementById('radioBtn');
    let elementRadio = [];

    for (let i = 0; i < categoryList.length; i++) {
        elementRadio.push(`
    <div class="obj-category">
        <input class="input" type="radio" data-categoryid=`+ categoryList[i].id + ` name="radio" value="` + categoryList[i].name + `">
        <img class="img-content" src="`+ categoryList[i].icon + `" alt="icon">
    <span>`+ categoryList[i].name + `</span>
    </div>
    `);
    }

    let join = elementRadio.join('');
    idRadio.innerHTML = join;

}


////////////////////////////////////////////////////////////////////////////////////////
// when button press 

function btnClick() {
    // get array toDoList
    let arrayTodoList = window.localStorage.getItem('toDoList');

    if (arrayTodoList == null || arrayTodoList == undefined) {
        // penampung
        let newArrayTodoList = [];

        // buat toDoList object field
        let todoListCatId = document.querySelector('input[name=radio]:checked').dataset.categoryid;
        let todoListDescription = document.getElementById('fname');
        let todoListInput = todoListDescription.value;
        let toDoListId = 0;


        // yang dipush 
        let todoListObj = {
            'categoryId': todoListCatId,
            'description': todoListInput,
            'id': toDoListId,
            'isDone': false,
        }

        // push ke array baru
        newArrayTodoList.push(todoListObj);

        //push ke localStorage
        window.localStorage.setItem('toDoList', JSON.stringify(newArrayTodoList));
    } else {

        //ambil arraytodolist lalu udah ke obj
        let currentArrayTodoList = JSON.parse(arrayTodoList);

        // buat toDoList object field
        let todoListCatId = document.querySelector('input[name=radio]:checked').dataset.categoryid;
        let todoListDescription = document.getElementById('fname');
        let todoListInput = todoListDescription.value;
        let LastId = currentArrayTodoList.length - 1;
        let toDoListId = currentArrayTodoList[LastId].id + 1;


        // yang dipush 
        let todoListObj = {
            'categoryId': todoListCatId,
            'description': todoListInput,
            'id': toDoListId,
            'isDone': false,
        }

        //push ke array baru
        currentArrayTodoList.push(todoListObj);

        //push ke local storage
        window.localStorage.setItem('toDoList', JSON.stringify(currentArrayTodoList))
    }

    window.location.pathname = "/"

}

// btn-back link
function back() {
    window.location.pathname = "/"
}


displayRadioBtn();