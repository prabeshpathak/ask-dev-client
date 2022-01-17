import React,{useContext} from 'react'
import cn from 'classnames'

import ModalContext from '../../store/modal'
import styles from './modal.module.scss'

const Modal = ({children, className, ...props})=>{
    const {ref,setIsVis} = useContext(ModalContext)
    return (
        <>
        
        </>
    )
}