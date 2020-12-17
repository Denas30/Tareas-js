

//Referencias

import { Todo } from "../classes";
import { todoList } from "../index"

const divList   = document.querySelector('.todo-list');
const buscador  = document.querySelector('.new-todo');
const btnBorrar = document.querySelector('.clear-completed');
const ulFilters = document.querySelector('.filters');
const anFiltros = document.querySelectorAll('.filtro');

export const crearTodoHtml = ( todo ) =>{


   const htmlTodo = `
       <li class="${ (todo.completado) ? 'completed' : ''}" data-id="${todo.id}">
        <div class="view">
            <input class="toggle" type="checkbox" ${(todo.completado) ? 'checked' : ''}>
            <label>${todo.tarea}</label>
            <button class="destroy"></button>
        </div>
	  <input class="edit" value="Create a TodoMVC template">
	  </li>
   `
       const div = document.createElement('div');
       div.innerHTML = htmlTodo;

       divList.append(div.firstElementChild);

       return div.firstElementChild;
}


buscador.addEventListener('keyup',(event) =>{
   if (event.keyCode === 13 && buscador.value.length > 0) {
    
       const nuevoTodo = new Todo(buscador.value);
       todoList.nuevoTodo(nuevoTodo);

       crearTodoHtml(nuevoTodo);
       buscador.value ='';
   }
});

divList.addEventListener('click', (event)=>{
   
      const nombreElemnto = event.target.localName;
      const todoElemento  = event.target.parentElement.parentElement;
      const todoId        = todoElemento.getAttribute('data-id');
     
      if (nombreElemnto.includes('input')) {
          todoList.marcarCompletado(todoId);
          todoElemento.classList.toggle('completed');
      }else if(nombreElemnto.includes('button')){
          todoList.eliminarCompletado(todoId);
          divList.removeChild(todoElemento);
      }

 
});

btnBorrar.addEventListener('click', () =>{
  todoList.eliminarCompletado();

  for(let i = divList.children.length - 1; i >= 0; i --){
        const element = divList.children[i];
       
        if (element.classList.contains('completed')) {
              divList.removeChild(element);
        }
  }

});

ulFilters.addEventListener('click', (event) =>{
     const filtro = event.target.text;
     if (!filtro) { return; }

     anFiltros.forEach(m => m.classList.remove('selected'));
     event.target.classList.add('selected');

     for (const elemento of divList.children) {
           elemento.classList.remove('hidden');
           const comple = elemento.classList.contains('completed');

           switch(filtro){
               case 'Pendientes':
                 if (comple) {
                     elemento.classList.add('hidden');
                 }  
                 break;

                 case 'Completados':
                  if (!comple) {
                      elemento.classList.add('hidden');
                  }  
                  break; 
           }
     }
});