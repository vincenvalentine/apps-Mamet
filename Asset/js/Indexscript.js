
function resetCategoryList() {
    let categoryList = [{
        'id': 1,
        'categoryId': 1,
        'color': '#26d335',
        'icon': 'Asset/images/icon-category-training.png',
        'name': 'Training',
        'quantity': 0,
        'isActive': false,
    }, {
        'id': 2,
        'categoryId': 2,
        'color': '#723f96',
        'icon': 'Asset/images/icon-category-work.png',
        'name': 'Work',
        'quantity': 0,
        'isActive': false,

    }, {
        'id': 3,
        'categoryId': 3,
        'color': '#26bfd3',
        'icon': 'Asset/images/icon-category-personal.png',
        'name': 'Personal',
        'quantity': 0,
        'isActive': false,

    }, {
        'id': 4,
        'categoryId': 4,
        'color': '#e2aa30',
        'icon': 'Asset/images/icon-category-shopping.png',
        'name': 'Shopping',
        'quantity': 0,
        'isActive': false,

    }, {
        'id': 5,
        'categoryId': 5,
        'color': '#e230d9',
        'icon': 'Asset/images/icon-category-study.png',
        'name': 'Study',
        'quantity': 0,
        'isActive': false,
    },
    ]

    window.localStorage.setItem('categoryList', JSON.stringify(categoryList))
}

////////////////////////////////////////////////////////////////////////////////////////

function displayCategoryList() {
    let arrayCategoryList = window.localStorage.getItem('categoryList');
    let parseCategoryList = JSON.parse(arrayCategoryList);

    // looping field btn
    let ids = document.getElementById('boxOfContent');
    let element = [];

    for (let i = 0; i < parseCategoryList.length; i++) {
        element.push(`
        <div class="box-content" data-categoryid=`+ parseCategoryList[i].id + `>
            <div class="image-content" data-categoryid=`+ parseCategoryList[i].id + `>
                <img src="`+ parseCategoryList[i].icon + `" alt="icon" srcset="" data-categoryid=` + parseCategoryList[i].id + `>
                <div class="round" style="background-color:`+ parseCategoryList[i].color + `">
                </div>
            </div>
            <h4 data-categoryid=`+ parseCategoryList[i].id + `>` + parseCategoryList[i].name + `</h4>
            <p>` + parseCategoryList[i].quantity + ` Task</p>
        </div>
    `);
    }

    let joinElemen = element.join('');
    ids.innerHTML = joinElemen;
}


////////////////////////////////////////////////////////////////////////////////////////
// update quantity 

function updateQtyCategoryList() {
    // get data di localstorage
    let arraytoDoList = window.localStorage.getItem('toDoList');
    let arrayCategoryList = window.localStorage.getItem('categoryList');

    // ubah ke object
    let parsetoDoList = JSON.parse(arraytoDoList);
    let parseCategoryList = JSON.parse(arrayCategoryList);


    // looping validasi
    for (let i = 0; i < parseCategoryList.length; i++) {
        let qty = 0;
        for (let j = 0; j < parsetoDoList.length; j++) {
            if (parseCategoryList[i].categoryId == parsetoDoList[j].categoryId) {
                qty++;
            } else {
                console.log('false');
            }
        }
        parseCategoryList[i].quantity = qty;
    }

    console.log(parseCategoryList);
    console.log(parsetoDoList);


    // push ke localStorage
    window.localStorage.setItem('categoryList', JSON.stringify(parseCategoryList))
}

////////////////////////////////////////////////////////////////////////////////////////
//date

function dateString() {
    let date = new Date();
    let dateToString = date.toDateString();

    document.getElementById('waktu').innerHTML = dateToString;
}

////////////////////////////////////////////////////////////////////////////////////////
// press button

function btnClickToCreatePage() {
    window.location.pathname = '/create_page.html';
    // window.location.href = window.location.href + 'create_page.html';
}

////////////////////////////////////////////////////////////////////////////////////////

function toTaskList() {
    let arrayCategoryList = window.localStorage.getItem('categoryList')
    let parseCategoryList = JSON.parse(arrayCategoryList);

    //get category id from class name 
    let todoListCatId = document.querySelector('box-content').dataset.categoryid;

    for (i = 0; i < parseCategoryList.length; i++) {
        if (parseCategoryList[i].id == todoListCatId) {
            console.log('yes');
        } else {
            console.log('no');

        }
    }
}

function goToTaskList() {
    let arrayCategoryList = window.localStorage.getItem('categoryList');
    let parseCategoryList = JSON.parse(arrayCategoryList);

    let container = document.querySelector('.container');

    let boxContent = document.getElementsByClassName('box-content');

    for (let i = 0; i < boxContent.length; i++) {
        boxContent[i].addEventListener('click', function () {
            let idBox = this.dataset.categoryid;
            console.log(this.dataset.categoryid);

            for (let j = 0; j < 6; j++) {
                if (idBox == j) {
                    let inx = j - 1;
                    parseCategoryList[inx].isActive = true;
                } else {
                    console.log('false');

                }
            }

            window.localStorage.setItem('categoryList', JSON.stringify(parseCategoryList));

            window.location.pathname = '/tasklist.html';

        })
    }
}

resetCategoryList();


dateString();
updateQtyCategoryList();
displayCategoryList();
goToTaskList();


