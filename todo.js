const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
function addTodo(text, completed = false) {
    const li = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = completed;
    checkbox.addEventListener('change', () => {
        li.classList.toggle('completed', checkbox.checked);
        saveTodosToStorage();
    });
    li.appendChild(checkbox);
    const span = document.createElement('span');
    span.textContent = text;
    span.style.flex = '1';
    span.style.marginLeft = '8px';
    li.appendChild(span);
    const actions = document.createElement('span');
    actions.className = 'todo-actions';
    const delBtn = document.createElement('button');
    delBtn.innerHTML = '🗑️';
    delBtn.title = 'Delete';
    delBtn.onclick = () => {
        li.remove();
        saveTodosToStorage();
    };
    actions.appendChild(delBtn);
    li.appendChild(actions);
    li.classList.toggle('completed', completed);
    todoList.appendChild(li);
}
function getTodosFromStorage() {
    try {
        return JSON.parse(localStorage.getItem('todos') || '[]');
    } catch {
        return [];
    }
}
function saveTodosToStorage() {
    const todos = [];
    todoList.querySelectorAll('li').forEach(li => {
        const checkbox = li.querySelector('input[type="checkbox"]');
        const text = li.querySelector('span').textContent;
        todos.push({ text, completed: checkbox.checked });
    });
    localStorage.setItem('todos', JSON.stringify(todos));
}

window.addEventListener('DOMContentLoaded', () => {
    getTodosFromStorage().forEach(todo => addTodo(todo.text, todo.completed));
});

todoForm.addEventListener('submit', ()=> {
    const value = todoInput.value.trim();
    if (value) {
        addTodo(value);
        saveTodosToStorage();
        todoInput.value = '';
    }
});
