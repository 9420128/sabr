export const removeClassHelper = (el, className) => {

    document.querySelectorAll(el).forEach(el => {

        if(el.classList.contains(className)) el.classList.remove(className)

    })

}
