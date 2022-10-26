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

function renderMeme(lines, img) {
    if (img) {
        onGallery(false)
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        currImg = img
    } else gCtx.drawImage(currImg, 0, 0, gElCanvas.width, gElCanvas.height)
    
    
    let align 
    let height = 50
    lines.forEach(line => {
        let text = line.txt
        gCtx.font = line.size + 'px Arial'
        gCtx.fillStyle = line.color //both?
        gCtx.strokeStyle = line.color //both?

        if(line.align === 'left') align = 10
        else if(line.align === 'center') align = gElCanvas.width / 2
        else align = gElCanvas.width - 10
        
        gCtx.fillText(text, align, height) //both?
        gCtx.strokeText(text, align, height) //both?
        height+= 400
    })
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

function onChangeColor(color) {
    changeColor(color)
}

function onChangeFontSize(size) {
    changeFontSize(size)
}

function onChangeLine() {
    changeLine()
}

function onAlignText(align){
    alignText(align)
}

function downloadMeme(elLink) {
    console.log(elLink);
    const imgContent = gElCanvas.toDataURL()
    elLink.href = imgContent
}