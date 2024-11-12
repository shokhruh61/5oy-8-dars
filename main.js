"use strict";
const form = document.querySelector("#form");
const button = document.querySelector("#button");
const input = document.querySelector("#input");
const listWrapper = document.querySelector(".list-items");

function validate(input) {
  if (input.value.length < 5) {
    alert("Belgilar soni kam");
    input.focus();
    return false;
  }
  return true;
}

function createCard(data) {
  return `<div class="list-item">
          <p>${data.name}</p>
          <span>Delete</span>
        </div>`;
}

function getLocalStorageAll() {
  let todoList = [];
  if (localStorage.getItem("todoList")) {
    todoList = JSON.parse(localStorage.getItem("todoList"));
  }
  return todoList;
}

button &&
  button.addEventListener("click", function (event) {
    event.preventDefault();

    const isValid = validate(input);
    console.log("Validatsiya natijasi:", isValid);

    if (!isValid) {
      return;
    }

    const data = {
      id: Date.now(),
      name: input.value,
    };
    const card = createCard(data);
    listWrapper.insertAdjacentHTML("beforeend", card);
    input.value = "";

    const todoList = getLocalStorageAll();
    todoList.push(data);
    localStorage.setItem("todoList", JSON.stringify(todoList));
  });

document.addEventListener("DOMContentLoaded", function () {
  const todoList = getLocalStorageAll();
  todoList.forEach((value) => {
    const listts = createCard(value);
    listWrapper.insertAdjacentHTML("beforeend", listts);
  });
});
