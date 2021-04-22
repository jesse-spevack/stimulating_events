import { Controller } from "stimulus"

export default class extends Controller {
  static targets = [
    "speaker",
    "list",
    "check"
  ]

  static classes = [
    "textWhite",
    "textPink",
    "backgroundPink",
    "semibold",
    "hidden"
  ]

  connect() {
    this.toggleList()
    this.hideChecks()
  }

  highlightListItem(event) {
    const listItem = event.target
    const span = listItem.firstElementChild
    const check = listItem.lastElementChild

    listItem.classList.add(this.backgroundPinkClass)
    span.classList.add(this.textWhiteClass, this.semiboldClass)

    if(!check.classList.contains(this.hiddenClass)) {
      check.classList.replace(this.textPinkClass, this.textWhiteClass)
    }
  }

  unhighlightListItem(event) {
    const listItem = event.target
    const span = listItem.firstElementChild
    const check = listItem.lastElementChild

    listItem.classList.remove(this.backgroundPinkClass)
    span.classList.remove(this.textWhiteClass, this.semiboldClass)

    if(!check.classList.contains(this.hiddenClass)) {
      check.classList.replace(this.textWhiteClass, this.textPinkClass)
    }
  }

  selectItem(event) {
    this.toggleList()
    this.hideChecks()
    
    const selected = event.target.innerText.trim()
    this.speakerTarget.textContent = selected 
    for(const check of this.checkTargets) {
      if (check.previousElementSibling.innerText.trim() === selected) {
        check.classList.remove(this.hiddenClass)
      }
    }
  }

  toggleList() {
    this.listTarget.classList.toggle(this.hiddenClass)
  }

  hideChecks() {
    for (const check of this.checkTargets) {
      check.classList.add(this.hiddenClass)
    }
  }
}
