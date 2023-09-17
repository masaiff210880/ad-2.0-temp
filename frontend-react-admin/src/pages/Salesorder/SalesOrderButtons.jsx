import React from 'react'
import style from '../../styles/sales/SalesOrderButtons.module.css'
// icons
import releaseIcon from '../../assets/SalesOrderIcons/ReleaseIcon.svg'
import refreshIcon from '../../assets/SalesOrderIcons/refreshIcon.svg'
import verifyIcon from '../../assets/SalesOrderIcons/verifyIcon.svg'
import pickIcon from '../../assets/SalesOrderIcons/PickIcon.svg'
import fillIcon from '../../assets/SalesOrderIcons/fillIcon.svg'
import labelIcon from '../../assets/SalesOrderIcons/LabelIcon.svg'
import historyIcon from '../../assets/SalesOrderIcons/historyIcon.svg'

const SalesOrderButtons = () => {
  return (

    
    <div>
         <div className="d-flex me-2 px-2">
           <button className={` me-2 mr-3 ${style.salesbutton1}`}><img src ={releaseIcon}  className={style.icontextgap}/>Release</button>
           <button  className={` me-2 ${style.salesbutton2}`}><img src ={refreshIcon}  className={style.icontextgap}/>Refresh</button>
           <button  className={` me-2 ${style.salesbutton3}`}><img src ={verifyIcon} className={style.icontextgap}/>Verify</button>
            <button  className={` me-2 ${style.salesbutton4}`}><img src ={pickIcon} className={style.icontextgap}/>Pick</button>
            <button  className={` me-2 ${style.salesbutton5}`}><img src ={fillIcon} className={style.icontextgap}/>Fill</button>
            <button  className={` me-2 ${style.salesbutton6}`}><img src ={labelIcon} className={style.icontextgap}/>Label</button>
            <button  className={` me-2 ${style.salesbutton7}`}><img src ={historyIcon} className={style.icontextgap}/>History</button>

          </div>
    </div>
    
  )
}

export default SalesOrderButtons






