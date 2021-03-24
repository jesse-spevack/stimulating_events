import { Controller } from "stimulus"

export default class extends Controller {
  static targets = [
    "text",
    "check",
    "item"
  ]

  static classes = [
    "textWhite",
    "textPink",
    "backgroundPink",
    "semibold",
    "hidden"
  ]

  static values = {
    isSelected: Boolean
  }

  select() {
    this.isSelectedValue = true

    const detail = { value: this.textTarget.innerText.trim() }
    const event = new CustomEvent('listItemSelected', { detail: detail })

    window.dispatchEvent(event)
  }

  deselect(event) {
    if(event.detail.value !== this.textTarget.innerText.trim()) {
      this.isSelectedValue = false
    }
  }

  isSelectedValueChanged() {
    this.checkTarget.classList.toggle(this.hiddenClass)
  }

  highlight(event) {
    this.itemTarget.classList.add(this.backgroundPinkClass)
    this.textTarget.classList.add(this.textWhiteClass, this.semiboldClass)
    this.checkTarget.classList.replace(this.textPinkClass, this.textWhiteClass)
  }

  unhighlight(event) {
    this.itemTarget.classList.remove(this.backgroundPinkClass)
    this.textTarget.classList.remove(this.textWhiteClass, this.semiboldClass)
    this.checkTarget.classList.replace(this.textWhiteClass, this.textPinkClass)
  }
}
