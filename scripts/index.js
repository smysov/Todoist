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
    formBody = form.elements['body'];


  //Handlers
  renderAllTasks(objectOfTasks);
  form.addEventListener('submit', onFormSubmitHandler);
  listContainer.addEventListener('click', onDeleteHandler);

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
    objectOfTasks[newTask._id] = newTask;
    return { ...newTask };
  }

  function onDeleteHandler({ target }) {
    if (target.classList.contains('tasks__button')) {
      const parent = target.closest('[data-task-id]'),
        id = parent.dataset.taskId,
        { title } = objectOfTasks[id];
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
      delete objectOfTasks[id];
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJpbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB0YXNrcyA9IFtcclxuICB7XHJcbiAgICBfaWQ6ICc1ZDJjYTllMmUwM2Q0MGIzMjY1OTZhYTcnLFxyXG4gICAgY29tcGxldGVkOiB0cnVlLFxyXG4gICAgYm9keTogJ1dhdGNoIGFuIGV4Y2l0aW5nIGFjdGlvbiBtb3ZpZSBzdGFycmluZyBHZXJhcmQgQnV0bGVyJyxcclxuICAgIHRpdGxlOiAnV2F0Y2ggYW4gaW50ZXJlc3RpbmcgbW92aWUgYWZ0ZXIgd29yaycsXHJcbiAgfSxcclxuICB7XHJcbiAgICBfaWQ6ICc1ZDJjYTllMjljOGE5NDA5NWMxMjg4ZTAnLFxyXG4gICAgY29tcGxldGVkOiBmYWxzZSxcclxuICAgIGJvZHk6ICdXb3JrIG91dCBpbiB0aGUgZ3ltIGFuZCBzd2ltIGluIHRoZSBwb29sJyxcclxuICAgIHRpdGxlOiAnR28gdG8gYSB0cmFpbmluZyBzZXNzaW9uJyxcclxuICB9LFxyXG5dO1xyXG5cclxuKGZ1bmN0aW9uIChhcnJheU9mVGFza3MpIHtcclxuICBjb25zdCBvYmplY3RPZlRhc2tzID0gYXJyYXlPZlRhc2tzLnJlZHVjZSgoYWNjLCB0YXNrKSA9PiB7XHJcbiAgICBhY2NbdGFzay5faWRdID0gdGFzaztcclxuICAgIHJldHVybiBhY2M7XHJcbiAgfSwge30pO1xyXG5cclxuICAvL0VsZW1lbnRzIFVJXHJcbiAgY29uc3QgbGlzdENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5saXN0LXRhc2tzIC50YXNrcycpLFxyXG4gICAgZm9ybSA9IGRvY3VtZW50LmZvcm1zWydhZGQtdGFzayddLFxyXG4gICAgZm9ybVRpdGxlID0gZm9ybS5lbGVtZW50c1sndGl0bGUnXSxcclxuICAgIGZvcm1Cb2R5ID0gZm9ybS5lbGVtZW50c1snYm9keSddO1xyXG5cclxuXHJcbiAgLy9IYW5kbGVyc1xyXG4gIHJlbmRlckFsbFRhc2tzKG9iamVjdE9mVGFza3MpO1xyXG4gIGZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0Jywgb25Gb3JtU3VibWl0SGFuZGxlcik7XHJcbiAgbGlzdENvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9uRGVsZXRlSGFuZGxlcik7XHJcblxyXG4gIC8vRnVuY3Rpb25zXHJcbiAgZnVuY3Rpb24gcmVuZGVyQWxsVGFza3ModGFza0xpc3QpIHtcclxuICAgIGNvbnN0IGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xyXG5cclxuXHJcbiAgICBPYmplY3QudmFsdWVzKG9iamVjdE9mVGFza3MpLmZvckVhY2goKHRhc2spID0+IHtcclxuICAgICAgY29uc3QgbGkgPSBjcmVhdGVUYXNrVGVtcGxhdGUodGFzayk7XHJcbiAgICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKGxpKTtcclxuICAgIH0pO1xyXG4gICAgbGlzdENvbnRhaW5lci5hcHBlbmRDaGlsZChmcmFnbWVudCk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBjcmVhdGVUYXNrVGVtcGxhdGUoeyBfaWQsIHRpdGxlLCBib2R5IH0pIHtcclxuICAgIGNvbnN0IGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKSxcclxuICAgICAgaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDInKSxcclxuICAgICAgcGFyYWdyYXBoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpLFxyXG4gICAgICBkZWxldGVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuXHJcbiAgICBsaS5jbGFzc0xpc3QuYWRkKCd0YXNrc19faXRlbScpO1xyXG4gICAgaGVhZGVyLmNsYXNzTGlzdC5hZGQoJ3Rhc2tzX190aXRsZScpO1xyXG4gICAgcGFyYWdyYXBoLmNsYXNzTGlzdC5hZGQoJ3Rhc2tzX190ZXh0Jyk7XHJcbiAgICBkZWxldGVCdXR0b24uY2xhc3NMaXN0LmFkZCgndGFza3NfX2J1dHRvbicpO1xyXG5cclxuICAgIGxpLnNldEF0dHJpYnV0ZSgnZGF0YS10YXNrLWlkJywgX2lkKTtcclxuICAgIGhlYWRlci50ZXh0Q29udGVudCA9IHRpdGxlO1xyXG4gICAgcGFyYWdyYXBoLnRleHRDb250ZW50ID0gYm9keTtcclxuICAgIGRlbGV0ZUJ1dHRvbi50ZXh0Q29udGVudCA9ICdEZWxldGUgdGFzayc7XHJcblxyXG4gICAgbGkuYXBwZW5kQ2hpbGQoaGVhZGVyKTtcclxuICAgIGxpLmFwcGVuZENoaWxkKHBhcmFncmFwaCk7XHJcbiAgICBsaS5hcHBlbmRDaGlsZChkZWxldGVCdXR0b24pO1xyXG5cclxuICAgIHJldHVybiBsaTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIG9uRm9ybVN1Ym1pdEhhbmRsZXIoZSkge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgY29uc3QgdGl0bGVWYWx1ZSA9IGZvcm1UaXRsZS52YWx1ZSxcclxuICAgICAgYm9keVZhbHVlID0gZm9ybUJvZHkudmFsdWU7XHJcblxyXG4gICAgaWYgKCF0aXRsZVZhbHVlIHx8ICFib2R5VmFsdWUpIHtcclxuICAgICAgcmVuZGVyT3ZlcmxheVZhbGlkYXRpb24oKTtcclxuICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBcclxuICAgIGNvbnN0IHRhc2sgPSBjcmVhdGVOZXdUYXNrKHRpdGxlVmFsdWUsIGJvZHlWYWx1ZSk7XHJcbiAgICBjb25zdCBsaXN0SXRlbSA9IGNyZWF0ZVRhc2tUZW1wbGF0ZSh0YXNrKTtcclxuICAgIGxpc3RDb250YWluZXIuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KCdhZnRlcmJlZ2luJywgbGlzdEl0ZW0pO1xyXG4gICAgZm9ybS5yZXNldCgpO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gY3JlYXRlTmV3VGFzayh0aXRsZSwgYm9keSkge1xyXG4gICAgY29uc3QgbmV3VGFzayA9IHtcclxuICAgICAgdGl0bGUsXHJcbiAgICAgIGJvZHksXHJcbiAgICAgIGNvbXBsZXRlZDogZmFsc2UsXHJcbiAgICAgIF9pZDogYHRhc2stJHtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDAwMCl9YCxcclxuICAgIH07XHJcbiAgICBvYmplY3RPZlRhc2tzW25ld1Rhc2suX2lkXSA9IG5ld1Rhc2s7XHJcbiAgICByZXR1cm4geyAuLi5uZXdUYXNrIH07XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBvbkRlbGV0ZUhhbmRsZXIoeyB0YXJnZXQgfSkge1xyXG4gICAgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3Rhc2tzX19idXR0b24nKSkge1xyXG4gICAgICBjb25zdCBwYXJlbnQgPSB0YXJnZXQuY2xvc2VzdCgnW2RhdGEtdGFzay1pZF0nKSxcclxuICAgICAgICBpZCA9IHBhcmVudC5kYXRhc2V0LnRhc2tJZCxcclxuICAgICAgICB7IHRpdGxlIH0gPSBvYmplY3RPZlRhc2tzW2lkXTtcclxuICAgICAgcmVuZGVyT3ZlcmxheURlbGV0ZShpZCwgcGFyZW50LCB0aXRsZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiByZW5kZXJPdmVybGF5RGVsZXRlKGlkLCB0YXNrLCB0aXRsZSkge1xyXG4gICAgbGV0IGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpLFxyXG4gICAgICBvdmVybGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksXHJcbiAgICAgIGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxyXG4gICAgICBoZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMicpLFxyXG4gICAgICBpbm5lckJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxyXG4gICAgICBidXR0b25Db25maXJtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyksXHJcbiAgICAgIGJ1dHRvbkRlbGV0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG5cclxuICAgIG92ZXJsYXkuY2xhc3NMaXN0LmFkZCgnb3ZlcmxheS1kZWxldGUtdGFzaycpO1xyXG4gICAgY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ292ZXJsYXktZGVsZXRlLXRhc2tfX3dyYXBwZXInKTtcclxuICAgIGhlYWRlci5jbGFzc0xpc3QuYWRkKCdvdmVybGF5LWRlbGV0ZS10YXNrX190aXRsZScpO1xyXG4gICAgaW5uZXJCdXR0b24uY2xhc3NMaXN0LmFkZCgnb3ZlcmxheS1kZWxldGUtdGFza19faW5uZXItYnV0dG9uJyk7XHJcbiAgICBidXR0b25Db25maXJtLmNsYXNzTGlzdC5hZGQoJ292ZXJsYXktZGVsZXRlLXRhc2tfX2NvbmZpcm0nKTtcclxuICAgIGJ1dHRvbkRlbGV0ZS5jbGFzc0xpc3QuYWRkKCdvdmVybGF5LWRlbGV0ZS10YXNrX19jYW5jZWwnKTtcclxuICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XHJcblxyXG4gICAgaGVhZGVyLnRleHRDb250ZW50ID0gYEFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBkZWxldGVcclxuICAgICB0aGlzIHRhc2sgXCIke3RpdGxlfVwiP2A7XHJcbiAgICBidXR0b25Db25maXJtLnRleHRDb250ZW50ID0gYG9rYDtcclxuICAgIGJ1dHRvbkRlbGV0ZS50ZXh0Q29udGVudCA9IGBjYW5jZWxgO1xyXG5cclxuICAgIG92ZXJsYXkuYXBwZW5kQ2hpbGQoY29udGFpbmVyKTtcclxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChoZWFkZXIpO1xyXG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGlubmVyQnV0dG9uKTtcclxuICAgIGlubmVyQnV0dG9uLmFwcGVuZENoaWxkKGJ1dHRvbkNvbmZpcm0pO1xyXG4gICAgaW5uZXJCdXR0b24uYXBwZW5kQ2hpbGQoYnV0dG9uRGVsZXRlKTtcclxuXHJcbiAgICBmcmFnbWVudC5hcHBlbmRDaGlsZChvdmVybGF5KTtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYWluJykuYXBwZW5kQ2hpbGQoZnJhZ21lbnQpO1xyXG5cclxuICAgIG92ZXJsYXkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICBjb25zdCBjbG9zZU92ZXJsYXkgPVxyXG4gICAgICAgIGUudGFyZ2V0LnRhZ05hbWUgPT09ICdCVVRUT04nIHx8IGUudGFyZ2V0ID09PSBvdmVybGF5O1xyXG4gICAgICBpZiAoY2xvc2VPdmVybGF5KSB7XHJcbiAgICAgICAgb3ZlcmxheS5yZW1vdmUoKTtcclxuICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBidXR0b25Db25maXJtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgZGVsZXRlIG9iamVjdE9mVGFza3NbaWRdO1xyXG4gICAgICB0YXNrLnJlbW92ZSgpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiByZW5kZXJPdmVybGF5VmFsaWRhdGlvbigpIHtcclxuICAgIGNvbnN0IGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpLFxyXG4gICAgICBvdmVybGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksXHJcbiAgICAgIGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxyXG4gICAgICBoZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMicpLFxyXG4gICAgICBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuXHJcbiAgICBvdmVybGF5LmNsYXNzTGlzdC5hZGQoJ292ZXJsYXktYWRkLXRhc2snKTtcclxuICAgIGNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdvdmVybGF5LWFkZC10YXNrX193cmFwcGVyJyk7XHJcbiAgICBoZWFkZXIuY2xhc3NMaXN0LmFkZCgnb3ZlcmxheS1hZGQtdGFza19fdGl0bGUnKTtcclxuICAgIGJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdvdmVybGF5LWFkZC10YXNrX19idXR0b24nKTtcclxuXHJcbiAgICBoZWFkZXIudGV4dENvbnRlbnQgPSAnUGxlYXNlIGZpbGwgaW4gYWxsIGZpZWxkcyc7XHJcbiAgICBidXR0b24udGV4dENvbnRlbnQgPSAnb2snO1xyXG5cclxuICAgIG92ZXJsYXkuYXBwZW5kQ2hpbGQoY29udGFpbmVyKTtcclxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChoZWFkZXIpO1xyXG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGJ1dHRvbik7XHJcblxyXG4gICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQob3ZlcmxheSk7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWFpbicpLmFwcGVuZENoaWxkKGZyYWdtZW50KTtcclxuXHJcbiAgICBvdmVybGF5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgY29uc3QgY2xvc2VPdmVybGF5ID1cclxuICAgICAgICBlLnRhcmdldC50YWdOYW1lID09PSAnQlVUVE9OJyB8fCBlLnRhcmdldCA9PT0gb3ZlcmxheTtcclxuICAgICAgaWYgKGNsb3NlT3ZlcmxheSkge1xyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XHJcbiAgICAgICAgb3ZlcmxheS5yZW1vdmUoKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG59KSh0YXNrcyk7XHJcblxyXG4oZnVuY3Rpb24gY2hhbmdlVGhlbWUoKSB7XHJcbiAgY29uc3QgY2hhbmdlVGhlbWVCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyX190aGVtZS1zZWxlY3QnKSxcclxuICAgIGJvZHkgPSBkb2N1bWVudC5ib2R5O1xyXG4gIGNoYW5nZVRoZW1lQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdG9nZ2xlVGhlbWUpO1xyXG5cclxuICBpZiAoIWxvY2FsU3RvcmFnZS50aGVtZSkgbG9jYWxTdG9yYWdlLnRoZW1lID0gJ2xpZ2h0JztcclxuICBkb2N1bWVudC5ib2R5LmNsYXNzTmFtZSA9IGxvY2FsU3RvcmFnZS50aGVtZTtcclxuXHJcbiAgZnVuY3Rpb24gdG9nZ2xlVGhlbWUoeyB0YXJnZXQgfSkge1xyXG4gICAgYm9keS5jbGFzc0xpc3QudG9nZ2xlKCdkYXJrJyk7XHJcbiAgICBjaGFuZ2VUaGVtZUJ1dHRvbi50ZXh0Q29udGVudCA9IGJvZHkuY2xhc3NMaXN0LmNvbnRhaW5zKCdkYXJrJylcclxuICAgICAgPyAnY2hhbmdlIHRoZW1lIHRvIGxpZ2h0J1xyXG4gICAgICA6ICdjaGFuZ2UgdGhlbWUgdG8gZGFyayc7XHJcbiAgICBsb2NhbFN0b3JhZ2UudGhlbWUgPSBkb2N1bWVudC5ib2R5LmNsYXNzTmFtZSB8fCAnbGlnaHQnO1xyXG4gIH1cclxufSkoKTtcclxuIl0sImZpbGUiOiJpbmRleC5qcyJ9
