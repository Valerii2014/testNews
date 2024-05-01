//css
import './style/reset.css'
import './style/media.css'
import './style/style.scss'
import data from '../userBot/messageIds.json'

const reactionFilter = (reaction) => {
   return reaction.sort( (a,b) => { return b.count - a.count } )
}

console.log(data)

const wrapper = document.querySelector('.wrapper')
const container = document.querySelector('#news-container')
let currentScrollPosition = 0
let currentHeight = window.innerHeight
let lastIndex = data[data.length - 1].postLink.slice(-3)

data.forEach(({postLink, reactions, views, date}, i) => {

    const filteredReactions = reactionFilter(reactions)
    const postWrapper = document.createElement('div')
    postWrapper.classList.add('post-wrapper')
    postWrapper.innerHTML = `
        <iframe 
            src='${postLink}?embed=1&userpic=true&language="ru"' 
            id='iframe-index-${i}' 
            scrolling='no' 
            style='width: 100%'
            lang="ru" language="ru">
        </iframe>
        <div class='reactions-wrapper'>
           ${
            filteredReactions.map((reactionData, i) => {
                if(i > 3) return
                return `
                <div class="reaction-container">
                     <span class="emoticon">${reactionData.emoticon}</span>
                     <span class="text">${reactionData.count}</span>
                </div>
             `
            }).join('')
            }
            <div class="info">
                <span class="views">👁 ${views}</span>
                <span class="date">${formatDate(date)}</span>
            </div>
        </div>
    `
    // iframe.src = postLink + '?embed=1' + '&userpic=true'
    // iframe.id = 'iframe-index-' + i
    
    // iframe.setAttribute('scrolling', 'no')
    // reactionsContainer.width = '100%'
    // reactionsContainer.height = '100px'
    // reactionsContainer.position = 'absolute'
    // reactionsContainer.bottom = '0'
    // iframe.appendChild(reactionsContainer)
    container.appendChild(postWrapper)

})

function formatDate(unixTimestamp) {
    const date = new Date(unixTimestamp * 1000)
    const months = [
        "січня", "лютого", "березня",
        "квітня", "травня", "червня",
        "липня", "серпня", "вересня",
        "жовтня", "листопада", "грудня"
    ];
    
    const day = date.getDate();
    const month = months[date.getMonth()];
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    
    return `${day} ${month}  ${hours}:${minutes}`;
}

// container.addEventListener('resize', () => {
//     console.log('resize')
//     if(container.offsetHeight > currentHeight){
//         const scrollValue = container.offsetHeight - currentHeight
//         wrapper.scrollTo(0, scrollValue)
//         currentHeight = container.innerHeight
//         currentScrollPosition = scrollValue
//     }
// })
let isAvailable = true
const resizeObserver = new ResizeObserver(entries => {
   
    
        console.log('resize', container.offsetHeight)
        const scrollValue = container.offsetHeight 
        isAvailable = false
        wrapper.scrollTop = scrollValue - currentScrollPosition
        // currentHeight = container.offsetHeight
       setTimeout(() => isAvailable = true, 100)
    
})
resizeObserver.observe(container)

wrapper.addEventListener('scroll', (e) => {
    if(!isAvailable) return
    console.log(document.querySelector('.wrapper').scrollTop)
    currentScrollPosition = container.offsetHeight - wrapper.scrollTop
    if(wrapper.scrollTop < 500){

    }
})

window.addEventListener('message', event => {
  
    if(event.origin !== "https://t.me") return
    try {
        const eventData = JSON.parse(event.data);
        if (eventData.event === 'resize') {
            const documentHeight = eventData.height;

            
            // Далее можно выполнить необходимые действия при изменении размера iframe
            const iframes = document.getElementsByTagName('iframe');
            
            for (let i = 0; i < iframes.length; i++) {
                if (iframes[i].contentWindow === event.source) {

                    iframes[i].style.height = `${documentHeight}px`
                    break;
                }
            }
           
        }
    } catch (error) {
        console.error('Ошибка при разборе данных события:', error);
    }
});

// Отправка сообщения из родительского окна в iframe
// setTimeout(() => {
//     console.log('send');
//     lastElement.contentWindow.postMessage({ type: 'requestSize' }, '*');
// }, 2000);