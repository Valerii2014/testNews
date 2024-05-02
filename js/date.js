const months = [
    "січня", "лютого", "березня",
    "квітня", "травня", "червня",
    "липня", "серпня", "вересня",
    "жовтня", "листопада", "грудня"
];

export  function bindDateData(postData, dateData) {
    const now = new Date(); // Текущая дата и время
    const postDate = new Date(postData.date * 1000); // Преобразование временной метки Unix в объект Date

    if (
        postDate.getDate() === now.getDate() &&
        postDate.getMonth() === now.getMonth() &&
        postDate.getFullYear() === now.getFullYear()
    ) {
        // Возвращает время в формате HH:MM
        dateData.set('Сьогодні', postData.id)
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
      
        dateData.set('Вчора', postData.id)
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
        dateData.set('Позавчора', postData.id)
        return
    }
    
    const day = postDate.getDate();
    const month = months[postDate.getMonth()];
    // dateData.push([`${day} ${month}`, postData.id] )
    dateData.set(`${day} ${month}`, postData.id)
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