'use strict'

const locationsKey = 'imgs'

var gKeywordSearchCountMap = { 'funny': 16, 'animal': 9, 'men': 12, 'woman': 14, 'comics': 10, 'smile': 11 }

var gRandomTxt = [
    'I love falafel',
    'when you love someone',
    'never eat and',
    'lol',
    'eat crab',
    'cant talk',
    'do you?',
    'never think twice',
    'when you sleep',
    'cow',
    'computer',
]

var gStickers = [
    { id: 111, url: 'stickers/01.png', height: 250, align: 'left', size: 100 },
    { id: 222, url: 'stickers/02.png', height: 250, align: 'left', size: 100 },
    { id: 333, url: 'stickers/03.png', height: 250, align: 'left', size: 100 },
    { id: 444, url: 'stickers/04.png', height: 250, align: 'left', size: 100 },
    { id: 555, url: 'stickers/05.png', height: 250, align: 'left', size: 100 },
]

var gImgs = [
    { id: 1, url: 'img/1.jpg', keywords: ['funny', 'men'] },
    { id: 2, url: 'img/2.jpg', keywords: ['animal', 'cute'] },
    { id: 3, url: 'img/3.jpg', keywords: ['animal', 'cute'] },
    { id: 4, url: 'img/4.jpg', keywords: ['baby', 'cute'] },
    { id: 5, url: 'img/5.jpg', keywords: ['baby', 'cute'] },
    { id: 6, url: 'img/6.jpg', keywords: ['funny', 'cute'] },
    { id: 7, url: 'img/7.jpg', keywords: ['baby', 'cute'] },
    { id: 8, url: 'img/8.jpg', keywords: ['funny', 'men'] },
    { id: 9, url: 'img/9.jpg', keywords: ['baby', 'smile'] },
    { id: 10, url: 'img/10.jpg', keywords: ['funny', 'smile'] },
    { id: 11, url: 'img/11.jpg', keywords: ['baby', 'cute'] },
    { id: 12, url: 'img/12.jpg', keywords: ['funny', 'cute'] },
    { id: 13, url: 'img/13.jpg', keywords: ['funny', 'cute'] },
    { id: 14, url: 'img/14.jpg', keywords: ['baby', 'cute'] },
    { id: 15, url: 'img/15.jpg', keywords: ['baby', 'cute'] },
    { id: 16, url: 'img/16.jpg', keywords: ['funny', 'smile'] },
    { id: 17, url: 'img/17.jpg', keywords: ['baby', 'woman'] },
    { id: 18, url: 'img/18.jpg', keywords: ['funny', 'comics'] },
]

var gMyMemes = [
    { id: 1, url: 'img/1.jpg', keywords: ['funny'] },
    { id: 2, url: 'img/2.jpg', keywords: ['animal', 'cute'] },
]

var gMeme = {
    selectedImgId: 2, //?
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I sometimes eat Falafel',
            size: 22,
            align: 'center',
            color: 'white',
            sColor: 'black',
            font: 'Impact',
            height: 50,
        },
        {
            txt: 'I always eat Falafel',
            size: 30,
            align: 'center',
            color: 'white',
            sColor: 'black',
            font: 'Impact',
            height: 420,
        }
    ]
}

var gCurrLine = gMeme.lines[gMeme.selectedLineIdx]

function getSearchList() {
    return gKeywordSearchCountMap
}

function getImgs() {
    return gImgs
}

function getMeme() {
    return gMeme
}

function getMyMemes() {
    let memes = loadFromStorage(locationsKey) // CORB making problems
    if (!memes || !memes.length) memes = gMyMemes
    return memes
}

function getStickers() {
    return gStickers
}

function searchTag(tagName) {
    let imgs = gImgs.filter(tag => tag.keywords.includes(tagName))
    gKeywordSearchCountMap[tagName]++
    renderGallery(imgs)
}

function setImg(id , lines) {
    if (!lines) lines = gMeme.lines
    let chosenImg = gImgs.find(img => img.id === id)
    let img = new Image()
    img.src = chosenImg.url
    renderMeme(gMeme.lines, img)
}

function randomMeme() {
    var img = gImgs[getRandomInt(gImgs.length)]
    var lines = [...gMeme.lines]//?
    lines.map(line => {
        line.txt = gRandomTxt[getRandomInt(gRandomTxt.length)]
        line.size = getRandomInt(50)
        line.color = getRandomColor()
        line.sColor = getRandomColor()
    })
    lines.splice(0,getRandomInt(2))//?
    setImg(img.id , lines)
}

///////// meme features //////

function setLineTxt(text) {
    gCurrLine.txt = text
    renderMeme(gMeme.lines)
}

function moveLineUp() {
    gCurrLine.height -= 5
    renderMeme(gMeme.lines)
}

function moveLineDown() {
    gCurrLine.height += 5
    renderMeme(gMeme.lines)
}

function savememe(url) {
    gMyMemes.push({ id: 1, url })
    saveToMemeStorage()
    renderMyMeme()
}

function changeLine() {
    gMeme.selectedLineIdx++
    if (gMeme.selectedLineIdx >= gMeme.lines.length) gMeme.selectedLineIdx = 0
    gCurrLine = gMeme.lines[gMeme.selectedLineIdx]
    renderMeme(gMeme.lines)
}

function addLine() {
    gMeme.lines.push(
        {
            txt: 'Add Text',
            size: 30,
            align: 'center',
            color: 'white',
            font: 'Impact',
            height: 250,
        }
    )
    gMeme.selectedLineIdx = gMeme.lines.length -1
    gCurrLine = gMeme.lines[gMeme.selectedLineIdx]
    // changeLine()
    renderMeme(gMeme.lines)
}

function removeLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
    renderMeme(gMeme.lines)
}

function changeFontSize(size) {
    gCurrLine.size += size
    renderMeme(gMeme.lines)
}

function alignText(align) {
    gCurrLine.align = align
    renderMeme(gMeme.lines)
}

function changeFont(font) {
    gCurrLine.font = font
    renderMeme(gMeme.lines)
}

function changeColor(color) {
    gCurrLine.color = color
    renderMeme(gMeme.lines)
}

function changeSColor(color) {
    gCurrLine.sColor = color
    renderMeme(gMeme.lines)
}

function addSticker(id, align) {
    let chosenSticker = gStickers.find(sticker => sticker.id === id)
    let sticker = new Image()
    sticker.src = chosenSticker.url
    renderSticker(sticker, chosenSticker, align)
    if (!align) gMeme.lines.push(chosenSticker)
}

function shareImg(imgDataUrl, onSuccess) {
    const formData = new FormData()
    formData.append('img', imgDataUrl)
    const XHR = new XMLHttpRequest()
    XHR.onreadystatechange = () => {
        if (XHR.readyState !== XMLHttpRequest.DONE) return
        if (XHR.status !== 200) return console.error('Error uploading image')
        const { responseText: url } = XHR
        onSuccess(url)
    }
    XHR.onerror = (req, ev) => {
        console.error('Error connecting to server with request:', req, '\nGot response data:', ev)
    }
    XHR.open('POST', '//ca-upload.com/here/upload.php')
    XHR.send(formData)
}

function saveToMemeStorage() {
    saveToStorage(locationsKey, gMyMemes)
}