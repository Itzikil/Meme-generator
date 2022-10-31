'use strict'

var gTrans = {

    'Gallery' : {
        EN : 'Gallery',
        HE : 'גלריה',
    },
    'Upload image' : {
        EN : 'Upload image',
        HE : 'העלה תמונה',
    },
    'My Memes' : {
        EN : 'My Memes',
        HE : 'המימים שלי',
    },
    'Share' : {
        EN : 'Share',
        HE : 'שתף ',
    },
    'Download' : {
        EN : 'Download',
        HE : 'הורד',
    },
    'Random' : {
        EN : 'Random',
        HE : 'אקראי',
    },
    'Search' : {
        EN : 'Search',
        HE : 'חפש',
    },
}

let gCurrLang = 'EN'


function doTrans() {
    const els = document.querySelectorAll('[data-trans]')
    els.forEach(el => {
        const transKey = el.dataset.trans
        const trans = getTrans(transKey)
        el.innerText = trans
        if (el.placeholder) el.placeholder = trans
    })
}


function getTrans(transKey) {
    const transMap = gTrans[transKey]
    if (!transMap) return 'UNKNOWN'

    let trans = transMap[gCurrLang]
    if (!trans) trans = transMap.EN
    return trans
}


function setLang(lang) {
    gCurrLang = lang
}

function getTransLang(){
    return gCurrLang
}