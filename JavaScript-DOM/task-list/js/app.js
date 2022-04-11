window.addEventListener("load", () => {
  // Adding variables
  let id = 0;
  let text = "";
  let alert = document.querySelector(".alert");
  let close = alert.firstElementChild;

  close.addEventListener("click", () => {
    alert.classList.add("dismissible");
  });
  let input = document.querySelector("input");
  input.addEventListener("focus", () => {
    // con esta accion evitamos que recargue la pagina se puede poner e o event
    document.addEventListener("keypress", (event) => {
      if (event.key == "Enter") {
        event.preventDefault();
        console.log(event);
      }
    });
  });
  // hacemos que todo el div azul sea el evento click
  let arrow = document.querySelector(".arrow");
  arrow.addEventListener("click", (e) => {
    //   el if hace que input no se quede vacio .trimp elimina espacios vacios
    if (input.value.trim() === "") {
      e.preventDefault();
      input.value = "";
      alert.classList.remove("dismissible");
    } else {
      text = input.value;
      input.value = "";
      id =
        parseInt(
          document.querySelector("tbody").lastElementChild.getAttribute("id")
        ) + 1 || 0;
      // añade el identificador y las lineas nuevas
      document.querySelector("tbody").appendChild(generateRow(id, text));
    }
  });
  let done = document.querySelectorAll(".fa-circle-check");
  console.log(done);
  done.forEach((item) => {
    item.addEventListener("click", (e) => {
      deleteTask(e);
    });
  });
  //   parte de benjamin

  let edit = document.querySelectorAll(".fa-pencil");
  edit.forEach((item) => {
    item.addEventListener("click", (e) => {
      editTask(e, false);
    });
  });
});
const generateRow = (id, text) => {
  let newRow = document.createElement("tr");
  newRow.setAttribute("id", id);
  newRow.innerHTML = `
    <td>
    <i class="fa-solid fa-circle-check"></i>
    <span contenteditable="true" class="task"> ${text}</span>
</td>
<td>
    <span class="fa-stack fa-2x">
        <i class="fa-solid fa-square fa-stack-2x"></i>
        <i class="fa-solid fa-stack-1x fa-pencil fa-inverse"></i>
    </span>
</td>
<td>
    <span class="fa-stack fa-2x">
        <i class="fa-solid fa-square fa-stack-2x"></i>
        <i class="fa-solid fa-stack-1x fa-trash fa-inverse"></i>
    </span>
</td>
    `;
  return newRow;
};
const deleteTask = (e) => {
  let task = e.target.nextElementSibling;
  let text = task.innerHTML;
  console.log(task.innerHTML);
  // se puede usar para el ejercicio del input all/done/...
  if (text.includes("<del>")) {
    task.parentNode.parentNode.setAttribute("data-complete", "false");
    text = task.firstElementChild.textContent;
    task.innerHTML = text;
  } else {
    task.innerHTML = `<del>${text}</del>`;
    task.parentNode.parentNode.setAttribute("data-complete", "true");
  }
};

const editTask = (e, onfocus) =>{
    
}