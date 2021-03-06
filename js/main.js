const body = document.querySelector('body')
const form = document.querySelector(".form-crtf")
const inputs = document.querySelectorAll(".form-crtf__input-blade input")
const checks = document.querySelectorAll(".form-crtf__check-blade input")
const textareas = document.querySelectorAll(".form-crtf__input-blade textarea")
const selectList = document.querySelectorAll(".select__list")
const selectItem = document.querySelectorAll(".select__item")
const selectChoose = document.querySelectorAll(".select__choose")
const moreForm = document.querySelector(".form-crtf__more")

inputs.forEach(element => {
  element.onfocus = function () {
    element.parentNode.classList.remove("error")
    if (this.value.length == 0) {
      this.parentNode.querySelector("label").classList.add("focus")
    }
  }
  element.onblur = function () {
    if (this.value.length == 0) {
      this.parentNode.querySelector("label").classList.remove("focus")
      element.parentNode.classList.add("error")
    }
  }
});

checks.forEach(element => {
  element.onfocus = function () {
    element.parentNode.classList.remove("error")
  }
});

textareas.forEach(element => {
  element.onfocus = function () {
    element.parentNode.classList.remove("error")
    if (this.value.length == 0) {
      this.parentNode.querySelector("label").classList.add("focus")
    }
  }
  element.onblur = function () {
    if (this.value.length == 0) {
      this.parentNode.querySelector("label").classList.remove("focus")
      element.parentNode.classList.add("error")
    }
  }
});

selectItem.forEach(element => {
  element.addEventListener("click", (evt) => {

    if (!evt.target.classList.contains("selected")) {
      evt.target.parentNode.querySelectorAll(".select__item").forEach(sl => {
        if (sl.classList.contains("selected")) {
          sl.classList.remove("selected")
        }
      });
      evt.target.classList.add("selected")
      evt.target.parentNode.parentNode.querySelector(".select__choose").textContent = evt.target.textContent
      evt.target.parentNode.parentNode.querySelector("input").value = evt.target.getAttribute("data-attr")

    }
    evt.target.parentNode.classList.remove('open')
    evt.target.parentNode.parentNode.querySelector(".select__choose").classList.remove('open')
  })
});

selectChoose.forEach(element => {
  element.addEventListener("click", (evt) => {
    evt.stopPropagation()
    document.querySelectorAll(".select__list.open").forEach(sl => {
      if (sl.parentNode != evt.target.parentNode) {
        sl.classList.remove("open")
        sl.parentNode.querySelector(".select__choose").classList.remove('open')
      }
    });
    evt.target.classList.toggle('open')
    evt.target.parentNode.querySelector(".select__list").classList.toggle('open')
  })
});


body.addEventListener("click", (elem) => {

  selectList.forEach(element => {
    if (elem.target.parentNode != element && element.classList.contains('open')) {

      element.classList.remove('open')
      element.parentNode.querySelector(".select__choose").classList.remove('open')
    }
  });
})

moreForm.addEventListener("click", (evt) => {
  moreForm.classList.toggle("open")
})

form.addEventListener('submit', (event) => {
  event.preventDefault()
  let res = validate()
  if (res) {
    console.log("???????????????? ????????");
  }

})

function validate() {
  let flag = false
  let globalFlag = true
  let fieldInput = document.querySelectorAll(".form-crtf input")
  let fieldTeaxtarea = document.querySelector(".form-crtf textarea")

  fieldInput.forEach(element => {
    if (!element.classList.contains("not-validate")) {

      switch (element.getAttribute("type")) {
        case "text":
          if (element.value.length != 0) {
            flag = true
          } else {
            element.parentNode.classList.add("error")
            flag = false
            globalFlag = false
          }
          break;

        case "date":
          if (element.value.length != 0) {
            flag = true
          } else {
            element.parentNode.classList.add("error")
            flag = false
            globalFlag = false
          }
          break;

        case "checkbox":
          if (element.checked) {
            flag = true
          } else {
            element.parentNode.classList.add("error")
            flag = false
            globalFlag = false
          }
          break;

        case "email":
          if (element.value.length != 0) {
            flag = true
          } else {
            element.parentNode.classList.add("error")
            flag = false
            globalFlag = false
          }
          break;

        default:
          break;
      }

    }

  });

  if (fieldTeaxtarea.value.length != 0 || fieldTeaxtarea.classList.contains("not-validate")) {

    if (globalFlag) {
      flag = true
    } else {
      flag = false
    }
  } else {
    fieldTeaxtarea.parentNode.classList.add("error")
    flag = false
    globalFlag = false
  }


  return flag
}

document.querySelector('#crtf-mail-agree').addEventListener("click", (evt) => {
  document.querySelector(".container-opacity").classList.toggle("d-none")
  document.querySelector(".container-opacity").querySelectorAll(".form-crtf__input-blade input").forEach(element => {
    element.classList.toggle("not-validate")
    element.parentNode.classList.remove("error")
  });
  document.querySelector(".form-crtf textarea").classList.toggle("not-validate")
  document.querySelector(".form-crtf textarea").parentNode.classList.remove("error")
})