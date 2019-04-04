import React from 'react'
import styles from'./Item.scss'
import cn from 'classnames/bind'
const cx = cn.bind(styles)
const Item = ({value, select, marcado, borrar})=>{
    const sel = ()=>select(value)
    const del = (e)=>{
        e.stopPropagation()
        borrar(value)
    }
    return(<div className={cx('item',{marcado})} onClick={sel}>
        {value}
        <div className={cx('delete')} onClick={del}></div>
    </div>)
}
export default Item