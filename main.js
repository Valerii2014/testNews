//css

import data from '../userBot/messageIds.json'
import {bindDateData, formatDate} from './js/date'


console.log(data)
const dateData = {}
const queue = []

const reactionFilter = (reaction) => {
   return reaction.sort( (a,b) => { return b.count - a.count } )
}

// let haveNewMessage = false
// const lastViewMessage = localStorage.getItem('postId') || data[0].id
// if(lastViewMessage < data[0].id ) haveNewMessage = true


// console.log(localStorage.getItem('postId'))

const wrapper = document.querySelector('.wrapper')
const container = document.querySelector('#news-container')

const scrollCaret = document.querySelector('.scroll-caret')
const downButton = document.querySelector('.scroll-down-button')

let currentScrollPosition = 0

let renderIndex = -1
let avaliableRenderIndex = 2

renderPosts()

function addBr(text) {
    if(typeof text !== 'string') return ''
    return text.replace(/(http\S*)|(@\w+)/g, (match, url, mention) => {
        // Проверяем, является ли соответствие ссылкой
        if (url) {
            // Если да, оборачиваем ссылку в теги <a></a>
            return `<a class="body-link" target="_blank" href="${url}">${url}</a>`;
        } else if (mention) {
            // Если да, оборачиваем упоминание в ссылку на профиль в Telegram
            const username = mention.substring(1); // Удаляем символ "@"
            return `<a class="body-link" target="_blank" href="https://t.me/${username}">${mention}</a>`;
        } else {
            // Если нет, возвращаем исходное соответствие
            return match;
        }
    }).replace(/\n/g, "<br />");
}

function modifyEmoji(text) {
    if(typeof text !== 'string') return ''
        return text.replace(/([\p{Extended_Pictographic}\u{1F3FB}-\u{1F3FF}]+)/gu, (match, emojiSequence) => {
            return `<span class="noto-color-emoji-regular">${emojiSequence}</span>`;
        });

}
function renderPosts(){
    const elementsPlace = {}
    data.forEach((postData, i) => {
        if(i <= renderIndex || i > avaliableRenderIndex ) return
        renderIndex = i
        bindDateData(postData, dateData, queue, container)

        const filteredReactions = reactionFilter(postData.reactions)
        
        const postWrapper = document.createElement('div')
        if(filteredReactions.length <= 0){
            postWrapper.classList.add('noreaction')
        }
        
        const postInnerLink = !postData.webpage ? '' : `
        <a class="link" href="${postData.webpage.url}" target="_blank">
        <div class="link-wrapper">
        <div class="link-siteName">${postData.webpage.siteName}</div>
        ${postData.webpage.photo ? `<div class="link-image"><img src="${postData.webpage.photo}"></img>
        ${postData.webpage.siteName === 'YouTube' ? `<div class="play-button">
        </div>` : ''}
        </div>` : ''}
        ${postData.webpage.title ? `<div class="link-title">${modifyEmoji(postData.webpage.title).replace(/\n/g, "<br />")}</div>` : ''}
        ${postData.webpage.descr ? `<div class="link-body">${modifyEmoji(postData.webpage.descr).replace(/\n/g, "<br />")}</div>` : ''}
        </div>
        </a>
        `
        postWrapper.id = 'post-' + postData.id
      
        postWrapper.classList.add('post-wrapper')
        postWrapper.innerHTML = `

            <i class="tgme_widget_message_bubble_tail">
            <svg class="bubble_icon" width="9px" height="20px" viewBox="0 0 9 20">
                <g fill="none">
                <path class="background" fill="#ffffff" d="M8,1 L9,1 L9,20 L8,20 L8,18 C7.807,15.161 7.124,12.233 5.950,9.218 C5.046,6.893 3.504,4.733 1.325,2.738 L1.325,2.738 C0.917,2.365 0.89,1.732 1.263,1.325 C1.452,1.118 1.72,1 2,1 L8,1 Z"></path>
                <path class="border_1x" fill="#d7e3ec" d="M9,1 L2,1 C1.72,1 1.452,1.118 1.263,1.325 C0.89,1.732 0.917,2.365 1.325,2.738 C3.504,4.733 5.046,6.893 5.95,9.218 C7.124,12.233 7.807,15.161 8,18 L8,20 L9,20 L9,1 Z M2,0 L9,0 L9,20 L7,20 L7,20 L7.002,18.068 C6.816,15.333 6.156,12.504 5.018,9.58 C4.172,7.406 2.72,5.371 0.649,3.475 C-0.165,2.729 -0.221,1.464 0.525,0.649 C0.904,0.236 1.439,0 2,0 Z"></path>
                <path class="border_2x" d="M9,1 L2,1 C1.72,1 1.452,1.118 1.263,1.325 C0.89,1.732 0.917,2.365 1.325,2.738 C3.504,4.733 5.046,6.893 5.95,9.218 C7.124,12.233 7.807,15.161 8,18 L8,20 L9,20 L9,1 Z M2,0.5 L9,0.5 L9,20 L7.5,20 L7.5,20 L7.501,18.034 C7.312,15.247 6.64,12.369 5.484,9.399 C4.609,7.15 3.112,5.052 0.987,3.106 C0.376,2.547 0.334,1.598 0.894,0.987 C1.178,0.677 1.579,0.5 2,0.5 Z"></path>
                <path class="border_3x" d="M9,1 L2,1 C1.72,1 1.452,1.118 1.263,1.325 C0.89,1.732 0.917,2.365 1.325,2.738 C3.504,4.733 5.046,6.893 5.95,9.218 C7.124,12.233 7.807,15.161 8,18 L8,20 L9,20 L9,1 Z M2,0.667 L9,0.667 L9,20 L7.667,20 L7.667,20 L7.668,18.023 C7.477,15.218 6.802,12.324 5.64,9.338 C4.755,7.064 3.243,4.946 1.1,2.983 C0.557,2.486 0.52,1.643 1.017,1.1 C1.269,0.824 1.626,0.667 2,0.667 Z"></path>
                </g>
            </svg>
            </i>
            <div class="lp-logo">
               <a target="_blank" href="${postData.postLink}"><img src="./favicon.svg"></img></a>
            </div>
            <div class="lp-name"><a target="_blank" href="${postData.postLink}">LP-CRM</a></div>
            ${postData.photo ? (`<img class="post-photo" src="${postData.photo}"></img>`) : ''}
            <div class="post-body">
                ${addBr(modifyEmoji(postData.message))}
                ${postInnerLink}
            </div>
            <div class='reactions-wrapper noto-color-emoji-regular '>
               ${
                filteredReactions.map((reactionData, i) => {
                    if(i > 4) return
                    return `
                    <a href="${postData.postLink}" target="_blank" class="reaction-container">
                         <span class="emoticon">${reactionData.emoticon}</span>
                         <span class="text">${reactionData.count}</span>
                    </a>
                 `
                }).join('')
                }
                <div class="info">
                
                    <a target="_blank" href="${postData.postLink}" class="views"><span>👁️</span>${typeof postData.views === 'number' ? postData.views : 0}</a>
                    <a target="_blank" href="${postData.postLink}" class="date">${formatDate(postData.date, true)}</a>
                </div>
            </div>
        `
        
        // container.appendChild(stikcyWrapper)
        elementsPlace[postData.id] = postWrapper
    })
    // console.log(dateData)
    // console.log(queue)
    // console.log(elementsPlace)
    const dates = container.querySelectorAll('.date-container')
    queue.forEach((date, i) => {
        dateData[date].forEach(id => {
            if(!elementsPlace.hasOwnProperty(id)) return
            dates[i].querySelector('.flex-reverse').appendChild(elementsPlace[id])
        })
    })
    // console.log(haveNewMessage)
    // if(haveNewMessage){
    //     const firstNewMess = document.querySelector(`#post-${+lastViewMessage + 1}`)
    //     const message = document.createElement('span')
    //     message.classList.add('new-mess')
    //     message.innerHTML = 'Нові повідомлення'
    //     firstNewMess.parentNode.appendChild(message)
    //     localStorage.setItem('postId', +data[0].id - 1 )
    //     haveNewMessage = false
    // }
}

