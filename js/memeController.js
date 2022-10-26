'use strict'

let gElCanvas
let gCtx
let currImg

renderCanvas()

function renderCanvas() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
}

function onSetLineTxt(text) {
    setLineTxt(text)
}

function renderMeme(line, img) {
    if (img) {
        onGallery(false)
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        currImg = img
    }else gCtx.drawImage(currImg, 0, 0, gElCanvas.width, gElCanvas.height)

    let text = line.txt
    gCtx.font = line.size + 'px Arial'
    gCtx.fillStyle = line.color //both?
    gCtx.strokeStyle = line.color //both?

    gCtx.fillText(text, 10,50) //both?
    gCtx.strokeText(text, 10, 50) //both?
}

function onGallery(gallery) {
    if (!gallery) {
        document.querySelector('.meme-editor').classList.remove('hide')
        document.querySelector('.gallery').classList.add('hide')
    } else {
        document.querySelector('.meme-editor').classList.add('hide')
        document.querySelector('.gallery').classList.remove('hide')
    }
}

function onChangeColor(color){
    changeColor(color)
}

function onChangeFontSize(size){
    changeFontSize(size)
}

function onChangeLine(){
    changeLine()
}