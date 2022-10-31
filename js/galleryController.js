'use strict'

function renderGallery(imgs){
    if (!imgs || !imgs.length) imgs = getImgs()
    let strHTML = imgs.map(img =>`
    <img onclick="onImgSelect(${img.id})" class="gallery-imgs" src="${img.url}">
    `)

    document.querySelector('.imgs-container').innerHTML = strHTML.join('')
}

function onImgSelect(id){
    setImg(id)
}

function toggleMenu(x) {
    x.classList.toggle("change");
    document.querySelector('.nav').classList.toggle('open-menu')
}

function clicked(item) {
    var divs = document.querySelectorAll('.btn')
    divs.forEach(div => { div.classList.remove('active') })
    item.classList.add('active')
}

// img doesnt upload because CORB
function renderMyMeme(){
    let imgs = getMyMemes()
    let strHTML = imgs.map(img =>`
    <img onclick="onImgSelect(${img.id})" class="gallery-imgs" src="${img.url}">
    `)
    document.querySelector('.memes-container').innerHTML = strHTML.join('')
}

function onSaveMeme(){
    const imgDataUrl = gElCanvas.toDataURL()
}

function onRandom(){
    randomMeme()
}

//////// i-18 ///////////////

function renderLang(){
    const queryStringParams = new URLSearchParams(window.location.search)
    const lang = queryStringParams.get('lang') || ''
    if (!lang) return
    onSetLang(lang)
}

function onSetLang(lang){
    setLang(lang)
    doTrans()
    setDirection(lang)
    document.querySelector('.defaul-option').innerText = '🌍' + lang 

    const queryStringParams = `?lang=${lang}`
    const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + queryStringParams
    window.history.pushState({ path: newUrl }, '', newUrl)
}

function setDirection(lang) {
    if (lang === 'HE') document.body.classList.add('rtl')
    else document.body.classList.remove('rtl')
}
