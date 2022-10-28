'use strict'

var gTrans = {

    'Gallery' : {
        en : 'Gallery',
        he : 'גלריה',
    },
    'Upload image' : {
        en : 'Upload image',
        he : 'העלה תמונה',
    },
    'My Memes' : {
        en : 'My Memes',
        he : 'המימים שלי',
    },
    'Share' : {
        en : 'Share',
        he : 'שתף ',
    },
    'Download' : {
        en : 'Download',
        he : 'הורד',
    },
    'More' : {
        en : 'More',
        he : 'עוד',
    },
    'Search' : {
        en : 'Search',
        he : 'חפש',
    },
}

let gCurrLang = 'en'


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
    if (!trans) trans = transMap.en
    return trans
}


function setLang(lang) {
    gCurrLang = lang
}

function getTransLang(){
    return gCurrLang
}