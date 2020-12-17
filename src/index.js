// import { TodoList } from './classes/todo-list.class';
// import { todo } from './classes/todo.class';
import {TodoList, Todo} from './classes';
import { crearTodoHtml } from './js/componentes';
import './styles.css';

export const todoList = new TodoList();

todoList.todos.forEach(element => crearTodoHtml(element));


//  localStorage.setItem('mi-key', 'abcd1235');


// setTimeout(() => {
//      localStorage.removeItem('mi-key');
// }, 1500);