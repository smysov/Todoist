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
        id = parent.dataset.taskId,
        confirmed = deleteTaskFromObject(id);
      deletTaskFromHtml(parent);
    }
  }

  function deleteTaskFromObject(id) {
    const { title } = objectOfTasks[id];
    overlayDeleteTask.classList.add('overlay-delete-task--show');

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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJpbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB0YXNrcyA9IFtcclxuICB7XHJcbiAgICBfaWQ6ICc1ZDJjYTllMmUwM2Q0MGIzMjY1OTZhYTcnLFxyXG4gICAgY29tcGxldGVkOiB0cnVlLFxyXG4gICAgYm9keTogJ1dhdGNoIGFuIGV4Y2l0aW5nIGFjdGlvbiBtb3ZpZSBzdGFycmluZyBHZXJhcmQgQnV0bGVyJyxcclxuICAgIHRpdGxlOiAnV2F0Y2ggYW4gaW50ZXJlc3RpbmcgbW92aWUgYWZ0ZXIgd29yaycsXHJcbiAgfSxcclxuICB7XHJcbiAgICBfaWQ6ICc1ZDJjYTllMjljOGE5NDA5NWMxMjg4ZTAnLFxyXG4gICAgY29tcGxldGVkOiBmYWxzZSxcclxuICAgIGJvZHk6ICdXb3JrIG91dCBpbiB0aGUgZ3ltIGFuZCBzd2ltIGluIHRoZSBwb29sJyxcclxuICAgIHRpdGxlOiAnR28gdG8gYSB0cmFpbmluZyBzZXNzaW9uJyxcclxuICB9LFxyXG5dO1xyXG5cclxuKGZ1bmN0aW9uIChhcnJheU9mVGFza3MpIHtcclxuICBjb25zdCBvYmplY3RPZlRhc2tzID0gYXJyYXlPZlRhc2tzLnJlZHVjZSgoYWNjLCB0YXNrKSA9PiB7XHJcbiAgICBhY2NbdGFzay5faWRdID0gdGFzaztcclxuICAgIHJldHVybiBhY2M7XHJcbiAgfSwge30pO1xyXG5cclxuICAvL0VsZW1lbnRzIFVJXHJcbiAgY29uc3QgbGlzdENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5saXN0LXRhc2tzIC50YXNrcycpLFxyXG4gICAgZm9ybSA9IGRvY3VtZW50LmZvcm1zWydhZGQtdGFzayddLFxyXG4gICAgZm9ybVRpdGxlID0gZm9ybS5lbGVtZW50c1sndGl0bGUnXSxcclxuICAgIGZvcm1Cb2R5ID0gZm9ybS5lbGVtZW50c1snYm9keSddLFxyXG4gICAgb3ZlcmxheUZpbGxGaWVsZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vdmVybGF5LWFkZC10YXNrJyksXHJcbiAgICBvdmVybGF5RGVsZXRlVGFzayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vdmVybGF5LWRlbGV0ZS10YXNrJyk7XHJcblxyXG4gIC8vSGFuZGxlcnNcclxuICByZW5kZXJBbGxUYXNrcyhvYmplY3RPZlRhc2tzKTtcclxuICBmb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIG9uRm9ybVN1Ym1pdEhhbmRsZXIpO1xyXG4gIGxpc3RDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvbkRlbGV0ZUhhbmRsZXIpO1xyXG4gIGNyZWF0ZU92ZXJsYXlGaWxsRmllbGRUZW1wbGF0ZSgpO1xyXG4gIG92ZXJsYXlGaWxsRmllbGQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoaWRlT3ZlcmxheUZpbGxGaWVsZCk7XHJcbiAgY3JlYXRlT3ZlcmxheURlbGV0ZVRhc2tUZW1wbGF0ZSgpO1xyXG5cclxuICAvL0Z1bmN0aW9uc1xyXG4gIGZ1bmN0aW9uIHJlbmRlckFsbFRhc2tzKHRhc2tMaXN0KSB7XHJcbiAgICBjb25zdCBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcclxuXHJcbiAgICBPYmplY3QudmFsdWVzKG9iamVjdE9mVGFza3MpLmZvckVhY2goKHRhc2spID0+IHtcclxuICAgICAgY29uc3QgbGkgPSBjcmVhdGVUYXNrVGVtcGxhdGUodGFzayk7XHJcbiAgICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKGxpKTtcclxuICAgIH0pO1xyXG4gICAgbGlzdENvbnRhaW5lci5hcHBlbmRDaGlsZChmcmFnbWVudCk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBjcmVhdGVUYXNrVGVtcGxhdGUoeyBfaWQsIHRpdGxlLCBib2R5IH0pIHtcclxuICAgIGNvbnN0IGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKSxcclxuICAgICAgaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDInKSxcclxuICAgICAgcGFyYWdyYXBoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpLFxyXG4gICAgICBkZWxldGVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuXHJcbiAgICBsaS5jbGFzc0xpc3QuYWRkKCd0YXNrc19faXRlbScpO1xyXG4gICAgaGVhZGVyLmNsYXNzTGlzdC5hZGQoJ3Rhc2tzX190aXRsZScpO1xyXG4gICAgcGFyYWdyYXBoLmNsYXNzTGlzdC5hZGQoJ3Rhc2tzX190ZXh0Jyk7XHJcbiAgICBkZWxldGVCdXR0b24uY2xhc3NMaXN0LmFkZCgndGFza3NfX2J1dHRvbicpO1xyXG5cclxuICAgIGxpLnNldEF0dHJpYnV0ZSgnZGF0YS10YXNrLWlkJywgX2lkKTtcclxuICAgIGhlYWRlci50ZXh0Q29udGVudCA9IHRpdGxlO1xyXG4gICAgcGFyYWdyYXBoLnRleHRDb250ZW50ID0gYm9keTtcclxuICAgIGRlbGV0ZUJ1dHRvbi50ZXh0Q29udGVudCA9ICdEZWxldGUgdGFzayc7XHJcblxyXG4gICAgbGkuYXBwZW5kQ2hpbGQoaGVhZGVyKTtcclxuICAgIGxpLmFwcGVuZENoaWxkKHBhcmFncmFwaCk7XHJcbiAgICBsaS5hcHBlbmRDaGlsZChkZWxldGVCdXR0b24pO1xyXG5cclxuICAgIHJldHVybiBsaTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIG9uRm9ybVN1Ym1pdEhhbmRsZXIoZSkge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgY29uc3QgdGl0bGVWYWx1ZSA9IGZvcm1UaXRsZS52YWx1ZSxcclxuICAgICAgYm9keVZhbHVlID0gZm9ybUJvZHkudmFsdWU7XHJcblxyXG4gICAgaWYgKCF0aXRsZVZhbHVlIHx8ICFib2R5VmFsdWUpIHtcclxuICAgICAgb3ZlcmxheUZpbGxGaWVsZC5jbGFzc0xpc3QuYWRkKCdvdmVybGF5LWFkZC10YXNrLS1zaG93Jyk7XHJcbiAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB0YXNrID0gY3JlYXRlTmV3VGFzayh0aXRsZVZhbHVlLCBib2R5VmFsdWUpO1xyXG4gICAgY29uc3QgbGlzdEl0ZW0gPSBjcmVhdGVUYXNrVGVtcGxhdGUodGFzayk7XHJcbiAgICBsaXN0Q29udGFpbmVyLmluc2VydEFkamFjZW50RWxlbWVudCgnYWZ0ZXJiZWdpbicsIGxpc3RJdGVtKTtcclxuICAgIGZvcm0ucmVzZXQoKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGNyZWF0ZU5ld1Rhc2sodGl0bGUsIGJvZHkpIHtcclxuICAgIGNvbnN0IG5ld1Rhc2sgPSB7XHJcbiAgICAgIHRpdGxlLFxyXG4gICAgICBib2R5LFxyXG4gICAgICBjb21wbGV0ZWQ6IGZhbHNlLFxyXG4gICAgICBfaWQ6IGB0YXNrLSR7TWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwMDApfWAsXHJcbiAgICB9O1xyXG5cclxuICAgIG9iamVjdE9mVGFza3NbbmV3VGFzay5faWRdID0gbmV3VGFzaztcclxuXHJcbiAgICByZXR1cm4geyAuLi5uZXdUYXNrIH07XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBvbkRlbGV0ZUhhbmRsZXIoeyB0YXJnZXQgfSkge1xyXG4gICAgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3Rhc2tzX19idXR0b24nKSkge1xyXG4gICAgICBjb25zdCBwYXJlbnQgPSB0YXJnZXQuY2xvc2VzdCgnW2RhdGEtdGFzay1pZF0nKSxcclxuICAgICAgICBpZCA9IHBhcmVudC5kYXRhc2V0LnRhc2tJZCxcclxuICAgICAgICBjb25maXJtZWQgPSBkZWxldGVUYXNrRnJvbU9iamVjdChpZCk7XHJcbiAgICAgIGRlbGV0VGFza0Zyb21IdG1sKHBhcmVudCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBkZWxldGVUYXNrRnJvbU9iamVjdChpZCkge1xyXG4gICAgY29uc3QgeyB0aXRsZSB9ID0gb2JqZWN0T2ZUYXNrc1tpZF07XHJcbiAgICBvdmVybGF5RGVsZXRlVGFzay5jbGFzc0xpc3QuYWRkKCdvdmVybGF5LWRlbGV0ZS10YXNrLS1zaG93Jyk7XHJcblxyXG4gICAgb3ZlcmxheURlbGV0ZVRhc2suYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICBpZiAoXHJcbiAgICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdvdmVybGF5LWRlbGV0ZS10YXNrJykgfHxcclxuICAgICAgICBlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ292ZXJsYXktZGVsZXRlLXRhc2tfX2NvbmZpcm0nKSB8fFxyXG4gICAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnb3ZlcmxheS1kZWxldGUtdGFza19fY2FuY2VsJylcclxuICAgICAgKSB7XHJcbiAgICAgICAgb3ZlcmxheURlbGV0ZVRhc2suY2xhc3NMaXN0LnJlbW92ZSgnb3ZlcmxheS1kZWxldGUtdGFzay0tc2hvdycpO1xyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ292ZXJsYXktZGVsZXRlLXRhc2tfX2NvbmZpcm0nKSkge1xyXG4gICAgICAgIGRlbGV0ZSBvYmplY3RPZlRhc2tzW2lkXTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBkZWxldFRhc2tGcm9tSHRtbCh0YXNrKSB7XHJcbiAgICBvdmVybGF5RGVsZXRlVGFzay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgIGlmIChcclxuICAgICAgICBlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ292ZXJsYXktZGVsZXRlLXRhc2snKSB8fFxyXG4gICAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnb3ZlcmxheS1kZWxldGUtdGFza19fY29uZmlybScpIHx8XHJcbiAgICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdvdmVybGF5LWRlbGV0ZS10YXNrX19jYW5jZWwnKVxyXG4gICAgICApIHtcclxuICAgICAgICBvdmVybGF5RGVsZXRlVGFzay5jbGFzc0xpc3QucmVtb3ZlKCdvdmVybGF5LWRlbGV0ZS10YXNrLS1zaG93Jyk7XHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnb3ZlcmxheS1kZWxldGUtdGFza19fY29uZmlybScpKSB7XHJcbiAgICAgICAgdGFzay5yZW1vdmUoKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiByZW5kZXJPdmVybGF5RmlsbEZpZWxkKGVsZW1lbnQpIHtcclxuICAgIGNvbnN0IGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xyXG4gICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XHJcbiAgICBvdmVybGF5RmlsbEZpZWxkLmFwcGVuZENoaWxkKGVsZW1lbnQpO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gY3JlYXRlT3ZlcmxheUZpbGxGaWVsZFRlbXBsYXRlKCkge1xyXG4gICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksXHJcbiAgICAgIHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpLFxyXG4gICAgICBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuXHJcbiAgICBjb250YWluZXIuY2xhc3NMaXN0LmFkZCgnb3ZlcmxheS1hZGQtdGFza19fd3JhcHBlcicpO1xyXG4gICAgdGl0bGUuY2xhc3NMaXN0LmFkZCgnb3ZlcmxheS1hZGQtdGFza19fdGl0bGUnKTtcclxuICAgIGJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdvdmVybGF5LWFkZC10YXNrX19idXR0b24nKTtcclxuXHJcbiAgICB0aXRsZS50ZXh0Q29udGVudCA9IGBQbGVhc2UgZmlsbCBpbiBhbGwgZmllbGRzYDtcclxuICAgIGJ1dHRvbi50ZXh0Q29udGVudCA9IGBva2A7XHJcblxyXG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHRpdGxlKTtcclxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChidXR0b24pO1xyXG5cclxuICAgIHJlbmRlck92ZXJsYXlGaWxsRmllbGQoY29udGFpbmVyKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGhpZGVPdmVybGF5RmlsbEZpZWxkKHsgdGFyZ2V0IH0pIHtcclxuICAgIGlmIChcclxuICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnb3ZlcmxheS1hZGQtdGFzaycpIHx8XHJcbiAgICAgIHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ292ZXJsYXktYWRkLXRhc2tfX2J1dHRvbicpXHJcbiAgICApIHtcclxuICAgICAgb3ZlcmxheUZpbGxGaWVsZC5jbGFzc0xpc3QucmVtb3ZlKCdvdmVybGF5LWFkZC10YXNrLS1zaG93Jyk7XHJcbiAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiByZW5kZXJPdmVybGF5RGVsZXRlVGFzayhlbGVtZW50KSB7XHJcbiAgICBjb25zdCBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcclxuICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKGVsZW1lbnQpO1xyXG4gICAgb3ZlcmxheURlbGV0ZVRhc2suYXBwZW5kQ2hpbGQoZWxlbWVudCk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBjcmVhdGVPdmVybGF5RGVsZXRlVGFza1RlbXBsYXRlKCkge1xyXG4gICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksXHJcbiAgICAgIGhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKSxcclxuICAgICAgaW5uZXJCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSxcclxuICAgICAgYnV0dG9uQ29uZmlybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpLFxyXG4gICAgICBidXR0b25EZWxldGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuXHJcbiAgICBjb250YWluZXIuY2xhc3NMaXN0LmFkZCgnb3ZlcmxheS1kZWxldGUtdGFza19fd3JhcHBlcicpO1xyXG4gICAgaGVhZGVyLmNsYXNzTGlzdC5hZGQoJ292ZXJsYXktZGVsZXRlLXRhc2tfX3RpdGxlJyk7XHJcbiAgICBpbm5lckJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdvdmVybGF5LWRlbGV0ZS10YXNrX19pbm5lci1idXR0b24nKTtcclxuICAgIGJ1dHRvbkNvbmZpcm0uY2xhc3NMaXN0LmFkZCgnb3ZlcmxheS1kZWxldGUtdGFza19fY29uZmlybScpO1xyXG4gICAgYnV0dG9uRGVsZXRlLmNsYXNzTGlzdC5hZGQoJ292ZXJsYXktZGVsZXRlLXRhc2tfX2NhbmNlbCcpO1xyXG5cclxuICAgIGhlYWRlci50ZXh0Q29udGVudCA9IGBBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gZGVsZXRlIHRoaXMgdGFzaz9gO1xyXG4gICAgYnV0dG9uQ29uZmlybS50ZXh0Q29udGVudCA9IGBva2A7XHJcbiAgICBidXR0b25EZWxldGUudGV4dENvbnRlbnQgPSBgY2FuY2VsYDtcclxuXHJcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoaGVhZGVyKTtcclxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChpbm5lckJ1dHRvbik7XHJcbiAgICBpbm5lckJ1dHRvbi5hcHBlbmRDaGlsZChidXR0b25Db25maXJtKTtcclxuICAgIGlubmVyQnV0dG9uLmFwcGVuZENoaWxkKGJ1dHRvbkRlbGV0ZSk7XHJcblxyXG4gICAgcmVuZGVyT3ZlcmxheURlbGV0ZVRhc2soY29udGFpbmVyKTtcclxuICB9XHJcbn0pKHRhc2tzKTtcclxuIl0sImZpbGUiOiJpbmRleC5qcyJ9
