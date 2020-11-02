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
    overlayFillField = document.querySelector('.overlay-add-task'),
    overlayDeleteTask = document.querySelector('.overlay-delete-task');

  //Handlers
  renderAllTasks(objectOfTasks);
  form.addEventListener('submit', onFormSubmitHandler);
  listContainer.addEventListener('click', onDeleteHandler);
  createOverlayFillFieldTemplate();
  overlayFillField.addEventListener('click', hideOverlayFillField);
  createOverlayDeleteTaskTemplate();

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
        id = parent.dataset.taskId;
      deleteTaskFromObject(id);
      deletTaskFromHtml(parent);
    }
  }

  function deleteTaskFromObject(id) {
    const { title } = objectOfTasks[id];
    overlayDeleteTask.classList.add('overlay-delete-task--show');
    document.body.classList.add('hidden');

    overlayDeleteTask.addEventListener('click', (e) => {
      if (
        e.target.classList.contains('overlay-delete-task') ||
        e.target.classList.contains('overlay-delete-task__confirm') ||
        e.target.classList.contains('overlay-delete-task__cancel')
      ) {
        overlayDeleteTask.classList.remove('overlay-delete-task--show');
        document.body.classList.remove('hidden');
      }

      if (e.target.classList.contains('overlay-delete-task__confirm')) {
        delete objectOfTasks[id];
      }
    });
  }

  function deletTaskFromHtml(task) {
    overlayDeleteTask.addEventListener('click', (e) => {
      if (
        e.target.classList.contains('overlay-delete-task') ||
        e.target.classList.contains('overlay-delete-task__confirm') ||
        e.target.classList.contains('overlay-delete-task__cancel')
      ) {
        overlayDeleteTask.classList.remove('overlay-delete-task--show');
        document.body.classList.remove('hidden');
      }

      if (e.target.classList.contains('overlay-delete-task__confirm')) {
        task.remove();
      }
    });
  }

  function renderOverlayFillField(element) {
    const fragment = document.createDocumentFragment();
    fragment.appendChild(element);
    overlayFillField.appendChild(element);
  }

  function createOverlayFillFieldTemplate() {
    const container = document.createElement('div'),
      title = document.createElement('p'),
      button = document.createElement('button');

    container.classList.add('overlay-add-task__wrapper');
    title.classList.add('overlay-add-task__title');
    button.classList.add('overlay-add-task__button');

    title.textContent = `Please fill in all fields`;
    button.textContent = `ok`;

    container.appendChild(title);
    container.appendChild(button);

    renderOverlayFillField(container);
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

  function renderOverlayDeleteTask(element) {
    const fragment = document.createDocumentFragment();
    fragment.appendChild(element);
    overlayDeleteTask.appendChild(element);
  }

  function createOverlayDeleteTaskTemplate() {
    const container = document.createElement('div'),
      header = document.createElement('p'),
      innerButton = document.createElement('div'),
      buttonConfirm = document.createElement('button'),
      buttonDelete = document.createElement('button');

    container.classList.add('overlay-delete-task__wrapper');
    header.classList.add('overlay-delete-task__title');
    innerButton.classList.add('overlay-delete-task__inner-button');
    buttonConfirm.classList.add('overlay-delete-task__confirm');
    buttonDelete.classList.add('overlay-delete-task__cancel');

    header.textContent = `Are you sure you want to delete this task?`;
    buttonConfirm.textContent = `ok`;
    buttonDelete.textContent = `cancel`;

    container.appendChild(header);
    container.appendChild(innerButton);
    innerButton.appendChild(buttonConfirm);
    innerButton.appendChild(buttonDelete);

    renderOverlayDeleteTask(container);
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJpbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB0YXNrcyA9IFtcclxuICB7XHJcbiAgICBfaWQ6ICc1ZDJjYTllMmUwM2Q0MGIzMjY1OTZhYTcnLFxyXG4gICAgY29tcGxldGVkOiB0cnVlLFxyXG4gICAgYm9keTogJ1dhdGNoIGFuIGV4Y2l0aW5nIGFjdGlvbiBtb3ZpZSBzdGFycmluZyBHZXJhcmQgQnV0bGVyJyxcclxuICAgIHRpdGxlOiAnV2F0Y2ggYW4gaW50ZXJlc3RpbmcgbW92aWUgYWZ0ZXIgd29yaycsXHJcbiAgfSxcclxuICB7XHJcbiAgICBfaWQ6ICc1ZDJjYTllMjljOGE5NDA5NWMxMjg4ZTAnLFxyXG4gICAgY29tcGxldGVkOiBmYWxzZSxcclxuICAgIGJvZHk6ICdXb3JrIG91dCBpbiB0aGUgZ3ltIGFuZCBzd2ltIGluIHRoZSBwb29sJyxcclxuICAgIHRpdGxlOiAnR28gdG8gYSB0cmFpbmluZyBzZXNzaW9uJyxcclxuICB9LFxyXG5dO1xyXG5cclxuKGZ1bmN0aW9uIChhcnJheU9mVGFza3MpIHtcclxuICBjb25zdCBvYmplY3RPZlRhc2tzID0gYXJyYXlPZlRhc2tzLnJlZHVjZSgoYWNjLCB0YXNrKSA9PiB7XHJcbiAgICBhY2NbdGFzay5faWRdID0gdGFzaztcclxuICAgIHJldHVybiBhY2M7XHJcbiAgfSwge30pO1xyXG5cclxuICAvL0VsZW1lbnRzIFVJXHJcbiAgY29uc3QgbGlzdENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5saXN0LXRhc2tzIC50YXNrcycpLFxyXG4gICAgZm9ybSA9IGRvY3VtZW50LmZvcm1zWydhZGQtdGFzayddLFxyXG4gICAgZm9ybVRpdGxlID0gZm9ybS5lbGVtZW50c1sndGl0bGUnXSxcclxuICAgIGZvcm1Cb2R5ID0gZm9ybS5lbGVtZW50c1snYm9keSddLFxyXG4gICAgb3ZlcmxheUZpbGxGaWVsZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vdmVybGF5LWFkZC10YXNrJyksXHJcbiAgICBvdmVybGF5RGVsZXRlVGFzayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vdmVybGF5LWRlbGV0ZS10YXNrJyk7XHJcblxyXG4gIC8vSGFuZGxlcnNcclxuICByZW5kZXJBbGxUYXNrcyhvYmplY3RPZlRhc2tzKTtcclxuICBmb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIG9uRm9ybVN1Ym1pdEhhbmRsZXIpO1xyXG4gIGxpc3RDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvbkRlbGV0ZUhhbmRsZXIpO1xyXG4gIGNyZWF0ZU92ZXJsYXlGaWxsRmllbGRUZW1wbGF0ZSgpO1xyXG4gIG92ZXJsYXlGaWxsRmllbGQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoaWRlT3ZlcmxheUZpbGxGaWVsZCk7XHJcbiAgY3JlYXRlT3ZlcmxheURlbGV0ZVRhc2tUZW1wbGF0ZSgpO1xyXG5cclxuICAvL0Z1bmN0aW9uc1xyXG4gIGZ1bmN0aW9uIHJlbmRlckFsbFRhc2tzKHRhc2tMaXN0KSB7XHJcbiAgICBjb25zdCBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcclxuXHJcbiAgICBPYmplY3QudmFsdWVzKG9iamVjdE9mVGFza3MpLmZvckVhY2goKHRhc2spID0+IHtcclxuICAgICAgY29uc3QgbGkgPSBjcmVhdGVUYXNrVGVtcGxhdGUodGFzayk7XHJcbiAgICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKGxpKTtcclxuICAgIH0pO1xyXG4gICAgbGlzdENvbnRhaW5lci5hcHBlbmRDaGlsZChmcmFnbWVudCk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBjcmVhdGVUYXNrVGVtcGxhdGUoeyBfaWQsIHRpdGxlLCBib2R5IH0pIHtcclxuICAgIGNvbnN0IGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKSxcclxuICAgICAgaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDInKSxcclxuICAgICAgcGFyYWdyYXBoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpLFxyXG4gICAgICBkZWxldGVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuXHJcbiAgICBsaS5jbGFzc0xpc3QuYWRkKCd0YXNrc19faXRlbScpO1xyXG4gICAgaGVhZGVyLmNsYXNzTGlzdC5hZGQoJ3Rhc2tzX190aXRsZScpO1xyXG4gICAgcGFyYWdyYXBoLmNsYXNzTGlzdC5hZGQoJ3Rhc2tzX190ZXh0Jyk7XHJcbiAgICBkZWxldGVCdXR0b24uY2xhc3NMaXN0LmFkZCgndGFza3NfX2J1dHRvbicpO1xyXG5cclxuICAgIGxpLnNldEF0dHJpYnV0ZSgnZGF0YS10YXNrLWlkJywgX2lkKTtcclxuICAgIGhlYWRlci50ZXh0Q29udGVudCA9IHRpdGxlO1xyXG4gICAgcGFyYWdyYXBoLnRleHRDb250ZW50ID0gYm9keTtcclxuICAgIGRlbGV0ZUJ1dHRvbi50ZXh0Q29udGVudCA9ICdEZWxldGUgdGFzayc7XHJcblxyXG4gICAgbGkuYXBwZW5kQ2hpbGQoaGVhZGVyKTtcclxuICAgIGxpLmFwcGVuZENoaWxkKHBhcmFncmFwaCk7XHJcbiAgICBsaS5hcHBlbmRDaGlsZChkZWxldGVCdXR0b24pO1xyXG5cclxuICAgIHJldHVybiBsaTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIG9uRm9ybVN1Ym1pdEhhbmRsZXIoZSkge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgY29uc3QgdGl0bGVWYWx1ZSA9IGZvcm1UaXRsZS52YWx1ZSxcclxuICAgICAgYm9keVZhbHVlID0gZm9ybUJvZHkudmFsdWU7XHJcblxyXG4gICAgaWYgKCF0aXRsZVZhbHVlIHx8ICFib2R5VmFsdWUpIHtcclxuICAgICAgb3ZlcmxheUZpbGxGaWVsZC5jbGFzc0xpc3QuYWRkKCdvdmVybGF5LWFkZC10YXNrLS1zaG93Jyk7XHJcbiAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB0YXNrID0gY3JlYXRlTmV3VGFzayh0aXRsZVZhbHVlLCBib2R5VmFsdWUpO1xyXG4gICAgY29uc3QgbGlzdEl0ZW0gPSBjcmVhdGVUYXNrVGVtcGxhdGUodGFzayk7XHJcbiAgICBsaXN0Q29udGFpbmVyLmluc2VydEFkamFjZW50RWxlbWVudCgnYWZ0ZXJiZWdpbicsIGxpc3RJdGVtKTtcclxuICAgIGZvcm0ucmVzZXQoKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGNyZWF0ZU5ld1Rhc2sodGl0bGUsIGJvZHkpIHtcclxuICAgIGNvbnN0IG5ld1Rhc2sgPSB7XHJcbiAgICAgIHRpdGxlLFxyXG4gICAgICBib2R5LFxyXG4gICAgICBjb21wbGV0ZWQ6IGZhbHNlLFxyXG4gICAgICBfaWQ6IGB0YXNrLSR7TWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwMDApfWAsXHJcbiAgICB9O1xyXG5cclxuICAgIG9iamVjdE9mVGFza3NbbmV3VGFzay5faWRdID0gbmV3VGFzaztcclxuXHJcbiAgICByZXR1cm4geyAuLi5uZXdUYXNrIH07XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBvbkRlbGV0ZUhhbmRsZXIoeyB0YXJnZXQgfSkge1xyXG4gICAgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3Rhc2tzX19idXR0b24nKSkge1xyXG4gICAgICBjb25zdCBwYXJlbnQgPSB0YXJnZXQuY2xvc2VzdCgnW2RhdGEtdGFzay1pZF0nKSxcclxuICAgICAgICBpZCA9IHBhcmVudC5kYXRhc2V0LnRhc2tJZDtcclxuICAgICAgZGVsZXRlVGFza0Zyb21PYmplY3QoaWQpO1xyXG4gICAgICBkZWxldFRhc2tGcm9tSHRtbChwYXJlbnQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gZGVsZXRlVGFza0Zyb21PYmplY3QoaWQpIHtcclxuICAgIGNvbnN0IHsgdGl0bGUgfSA9IG9iamVjdE9mVGFza3NbaWRdO1xyXG4gICAgb3ZlcmxheURlbGV0ZVRhc2suY2xhc3NMaXN0LmFkZCgnb3ZlcmxheS1kZWxldGUtdGFzay0tc2hvdycpO1xyXG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcclxuXHJcbiAgICBvdmVybGF5RGVsZXRlVGFzay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgIGlmIChcclxuICAgICAgICBlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ292ZXJsYXktZGVsZXRlLXRhc2snKSB8fFxyXG4gICAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnb3ZlcmxheS1kZWxldGUtdGFza19fY29uZmlybScpIHx8XHJcbiAgICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdvdmVybGF5LWRlbGV0ZS10YXNrX19jYW5jZWwnKVxyXG4gICAgICApIHtcclxuICAgICAgICBvdmVybGF5RGVsZXRlVGFzay5jbGFzc0xpc3QucmVtb3ZlKCdvdmVybGF5LWRlbGV0ZS10YXNrLS1zaG93Jyk7XHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnb3ZlcmxheS1kZWxldGUtdGFza19fY29uZmlybScpKSB7XHJcbiAgICAgICAgZGVsZXRlIG9iamVjdE9mVGFza3NbaWRdO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGRlbGV0VGFza0Zyb21IdG1sKHRhc2spIHtcclxuICAgIG92ZXJsYXlEZWxldGVUYXNrLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgaWYgKFxyXG4gICAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnb3ZlcmxheS1kZWxldGUtdGFzaycpIHx8XHJcbiAgICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdvdmVybGF5LWRlbGV0ZS10YXNrX19jb25maXJtJykgfHxcclxuICAgICAgICBlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ292ZXJsYXktZGVsZXRlLXRhc2tfX2NhbmNlbCcpXHJcbiAgICAgICkge1xyXG4gICAgICAgIG92ZXJsYXlEZWxldGVUYXNrLmNsYXNzTGlzdC5yZW1vdmUoJ292ZXJsYXktZGVsZXRlLXRhc2stLXNob3cnKTtcclxuICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdvdmVybGF5LWRlbGV0ZS10YXNrX19jb25maXJtJykpIHtcclxuICAgICAgICB0YXNrLnJlbW92ZSgpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHJlbmRlck92ZXJsYXlGaWxsRmllbGQoZWxlbWVudCkge1xyXG4gICAgY29uc3QgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XHJcbiAgICBmcmFnbWVudC5hcHBlbmRDaGlsZChlbGVtZW50KTtcclxuICAgIG92ZXJsYXlGaWxsRmllbGQuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBjcmVhdGVPdmVybGF5RmlsbEZpZWxkVGVtcGxhdGUoKSB7XHJcbiAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSxcclxuICAgICAgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyksXHJcbiAgICAgIGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG5cclxuICAgIGNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdvdmVybGF5LWFkZC10YXNrX193cmFwcGVyJyk7XHJcbiAgICB0aXRsZS5jbGFzc0xpc3QuYWRkKCdvdmVybGF5LWFkZC10YXNrX190aXRsZScpO1xyXG4gICAgYnV0dG9uLmNsYXNzTGlzdC5hZGQoJ292ZXJsYXktYWRkLXRhc2tfX2J1dHRvbicpO1xyXG5cclxuICAgIHRpdGxlLnRleHRDb250ZW50ID0gYFBsZWFzZSBmaWxsIGluIGFsbCBmaWVsZHNgO1xyXG4gICAgYnV0dG9uLnRleHRDb250ZW50ID0gYG9rYDtcclxuXHJcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQodGl0bGUpO1xyXG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGJ1dHRvbik7XHJcblxyXG4gICAgcmVuZGVyT3ZlcmxheUZpbGxGaWVsZChjb250YWluZXIpO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gaGlkZU92ZXJsYXlGaWxsRmllbGQoeyB0YXJnZXQgfSkge1xyXG4gICAgaWYgKFxyXG4gICAgICB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdvdmVybGF5LWFkZC10YXNrJykgfHxcclxuICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnb3ZlcmxheS1hZGQtdGFza19fYnV0dG9uJylcclxuICAgICkge1xyXG4gICAgICBvdmVybGF5RmlsbEZpZWxkLmNsYXNzTGlzdC5yZW1vdmUoJ292ZXJsYXktYWRkLXRhc2stLXNob3cnKTtcclxuICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHJlbmRlck92ZXJsYXlEZWxldGVUYXNrKGVsZW1lbnQpIHtcclxuICAgIGNvbnN0IGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xyXG4gICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XHJcbiAgICBvdmVybGF5RGVsZXRlVGFzay5hcHBlbmRDaGlsZChlbGVtZW50KTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGNyZWF0ZU92ZXJsYXlEZWxldGVUYXNrVGVtcGxhdGUoKSB7XHJcbiAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSxcclxuICAgICAgaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpLFxyXG4gICAgICBpbm5lckJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxyXG4gICAgICBidXR0b25Db25maXJtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyksXHJcbiAgICAgIGJ1dHRvbkRlbGV0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG5cclxuICAgIGNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdvdmVybGF5LWRlbGV0ZS10YXNrX193cmFwcGVyJyk7XHJcbiAgICBoZWFkZXIuY2xhc3NMaXN0LmFkZCgnb3ZlcmxheS1kZWxldGUtdGFza19fdGl0bGUnKTtcclxuICAgIGlubmVyQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ292ZXJsYXktZGVsZXRlLXRhc2tfX2lubmVyLWJ1dHRvbicpO1xyXG4gICAgYnV0dG9uQ29uZmlybS5jbGFzc0xpc3QuYWRkKCdvdmVybGF5LWRlbGV0ZS10YXNrX19jb25maXJtJyk7XHJcbiAgICBidXR0b25EZWxldGUuY2xhc3NMaXN0LmFkZCgnb3ZlcmxheS1kZWxldGUtdGFza19fY2FuY2VsJyk7XHJcblxyXG4gICAgaGVhZGVyLnRleHRDb250ZW50ID0gYEFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBkZWxldGUgdGhpcyB0YXNrP2A7XHJcbiAgICBidXR0b25Db25maXJtLnRleHRDb250ZW50ID0gYG9rYDtcclxuICAgIGJ1dHRvbkRlbGV0ZS50ZXh0Q29udGVudCA9IGBjYW5jZWxgO1xyXG5cclxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChoZWFkZXIpO1xyXG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGlubmVyQnV0dG9uKTtcclxuICAgIGlubmVyQnV0dG9uLmFwcGVuZENoaWxkKGJ1dHRvbkNvbmZpcm0pO1xyXG4gICAgaW5uZXJCdXR0b24uYXBwZW5kQ2hpbGQoYnV0dG9uRGVsZXRlKTtcclxuXHJcbiAgICByZW5kZXJPdmVybGF5RGVsZXRlVGFzayhjb250YWluZXIpO1xyXG4gIH1cclxufSkodGFza3MpO1xyXG5cclxuKGZ1bmN0aW9uIGNoYW5nZVRoZW1lKCkge1xyXG4gIGNvbnN0IGNoYW5nZVRoZW1lQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlcl9fdGhlbWUtc2VsZWN0JyksXHJcbiAgICBib2R5ID0gZG9jdW1lbnQuYm9keTtcclxuICBjaGFuZ2VUaGVtZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRvZ2dsZVRoZW1lKTtcclxuXHJcbiAgaWYgKCFsb2NhbFN0b3JhZ2UudGhlbWUpIGxvY2FsU3RvcmFnZS50aGVtZSA9ICdsaWdodCc7XHJcbiAgZG9jdW1lbnQuYm9keS5jbGFzc05hbWUgPSBsb2NhbFN0b3JhZ2UudGhlbWU7XHJcblxyXG4gIGZ1bmN0aW9uIHRvZ2dsZVRoZW1lKHsgdGFyZ2V0IH0pIHtcclxuICAgIGJvZHkuY2xhc3NMaXN0LnRvZ2dsZSgnZGFyaycpO1xyXG4gICAgY2hhbmdlVGhlbWVCdXR0b24udGV4dENvbnRlbnQgPSBib2R5LmNsYXNzTGlzdC5jb250YWlucygnZGFyaycpXHJcbiAgICAgID8gJ2NoYW5nZSB0aGVtZSB0byBsaWdodCdcclxuICAgICAgOiAnY2hhbmdlIHRoZW1lIHRvIGRhcmsnO1xyXG4gICAgbG9jYWxTdG9yYWdlLnRoZW1lID0gZG9jdW1lbnQuYm9keS5jbGFzc05hbWUgfHwgJ2xpZ2h0JztcclxuICB9XHJcbn0pKCk7XHJcbiJdLCJmaWxlIjoiaW5kZXguanMifQ==
