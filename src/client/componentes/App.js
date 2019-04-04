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
            items: [/*"dfsdfd", "fjdlkjsf", "fasdf dfas", "sdlifasdfj", "dsfasdf df"*/],
            marcado: -1
        }
        this.ftimer = this.ftimer.bind(this)
        this.keypress = this.keypress.bind(this)
        this.borrar = this.borrar.bind(this)
    }
    ftimer(){
        const {items} = this.state
        const item = clipboard.readText()
        if (!item || item == items[0]){
            return
        }
        if (items.includes(item)){
            const p = items.filter(x=>x!=item)
            this.setState({marcado: -1, items:[item, ...p]}, ()=>this.ajusteScroll())
        }
        else{
            this.setState({marcado: -1, items:[item, ...items]},()=>this.ajusteScroll())
        }
    }
    ajusteScroll(){
        const height = this.el.firstElementChild.offsetHeight
        const heightW = this.el.offsetHeight
        if (height < heightW){
            return
        }
        const sizeItem = height/this.state.items.length
        const ns = sizeItem*(this.state.marcado+1)
        if (ns > (heightW - 20)){
            this.el.scrollTop = ns - heightW + 20
        }
        else{
            this.el.scrollTop = 0
        }
    }
    keypress(e){
        const k = e.key
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
        else if (k=="Enter" && marcado >=0){
            this.select(items[marcado])
            return
        }
        this.setState({marcado: nextMarcado}, ()=>this.ajusteScroll())
        //this.ajusteScroll()
        //console.log(nextMarcado)
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
    borrar(item){
        const {items} = this.state
        const p = items.filter(x=>x!=item)
        this.setState({marcado: -1, items:p}, ()=>this.ajusteScroll())
    }
    render() {
        const {items, marcado} = this.state
        return (
        	<div ref={el=>this.el=el} className={cx('app')}>
                <div>
                    {items.map((item, index)=><Item key={item} borrar={this.borrar} value={item} marcado={index==marcado} select={this.select}/>)}
                </div>
        	</div>
        )
    }
}