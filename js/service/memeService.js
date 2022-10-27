'use strict'

var gKeywordSearchCountMap = {'funny': 16, 'animal': 8, 'men': 12,'woman': 14, 'comics': 9, 'smile': 11 }

var gImgs = [
    { id: 1, url: 'img/1.jpg', keywords: ['funny'] },
    { id: 2, url: 'img/2.jpg', keywords: ['animal', 'cute'] },
    { id: 3, url: 'img/3.jpg', keywords: ['animal', 'cute'] },
    { id: 4, url: 'img/4.jpg', keywords: ['baby', 'cute'] },
    { id: 5, url: 'img/5.jpg', keywords: ['baby', 'cute'] },
    { id: 6, url: 'img/6.jpg', keywords: ['funny', 'cute'] },
    { id: 7, url: 'img/7.jpg', keywords: ['baby', 'cute'] },
    { id: 8, url: 'img/8.jpg', keywords: ['funny', 'cute'] },
    { id: 9, url: 'img/9.jpg', keywords: ['baby', 'funny'] },
    { id: 10, url: 'img/10.jpg', keywords: ['funny', 'cute'] },
    { id: 11, url: 'img/11.jpg', keywords: ['baby', 'cute'] },
    { id: 12, url: 'img/12.jpg', keywords: ['funny', 'cute'] },
    { id: 13, url: 'img/13.jpg', keywords: ['funny', 'cute'] },
    { id: 14, url: 'img/14.jpg', keywords: ['baby', 'cute'] },
    { id: 15, url: 'img/15.jpg', keywords: ['baby', 'cute'] },
    { id: 16, url: 'img/16.jpg', keywords: ['funny', 'cute'] },
    { id: 17, url: 'img/17.jpg', keywords: ['baby', 'cute'] },
    { id: 17, url: 'img/18.jpg', keywords: ['funny', 'cute'] },
]

var gMeme = {
    selectedImgId: 2,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I sometimes eat Falafel',
            size: 22,
            align: 'center',
            color: 'white',
            font: 'Impact',
        },
        {
            txt: 'I always eat Falafel',
            size: 30,
            align: 'left',
            color: 'white',
            font: 'Impact',
        }
    ]
}

var currLine = gMeme.lines[gMeme.selectedLineIdx]

function renderSearchList(){
    return gKeywordSearchCountMap
}

function searchTag(tagName){
    let imgs = gImgs.filter(tag => tag.keywords.includes(tagName))
    gKeywordSearchCountMap[tagName]++
    console.log(gKeywordSearchCountMap);
    renderGallery(imgs)
}

function setImg(id) {
    let chosenImg = gImgs.find(img => img.id === id)
    let img = new Image()
    img.src = chosenImg.url
    getMeme(img)
}
function getMeme(img) {
    renderMeme(gMeme.lines, img)
}

function setLineTxt(text) {
    currLine.txt = text
    renderMeme(gMeme.lines)
}

function getImgs(imgs) {
    return gImgs
}

function changeColor(color) {
    currLine.color = color
    renderMeme(gMeme.lines)
}

function changeFontSize(size) {
    currLine.size += size
    renderMeme(gMeme.lines)
}

function changeLine() {
    gMeme.selectedLineIdx++
    if (gMeme.selectedLineIdx >= gMeme.lines.length) gMeme.selectedLineIdx = 0
    currLine = gMeme.lines[gMeme.selectedLineIdx]
    renderMeme(gMeme.lines)
}

function addLine(){
    gMeme.lines.push(
        {
            txt: 'Add Text',
            size: 30,
            align: 'center',
            color: 'white',
            font: 'Impact',
        }
    )
    changeLine()
    renderMeme(gMeme.lines)
}

function removeLine(){
    gMeme.lines.splice(gMeme.selectedLineIdx,1)
    renderMeme(gMeme.lines)
}

function alignText(align) {
    currLine.align = align
    renderMeme(gMeme.lines)
}

function changeFont(font) {
    currLine.font = font
    renderMeme(gMeme.lines)
}

function doUploadImg(imgDataUrl, onSuccess) {
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