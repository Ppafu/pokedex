import Pokemon from "./Pokemon";
export class Type extends Pokemon {
  _parentElement = document.querySelector(".filter-container");
  constructor(name) {
    super();
    this.name = name;
  }

  render() {
    const typeElement = this._createElement(
      this.name,
      "li",
      `type ${this.name} filter`
    );

    // Append the new element to the parent element
    this._parentElement.appendChild(typeElement);
  }
}

// this.handler = handler;

// typeElement.addEventListener("click", () => {
//   this.handler(this.name);
// });
