'use strict'

function renderGallery(imgs){
    if (!imgs || !imgs.length) imgs = getImgs()
    let strHTML = imgs.map(img =>`
    <img onclick="onIMmgSelect(${img.id})" class="gallery-imgs" src="${img.url}">
    `)

    document.querySelector('.imgs-container').innerHTML = strHTML.join('')
}

function onIMmgSelect(id){
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

renderMyMeme()// img doesnt upload because CORB
function renderMyMeme(){
    let imgs = getMyMemes()
    let strHTML = imgs.map(img =>`
    <img onclick="onIMmgSelect(${img.id})" class="gallery-imgs" src="${img.url}">
    `)
    document.querySelector('.memes-container').innerHTML = strHTML.join('')
}

function onSaveMeme(){
    const imgDataUrl = gElCanvas.toDataURL()
}