import React from 'react'
import styles from'./Item.scss'
import cn from 'classnames/bind'
const cx = cn.bind(styles)
const Item = ({value, select, marcado})=>{
    const sel = ()=>select(value)
    return(<div className={cx('item',{marcado})} onClick={sel}>{value}</div>)
}
export default Item