export default class Modal {
  constructor() {
    this.closeModal = this.closeModal.bind(this);
  }

  createModal() {
    this.modal = document.createElement("div");
    this.modal.classList.add("helpdesk__modal");
    this.modal.innerHTML = `<form class="helpdesk__form" novalidate>
    <h3>Добавить тикет</h3>
    <div class="label">Краткое описание<input type="text" name="item-name" class="helpdesk__form__field item_name" required></div>
    <div class="label">Подробное описание<textarea name="item-description" class="helpdesk__form__field item_description" required></textarea></div>
    <div class="controls">
      <button type="button" class="close">Отмена</button>
      <button>Ok</button>
    </div>
  </form>`;

    this.form = this.modal.querySelector(".helpdesk__modal .helpdesk__form");
    this.inputName = this.form.querySelector(".item_name");
    this.inputDescription = this.form.querySelector(".item_description");
    this.close = this.modal.querySelector(".helpdesk__modal .close");
  }

  showModal(callback, item) {
    document.body.appendChild(this.modal);
    this.close.addEventListener("click", this.closeModal);
    const allInputs = this.form.querySelectorAll(".helpdesk__form__field");
    [...allInputs].forEach((input) =>
      input.addEventListener("focus", Modal.removeError),
    );

    if (item) {
      this.inputName.value = item.name;
      this.inputDescription.value = item.description;
    }
    this.form.addEventListener(
      "submit",
      this.checkValidity.bind(this, callback),
    );
  }

  showWarning(callback) {
    this.modal = document.createElement("div");
    this.modal.classList.add("helpdesk__modal");
    this.modal.innerHTML = `<div class="helpdesk__form">
    <h3>Удалить тикет</h3>
    <div>Вы уверены, что хотите удалить тикет? Это действие необратимо.</div>
    <div class="controls">
      <button class="ok">OK</button>
      <button class="close">Отмена</button>
    </div>
  </div>`;

    document.body.appendChild(this.modal);
    this.close = this.modal.querySelector(".helpdesk__modal .close");
    this.close.addEventListener("click", this.closeModal);
    const submit = this.modal.querySelector(".helpdesk__modal .ok");
    submit.addEventListener("click", callback);
  }

  closeModal() {
    this.modal.remove();
  }

  checkValidity(callback, event) {
    event.preventDefault();

    const isValid = event.currentTarget.checkValidity();
    if (!isValid) {
      if (!this.inputName.validity.valid) {
        Modal.showError(this.inputName, "введите краткое описание");
      }
      if (!this.inputDescription.validity.valid) {
        Modal.showError(this.inputDescription, "введите подробное описание");
      }
      return;
    }

    callback();
  }

  static showError(targetNode, message) {
    const error = document.createElement("div");
    error.classList.add("error");
    error.innerText = message;
    targetNode.closest("div").append(error);
    error.style.left = `${targetNode.offsetLeft + targetNode.offsetWidth / 2 - error.offsetWidth / 2}px`;
    error.style.top = `${targetNode.offsetTop + targetNode.offsetHeight}px`;
  }

  static removeError(event) {
    const error = event.currentTarget.closest("div").querySelector(".error");
    if (error) {
      error.remove();
    }
  }
}
