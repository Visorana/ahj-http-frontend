export default class Item {
  constructor(id, name, status, created) {
    this.id = id;
    this.name = name;
    this.status = +status;
    const date = new Date(+created);
    this.created = date.toLocaleString();
    this.node = document.createElement("div");
    this.node.classList.add("helpdesk__item");
    const statusNode = document.createElement("div");
    statusNode.classList.add("helpdesk__item__status");
    if (this.status) {
      statusNode.classList.add("helpdesk__item__done");
    } else {
      statusNode.classList.add("helpdesk__item__wait");
    }
    const nameNode = document.createElement("div");
    nameNode.classList.add("helpdesk__item__name");
    nameNode.innerText = this.name;
    const timeNode = document.createElement("div");
    timeNode.classList.add("helpdesk__item__date");
    timeNode.innerText = this.created;
    const controlsNode = document.createElement("div");
    controlsNode.classList.add("helpdesk__item__controls");
    const editNode = document.createElement("div");
    editNode.classList.add("helpdesk__item__edit");
    const deleteNode = document.createElement("div");
    deleteNode.classList.add("helpdesk__item__delete");

    controlsNode.append(editNode, deleteNode);
    this.node.append(statusNode, nameNode, timeNode, controlsNode);
  }
}
