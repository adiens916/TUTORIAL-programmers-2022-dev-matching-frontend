import Component from "../core/Component.js";

export default class Suggestion extends Component {
  initState() {
    this.$target.style.display = this.$props.items.length ? "block" : "none";
  }

  template() {
    return `
        <ul>
        ${this.$props.items
          .map(
            (item, index) => `
        <li ${this.isSelected(index)}>
        ${item}
        </li>
        `
          )
          .join("")}
        </ul>
        `;
  }

  highlightMatch(itemName) {
    return `<span class="Suggestion__item--matched">aaa</span>`;
  }

  isSelected(index) {
    if (this.$props.suggestionItemIndex == index) {
      return 'class="Suggestion__item--selected"';
    } else {
      return "";
    }
  }

  setEvent() {
    this.addEvent("li", "mouseover", (target) => {
      if (target) {
        // console.log(target.innerText);
        this.$props.changeIndexByName(target.innerText);
      }
    });

    this.addEvent("li", "click", () => {
      this.$props.selectItem();
    });
  }
}
