const tasks = [
  {
    title: 'Watch an interesting movie after work',
    body: 'Watch an exciting action movie starring Gerard Butler',
    completed: true,
    _id: 'task-1',
  },
  {
    title: 'Go to a training session',
    body: 'Work out in the gym and swim in the pool',
    completed: false,
    _id: 'task-2',
  },
];

(function (arrayOfTasks) {
  const tasks = loadTasksFromLocalStorage() || arrayOfTasks;

  //Elements UI
  const listContainer = document.querySelector('.list-tasks .tasks'),
    form = document.forms['add-task'],
    formTitle = form.elements['title'],
    formBody = form.elements['body'];

  //Handlers
  renderAllTasks(tasks);
  form.addEventListener('submit', onFormSubmitHandler);
  listContainer.addEventListener('click', onDeleteHandler);

  //Functions
  function renderAllTasks(taskList) {
    const fragment = document.createDocumentFragment();

    taskList.forEach((task) => {
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
      renderOverlayValidation();
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
    tasks.unshift(newTask);
    saveTasksToLocalStorage(tasks);
    return newTask;
  }

  function onDeleteHandler({ target }) {
    if (target.classList.contains('tasks__button')) {
      const parent = target.closest('[data-task-id]'),
        id = parent.dataset.taskId,
        { title } = tasks.find((item) => item._id === id);
      renderOverlayDelete(id, parent, title);
    }
  }

  function renderOverlayDelete(id, task, title) {
    let fragment = document.createDocumentFragment(),
      overlay = document.createElement('div'),
      container = document.createElement('div'),
      header = document.createElement('h2'),
      innerButton = document.createElement('div'),
      buttonConfirm = document.createElement('button'),
      buttonDelete = document.createElement('button');

    overlay.classList.add('overlay-delete-task');
    container.classList.add('overlay-delete-task__wrapper');
    header.classList.add('overlay-delete-task__title');
    innerButton.classList.add('overlay-delete-task__inner-button');
    buttonConfirm.classList.add('overlay-delete-task__confirm');
    buttonDelete.classList.add('overlay-delete-task__cancel');
    document.body.classList.add('hidden');

    header.textContent = `Are you sure you want to delete
     this task "${title}"?`;
    buttonConfirm.textContent = `ok`;
    buttonDelete.textContent = `cancel`;

    overlay.appendChild(container);
    container.appendChild(header);
    container.appendChild(innerButton);
    innerButton.appendChild(buttonConfirm);
    innerButton.appendChild(buttonDelete);

    fragment.appendChild(overlay);
    document.querySelector('.main').appendChild(fragment);

    overlay.addEventListener('click', (e) => {
      const closeOverlay =
        e.target.tagName === 'BUTTON' || e.target === overlay;
      if (closeOverlay) {
        overlay.remove();
        document.body.classList.remove('hidden');
      }
    });

    buttonConfirm.addEventListener('click', (e) => {
      //remove item from data
      const index = tasks.findIndex((item) => item._id === id);
      tasks.splice(index, 1);
      saveTasksToLocalStorage(tasks);
      task.remove();
    });
  }

  function renderOverlayValidation() {
    const fragment = document.createDocumentFragment(),
      overlay = document.createElement('div'),
      container = document.createElement('div'),
      header = document.createElement('h2'),
      button = document.createElement('button');

    overlay.classList.add('overlay-add-task');
    container.classList.add('overlay-add-task__wrapper');
    header.classList.add('overlay-add-task__title');
    button.classList.add('overlay-add-task__button');

    header.textContent = 'Please fill in all fields';
    button.textContent = 'ok';

    overlay.appendChild(container);
    container.appendChild(header);
    container.appendChild(button);

    fragment.appendChild(overlay);
    document.querySelector('.main').appendChild(fragment);

    overlay.addEventListener('click', (e) => {
      const closeOverlay =
        e.target.tagName === 'BUTTON' || e.target === overlay;
      if (closeOverlay) {
        document.body.classList.remove('hidden');
        overlay.remove();
      }
    });
  }

  function loadTasksFromLocalStorage() {
    return JSON.parse(localStorage.getItem('tasks'));
  }

  function saveTasksToLocalStorage(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
})(tasks);

(function changeTheme() {
  const changeThemeButton = document.querySelector('.header__theme-select'),
    body = document.body;
  changeThemeButton.addEventListener('click', toggleTheme);

  if (!localStorage.theme) localStorage.theme = 'light';
  document.body.className = localStorage.theme;

  function toggleTheme({ target }) {
    body.classList.toggle('dark');
    changeThemeButton.textContent = body.classList.contains('dark')
      ? 'change theme to light'
      : 'change theme to dark';
    localStorage.theme = document.body.className || 'light';
  }
})();

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJpbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB0YXNrcyA9IFtcclxuICB7XHJcbiAgICB0aXRsZTogJ1dhdGNoIGFuIGludGVyZXN0aW5nIG1vdmllIGFmdGVyIHdvcmsnLFxyXG4gICAgYm9keTogJ1dhdGNoIGFuIGV4Y2l0aW5nIGFjdGlvbiBtb3ZpZSBzdGFycmluZyBHZXJhcmQgQnV0bGVyJyxcclxuICAgIGNvbXBsZXRlZDogdHJ1ZSxcclxuICAgIF9pZDogJ3Rhc2stMScsXHJcbiAgfSxcclxuICB7XHJcbiAgICB0aXRsZTogJ0dvIHRvIGEgdHJhaW5pbmcgc2Vzc2lvbicsXHJcbiAgICBib2R5OiAnV29yayBvdXQgaW4gdGhlIGd5bSBhbmQgc3dpbSBpbiB0aGUgcG9vbCcsXHJcbiAgICBjb21wbGV0ZWQ6IGZhbHNlLFxyXG4gICAgX2lkOiAndGFzay0yJyxcclxuICB9LFxyXG5dO1xyXG5cclxuKGZ1bmN0aW9uIChhcnJheU9mVGFza3MpIHtcclxuICBjb25zdCB0YXNrcyA9IGxvYWRUYXNrc0Zyb21Mb2NhbFN0b3JhZ2UoKSB8fCBhcnJheU9mVGFza3M7XHJcblxyXG4gIC8vRWxlbWVudHMgVUlcclxuICBjb25zdCBsaXN0Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxpc3QtdGFza3MgLnRhc2tzJyksXHJcbiAgICBmb3JtID0gZG9jdW1lbnQuZm9ybXNbJ2FkZC10YXNrJ10sXHJcbiAgICBmb3JtVGl0bGUgPSBmb3JtLmVsZW1lbnRzWyd0aXRsZSddLFxyXG4gICAgZm9ybUJvZHkgPSBmb3JtLmVsZW1lbnRzWydib2R5J107XHJcblxyXG4gIC8vSGFuZGxlcnNcclxuICByZW5kZXJBbGxUYXNrcyh0YXNrcyk7XHJcbiAgZm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBvbkZvcm1TdWJtaXRIYW5kbGVyKTtcclxuICBsaXN0Q29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb25EZWxldGVIYW5kbGVyKTtcclxuXHJcbiAgLy9GdW5jdGlvbnNcclxuICBmdW5jdGlvbiByZW5kZXJBbGxUYXNrcyh0YXNrTGlzdCkge1xyXG4gICAgY29uc3QgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XHJcblxyXG4gICAgdGFza0xpc3QuZm9yRWFjaCgodGFzaykgPT4ge1xyXG4gICAgICBjb25zdCBsaSA9IGNyZWF0ZVRhc2tUZW1wbGF0ZSh0YXNrKTtcclxuICAgICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQobGkpO1xyXG4gICAgfSk7XHJcbiAgICBsaXN0Q29udGFpbmVyLmFwcGVuZENoaWxkKGZyYWdtZW50KTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGNyZWF0ZVRhc2tUZW1wbGF0ZSh7IF9pZCwgdGl0bGUsIGJvZHkgfSkge1xyXG4gICAgY29uc3QgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpLFxyXG4gICAgICBoZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMicpLFxyXG4gICAgICBwYXJhZ3JhcGggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyksXHJcbiAgICAgIGRlbGV0ZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG5cclxuICAgIGxpLmNsYXNzTGlzdC5hZGQoJ3Rhc2tzX19pdGVtJyk7XHJcbiAgICBoZWFkZXIuY2xhc3NMaXN0LmFkZCgndGFza3NfX3RpdGxlJyk7XHJcbiAgICBwYXJhZ3JhcGguY2xhc3NMaXN0LmFkZCgndGFza3NfX3RleHQnKTtcclxuICAgIGRlbGV0ZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKCd0YXNrc19fYnV0dG9uJyk7XHJcblxyXG4gICAgbGkuc2V0QXR0cmlidXRlKCdkYXRhLXRhc2staWQnLCBfaWQpO1xyXG4gICAgaGVhZGVyLnRleHRDb250ZW50ID0gdGl0bGU7XHJcbiAgICBwYXJhZ3JhcGgudGV4dENvbnRlbnQgPSBib2R5O1xyXG4gICAgZGVsZXRlQnV0dG9uLnRleHRDb250ZW50ID0gJ0RlbGV0ZSB0YXNrJztcclxuXHJcbiAgICBsaS5hcHBlbmRDaGlsZChoZWFkZXIpO1xyXG4gICAgbGkuYXBwZW5kQ2hpbGQocGFyYWdyYXBoKTtcclxuICAgIGxpLmFwcGVuZENoaWxkKGRlbGV0ZUJ1dHRvbik7XHJcblxyXG4gICAgcmV0dXJuIGxpO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gb25Gb3JtU3VibWl0SGFuZGxlcihlKSB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBjb25zdCB0aXRsZVZhbHVlID0gZm9ybVRpdGxlLnZhbHVlLFxyXG4gICAgICBib2R5VmFsdWUgPSBmb3JtQm9keS52YWx1ZTtcclxuXHJcbiAgICBpZiAoIXRpdGxlVmFsdWUgfHwgIWJvZHlWYWx1ZSkge1xyXG4gICAgICByZW5kZXJPdmVybGF5VmFsaWRhdGlvbigpO1xyXG4gICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgdGFzayA9IGNyZWF0ZU5ld1Rhc2sodGl0bGVWYWx1ZSwgYm9keVZhbHVlKTtcclxuICAgIGNvbnN0IGxpc3RJdGVtID0gY3JlYXRlVGFza1RlbXBsYXRlKHRhc2spO1xyXG4gICAgbGlzdENvbnRhaW5lci5pbnNlcnRBZGphY2VudEVsZW1lbnQoJ2FmdGVyYmVnaW4nLCBsaXN0SXRlbSk7XHJcbiAgICBmb3JtLnJlc2V0KCk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBjcmVhdGVOZXdUYXNrKHRpdGxlLCBib2R5KSB7XHJcbiAgICBjb25zdCBuZXdUYXNrID0ge1xyXG4gICAgICB0aXRsZSxcclxuICAgICAgYm9keSxcclxuICAgICAgY29tcGxldGVkOiBmYWxzZSxcclxuICAgICAgX2lkOiBgdGFzay0ke01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMDAwKX1gLFxyXG4gICAgfTtcclxuICAgIHRhc2tzLnVuc2hpZnQobmV3VGFzayk7XHJcbiAgICBzYXZlVGFza3NUb0xvY2FsU3RvcmFnZSh0YXNrcyk7XHJcbiAgICByZXR1cm4gbmV3VGFzaztcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIG9uRGVsZXRlSGFuZGxlcih7IHRhcmdldCB9KSB7XHJcbiAgICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygndGFza3NfX2J1dHRvbicpKSB7XHJcbiAgICAgIGNvbnN0IHBhcmVudCA9IHRhcmdldC5jbG9zZXN0KCdbZGF0YS10YXNrLWlkXScpLFxyXG4gICAgICAgIGlkID0gcGFyZW50LmRhdGFzZXQudGFza0lkLFxyXG4gICAgICAgIHsgdGl0bGUgfSA9IHRhc2tzLmZpbmQoKGl0ZW0pID0+IGl0ZW0uX2lkID09PSBpZCk7XHJcbiAgICAgIHJlbmRlck92ZXJsYXlEZWxldGUoaWQsIHBhcmVudCwgdGl0bGUpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gcmVuZGVyT3ZlcmxheURlbGV0ZShpZCwgdGFzaywgdGl0bGUpIHtcclxuICAgIGxldCBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKSxcclxuICAgICAgb3ZlcmxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxyXG4gICAgICBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSxcclxuICAgICAgaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDInKSxcclxuICAgICAgaW5uZXJCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSxcclxuICAgICAgYnV0dG9uQ29uZmlybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpLFxyXG4gICAgICBidXR0b25EZWxldGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuXHJcbiAgICBvdmVybGF5LmNsYXNzTGlzdC5hZGQoJ292ZXJsYXktZGVsZXRlLXRhc2snKTtcclxuICAgIGNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdvdmVybGF5LWRlbGV0ZS10YXNrX193cmFwcGVyJyk7XHJcbiAgICBoZWFkZXIuY2xhc3NMaXN0LmFkZCgnb3ZlcmxheS1kZWxldGUtdGFza19fdGl0bGUnKTtcclxuICAgIGlubmVyQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ292ZXJsYXktZGVsZXRlLXRhc2tfX2lubmVyLWJ1dHRvbicpO1xyXG4gICAgYnV0dG9uQ29uZmlybS5jbGFzc0xpc3QuYWRkKCdvdmVybGF5LWRlbGV0ZS10YXNrX19jb25maXJtJyk7XHJcbiAgICBidXR0b25EZWxldGUuY2xhc3NMaXN0LmFkZCgnb3ZlcmxheS1kZWxldGUtdGFza19fY2FuY2VsJyk7XHJcbiAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xyXG5cclxuICAgIGhlYWRlci50ZXh0Q29udGVudCA9IGBBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gZGVsZXRlXHJcbiAgICAgdGhpcyB0YXNrIFwiJHt0aXRsZX1cIj9gO1xyXG4gICAgYnV0dG9uQ29uZmlybS50ZXh0Q29udGVudCA9IGBva2A7XHJcbiAgICBidXR0b25EZWxldGUudGV4dENvbnRlbnQgPSBgY2FuY2VsYDtcclxuXHJcbiAgICBvdmVybGF5LmFwcGVuZENoaWxkKGNvbnRhaW5lcik7XHJcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoaGVhZGVyKTtcclxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChpbm5lckJ1dHRvbik7XHJcbiAgICBpbm5lckJ1dHRvbi5hcHBlbmRDaGlsZChidXR0b25Db25maXJtKTtcclxuICAgIGlubmVyQnV0dG9uLmFwcGVuZENoaWxkKGJ1dHRvbkRlbGV0ZSk7XHJcblxyXG4gICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQob3ZlcmxheSk7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWFpbicpLmFwcGVuZENoaWxkKGZyYWdtZW50KTtcclxuXHJcbiAgICBvdmVybGF5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgY29uc3QgY2xvc2VPdmVybGF5ID1cclxuICAgICAgICBlLnRhcmdldC50YWdOYW1lID09PSAnQlVUVE9OJyB8fCBlLnRhcmdldCA9PT0gb3ZlcmxheTtcclxuICAgICAgaWYgKGNsb3NlT3ZlcmxheSkge1xyXG4gICAgICAgIG92ZXJsYXkucmVtb3ZlKCk7XHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgYnV0dG9uQ29uZmlybS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgIC8vcmVtb3ZlIGl0ZW0gZnJvbSBkYXRhXHJcbiAgICAgIGNvbnN0IGluZGV4ID0gdGFza3MuZmluZEluZGV4KChpdGVtKSA9PiBpdGVtLl9pZCA9PT0gaWQpO1xyXG4gICAgICB0YXNrcy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICBzYXZlVGFza3NUb0xvY2FsU3RvcmFnZSh0YXNrcyk7XHJcbiAgICAgIHRhc2sucmVtb3ZlKCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHJlbmRlck92ZXJsYXlWYWxpZGF0aW9uKCkge1xyXG4gICAgY29uc3QgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCksXHJcbiAgICAgIG92ZXJsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSxcclxuICAgICAgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksXHJcbiAgICAgIGhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gyJyksXHJcbiAgICAgIGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG5cclxuICAgIG92ZXJsYXkuY2xhc3NMaXN0LmFkZCgnb3ZlcmxheS1hZGQtdGFzaycpO1xyXG4gICAgY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ292ZXJsYXktYWRkLXRhc2tfX3dyYXBwZXInKTtcclxuICAgIGhlYWRlci5jbGFzc0xpc3QuYWRkKCdvdmVybGF5LWFkZC10YXNrX190aXRsZScpO1xyXG4gICAgYnV0dG9uLmNsYXNzTGlzdC5hZGQoJ292ZXJsYXktYWRkLXRhc2tfX2J1dHRvbicpO1xyXG5cclxuICAgIGhlYWRlci50ZXh0Q29udGVudCA9ICdQbGVhc2UgZmlsbCBpbiBhbGwgZmllbGRzJztcclxuICAgIGJ1dHRvbi50ZXh0Q29udGVudCA9ICdvayc7XHJcblxyXG4gICAgb3ZlcmxheS5hcHBlbmRDaGlsZChjb250YWluZXIpO1xyXG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGhlYWRlcik7XHJcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoYnV0dG9uKTtcclxuXHJcbiAgICBmcmFnbWVudC5hcHBlbmRDaGlsZChvdmVybGF5KTtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYWluJykuYXBwZW5kQ2hpbGQoZnJhZ21lbnQpO1xyXG5cclxuICAgIG92ZXJsYXkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICBjb25zdCBjbG9zZU92ZXJsYXkgPVxyXG4gICAgICAgIGUudGFyZ2V0LnRhZ05hbWUgPT09ICdCVVRUT04nIHx8IGUudGFyZ2V0ID09PSBvdmVybGF5O1xyXG4gICAgICBpZiAoY2xvc2VPdmVybGF5KSB7XHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcclxuICAgICAgICBvdmVybGF5LnJlbW92ZSgpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGxvYWRUYXNrc0Zyb21Mb2NhbFN0b3JhZ2UoKSB7XHJcbiAgICByZXR1cm4gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndGFza3MnKSk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBzYXZlVGFza3NUb0xvY2FsU3RvcmFnZSh0YXNrcykge1xyXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Rhc2tzJywgSlNPTi5zdHJpbmdpZnkodGFza3MpKTtcclxuICB9XHJcbn0pKHRhc2tzKTtcclxuXHJcbihmdW5jdGlvbiBjaGFuZ2VUaGVtZSgpIHtcclxuICBjb25zdCBjaGFuZ2VUaGVtZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZWFkZXJfX3RoZW1lLXNlbGVjdCcpLFxyXG4gICAgYm9keSA9IGRvY3VtZW50LmJvZHk7XHJcbiAgY2hhbmdlVGhlbWVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0b2dnbGVUaGVtZSk7XHJcblxyXG4gIGlmICghbG9jYWxTdG9yYWdlLnRoZW1lKSBsb2NhbFN0b3JhZ2UudGhlbWUgPSAnbGlnaHQnO1xyXG4gIGRvY3VtZW50LmJvZHkuY2xhc3NOYW1lID0gbG9jYWxTdG9yYWdlLnRoZW1lO1xyXG5cclxuICBmdW5jdGlvbiB0b2dnbGVUaGVtZSh7IHRhcmdldCB9KSB7XHJcbiAgICBib2R5LmNsYXNzTGlzdC50b2dnbGUoJ2RhcmsnKTtcclxuICAgIGNoYW5nZVRoZW1lQnV0dG9uLnRleHRDb250ZW50ID0gYm9keS5jbGFzc0xpc3QuY29udGFpbnMoJ2RhcmsnKVxyXG4gICAgICA/ICdjaGFuZ2UgdGhlbWUgdG8gbGlnaHQnXHJcbiAgICAgIDogJ2NoYW5nZSB0aGVtZSB0byBkYXJrJztcclxuICAgIGxvY2FsU3RvcmFnZS50aGVtZSA9IGRvY3VtZW50LmJvZHkuY2xhc3NOYW1lIHx8ICdsaWdodCc7XHJcbiAgfVxyXG59KSgpO1xyXG4iXSwiZmlsZSI6ImluZGV4LmpzIn0=
