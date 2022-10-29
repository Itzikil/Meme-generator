'use strict'

var gElCanvas
let gCtx
var gCurrImg

function onInit() {
    renderCanvas()
    onRenderSearchList()
    onRenderTags()
    renderGallery()
    renderLang()
    renderStickers()
    renderMyMeme()
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

function renderMeme(lines, img) {
    if (img) {
        onSwitchGallery(2)
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        gCurrImg = img
    } else gCtx.drawImage(gCurrImg, 0, 0, gElCanvas.width, gElCanvas.height)

    let memeIdx = getMeme().selectedLineIdx
    let align

    lines.forEach((line, idx) => {
        
        if (line.align === 'left') align = 10
        else if (line.align === 'center') align = gElCanvas.width / 2
        else align = gElCanvas.width - 10

        if (line.url) {
            return addSticker(line.id ,align)
        }

        let text = line.txt
        gCtx.font = line.size + 'px ' + line.font
        gCtx.fillStyle = line.color
        gCtx.strokeStyle = line.sColor
        console.log(text);
        
        if (idx === memeIdx) gCtx.strokeRect(align - 10, line.height - line.size - 10, (line.size * text.length / 2)  + 10, line.size + 25)
        gCtx.fillText(text, align, line.height)
        gCtx.strokeText(text, align, line.height)
    })
}

function renderStickers(){
    let stickers = getStickers()  
    let strHTML = stickers.map(sticker =>`
    <img onclick="onStickerSelect(${sticker.id})" class="gallery-imgs" src="${sticker.url}">
    `)
    document.querySelector('.smile-emoji').innerHTML = strHTML.join('')
}

function renderSticker(sticker, size , align){
    gCtx.drawImage(sticker, align, size.height , size.size, size.size)
}

function onSetLineTxt(text) {
    setLineTxt(text)
}

function onSwitchGallery(gallery) {
    if (!gallery) return
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
        strHTML += `<option value=${tag} label="${tags[tag]} searches">${tag}</option>`
    }
    search.innerHTML = strHTML
}

function onRenderTags() {
    let tags = getSearchList()
    let tagsDisplay = document.querySelector('.tags-display')
    for (const tag in tags) {
        tagsDisplay.innerHTML += `<p onclick="onSearch(event, '${tag}')" class="${tag} word-search">${tag}</p>  &nbsp`
        document.querySelector(`.${tag}`).style.fontSize = tags[tag] * 0.06 + 'em'
    }
}

function onSearch(ev, tag) {
    ev.preventDefault()
    if(!tag) var tag = document.querySelector('.search').value
    let tags = getSearchList()
    if (tags[tag] < 35) {
        document.querySelector(`.${tag}`).style.fontSize = tags[tag] * 0.06 + 'em'
    }
    searchTag(tag)
}

// function onCanvasClick(){

// }

/////////////// meme features /////////

function onChangeFontSize(size) {
    changeFontSize(size)
}

function onMoveLineUp() {
    moveLineUp()
}

function onMoveLineDown() {
    moveLineDown()
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

function onStickerSelect(id){
    addSticker(id , false)
}

function onImgInput(ev) {
    console.log('hi')
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
    const imgDataUrl = gElCanvas.toDataURL("image/jpeg")

    function onSuccess(uploadedImgUrl) {
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        var url = `https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}`
        if (share) {
            window.open(url)
        } else {
            console.log(uploadedImgUrl);
            return savememe(uploadedImgUrl)
        }
    }
    shareImg(imgDataUrl, onSuccess)
}

// const shareData = {
//     title: 'MDN',
//     text: 'Learn web development on MDN!',
//     url: 'https://developer.mozilla.org'
//   }
  
//   const btn = document.querySelector('.sharee');
//   const resultPara = document.querySelector('.result');
  
//   // Share must be triggered by "user activation"
//   btn.addEventListener('click', async () => {
//     try {
//       await navigator.share(shareData);
//       resultPara.textContent = 'MDN shared successfully';
//     } catch (err) {
//       resultPara.textContent = `Error: ${err}`;
//     }
//   });