function backToHome() {
    let arrayCategoryList = window.localStorage.getItem('categoryList');
    let parseCategoryList = JSON.parse(arrayCategoryList);

    for (let i = 0; i < parseCategoryList.length; i++) {
        parseCategoryList[i].isActive = false
    }

    window.localStorage.setItem('categoryList', JSON.stringify(parseCategoryList));

    window.location.pathname = "/";
}


function displayTitleTaskList() {
    let arrayCategoryList = window.localStorage.getItem('categoryList');
    let parseCategoryList = JSON.parse(arrayCategoryList);

    let idTitle = document.getElementById('container-Task');
    let elementTitleTaskList = [];

    for (let i = 0; i < parseCategoryList.length; i++) {
        if (parseCategoryList[i].isActive == true) {
            elementTitleTaskList.push(`
            <div class="header">
                <div class="background">
                    <div class="icon">
                        <img src="${parseCategoryList[i].icon}" alt="">
                        <h2>${parseCategoryList[i].name}</h2>
                        <h5>Your todo list for this category :</h5>
                    </div>
                </div>
            </div>

            `)
        } else {
            console.log('false');

        }
    }

    let join = elementTitleTaskList.join('');
    idTitle.innerHTML = join;
}


function displayTaskList() {
    // get data di localstorage
    let arraytoDoList = window.localStorage.getItem('toDoList');
    let arrayCategoryList = window.localStorage.getItem('categoryList');

    // ubah ke object
    let parsetoDoList = JSON.parse(arraytoDoList);
    let parseCategoryList = JSON.parse(arrayCategoryList);

    let containeBoxLists = document.getElementsByClassName('boxList');


    console.log(parsetoDoList);
    console.log(parseCategoryList);

    let idTask = document.getElementById('container-Box');
    // let containeBoxLists = document.getElementsByClassName('boxList');
    let elemetTaskList = [];

    for (let i = 0; i < parseCategoryList.length; i++) {
        for (let j = 0; j < parsetoDoList.length; j++) {

            if ((parseCategoryList[i].isActive == true) && (parseCategoryList[i].categoryId == parsetoDoList[j].categoryId)&& (parsetoDoList[j].isDone == false)) {
                elemetTaskList.push(`
                        <div class="boxList" data-id='${parsetoDoList[j].id}'>
                            <div class="boxListContent">
                                <div class="content" >
                                     <h5>${parsetoDoList[j].description}</h5>
                                    <div class="closeBtn" data-id='${parsetoDoList[j].id}'>
                                        <span>x</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `)
            } else {
        
              }
              
            }
        }
    


    let join = elemetTaskList.join('');
    idTask.innerHTML = join;

    // console.log(join);
}


function addTaskListEventListener() {
    let arraytoDoList = window.localStorage.getItem('toDoList');
    let parsetoDoList = JSON.parse(arraytoDoList);

    let containeBoxLists = document.getElementsByClassName('boxList');
    let closeButtons = document.getElementsByClassName('closeBtn');

    let containerIsDoneLists = document.getElementsByClassName('contentDoneList');
    let closeButtonsIsDone = document.getElementsByClassName('closeButtonsIsDone');

    console.log(closeButtons.length);
    
    for (let i = 0; i < containeBoxLists.length; i++) {
        containeBoxLists[i].addEventListener('click', function () {
            let idbox = this.dataset.id;
            for (let y = 0; y < parsetoDoList.length; y++) {
                if (idbox == parsetoDoList[y].id) {
                    parsetoDoList[y].isDone = true;
                    window.localStorage.setItem('toDoList', JSON.stringify(parsetoDoList));
                    containeBoxLists[i].remove();
                    // window.location.reload();
                } else {
                    console.log('false');
                }
            }
            // console.log(parsetoDoList);

            displayisDoneList();

        })

    }

    console.log(closeButtons);
    

    for (let j = 0; j < closeButtons.length; j++) {
        closeButtons[j].addEventListener('click', function (e) {
            console.log(this.dataset.id);
            let ID = this.dataset.id;
            for(let k = 0; k < parsetoDoList.length; k++){
                if (ID == parsetoDoList[k].id) {
                    parsetoDoList.splice(k,1);  
                    window.localStorage.setItem('toDoList', JSON.stringify(parsetoDoList));   
                    displayTaskList();
                } else {
                    
                }

            }
            e.stopPropagation();
        })
    }
    

    for (let c = 0; c < containerIsDoneLists.length; c++) {
        console.log(c);
        
        containerIsDoneLists[c].addEventListener('click', function (e) {
            console.log(e.target);
            let ID = this.dataset.id;
            for(let k = 0; k < parsetoDoList.length; k++){
                if (ID == parsetoDoList[k].id) {
                    parsetoDoList.splice(k,1);  
                    window.localStorage.setItem('toDoList', JSON.stringify(parsetoDoList));   
                    displayTaskList();           
                } else {
                    
                }

            }
            e.stopPropagation();
        })
    }

}




function displayisDoneList() {
    console.log('jalan');
    // get data di localstorage
    let arraytoDoList = window.localStorage.getItem('toDoList');
    let arrayCategoryList = window.localStorage.getItem('categoryList');

    // ubah ke object
    let parsetoDoList = JSON.parse(arraytoDoList);
    let parseCategoryList = JSON.parse(arrayCategoryList);

    let idDone = document.getElementById('idDoneList');
    let elementDoneList = [];

    console.log(idDone);


    for (let y = 0; y < parsetoDoList.length; y++) {
        for (let j = 0; j < parseCategoryList.length; j++) {
      

            if ((parsetoDoList[y].isDone == true) && (parseCategoryList[j].categoryId == parsetoDoList[y].categoryId)
                && (parseCategoryList[j].isActive == true)) {
                elementDoneList.push(`
                            <div class="contentDoneList">
                                <h5>${parsetoDoList[y].description}</h5>
                                <div class="closeBtn" data-id='${parsetoDoList[y].id}'>
                                    <span>x</span>
                                </div>
                            </div>
                    `)
            } else {
                console.log('false');

            }
        }
    }

    let join = elementDoneList.join('');
    idDone.innerHTML = join;

    // console.log(join);
}

displayTitleTaskList();
displayTaskList();
displayisDoneList();
addTaskListEventListener();
