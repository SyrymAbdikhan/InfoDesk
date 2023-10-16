
const todoSection = document.querySelector('#todo');
const items = document.querySelector('.todo-items');
const inputText = document.querySelector('#todo-new-item');

if (!localStorage) {
    todoSection.style.display = 'none';
    throw new Error('localStorage is not supported');
}

inputText.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      createItem();
    }
});

const htmlToElement = (html) => {
    var template = document.createElement('template');
    html = html.trim();
    template.innerHTML = html;
    return template.content.firstChild;
}

const findItem = (items, id) => {
    for (var i = 0; i < items.length; i++) {
        if (items[i].ctime == id) {
            return i;
        }
    }
    return -1;
}

const getItems = () => {
    const val = localStorage.getItem("todoItems");
    if (val) {
        return JSON.parse(val);
    }
    return [];
}

const saveItems = (items) => {
    localStorage.setItem("todoItems", JSON.stringify(items));
}

const saveItem = (item) => {
    const items = getItems();
    items.push(item);
    saveItems(items);
}

const addItem = (item) => {
    var newItem = htmlToElement(`
        <div class="todo-item" id="${item.ctime}">
            <input type="checkbox" ${item.checked ? "checked" : ""} onClick="updateItem(this.parentNode);">
            <label>${item.text}</label>
            <button class="outline contrast" onClick="deleteItem(this.parentNode);">x</button>
        </div>
    `);
    items.appendChild(newItem);
}

const createItem = () => {
    var val = inputText.value;
    val = val.replace(/\ /g, '');
    if (val.length == 0 || val == "" || !val) {
        alert('Type something to add');
        return;
    }

    const currentDate = new Date();
    const timestamp = currentDate.getTime();
    const item = {
        checked: false,
        text: inputText.value,
        ctime: timestamp,
    };
    inputText.value = "";
    saveItem(item);
    addItem(item);
}

const updateItem = (parent) => {
    var item_id = parent.id;
    var items = getItems();
    var i = findItem(items, item_id);
    if (i != -1) {
        var input = parent.querySelector('input');
        items[i].checked = input.checked;
        saveItems(items);
    }
}

const deleteItem = (parent) => {
    parent.remove();
    var item_id = parent.id;
    var items = getItems();
    var i = findItem(items, item_id);
    if (i != -1) {
        items.splice(i, 1);
        saveItems(items);
    }
}

const loadItems = () => {
    var items = getItems();
    for (let i = 0; i < items.length; i++) {
        addItem(items[i]);
    }
}

loadItems();
