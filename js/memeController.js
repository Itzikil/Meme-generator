'use strict'

let gElCanvas
let gCtx
let currImg

function onInit(){
    renderCanvas()
    onRenderSearchList()
    onRenderTags()
}



function renderCanvas() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
}

function renderMeme(lines, img) {
    if (img) {
        onGallery(false)
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        currImg = img
    } else gCtx.drawImage(currImg, 0, 0, gElCanvas.width, gElCanvas.height)
    
    let align 
    let height = 50
    lines.forEach((line,idx) => {
        let text = line.txt
        gCtx.font = line.size + 'px '+ line.font
        gCtx.fillStyle = line.color 
        gCtx.strokeStyle = 'black' 
        
        if(line.align === 'left') align = 10
        else if(line.align === 'center') align = gElCanvas.width / 2
        else align = gElCanvas.width - 10
        
        if(idx === 1) height = 450
        if(idx > 1) height = gElCanvas.height / 2
        
        gCtx.strokeRect(align - 10, height - line.size - 10, 300, line.size + 25 )
        gCtx.fillText(text, align, height) 
        gCtx.strokeText(text, align, height) 
    })
}

function onSetLineTxt(text) {
    setLineTxt(text)
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

function onRenderSearchList(){
    let tags = renderSearchList()
    let search = document.querySelector('#search')
    let strHTML = ''
    for (const tag in tags) {
        strHTML += `<option value=${tag} label="${tags[tag]} searches"></option>`
    }
    search.innerHTML = strHTML
}

function onRenderTags(){
    let tags = renderSearchList()
    let tagsDisplay = document.querySelector('.tags-display')
    for (const tag in tags) {
        tagsDisplay.innerHTML += `<p class="${tag}">${tag}</p>  &nbsp`
        document.querySelector(`.${tag}`).style.fontSize = tags[tag] * 1.5 + 'px' 
    }
}

function onSearch(ev){
    ev.preventDefault()
    let tag = document.querySelector('.search').value
    let tags = renderSearchList()
    if (tags[tag] < 31){
        document.querySelector(`.${tag}`).style.fontSize = tags[tag]* 1.5 +'px'
    }
    searchTag(tag)
}


/////////////// text features/////////

function onChangeLine() {
    changeLine()
}

function onAddLine(){
    addLine()
}

function onRemoveLine(){
    removeLine()
}

function onChangeColor(color) {
    changeColor(color)
}

function onChangeFontSize(size) {
    changeFontSize(size)
}



function onAlignText(align){
    alignText(align)
}

function onChangeFont(font){
    changeFont(font)
}

function downloadMeme(elLink) {
    console.log(elLink);
    const imgContent = gElCanvas.toDataURL()
    elLink.href = imgContent
}

function onImgInput(ev) {
    loadImageFromInput(ev, renderImg)
}

function loadImageFromInput(ev, onImageReady) {
    const reader = new FileReader()
    reader.onload = function (event) {
        let img = new Image()
        img.src = event.target.result
        img.onload = () => onImageReady(img)
    }
    reader.readAsDataURL(ev.target.files[0])
}

function renderImg(img) {
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
}

function uploadImg(share) {
    const imgDataUrl = gElCanvas.toDataURL()

    function onSuccess(uploadedImgUrl) {
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        var url = `https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}`
        if (share) {
            window.open(url)
        } else {
            alert(`Your Draw: ${uploadedImgUrl}`)
        }
    }
    doUploadImg(imgDataUrl, onSuccess)
}