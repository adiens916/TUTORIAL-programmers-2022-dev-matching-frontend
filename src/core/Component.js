export default class Component {
  $target;
  $state;
  $props;

  constructor($target, $props) {
    this.$target = $target;
    this.$props = $props;
    this.initState();
    this.render();
    this.setEvent();
    this.initApp();
  }

  initState() {}

  template() {}

  render() {
    this.$target.innerHTML = this.template();
    this.mountComponent();
  }

  mountComponent() {}

  getComponent(selector) {
    return this.$target.querySelector(selector);
  }

  initApp() {}

  setEvent() {}

  addEvent(selector, eventType, callback) {
    this.$target.addEventListener(eventType, (event) => {
      const target = event.target.closest(selector);
      callback(target);
    });
  }

  setState(newState) {
    this.$state = { ...this.$state, ...newState };
    this.render();
  }
}
