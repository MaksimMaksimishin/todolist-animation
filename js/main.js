const todoList = document.getElementById('todo-list');
    const todoInput = document.getElementById('todo-input');

    function addTodo() {
      const todoText = todoInput.value.trim();
      if (todoText !== '') {
        const todoItem = document.createElement('li');
        todoItem.className = 'todo-item';
        todoItem.innerHTML = `
          <span>${todoText}</span>
          <button class="delete-btn" onclick="deleteTodo(this)">Delete</button>
        `;
        todoList.appendChild(todoItem);
        todoInput.value = '';

        saveToLocalStorage();

        setTimeout(() => {
          todoItem.style.backgroundColor = '#f9f9f9';
        }, 10);
      }
    }

    function deleteTodo(button) {
      const todoItem = button.parentNode;
      todoItem.style.backgroundColor = '#ffcccc';

      setTimeout(() => {
        todoList.removeChild(todoItem);
        saveToLocalStorage();
      }, 300);
    }

    function deleteAllTodos() {
      const todoItems = Array.from(todoList.children);

      todoItems.forEach((item, index) => {
        setTimeout(() => {
          item.style.opacity = '0';
        }, index * 50);
      });

      setTimeout(() => {
        todoItems.forEach(item => {
          todoList.removeChild(item);
        });
        saveToLocalStorage();
      }, todoItems.length * 50);
    }

    function saveToLocalStorage() {
      const todos = Array.from(todoList.children).map(todo => todo.querySelector('span').textContent);
      localStorage.setItem('todos', JSON.stringify(todos));
    }

    function loadFromLocalStorage() {
      const todos = JSON.parse(localStorage.
getItem('todos')) || [];
      todos.forEach(todoText => {
        const todoItem = document.createElement('li');
        todoItem.className = 'todo-item';
        todoItem.innerHTML = `
          <span>${todoText}</span>
          <button class="delete-btn" onclick="deleteTodo(this)">Delete</button>
        `;
        todoList.appendChild(todoItem);
      });
    }

    loadFromLocalStorage();