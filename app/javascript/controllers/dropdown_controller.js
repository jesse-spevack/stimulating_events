import { Controller } from "stimulus"

export default class extends Controller {
  static targets = [
    "speaker",
    "list",
  ]

  static classes = [
    "hidden"
  ]

  connect() {
    this.toggleList()
  }

  setSelected(event) {
    this.toggleList()
    if(event.detail.value) {
      this.speakerTarget.textContent = event.detail.value
    }
  }

  toggleList(event) {
    this.listTarget.classList.toggle(this.hiddenClass)
  }
}
