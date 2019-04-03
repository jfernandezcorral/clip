import React from 'react'
import styles from'./App.scss'
import cn from 'classnames/bind'
const cx = cn.bind(styles)
const { clipboard } = require('electron')
export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.ftimer = this.ftimer.bind(this)
    }
    ftimer(){
        console.log(clipboard.readText())
    }
    componentWillMount(){
        this.timer = setInterval(this.ftimer, 2000)
    }
    componentWillUnmount(){
        clearInterval(this.ftimer)
    }
    render() {
        return (
        	<div className={cx('app')}>
        		hola
        	</div>
        )
    }
}