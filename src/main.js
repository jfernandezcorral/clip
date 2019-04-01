const {app, BrowserWindow, globalShortcut, Menu, Tray} = require ('electron')
const path = require('path')
let tray = null
app.on('ready', ()=>{
    /*globalShortcut.register('CommandOrControl+K', ()=>{
        mainW.webContents.toggleDevTools()
    })*/
    tray = new Tray(path.join(__dirname, 'icon.png'))
    if (process.platform === 'win32'){
        tray.on('click', tray.popUpContextMenu)
    }
    const menu = Menu.buildFromTemplate([
        {label: 'Salir', click(){app.quit()}}
    ])
    tray.setToolTip('portapapeles')
    tray.setContextMenu(menu)
})