'use strict'

var gKeywordSearchCountMap = {'funny': 12,'cat': 16, 'baby': 2}

var gImgs = [
    { id: 1, url: 'img/1.jpg', keywords: [ 'cat'] },
    { id: 2, url: 'img/2.jpg', keywords: ['baby', 'cute'] },
    { id: 3, url: 'img/3.jpg', keywords: ['baby', 'cute'] },
    { id: 4, url: 'img/4.jpg', keywords: ['baby', 'cute'] },
    { id: 5, url: 'img/5.jpg', keywords: ['baby', 'cute'] },
    { id: 6, url: 'img/6.jpg', keywords: ['baby', 'cute'] },
    { id: 7, url: 'img/7.jpg', keywords: ['baby', 'cute'] },
    { id: 8, url: 'img/8.jpg', keywords: ['baby', 'cute'] },
    { id: 9, url: 'img/9.jpg', keywords: ['baby', 'cute'] },
    { id: 10, url: 'img/10.jpg', keywords: ['baby', 'cute'] },
    { id: 11, url: 'img/11.jpg', keywords: ['baby', 'cute'] },
    { id: 12, url: 'img/12.jpg', keywords: ['baby', 'cute'] },
    { id: 13, url: 'img/13.jpg', keywords: ['baby', 'cute'] },
    { id: 14, url: 'img/14.jpg', keywords: ['baby', 'cute'] },
    { id: 15, url: 'img/15.jpg', keywords: ['baby', 'cute'] },
    { id: 16, url: 'img/16.jpg', keywords: ['baby', 'cute'] },
    { id: 17, url: 'img/17.jpg', keywords: ['baby', 'cute'] },
]

var gMeme = {
    selectedImgId: 2,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I sometimes eat Falafel',
            size: 25,
            align: 'center',
            color: 'white',
        },
        {
            txt: 'I always eat Falafel',
            size: 30,
            align: 'left',
            color: 'white',
        }
    ]
}

var currLine = gMeme.lines[gMeme.selectedLineIdx]

function setImg(id){
    let chosenImg = gImgs.find(img => img.id === id)
    let img = new Image()
    img.src = chosenImg.url
    getMeme(img)
}
function getMeme(img){
    renderMeme(gMeme.lines, img)
}

function setLineTxt(text){
    currLine.txt = text
    renderMeme(gMeme.lines)
}

function getImgs(){
    return gImgs
}

function changeColor(color){
    currLine.color = color
    renderMeme(gMeme.lines)
}

function changeFontSize(size){
    currLine.size+= size
    renderMeme(gMeme.lines)
}

function changeLine(){
    gMeme.selectedLineIdx++
    if (gMeme.selectedLineIdx >= gMeme.lines.length) gMeme.selectedLineIdx = 0
    currLine = gMeme.lines[gMeme.selectedLineIdx]
    renderMeme(gMeme.lines)
}

function alignText(align){
    currLine.align = align
    renderMeme(gMeme.lines)
}