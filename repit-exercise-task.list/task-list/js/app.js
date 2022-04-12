window.addEventListener("load", () => {
    //Adding variables
    let id = 0;
    let text = "";
    let alert = document.querySelector(".alert");
  
    //function for close element alert
    let close = alert.firstElementChild;
    close.addEventListener("click", () => {
      alert.classList.add("dismissible");
    });
  
    //function for get value input on focus
    let input = document.querySelector("input");
    input.addEventListener("focus", () => {
      document.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
        }
      });
    });
  
    //function where element arrow is clickable
    let arrow = document.querySelector(".arrow");
    arrow.addEventListener("click", (e) => {
      if (input.value.trim() === "") {
        e.preventDefault();
        input.value = "";
        alert.classList.remove("dismissible");
      } else {
        text = input.value;
        input.value = "";
        id =
          parseInt(
            document.querySelector("tbody")?.lastElementChild?.getAttribute("id")
          ) + 1 || 0;
        document.querySelector("tbody").appendChild(generateRow(id, text));
      }
    });
  
    //function for task complete
    let done = document.querySelectorAll(".fa-circle-check");
    done.forEach((item) => {
      item.addEventListener("click", (e) => {
        deleteTask(e);
      });
    });
  
    //Enable user to edit task
    let edit = document.querySelectorAll(".fa-pencil");
    edit.forEach((item)=>{
      item.addEventListener("click", (e)=>{
          editTask(e, false);
      });
    });
  
    let taskContent = document.querySelectorAll(".task");
    taskContent.forEach((item)=>{
      item.addEventListener("focus", (e)=>{
          editTask(e, true);
      });
  
      item.addEventListener("blur", (e)=>{
          e.target.classList.remove("editable");
      })
    });
  
    
    let trash = document.querySelectorAll(".fa-trash");
    trash.forEach((item)=>{
      item.addEventListener("click", (e)=>{
          removeRow(e, false);
      });
    });
  });
  
  //function to create new row
  const generateRow = (id, text) => {
    let newRow = document.createElement("tr");
    newRow.setAttribute("id", id);
    newRow.innerHTML = `
      <td>
          <i class="fa-solid fa-circle-check"></i>
          <span contenteditable="true" class="task">${text}</span>
      </td>
      <td>
          <span class="fa-stack fa-2x">
              <i class="fa-solid fa-square fa-stack-2x"></i>
              <i class="fa-solid fa-pen fa-stack-1x fa-inverse"></i>
          </span>
      </td>
      <td>
      <span class="fa-stack fa-2x">
          <i class="fa-solid fa-square fa-stack-2x"></i>
          <i class="fa-solid fa-trash fa-stack-1x fa-inverse"></i>
      </span>
      </td>
      `;
  
      //Click icon check
      newRow.firstElementChild.firstElementChild.addEventListener("click", (event)=>{
          deleteTask(e);
      });
  
      //Over text
      newRow.firstElementChild.lastElementChild.addEventListener("click", (event)=>{
          editTask(e,true);
      });
  
      //Icon pen
      newRow.firstElementChild.nextElementSibling.firstElementChild.addEventListener("click", (event)=>{
          editTask(e,false);
      });
  
      //Icon trash
      newRow.lastElementChild.firstElementChild.addEventListener("click", (event)=>{
          removeRow(e, false);
      });
  
    return newRow;
  };
  
  //function to complete task
  const deleteTask = (e) => {
    let task = e.target.nextElementSibling;
    let text = task.innerHTML;
    if (text.includes("<del>")) {
      task.parentNode.parentNode.setAttribute("data-complete", "false");
      text = task.firstElementChild.textContent;
      task.innerHTML = text;
    } else {
      task.innerHTML = `<del>${text}</del>`;
      task.parentNode.parentNode.setAttribute("data-complete", "true");
    }
  };
  
  //function to edit task
  const editTask=(e, onFocus)=>{
      if(onFocus===true){
          let editable = e;
          e.target.classList.add("editable");
          document.addEventListener('keydown', (e)=>{
              console.log(event.key);
              if(event.key==="Escape"){
                  if(editable.target.innerHTML.trim()===""){
                      removeRow(editable, true);
                  }
                  e.target.classList.remove("editable");
                  editable.target.blur();        
              }
          })
      }else{
          let editable = e.target.parentNode.parentNode.previousElementSibling.lastElementChild;
          editable.classList.add("editable");
          editable.focus();
      }
  }
  
  //Function to remove row
  const removeRow = (e, editing)=>{
      if(editing){
          //remove when value == ""
          e.target.parentNode.parentNode.remove();
      }else{
          //remove when click icon delete
          e.target.parentNode.parentNode.parentNode.remove();
      }
  }
  
  //hacer un filtro de busqueda con campo select donde exista las siguientes opciones All (por defecto), done, undone, segun la opcion seleccionada debe de aparecer las filas correspondiente de cada uno
  