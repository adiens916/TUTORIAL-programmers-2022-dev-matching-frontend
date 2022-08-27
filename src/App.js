import Component from "./core/Component.js";
import SearchInput from "./components/SearchInput.js";
import Suggestion from "./components/Suggestion.js";
import { getSuggestionsByKeyword } from "./api/fetch.js";

export default class App extends Component {
  initState() {
    this.$state = {
      suggestionItems: [],
      suggestionItemIndex: 0,
    };
  }

  template() {
    return `
            <div class="SelectedLanguage"></div>
            <form class="SearchInput"></form>
            <div class="Suggestion"></div>
        `;
  }

  mountComponent() {
    const $searchInput = this.getComponent(".SearchInput");
    new SearchInput($searchInput, {
      onInput: this.onInput.bind(this),
      ChangeIndexByKey: this.ChangeIndexByKey.bind(this),
      selectItem: this.selectItem.bind(this),
    });

    const $suggestion = this.getComponent(".Suggestion");
    new Suggestion($suggestion, {
      items: this.$state.suggestionItems,
      suggestionItemIndex: this.$state.suggestionItemIndex,
      changeIndexByName: this.changeIndexByName.bind(this),
      selectItem: this.selectItem.bind(this),
    });
  }

  setState(newState) {
    this.$state = { ...this.$state, ...newState };

    const $suggestion = this.getComponent(".Suggestion");
    new Suggestion($suggestion, {
      items: this.$state.suggestionItems,
      suggestionItemIndex: this.$state.suggestionItemIndex,
      changeIndexByName: this.changeIndexByName.bind(this),
      selectItem: this.selectItem.bind(this),
    });
  }

  onInput(keyword) {
    this.setSuggestionItems(keyword);
  }

  async setSuggestionItems(keyword) {
    if (keyword) {
      const suggestionItems = await getSuggestionsByKeyword(keyword);
      // console.log(suggestionItems);
      this.setState({
        suggestionItems,
      });
    } else {
      this.setState({
        suggestionItems: [],
        suggestionItemIndex: 0,
      });
    }
  }

  ChangeIndexByKey(key) {
    let index = this.$state.suggestionItemIndex;
    const length = this.$state.suggestionItems.length;

    // console.log(key);
    switch (key) {
      case "ArrowUp":
        index = index === 0 ? length - 1 : index - 1;
        break;
      case "ArrowDown":
        index = index === length - 1 ? 0 : index + 1;
        break;
    }

    this.setState({
      suggestionItemIndex: index,
    });
  }

  changeIndexByName(itemName) {
    const index = this.$state.suggestionItems.findIndex(
      (item) => item === itemName
    );
    if (index !== this.$state.suggestionItemIndex) {
      this.setState({
        suggestionItemIndex: index,
      });
    }
  }

  selectItem() {
    alert(this.$state.suggestionItems[this.$state.suggestionItemIndex]);
  }
}
