import React from 'react'
import styles from'./Item.scss'
import cn from 'classnames/bind'
const cx = cn.bind(styles)
const Item = ({value, select})=>{
    const sel = ()=>select(value)
    return(<div className={cx('item')} onClick={sel}>{value}</div>)
}
export default Item