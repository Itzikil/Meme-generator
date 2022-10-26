'use strict'
renderGallery()

function renderGallery(){
    let imgs = getImgs()
    let strHTML = imgs.map(img =>`
    <img onclick="onIMmgSelect(${img.id})" class="gallery-imgs" src="${img.url}">
    `)

    document.querySelector('.imgs-container').innerHTML = strHTML.join('')
}

function onIMmgSelect(id){
    setImg(id)
}