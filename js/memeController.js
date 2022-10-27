'use strict'

var gElCanvas
let gCtx
var gCurrImg

function onInit() {
    renderCanvas()
    onRenderSearchList()
    onRenderTags()
    renderGallery()
}


window.addEventListener('resize', resizeCanvas)
function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
    renderMeme(getMeme().lines)
}

function renderCanvas() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
}
var currHeight
function renderMeme(lines, img ,move) {
    if (img) {
        onSwitchGallery(2)
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        gCurrImg = img
    } else gCtx.drawImage(gCurrImg, 0, 0, gElCanvas.width, gElCanvas.height)

    let memeIdx = getMeme().selectedLineIdx
    let align
    var height 
    lines.forEach((line, idx) => {
        let text = line.txt
        gCtx.font = line.size + 'px ' + line.font
        gCtx.fillStyle = line.color
        gCtx.strokeStyle = line.sColor

        if (line.align === 'left') align = 10
        else if (line.align === 'center') align = gElCanvas.width / 2
        else align = gElCanvas.width - 10

        if(move && idx === memeIdx) {    
            if(move === 'up') currHeight -= 5
            if(move === 'down') currHeight += 5
            gCtx.fillText(text, align, currHeight)
            gCtx.strokeText(text, align, currHeight)
            return
        }

        if (idx === 0) height = 50
        if (idx === 1) height = gElCanvas.height * 0.85
        if (idx > 1) height = gElCanvas.height / 2
        
        if (idx === memeIdx) gCtx.strokeRect(align - 10, height - line.size - 10, 300, line.size + 25), currHeight =  height
        gCtx.fillText(text, align, height)
        gCtx.strokeText(text, align, height)
       
    })
}

function onSetLineTxt(text) {
    setLineTxt(text)
}

function onSwitchGallery(gallery) {
    if (!gallery) return
    console.log(gallery);

    if (gallery === 1) {
        document.querySelector('.meme-editor').classList.add('hide')
        document.querySelector('.my-meme').classList.add('hide')
        document.querySelector('.gallery').classList.remove('hide')
    }
    if (gallery === 2) {
        document.querySelector('.meme-editor').classList.remove('hide')
        document.querySelector('.my-meme').classList.add('hide')
        document.querySelector('.gallery').classList.add('hide')
    } if (gallery === 3) {
        document.querySelector('.meme-editor').classList.add('hide')
        document.querySelector('.gallery').classList.add('hide')
        document.querySelector('.my-meme').classList.remove('hide')
    }
    return gallery
}

function onRenderSearchList() {
    let tags = getSearchList()
    let search = document.querySelector('#search')
    let strHTML = ''
    for (const tag in tags) {
        strHTML += `<option value=${tag} label="${tags[tag]} searches"></option>`
    }
    search.innerHTML = strHTML
}

function onRenderTags() {
    let tags = getSearchList()
    let tagsDisplay = document.querySelector('.tags-display')
    for (const tag in tags) {
        tagsDisplay.innerHTML += `<p onclick="searchTag('${tag}')" class="${tag} word-search">${tag}</p>  &nbsp`
        document.querySelector(`.${tag}`).style.fontSize = tags[tag] * 0.06 + 'em'
    }
}

function onSearch(ev) {
    ev.preventDefault()
    let tag = document.querySelector('.search').value
    let tags = getSearchList()
    if (tags[tag] < 35) {
        document.querySelector(`.${tag}`).style.fontSize = tags[tag] * 0.06 + 'em'
    }
    searchTag(tag)
}

/////////////// meme features /////////

function onChangeFontSize(size) {
    changeFontSize(size)
}

function onMoveLineUp() {
    renderMeme(getMeme().lines,null,'up')
}

function onMoveLineDown() {
    renderMeme(getMeme().lines,null,'down')
}

function onChangeLine() {
    changeLine()
}

function onAddLine() {
    addLine()
}

function onRemoveLine() {
    removeLine()
}

function onAlignText(align) {
    alignText(align)
}

function onChangeFont(font) {
    changeFont(font)
}

function onChangeColor(color) {
    changeColor(color)
}

function onChangeSColor(color) {
    changeSColor(color)
}

function downloadMeme(elLink) {
    console.log(elLink);
    const imgContent = gElCanvas.toDataURL()
    elLink.href = imgContent
}

function onImgInput(ev) {
    loadImageFromInput(ev, renderImg)
}

function renderImg(img) {
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
}

function loadImageFromInput(ev, onImageReady) {
    const reader = new FileReader()
    reader.onload = function (event) {
        var img = new Image()
        img.src = event.target.result
        img.onload = () => onImageReady(img)
        renderMeme(getMeme().lines, img)
    }
    reader.readAsDataURL(ev.target.files[0])
}

function onShareImg(share) {
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
    shareImg(imgDataUrl, onSuccess)
}