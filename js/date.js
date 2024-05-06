const months = [
    "січня", "лютого", "березня",
    "квітня", "травня", "червня",
    "липня", "серпня", "вересня",
    "жовтня", "листопада", "грудня"
];

export  function bindDateData(postData, dateData, queue, container) {
    const now = new Date(); // Текущая дата и время
    const postDate = new Date(postData.date * 1000); // Преобразование временной метки Unix в объект Date

    const lastYear = new Date(now);
    lastYear.setFullYear(lastYear.getFullYear() - 1); // Вычитаем один год
    if (
        postDate.getFullYear() < now.getFullYear()
    ) {
        

        const day = postDate.getDate();
        const month = months[postDate.getMonth()];
        const year = postDate.getFullYear();
        const dateString = `${day} ${month} ${year}`;
        
        dateData.hasOwnProperty(dateString) ? dateData[dateString].push(postData.id) : (() => {
            dateData[dateString] = [postData.id];
            queue.push(dateString);
            createDateContainer(dateString, container);
        })();
        return;
    }
    if (
        postDate.getDate() === now.getDate() &&
        postDate.getMonth() === now.getMonth() &&
        postDate.getFullYear() === now.getFullYear()
    ) {
        // Возвращает время в формате HH:MM
     
        dateData.hasOwnProperty('Сьогодні') ? dateData['Сьогодні'].push(postData.id) : (() => {
            dateData['Сьогодні'] = [postData.id]
            queue.push('Сьогодні')
            createDateContainer(`Сьогодні`, container)
        })()
        return
    }

    // Если дата поста была вчера
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1); // Вычитаем один день
    if (
        postDate.getDate() === yesterday.getDate() &&
        postDate.getMonth() === yesterday.getMonth() &&
        postDate.getFullYear() === yesterday.getFullYear()
    ) {
        // Возвращает "Вчера в HH:MM"
    
        dateData.hasOwnProperty('Вчора') ? dateData['Вчора'].push(postData.id) : (() => {
            dateData['Вчора'] = [postData.id]
            queue.push('Вчора')
            createDateContainer(`Вчора`, container)
        })()
        return
    }

    const dayBeforeYesterday = new Date(now);
    dayBeforeYesterday.setDate(dayBeforeYesterday.getDate() - 2); // Вычитаем два дня
    if (
        postDate.getDate() === dayBeforeYesterday.getDate() &&
        postDate.getMonth() === dayBeforeYesterday.getMonth() &&
        postDate.getFullYear() === dayBeforeYesterday.getFullYear()
    ) {
        // Возвращает "Позавчера в HH:MM"

        dateData.hasOwnProperty('Позавчора') ? dateData['Позавчора'].push(postData.id) : (() => {
            dateData['Позавчора'] = [postData.id]
            queue.push('Позавчора')
            createDateContainer(`Позавчора`, container)
        })()
        return
    }
    
    const day = postDate.getDate();
    const month = months[postDate.getMonth()];
    // dateData.push([`${day} ${month}`, postData.id] )
  
    dateData.hasOwnProperty(`${day} ${month}`) ? dateData[`${day} ${month}`].push(postData.id) : (() => {
        dateData[`${day} ${month}`] = [postData.id]
        queue.push(`${day} ${month}`)
        createDateContainer(`${day} ${month}`, container)
    })()
}

export function formatDate(unixTimestamp, onlyTime = false) {
    const date = new Date(unixTimestamp * 1000)
 
    
    const day = date.getDate();
    const month = months[date.getMonth()];
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    
    if(onlyTime)   return  `${hours}:${minutes}`
    else   return `${day} ${month}`
}


function createDateContainer(dateName, container) {
    const div = document.createElement('div')
    div.classList.add('date-container')

    const dateElement = document.createElement('div')
    const dateIcon = document.createElement('span')
    const flexReversWrap = document.createElement('div')
    flexReversWrap.classList.add('flex-reverse')
    dateElement.classList.add('date-sticky-element')
    dateIcon.innerHTML = dateName
    dateElement.appendChild(dateIcon)
    div.appendChild(dateElement)
    div.appendChild(flexReversWrap)
    container.appendChild(div)
}