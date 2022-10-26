'use strict'

var gImgs = [
    { id: 1, url: 'img/01.jpg', keywords: [ 'cat'] },
    { id: 2, url: 'img/02.jpg', keywords: ['baby', 'cute'] }
]

var gMeme = {
    selectedImgId: 2,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I sometimes eat Falafel',
            size: 30,
            align: 'left',
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
function setImg(id){
    let chosenImg = gImgs.find(img => img.id === id)
    let img = new Image()
    img.src = chosenImg.url
    getMeme(img)
}
function getMeme(img){
    let line = gMeme.lines[gMeme.selectedLineIdx]
    renderMeme(line, img)
}

function setLineTxt(text){
    let line = gMeme.lines[gMeme.selectedLineIdx]
    line.txt = text
    renderMeme(line)
}

function getImgs(){
    return gImgs
}

function changeColor(color){
    let line = gMeme.lines[gMeme.selectedLineIdx]   
    line.color = color
    renderMeme(line)
}

function changeFontSize(size){
    let line = gMeme.lines[gMeme.selectedLineIdx]  
    line.size+= size
    renderMeme(line)
}

function changeLine(){
    gMeme.selectedLineIdx++
    if (gMeme.selectedLineIdx >= gMeme.lines.length) gMeme.selectedLineIdx = 0
    let line = gMeme.lines[gMeme.selectedLineIdx]  
    renderMeme(line)
}