let isAvailable = true
const resizeObserver = new ResizeObserver(entries => {
        scrollCaret.style.height = `${(window.innerHeight * 0.95) * (window.innerHeight/container.offsetHeight)}px`

        const scrollValue = container.offsetHeight 
        isAvailable = false
        wrapper.scrollTop = scrollValue - currentScrollPosition
        scrollCaret.style.top = `${100 / (container.offsetHeight / wrapper.scrollTop)}%`
        // currentHeight = container.offsetHeight
       setTimeout(() => isAvailable = true, 100)
       
    })
    resizeObserver.observe(container)
    

const firstRenderInterval = setInterval(() => {
    console.log(avaliableRenderIndex)
    if(container.offsetHeight < window.innerHeight && avaliableRenderIndex < data.length) {
        avaliableRenderIndex += 3
        renderPosts()
    } else {
        clearInterval(firstRenderInterval)
    }
},200)

let buttonIsAvaliable = true
downButton.addEventListener('click', () => {
    downButton.classList.add('hide')
    buttonIsAvaliable = false
    wrapper.scrollTo({
        top: container.offsetHeight - window.innerHeight,
        behavior: 'smooth'
    })
    setTimeout(() => {
        buttonIsAvaliable = true
    }, 700)
})

const scrollElement = document.querySelector('.visual-panel')
let hideScrollTimeout = null
const showScrollElement = () => {
    clearTimeout(hideScrollTimeout)
    scrollElement.classList.remove('hide')
    setTimeout(() => {
        scrollElement.classList.add('hide')
    }, 700)
}

wrapper.addEventListener('scroll', (e) => {
    if(!isAvailable) return
    showScrollElement()
    currentScrollPosition = container.offsetHeight - wrapper.scrollTop

    scrollCaret.style.top = `${100 / (container.offsetHeight / (wrapper.scrollTop))}%`
    if(wrapper.scrollTop < 1){
        avaliableRenderIndex + 3 > data.length - 1 ? avaliableRenderIndex = data.length - 1 : avaliableRenderIndex += 3
        renderPosts()
    }
    if( buttonIsAvaliable &&
        container.offsetHeight > window.innerHeight*6 &&
        wrapper.scrollTop < container.offsetHeight - (window.innerHeight*3) &&
        downButton.classList.contains('hide')){
            downButton.classList.remove('hide')
    }  else if(!downButton.classList.contains('hide') && wrapper.scrollTop > container.offsetHeight - (window.innerHeight*3)) {
        downButton.classList.add('hide')
    }
})

