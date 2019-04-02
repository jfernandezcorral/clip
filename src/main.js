const electronLocalshorcut = require('electron-localshortcut')
const {app, BrowserWindow, globalShortcut, Menu, Tray} = require ('electron')
const path = require('path')
let tray = null
let mainW = null;
const menu = Menu.buildFromTemplate([
    {label: 'Salir', click(){app.quit()}}
])
const view = onCursor =>{
    if (mainW.isVisible()){
        mainW.hide()
        return
    }
    mainW.show()//Todo, colocar adecuadamente
    console.log("view:", onCursor)
}
app.on('ready', ()=>{
    mainW = new BrowserWindow({
        show: false, frame: false, transparent: true, /*backgroundColor: '#ccf0f0f0',*/ resizable: false,
        skipTaskbar: true, width: 350, height: 350, center: true
    })
    mainW.setMenu(null)
    mainW.loadFile('./build/index.html')
    mainW.on('closed',()=>{
        mainW = null
        globalShortcut.unregisterAll()
        electronLocalshorcut.unregister('CommandOrControl+K')
        app.quit()
    })
    electronLocalshorcut.register( mainW, 'CommandOrControl+K', ()=>{
        mainW.webContents.toggleDevTools()
    })
    globalShortcut.register('CommandOrControl+A', ()=>{
        view(true)
    })
    tray = new Tray(path.join(__dirname, 'engine.ico'))
    if (process.platform === 'win32'){
        tray.on('click', ()=>{view()})
    }
    tray.setToolTip('portapapeles')
    tray.setContextMenu(menu)
})