
let lastElement = -1
export default function createDateElements(dataDate, container) {
    const elements = []
    for( let key of dataDate.keys() ){
        const element = document.createElement('div')
        element.setAttribute('dateid', `${dataDate.get(key)}`)
        element.setAttribute('datatext', `${key}`)
        elements.push(element)
        container.appendChild(element)
    }
    elements.forEach((element, i) => {
        if(i < lastElement) return
        lastElement = i
        const id = element.getAttribute('dateid')
        const text = element.getAttribute('datatext')
        if(i === 0){
            const param = document.getElementById(id).getBoundingClientRect()
            element.style.height = `${param.height + 60}px`
            const dateElement = document.createElement('div')
            dateElement.classList.add('date-element')
            dateElement.innerHTML = 'text'
            element.appendChild(dateElement)
        }
    })
}