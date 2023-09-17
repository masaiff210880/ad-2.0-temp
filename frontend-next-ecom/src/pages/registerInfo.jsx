import React from 'react'
import style from '../styles/registerInfo.module.css'
import Image from 'next/image'
const RegisterInfo = ({topHeader}) => {
    console.log(topHeader)
  return (
    <div className={style.registerInfo_container}>
        <div><Image src={topHeader} alt="topHeader" /></div>
        <div>Smoking<span>adventure</span></div>
        <div>Sign Up and Unlock a Diverse Range of High-Quality Smoking Products and Accessories.</div>
    </div>
  )
}

export default RegisterInfo