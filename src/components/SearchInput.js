import Component from "../core/Component.js";

export default class SearchInput extends Component {
  template() {
    return `
            <input 
                class="SearchInput__input" 
                type="text" 
                placeholder="프로그램 언어를 입력하세요." 
                value=""
            >
        `;
  }

  setEvent() {
    this.addEvent(".SearchInput__input", "input", (target) => {
      this.$props.onInput(target.value);
    });

    this.$target.addEventListener("keydown", (event) => {
      if ((event.key === "ArrowDown") | (event.key === "ArrowUp")) {
        this.$props.ChangeIndexByKey(event.key);
      } else if (event.key === "Enter") {
        event.preventDefault();
        this.$props.selectItem();
      }
    });
  }
}
