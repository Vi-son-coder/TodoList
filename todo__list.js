let list = document.querySelector(".todolist");
let btn__add = document.querySelector(".btn__add");
let btn__select = document.querySelector(".btn__select");
let btn__clearCpl = document.querySelector(".clear");

let SelectMod = false;
let todo__list = [];

function display() {
  list.innerHTML = "";
  todo__list.forEach((todo) => {
    let li = document.createElement("li");
    li.innerHTML = `
            <input type="checkbox" 
            class="done-checkbox" 
            data-id="${todo.id__todo}">

            <input type="checkbox" 
            class="delete-checkbox hidden"
            data-id="${todo.id__todo}"> 
            
            <span>${todo.input__todo}</span>
    `;
    let doneCb = li.querySelector(".done-checkbox");
    let deleteCb = li.querySelector(".delete-checkbox");

    if (SelectMod == true) {
      doneCb.classList.add("hidden");
      deleteCb.classList.remove("hidden");
    }
    deleteCb.checked = todo.selected;
    doneCb.checked = todo.done;
    list.appendChild(li);
  });
}

function add__todo(e) {
  e.preventDefault();
  let input = document.querySelector(".addtodo input");
  let input__todo = input.value.trim();

  let id__todo = Date.now();

  let todo = {
    id__todo,
    input__todo,
    done: false,
    selected: false,
  };

  todo__list.push(todo);
  input.value = "";
  display();
}

function number__all() {
  let dem = 0;
  let number = document.querySelector(".tab__all");

  todo__list.forEach((todo) => {
    dem++;
  });
  number.innerHTML = `${dem}`;
}

btn__select.addEventListener("click", () => {
  SelectMod = !SelectMod;
  if (SelectMod == true) {
    btn__select.textContent = "Hủy";
    btn__clearCpl.innerHTML = "Xóa";
  } else {
    btn__select.textContent = "Chọn";
    todo__list = todo__list.map((cancel) => {
      if (cancel.selected == true) {
        cancel.selected = false;
      }
      return cancel;
    });
    btn__clearCpl.innerHTML = "Clear checked";
  }
  display();
});

list.addEventListener("change", (todo) => {
  if (todo.target.classList.contains("done-checkbox") && SelectMod == false) {
    let id = Number(todo.target.dataset.id);
    //js thuần thì cách này gọn hơn
    let t = todo__list.find((t) => t.id__todo == id);
    if (t) t.done = !t.done;

    //cách này học react cần dùng:
    // todo__list = todo__list.map((t) => {
    //   if (t.id__todo == id ) {
    //     t.done = !t.done;
    //   }
    //   return t;
    // });
    display();
  }

  if (todo.target.classList.contains("delete-checkbox") && SelectMod == true) {
    let id = Number(todo.target.dataset.id);
    todo__list = todo__list.map((dcb) => {
      if (dcb.id__todo == id) {
        dcb.selected = !dcb.selected;
      }
      return dcb;
    });
    display();
  }
});

btn__add.addEventListener("click", (e) => {
  add__todo(e);
  number__all();
});

btn__clearCpl.addEventListener("click", (c) => {
  if (btn__clearCpl.textContent.includes("Clear checked")) {
    todo__list = todo__list.map((todo) => {
      if (todo.done == true){
        todo.done = false;
      }
      return todo;
    });
  } else if (btn__clearCpl.textContent.includes("Xóa")) {
    todo__list = todo__list.filter((todo) => {
      if(todo.selected == false){
        return true;
      }
    });
  }
  display();
});
