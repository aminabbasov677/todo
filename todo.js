document.addEventListener('DOMContentLoaded', () => {
    const todoList = document.getElementById('todo-list');
    const addBtn = document.getElementById('add-btn');
    const sortBtn = document.getElementById('sort-btn');
    let isAscending = true;

    sortBtn.addEventListener('mouseover', () => {
        sortBtn.src = '/sortfromtoptobottomhover.png'; 
    });

    sortBtn.addEventListener('mouseout', () => {
        sortBtn.src = '/sortfromtoptobottom.png'; 
    });

    addBtn.addEventListener('click', () => {
        const lastLi = todoList.lastElementChild;
        const lastInput = lastLi.querySelector('.todo-input');
        const taskText = lastInput.value.trim();

        if (taskText !== '') {
            lastLi.innerHTML = `
                <span class="todo-text">${taskText}</span>
                <img class="delete-btn" src="./remove.png">
            `;

            const newLi = document.createElement('li');
            newLi.innerHTML = `
                <input type="text" class="todo-input">
                <img class="delete-btn" src="./remove.png">
            `;
            todoList.appendChild(newLi);
        }
    });

    todoList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-btn')) {
            const li = e.target.parentElement;
            const allItems = todoList.getElementsByTagName('li');
            const input = li.querySelector('.todo-input');
            const taskText = input ? input.value.trim() : '';

            if (input && taskText === '') {
                return; 
            }

            if (allItems.length === 1) {
                if (input) {
                    input.value = '';
                }
            } else {
                li.remove();
            }
        }
    });

    sortBtn.addEventListener('click', () => {
        const tasks = Array.from(todoList.getElementsByTagName('li'));
        const nonEmptyTasks = tasks.filter(li => {
            const textElement = li.querySelector('.todo-text');
            return textElement && textElement.textContent.trim() !== '';
        });

        const inputTask = tasks.find(li => li.querySelector('.todo-input'));

        nonEmptyTasks.sort((a, b) => {
            const textA = a.querySelector('.todo-text').textContent.trim().toLowerCase();
            const textB = b.querySelector('.todo-text').textContent.trim().toLowerCase();
            return isAscending ? textA.localeCompare(textB) : textB.localeCompare(textA);
        });

        while (todoList.firstChild) {
            todoList.removeChild(todoList.firstChild);
        }

        nonEmptyTasks.forEach(task => todoList.appendChild(task));
        if (inputTask) {
            todoList.appendChild(inputTask);
        }

        isAscending = !isAscending;
        sortBtn.style.transform = isAscending ? 'rotate(0deg)' : 'rotate(180deg)';
    });
});