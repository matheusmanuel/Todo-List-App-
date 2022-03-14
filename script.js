// obtendo todos os elementos necessários
const inputBox = document.querySelector(".campoInput input");
const addBtn = document.querySelector(".campoInput button");
const todoList = document.querySelector(".todoList");
const apagarTudoBtn = document.querySelector(".footer button");

// evento onkeyup
inputBox.onkeyup = () => {
  let valorInserido = inputBox.value; // obtendo o valor inserido pelo usuário
  if (valorInserido.trim() != 0) { // se o valor do usuário não for apenas espaços
    addBtn.classList.add("active"); //ative o botão adicionar
  } else {
    addBtn.classList.remove("active"); // desative o botão adicionar
  }
}

mostrarTarefas(); // chamando a função mostrarTarefas

addBtn.onclick = () => { // quando o usuário clica no botão de Adicionar
  let valorInserido = inputBox.value; //obtendo o valor do campo de entrada
  let getLocalStorageData = localStorage.getItem("New Todo"); // obtendo armazenamento local
  if (getLocalStorageData == null) { // se localstorage não tiver dados
    listArray = []; // criar um array em branco
  } else {
    listArray = JSON.parse(getLocalStorageData);  // transformando a string json em um objeto js
  }
  listArray.push(valorInserido); // empurrando ou adicionando novo valor no array
  localStorage.setItem("New Todo", JSON.stringify(listArray)); // transformando o objeto js em uma string json
  mostrarTarefas(); //calling showTask function
  addBtn.classList.remove("active"); // desative o botão adicionar uma vez que a tarefa foi adicionada
}

function mostrarTarefas() {
  let getLocalStorageData = localStorage.getItem("New Todo");
  if (getLocalStorageData == null) {
    listArray = [];
  } else {
    listArray = JSON.parse(getLocalStorageData);
  }
  const tarefaPendenteNumb = document.querySelector(".tarefaPendente");
  tarefaPendenteNumb.textContent = listArray.length; //passando o comprimento do array em pendentetask
  if (listArray.length > 0) { //se o comprimento da matriz for maior que 0
    apagarTudoBtn.classList.add("active"); //ative o botão excluir
  } else {
    apagarTudoBtn.classList.remove("active"); //desative o botão excluir
  }
  let newLiTag = "";
  listArray.forEach((element, index) => {
    newLiTag += `<li>${element}<span class="icon" onclick="deleteTask(${index})">X</span></li>`;
  });
  todoList.innerHTML = newLiTag; // adicionando nova tag li dentro da tag ul
  inputBox.value = ""; // uma vez adicionada a tarefa deixe o campo de entrada em branco
}

//função excluir tarefa
function deleteTask(index) {
  let getLocalStorageData = localStorage.getItem("New Todo");
  listArray = JSON.parse(getLocalStorageData);
  listArray.splice(index, 1); //excluir ou remover o li
  localStorage.setItem("New Todo", JSON.stringify(listArray));
  mostrarTarefas(); // chame a função mostrarTarefas
}

// função excluir todas as tarefas
apagarTudoBtn.onclick = () => {
  let getLocalStorageData = localStorage.getItem("New Todo"); //getting localstorage
  if (getLocalStorageData == null) { //se localstorage não tiver dados
    listArray = []; //criar um array em branco
  } else {
    listArray = JSON.parse(getLocalStorageData);  //transformando a string json em um objeto js
    listArray = []; //criar um array em branco
  }       
  localStorage.setItem("New Todo", JSON.stringify(listArray)); //set the item in localstorage
  mostrarTarefas(); //chame a função mostrarTarefas
}