let section = document.querySelector("section");
let add = document.querySelector("form button");
add.addEventListener('click',e => {
e.preventDefault();

  // get the input values 
  let form = e.target.parentElement;
  let todoText = form.children[0].value;
  let todoMonth = form.children[1].value;
  let todoDate = form.children[2].value;

  if (todoText === "" ){
    alert("Please enter your plan \n 請輸入您的計劃");
    return;
  }

  // create a todo
  let todo = document.createElement("div");
  todo.classList.add("todo");
  // create complete button
  let completeButton = document.createElement("div");
  completeButton.classList.add("complete");
  let text = document.createElement("p");
  text.classList.add("todo-text");
  text.innerText = todoText;
  let time = document.createElement("p");
  time.classList.add("todo-time");
  time.innerText = todoMonth + "/" + todoDate;
  todo.appendChild(completeButton);
  todo.appendChild(text);
  todo.appendChild(time);

  completeButton.addEventListener("click",e => {
    let todoItem = e.target.parentElement;
    todoItem.classList.toggle('done');
    completeButton.classList.toggle('done_button');
    let doneTextColor = e.target.parentElement.children[1];
    doneTextColor.classList.toggle('doneTextColor');
    let doneTimeColor = e.target.parentElement.children[2];
    doneTimeColor.classList.toggle('doneTimeColor');
    console.log(doneTimeColor);
  });
  // create trashcan
  let trashCan = document.createElement('button');
  trashCan.classList.add('trash');
  trashCan.innerHTML='<i class="fa-solid fa-xmark"></i>';

  trashCan.addEventListener("click",e =>{
  let todoItem = e.target.parentElement;
  // remove todoItem after scaleDown 0.3s done.
  todoItem.addEventListener("animationend",()=>{

    //remove from localstorage
    let text = todoItem.children[1].innerText;
    let myListArray = JSON.parse(localStorage.getItem("list"));
    myListArray.forEach((item, index) => {
      if (item.todoText == text){
        myListArray.splice(index, 1);
        localStorage.setItem("list", JSON.stringify(myListArray));
      }
    }) 
    todoItem.remove();
  })

  todoItem.style.animation = 'fadeout .5s forwards';

  })

  todo.appendChild(trashCan);

  todo.style.animation = 'fadein 1.5s forwards';
  // create a todo object
  let myTodo = {
  todoText: todoText,
  todoMonth: todoMonth,
  todoDate: todoMonth
  };

  // store data into an array of object
  let myList = localStorage.getItem("list");
  if (myList == null){
  localStorage.setItem("list",JSON.stringify([myTodo]));
  }else{
  let myListArray = JSON.parse(myList);
  myListArray.push(myTodo);
  localStorage.setItem("list",JSON.stringify(myListArray));
  }

  console.log(JSON.parse(localStorage.getItem("list")));

  form.children[0].value = ""; //clear the text input

  section.appendChild(todo);

})

let myList = localStorage.getItem("list");
if(myList !== null){
  let myListArray = JSON.parse(myList);
  myListArray.forEach(item => {
    // create a todo like the previous
    let completeButton = document.createElement("div");
    completeButton.classList.add("complete");
    let todo = document.createElement("div");
    todo.classList.add("todo");
    let text = document.createElement("p");
    text.classList.add("todo-text");
    text.innerText = item.todoText;
    let time = document.createElement("p");
    time.classList.add("todo-time");
    time.innerText = item.todoMonth + "/" + item.todoDate;

    completeButton.addEventListener("click",e => {
      let todoItem = e.target.parentElement;
      todoItem.classList.toggle('done');
      let done_button = e.target;
      done_button.classList.toggle('done_button');
      let doneTextColor = e.target.parentElement.children[1];
      doneTextColor.classList.toggle('doneTextColor');
      let doneTimeColor = e.target.parentElement.children[2];
      doneTimeColor.classList.toggle('doneTimeColor');
      console.log(doneTimeColor);
    });

    todo.appendChild(completeButton);
    todo.appendChild(text);
    todo.appendChild(time);

    // create a delete button
    let trashCan = document.createElement('button');
    trashCan.classList.add('trash');
    trashCan.innerHTML='<i class="fa-solid fa-xmark"></i>';
    
    trashCan.addEventListener("click",e =>{
      let todoItem = e.target.parentElement;
    // remove todoItem after scaleDown 0.3s done.
      todoItem.addEventListener("animationend",()=>{
        //remove from localstorage
        let text = todoItem.children[1].innerText;
        let myListArray = JSON.parse(localStorage.getItem("list"));
        myListArray.forEach((item, index) => {
          if (item.todoText == text){
            myListArray.splice(index, 1);
            localStorage.setItem("list", JSON.stringify(myListArray));
          }
        }) 
        todoItem.remove();
      })
    
      todoItem.style.animation = 'fadeout .5s forwards';
    
    })
    
    todo.style.animation = 'fadein 1.5s forwards';

    todo.appendChild(trashCan);
    section.appendChild(todo);
  })
}