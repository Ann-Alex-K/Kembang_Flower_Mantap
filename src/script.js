document.addEventListener('DOMContentLoaded', function () {
    const body = document.body;
    let openButton = document.querySelector('.open-modal'),
        previous = document.querySelectorAll('.previous'),
        next = document.querySelectorAll('.next'),
        slider = document.querySelector('.slider-content'),
        changePrice = document.querySelector('.change-price'),
        cheaperImg = document.querySelector('.cheaper-img'),
        cheaperText = document.querySelector('.cheaper-text'),
        modal = document.querySelector('.modal');
    //open modal
    openButton.addEventListener('click', function () {
        renderModal();
        modal.classList.add('active');
        //no scrolling
        body.style.height = '100vh';
        body.style.overflowY = 'hidden';
    });

    //---- slider ---//  
    let i = 0;
    slider.innerHTML = sliderArr[0];

    next.forEach(function (item) {
        item.addEventListener('click', function () {
            i++;
            if (i == sliderArr.length) {
                i = 0;
            }
            slider.innerHTML = sliderArr[i];
        });
    });

    previous.forEach(function (item) {
        item.addEventListener('click', function () {
            i--;
            if (i < 0) {
                i = sliderArr.length - 1;
            }
            slider.innerHTML = sliderArr[i];
        });
    });

        //---- change price icon ---// 
        changePrice.addEventListener('click', function () {
            if (changePrice.classList.value !== 'change-price active') {
                changePrice.classList.add('active')
                cheaperText.innerHTML = 'Expensive First'
                cheaperImg.src = 'assets/Vector-14.png'
            } else {
                changePrice.classList.remove('active')
                cheaperText.innerHTML = 'Cheaper First'
                cheaperImg.src = 'assets/Vector-15.png'
            }
        });

});


let todos,
    searchUserId,
    searchCompleted,
    sliderArr = [];


//---- slider content---//  

sliderArr[0] = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,`
sliderArr[1] = `when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,`
sliderArr[2] = `but also the leap into electronic typesetting, remaining essentially unchanged.`

//---- validity ---//

function validityName() {
    let name = document.getElementById('input-name'),
        errFormName = document.querySelector('.errFormName');
    errFormName.innerHTML = '';
    if (name.value.length >= 3) {
        return true
    } else {
        errFormName.innerHTML = 'Name must be more than 3 characters';
    }
}

function validityNumber() {
    let number = document.getElementById('input-number');
    let numOption1 = number.value.startsWith('+7'),
        numOption2 = number.value.startsWith('8'),
        errFormNumber = document.querySelector('.errFormNumber');
    errFormNumber.innerHTML = '';
    if (number.value.length == 12 && numOption1 && number.value.slice(1) == +number.value.slice(1)) {
        return true
    } else if (number.value.length == 11 && numOption2 && number.value == +number.value) {
        return true
    } else {
        errFormNumber.innerHTML = 'Number start with +7 or 8 and by at least 11 symbols';
    }
}


//---- filtred ----//

function filteredByUserId() {
    searchUserId = todos.filter(function (item) {
        return item.userId === 5;
    });
}

function filteredByCompleted() {
    searchCompleted = searchUserId.filter(function (item) {
        return item.completed === false;
    });
}


//---- get request ---//

async function fetchTodos() {
    const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos`
    );
    if (response.status != 200) {
        delSpinner();
        //Request error message
        renderErrModal();
    } else {
        delSpinner();
        todos = await response.json();
        filteredByUserId();
        filteredByCompleted();
        //Render filtered response in a table
        renderTable(searchCompleted);
    }
}


//---- render ----//

function renderTable(list) {
    const todosBox = document.querySelector('.todosTable-wrapper');

    const table = document.createElement('div');
    table.classList.add('todosTableBox')
    const addHtml = `
                <table>
                    <thead>
                        <tr>
                            <th scope="col">userId</th>
                            <th scope="col">id</th>
                            <th scope="col">title</th>
                            <th scope="col">completed</th>
                        </tr>
                    </thead>
                    <tbody class="todosTable">
                    </tbody>
                </table>
                <div>
                <button class="modal-close" onclick="modalClose()">Close</button> 
                </div>
     
    `
    table.innerHTML = addHtml;
    todosBox.appendChild(table);

    const todosTable = document.querySelector('.todosTable');
    for (let item of list) {
        const todosRow = document.createElement('tr');

        const addHtml = `
        <td scope="row">${item.userId}</td>
        <td scope="row">${item.id}</td>
        <td scope="row">${item.title}</td>
        <td scope="row">${item.completed}</td>
        `

        todosRow.innerHTML = addHtml;
        todosTable.appendChild(todosRow);
    }
}

function renderErrModal() {
    const windowErr = document.querySelector('.todosErr-wrapper');

    const todosErr = document.createElement('div');
    todosErr.classList.add('todosErr');

    const addHtml = `
        <h3>Please try again later</h3>
        <h4>An error occurred during the request</h4>
        <button class="modal-close" onclick="modalClose()">Close</button>
        `

    todosErr.innerHTML += addHtml;
    windowErr.appendChild(todosErr);
}

function renderSpinner() {
    const spinnerBox = document.querySelector('.spinner-wrapper');

    const spinner = document.createElement('div')
    spinner.classList.add('spinner');

    spinnerBox.appendChild(spinner);
}

function renderModal() {
    const windowModal = document.querySelector('.modal-wrapper');

    const mainModal = document.createElement('div');
    mainModal.classList.add('modal-window');

    const addHtml = `
    <img class="modal-close" src="assets/X.png" onclick="modalClose()">
    <div class="modal-img">
        <img src="assets/IMG_0551.PNG" width="87px" height="87px">
    </div>
    <div class="modal-header">
        <h3>Site form</h3>
        <h4>Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
            the
            industry</h4>
    </div>
    <div class="modal-form">
        <form>
            <div class="form">
                <input placeholder="Name" id="input-name" name="name"/>
            </div>
            <div class="form">
                <input placeholder="Number" id="input-number" name="number"/>
            </div>
            <div class="errForm">
            <p class="errFormName"></p>
            <p class="errFormNumber"></p>
            </div>
        </form>
        <button class="modal-close" onclick="modalClose()">Cancel</button>
        <button type="submit" class="modal-get" onclick="modalGet()">Send</button>
    </div>
        `

    mainModal.innerHTML += addHtml;
    windowModal.appendChild(mainModal);
}


//---- clear ----//

function delSpinner() {
    const spinnerBox = document.querySelector('.spinner-wrapper');
    spinnerBox.innerHTML = '';
}

function clearModal() {
    const windowModal = document.querySelector('.modal-wrapper');
    windowModal.innerHTML = '';
}

function clearModalErr() {
    const windowErr = document.querySelector('.todosErr-wrapper');
    windowErr.innerHTML = '';
}

function clearTable() {
    const tableBox = document.querySelector('.todosTable-wrapper');
    tableBox.innerHTML = '';
}

//---- buttons activity ----//

function modalClose() {
    const body = document.body;
    //scroll resolution
    body.style.height = '';
    body.style.overflowY = '';
    clearModal();
    clearTable();
    clearModalErr();
    //hide modal window
    document.querySelector('.modal.active').classList.remove('active');
}

function modalGet() {
    if (validityName() === true && validityNumber() === true) {
        renderSpinner(); // loading spinner activation
        fetchTodos();
        clearModal();
    } else if (validityName() === true) {
        validityNumber();
    } else if (validityNumber() === true) {
        validityName();
    } else {
        validityName();
        validityNumber();
    }
}