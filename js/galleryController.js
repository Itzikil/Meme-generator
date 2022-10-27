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