const electronLocalshorcut = require('electron-localshortcut')
const {app, BrowserWindow, globalShortcut, Menu, Tray} = require ('electron')
const electron = require('electron')
const path = require('path')
const WIDTH = 350
const HEIGHT = 350
const MARGIN = 2
let tray = null
let mainW = null;
const menu = Menu.buildFromTemplate([
    {label: 'Salir', click(){app.quit()}}
])
const view = ()=>{
    if (mainW.isVisible()){
        mainW.hide()
        return
    }
    posicionar()
    mainW.show()
}
const blur = ()=>{
    mainW.hide()
}
app.on('ready', ()=>{
    mainW = new BrowserWindow({
        show: false, frame: false, transparent: true, /*backgroundColor: '#ccf0f0f0',*/ resizable: false,
        skipTaskbar: true, width: WIDTH, height: HEIGHT, center: true
    })
    mainW.setMenu(null)
    mainW.loadFile('./build/index.html')
    mainW.on('blur', blur)
    mainW.on('closed',()=>{
        mainW.off('blur', blur)
        globalShortcut.unregisterAll()
        electronLocalshorcut.unregister('CommandOrControl+K')
        app.quit()
        mainW = null
    })
    electronLocalshorcut.register( mainW, 'CommandOrControl+K', ()=>{
        mainW.webContents.toggleDevTools()
    })
    globalShortcut.register('CommandOrControl+A', ()=>{
        view()
    })
    tray = new Tray(path.join(__dirname, 'engine.ico'))
    if (process.platform === 'win32'){
        tray.on('click', ()=>{view()})
    }
    tray.setToolTip('portapapeles')
    tray.setContextMenu(menu)
})
const posicionar = ()=>{
    const screen = electron.screen
    const cursorPosition = screen.getCursorScreenPoint()
    const wa = screen.getDisplayNearestPoint({x: cursorPosition.x, y: cursorPosition.x}).workArea
    const bottom = cursorPosition.y >= (wa.height/2 + wa.y)
    const right = cursorPosition.x >= (wa.width/2 + wa.x)
    const bounds = {x: cursorPosition.x - (right? WIDTH: 0), y: cursorPosition.y - (bottom? HEIGHT: 0)}
    if (cursorPosition.y > (wa.height + wa.y)){
        bounds.y = wa.height + wa.y - MARGIN - HEIGHT
    }
    mainW.setPosition(bounds.x, bounds.y)
}