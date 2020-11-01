const tasks = [
  {
    _id: '5d2ca9e2e03d40b326596aa7',
    completed: true,
    body: 'Watch an exciting action movie starring Gerard Butler',
    title: 'Watch an interesting movie after work',
  },
  {
    _id: '5d2ca9e29c8a94095c1288e0',
    completed: false,
    body: 'Work out in the gym and swim in the pool',
    title: 'Go to a training session',
  },
];

(function (arrayOfTasks) {
  const objectOfTasks = arrayOfTasks.reduce((acc, task) => {
    acc[task._id] = task;
    return acc;
  }, {});

  //Elements UI
  const listContainer = document.querySelector('.list-tasks .tasks'),
    form = document.forms['add-task'],
    formTitle = form.elements['title'],
    formBody = form.elements['body'],
    overlayFillField = document.querySelector('.overlay-add-task');

  //Handlers
  renderAllTasks(objectOfTasks);
  form.addEventListener('submit', onFormSubmitHandler);
  listContainer.addEventListener('click', onDeleteHandler);
  createOverlayFillFieldTemplate();
  overlayFillField.addEventListener('click', hideOverlayFillField);

  //Functions
  function renderAllTasks(taskList) {
    const fragment = document.createDocumentFragment();

    Object.values(objectOfTasks).forEach((task) => {
      const li = createTaskTemplate(task);
      fragment.appendChild(li);
    });
    listContainer.appendChild(fragment);
  }

  function createTaskTemplate({ _id, title, body }) {
    const li = document.createElement('li'),
      header = document.createElement('h2'),
      paragraph = document.createElement('p'),
      deleteButton = document.createElement('button');

    li.classList.add('tasks__item');
    header.classList.add('tasks__title');
    paragraph.classList.add('tasks__text');
    deleteButton.classList.add('tasks__button');

    li.setAttribute('data-task-id', _id);
    header.textContent = title;
    paragraph.textContent = body;
    deleteButton.textContent = 'Delete task';

    li.appendChild(header);
    li.appendChild(paragraph);
    li.appendChild(deleteButton);

    return li;
  }

  function onFormSubmitHandler(e) {
    e.preventDefault();
    const titleValue = formTitle.value,
      bodyValue = formBody.value;

    if (!titleValue || !bodyValue) {
      overlayFillField.classList.add('overlay-add-task--show');
      document.body.classList.add('hidden');
      return;
    }

    const task = createNewTask(titleValue, bodyValue);
    const listItem = createTaskTemplate(task);
    listContainer.insertAdjacentElement('afterbegin', listItem);
    form.reset();
  }

  function createNewTask(title, body) {
    const newTask = {
      title,
      body,
      completed: false,
      _id: `task-${Math.floor(Math.random() * 10000)}`,
    };

    objectOfTasks[newTask._id] = newTask;

    return { ...newTask };
  }

  function onDeleteHandler({ target }) {
    if (target.classList.contains('tasks__button')) {
      const parent = target.closest('[data-task-id]'),
        id = parent.dataset.taskId,
        confirmed = deleteTaskFromObject(id);
      deletTaskFromHtml(confirmed, parent);
    }
  }

  function deleteTaskFromObject(id) {
    const { title } = objectOfTasks[id],
      isConfirm = confirm(`Are you sure you want to delete this task ${title}`);
    if (!isConfirm) return confirm;
    delete objectOfTasks[id];
    return confirm;
  }

  function deletTaskFromHtml(confirm, task) {
    if (!confirm) return;
    task.remove();
  }

  function renderOverlay(element) {
    const fragment = document.createDocumentFragment();
    fragment.appendChild(element)
    overlayFillField.appendChild(element)
  }

  function createOverlayFillFieldTemplate() {
    const container = document.createElement('div'),
      title = document.createElement('p'),
      button = document.createElement('button');

    container.classList.add('overlay-add-task__wrapper');
    title.classList.add('overlay-add-task__title');
    button.classList.add('overlay-add-task__button');

    title.textContent = `Are you sure you want to delete this task?`
    button.textContent = `ok`

    container.appendChild(title);
    container.appendChild(button);

    renderOverlay(container);
  }

  function hideOverlayFillField({ target }) {
    
    if (
      target.classList.contains('overlay-add-task') ||
      target.classList.contains('overlay-add-task__button')
    ) {
      overlayFillField.classList.remove('overlay-add-task--show');
      document.body.classList.remove('hidden');
    }
  }
})(tasks);
