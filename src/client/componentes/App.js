import React from 'react'
import styles from'./App.scss'
import cn from 'classnames/bind'
const cx = cn.bind(styles)
const { clipboard, remote } = require('electron')
const mainProcess = remote.require('./main.js')
import Item from './Item'
export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            items: [],
            marcado: -1
        }
        this.ftimer = this.ftimer.bind(this)
        this.keypress = this.keypress.bind(this)
    }
    ftimer(){
        const {items} = this.state
        const item = clipboard.readText()
        if (!item || item == items[0]){
            return
        }
        if (items.includes(item)){
            const p = items.filter(x=>x!=item)
            this.setState({items:[item, ...p]})
        }
        else{
            this.setState({items:[item, ...items]})
        }
    }
    keypress(e){
        const k = e.key
        console.log(k)
        const {marcado, items} = this.state
        let nextMarcado = marcado
        if (k=="ArrowDown"){
            marcado < items.length-1 && (nextMarcado = marcado + 1)
        }
        else if (k=="ArrowUp"){
            marcado >= 0 && (nextMarcado = marcado - 1)
        }
        else if (k=="ArrowLeft"){
            nextMarcado = -1
        }
        this.setState({marcado: nextMarcado})
        console.log(nextMarcado)
    }
    componentDidMount(){
        this.timer = setInterval(this.ftimer, 2000)
        window.addEventListener('keydown', this.keypress)
    }
    componentWillUnmount(){
        clearInterval(this.ftimer)
        window.removeEventListener('keydown', this.keypress)
    }
    select(txt){
        clipboard.writeText(txt)
        mainProcess.hideW()
    }
    render() {
        const {items} = this.state
        return (
        	<div className={cx('app')}>
        		{items.map(item=><Item key={item} value={item} select={this.select}/>)}
        	</div>
        )
    }
}