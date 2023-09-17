import React from 'react'
import style from '../login-register/Smoking.module.css'
import text from '../../../public/assets/img/login/text.png'
import Image from 'next/image'

const Smoking = () => {
  return (
    <div className={style.paragraph}>
      <Image src={text} alt="" className={style.textimg} />
    {/* <p className={style.text1}>Embrace Your </p> */}
    <p className={style.text2}>Smoking </p>
        <p className={style.text3}>Journey! </p>
    <p className={style.text4}>Log in and Explore an Array of Premium Smoking Products and Accessories.</p>
    </div>
  )
}

export default Smoking