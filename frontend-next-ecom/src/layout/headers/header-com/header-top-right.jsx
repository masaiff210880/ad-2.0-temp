import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLoggedOut } from "@/redux/features/auth/authSlice";
// import flag from '../../../../public/assets/img/header/flag.svg'
import english from '../../../../public/assets/img/header/english.png'
import Image from "next/image";
import style from '../../../styles/header.module.css'
// language
function Language({ active, handleActive }) {
  return (
    <div className="tp-header-top-menu-item tp-header-lang d-flex align-items-center justify-content-space-between">
      <span
        onClick={() => handleActive('lang')}
        className="tp-header-lang-toggle"
        id="tp-header-lang-toggle"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 21 21" fill="none" markerEnd="10px" className={style.trackOrder}>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M8.17632 10.131L10.9673 13.0689C11.2699 13.3875 11.818 13.4329 12.4285 13.1328C13.9822 12.4902 14.4992 12.3336 14.7943 12.6442L18.0026 16.0214C18.3819 16.4206 18.2807 17.0855 17.8566 17.5319C15.6545 19.8499 12.0753 19.8499 9.87318 17.5319L3.87996 11.2233C1.6889 8.91688 1.6889 5.18558 3.87996 2.87921C4.31299 2.42338 4.978 2.31122 5.37153 2.72547L8.57982 6.10261C8.8579 6.39532 8.70879 6.94052 8.10166 8.56497C7.81942 9.19907 7.86465 9.80297 8.17632 10.131Z" fill="white" />
        </svg>
        +1 234 567 0001
      </span>
      <ul className={active === 'lang' ? "tp-lang-list-open" : ""}>
        <li>
          <a href="#">+1 234 567 600</a>
        </li>
        <li>
          <a href="#">+1 586 567 854</a>
        </li>
        <li>
          <a href="#">+1 786 567 010</a>
        </li>
      </ul>
    </div>
  );
}

// currency
function Currency({ active, handleActive }) {
  return (
    <div className="tp-header-top-menu-item tp-header-currency">
      <span
        onClick={() => handleActive('currency')}
        className="tp-header-currency-toggle"
        id="tp-header-currency-toggle"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none" className={style.trackOrder}>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M2.5799 11.7885H11.8199V6.32852C11.8199 5.51267 12.2851 4.80548 12.9648 4.45779C12.7598 4.31334 12.5097 4.22852 12.2399 4.22852H3.8399C3.14402 4.22852 2.5799 4.79264 2.5799 5.48852V11.7885ZM20.2199 13.8885C20.2199 13.5658 20.0985 13.2714 19.899 13.0484C20.0985 12.8255 20.2199 12.5311 20.2199 12.2084V10.9485H17.2799C16.584 10.9485 16.0199 10.3844 16.0199 9.68852V8.00852C16.0199 7.31264 16.584 6.74852 17.2799 6.74852H19.5242L19.5028 6.66134C19.3804 6.16315 18.9681 5.78892 18.4604 5.71514L14.1011 5.08161C14.0411 5.07289 13.9805 5.06852 13.9199 5.06852C13.224 5.06852 12.6599 5.63264 12.6599 6.32852V12.2084C12.6599 12.3557 12.6852 12.4971 12.7316 12.6285H3.8399C3.14402 12.6285 2.5799 13.1926 2.5799 13.8885V14.7285C2.5799 15.4244 3.14402 15.9885 3.8399 15.9885H4.28967C4.49346 14.5638 5.71878 13.4685 7.19989 13.4685C8.68101 13.4685 9.90633 14.5638 10.1101 15.9885H13.5297C13.7335 14.5638 14.9588 13.4685 16.4399 13.4685C17.9006 13.4685 19.1125 14.5338 19.3411 15.9298C19.8506 15.7683 20.2199 15.2915 20.2199 14.7285V13.8885ZM20.1835 9.43126L19.7306 7.58852H17.2799C17.0479 7.58852 16.8599 7.77656 16.8599 8.00852V9.68852C16.8599 9.92048 17.0479 10.1085 17.2799 10.1085H20.2199V9.73196C20.2199 9.63063 20.2077 9.52966 20.1835 9.43126ZM9.29989 16.4085C9.29989 17.5683 8.35969 18.5085 7.19989 18.5085C6.0401 18.5085 5.0999 17.5683 5.0999 16.4085C5.0999 15.2487 6.0401 14.3085 7.19989 14.3085C8.35969 14.3085 9.29989 15.2487 9.29989 16.4085ZM18.5399 16.4085C18.5399 17.5683 17.5997 18.5085 16.4399 18.5085C15.2801 18.5085 14.3399 17.5683 14.3399 16.4085C14.3399 15.2487 15.2801 14.3085 16.4399 14.3085C17.5997 14.3085 18.5399 15.2487 18.5399 16.4085Z" fill="white" />
        </svg>
        Track order
      </span>
      <ul className={active === 'currency' ? "tp-currency-list-open" : ""}>
        <li>
          <a href="#">S01-E00549</a>
        </li>
        <li>
          <a href="#">S01-L00129</a>
        </li>
        <li>
          <a href="#">S01-G00854</a>
        </li>
      </ul>
    </div>
  );
}

// Livechat
function Livechat({ active, handleActive }) {
  return (
    <div className="tp-header-top-menu-item tp-header-currency">
      <span
        onClick={() => handleActive('livechat')}
        className="tp-header-currency-toggle"
        id="tp-header-currency-toggle"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none" className={style.trackOrder}>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M6.18557 13.126C6.54215 13.3036 6.91761 13.4393 7.30579 13.5305C7.30206 13.4437 7.30017 13.3563 7.30017 13.2685C7.30017 9.9548 9.98646 7.26851 13.3002 7.26851C13.3881 7.26851 13.4756 7.2704 13.5626 7.27415C13.023 4.97795 10.9613 3.26851 8.50045 3.26851C5.62857 3.26851 3.30045 5.59663 3.30045 8.46851C3.30045 9.28279 3.48809 10.0708 3.84294 10.7834L3.30998 13.1817C3.24647 13.4675 3.50142 13.7225 3.78722 13.659L6.18557 13.126ZM17.9577 15.5834L18.4906 17.9817C18.5542 18.2675 18.2992 18.5225 18.0134 18.459L15.6151 17.926C14.9024 18.2809 14.1145 18.4685 13.3002 18.4685C10.4283 18.4685 8.10017 16.1404 8.10017 13.2685C8.10017 10.3966 10.4283 8.06851 13.3002 8.06851C16.1721 8.06851 18.5002 10.3966 18.5002 13.2685C18.5002 14.0828 18.3125 14.8708 17.9577 15.5834Z" fill="white" />
        </svg>
        Live Chat
      </span>
      <ul className={active === 'livechat' ? "tp-currency-list-open" : ""}>
        <li>
          <a href="#">Andrew Sent</a>
        </li>
        <li>
          <a href="#">Mesbah Rout</a>
        </li>
        <li>
          <a href="#">Radhika Chawla</a>
        </li>
        {/* <li>
          {!user?.name && <Link href="/login" className="cursor-pointer">Login</Link>}
          {user?.name && <a onClick={handleLogout} className="cursor-pointer">Logout</a>}
        </li> */}
      </ul>
    </div>
  );
}

// USD
function Usd({ active, handleActive }) {
  return (
    <div className="tp-header-top-menu-item tp-header-currency">
      <span
        onClick={() => handleActive('usd')}
        className="tp-header-currency-toggle"
        id="tp-header-currency-toggle"
      >
        <Image src={english} className={style.trackOrder} alt="image" />
        English (US)
      </span>
      <ul className={active === 'usd' ? "tp-currency-list-open" : ""}>
        <li>
          <a href="#">IND</a>
        </li>
        <li>
          <a href="#">CAN</a>
        </li>
        <li>
          <a href="#">EUR</a>
        </li>
        {/* <li>
          {!user?.name && <Link href="/login" className="cursor-pointer">Login</Link>}
          {user?.name && <a onClick={handleLogout} className="cursor-pointer">Logout</a>}
        </li> */}
      </ul>
    </div>
  );
}

// ENGLISH(US)
function English({ active, handleActive }) {
  return (
    <div className="tp-header-top-menu-item tp-header-currency">
      {/* <span
        onClick={() => handleActive('english')}
        className="tp-header-currency-toggle"
        id="tp-header-currency-toggle"
      >
        <Image src={english} className={style.trackOrder}  alt="img-here"/>
        English (US)
      </span>
      <ul className={active === 'english' ? "tp-currency-list-open" : ""}>
        <li>
          <a href="#">English (US)</a>
        </li>
        <li>
          <a href="#">Spanish (EU)</a>
        </li>
        <li>
          <a href="#">Portegies (CAN)</a>
        </li>
        {/* <li>
          {!user?.name && <Link href="/login" className="cursor-pointer">Login</Link>}
          {user?.name && <a onClick={handleLogout} className="cursor-pointer">Logout</a>}
        </li> */}
      {/* </ul>  */}
    </div>
  );
}

// setting
// function ProfileSetting({ active, handleActive }) {
//   const { user } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();
//   const router = useRouter();

//   const handleLogout = () => {
//     dispatch(userLoggedOut());
//     router.push('/')
//   }
//   return (
//     <div className="tp-header-top-menu-item tp-header-setting">
//       <span
//         onClick={() => handleActive('setting')}
//         className="tp-header-setting-toggle"
//         id="tp-header-setting-toggle"
//       >
//         <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none" className={style.trackOrder}>
//           <path fill-rule="evenodd" clip-rule="evenodd" d="M6.18557 13.126C6.54215 13.3036 6.91761 13.4393 7.30579 13.5305C7.30206 13.4437 7.30017 13.3563 7.30017 13.2685C7.30017 9.9548 9.98646 7.26851 13.3002 7.26851C13.3881 7.26851 13.4756 7.2704 13.5626 7.27415C13.023 4.97795 10.9613 3.26851 8.50045 3.26851C5.62857 3.26851 3.30045 5.59663 3.30045 8.46851C3.30045 9.28279 3.48809 10.0708 3.84294 10.7834L3.30998 13.1817C3.24647 13.4675 3.50142 13.7225 3.78722 13.659L6.18557 13.126ZM17.9577 15.5834L18.4906 17.9817C18.5542 18.2675 18.2992 18.5225 18.0134 18.459L15.6151 17.926C14.9024 18.2809 14.1145 18.4685 13.3002 18.4685C10.4283 18.4685 8.10017 16.1404 8.10017 13.2685C8.10017 10.3966 10.4283 8.06851 13.3002 8.06851C16.1721 8.06851 18.5002 10.3966 18.5002 13.2685C18.5002 14.0828 18.3125 14.8708 17.9577 15.5834Z" fill="white" />
//         </svg>
//         Live Chat
//       </span>
//       <ul className={active === 'setting' ? "tp-setting-list-open" : ""}>
//         <li>
//           <Link href="/profile">My Profile</Link>
//         </li>
//         <li>
//           <Link href="/wishlist">Wishlist</Link>
//         </li>
//         <li>
//           <Link href="/cart">Cart</Link>
//         </li>
//         <li>
//           {!user?.name && <Link href="/login" className="cursor-pointer">Login</Link>}
//           {user?.name && <a onClick={handleLogout} className="cursor-pointer">Logout</a>}
//         </li>
//       </ul>

      
//       Second
//       <span
//         onClick={() => handleActive('setting')}
//         className="tp-header-setting-toggle"
//         id="tp-header-setting-toggle"
//       >
//         <Image src={english} className={style.trackOrder} />
//         English (US)
//       </span>
//       <ul className={active === 'setting' ? "tp-setting-list-open" : ""}>
//         <li>
//           <Link href="/profile">My Profile</Link>
//         </li>
//         <li>
//           <Link href="/wishlist">Wishlist</Link>
//         </li>
//         <li>
//           <Link href="/cart">Cart</Link>
//         </li>
//         <li>
//           {!user?.name && <Link href="/login" className="cursor-pointer">Login</Link>}
//           {user?.name && <a onClick={handleLogout} className="cursor-pointer">Logout</a>}
//         </li>
//       </ul>
//       third
//       <span
//         onClick={() => handleActive('setting')}
//         className="tp-header-setting-toggle"
//         id="tp-header-setting-toggle"
//       >
//        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none" className={style.trackOrder}>
//           <path fill-rule="evenodd" clip-rule="evenodd" d="M0.5 8.86852C0.5 13.5077 4.26081 17.2685 8.9 17.2685C13.5392 17.2685 17.3 13.5077 17.3 8.86852C17.3 4.22933 13.5392 0.468521 8.9 0.468521C4.26081 0.468521 0.5 4.22933 0.5 8.86852ZM7.31673 5.26852H8.5V4.06852C8.5 3.84761 8.67909 3.66852 8.9 3.66852C9.12091 3.66852 9.3 3.84761 9.3 4.06852V5.26852H11.3C11.5209 5.26852 11.7 5.44761 11.7 5.66852C11.7 5.88944 11.5209 6.06852 11.3 6.06852H7.31673C7.09581 6.06852 6.91673 6.24761 6.91673 6.46852V8.06929C6.91673 8.2902 7.09581 8.46929 7.31673 8.46929H10.5C11.1627 8.46929 11.7 9.00655 11.7 9.66929V11.2701C11.7 11.9328 11.1627 12.4701 10.5 12.4701H9.3V13.6685C9.3 13.8894 9.12091 14.0685 8.9 14.0685C8.67909 14.0685 8.5 13.8894 8.5 13.6685V12.4701H6.5C6.27909 12.4701 6.1 12.291 6.1 12.0701C6.1 11.8491 6.27909 11.6701 6.5 11.6701H8.86468C8.87632 11.669 8.8881 11.6685 8.9 11.6685C8.9119 11.6685 8.92368 11.669 8.93532 11.6701H10.5C10.7209 11.6701 10.9 11.491 10.9 11.2701V9.66929C10.9 9.44838 10.7209 9.26929 10.5 9.26929H7.31673C6.65399 9.26929 6.11673 8.73203 6.11673 8.06929V6.46852C6.11673 5.80578 6.65399 5.26852 7.31673 5.26852Z" fill="white" />
//         </svg>
//         USD
//       </span>
//       <ul className={active === 'setting' ? "tp-setting-list-open" : ""}>
//         <li>
//           <Link href="/profile">My Profile</Link>
//         </li>
//         <li>
//           <Link href="/wishlist">Wishlist</Link>
//         </li>
//         <li>
//           <Link href="/cart">Cart</Link>
//         </li>
//         <li>
//           {!user?.name && <Link href="/login" className="cursor-pointer">Login</Link>}
//           {user?.name && <a onClick={handleLogout} className="cursor-pointer">Logout</a>}
//         </li>
//       </ul>
//     </div>
//   );
// }

const HeaderTopRight = () => {
  const [active, setIsActive] = useState('');
  // handle active
  const handleActive = (type) => {
    if (type === active) {
      setIsActive('')
    }
    else {
      setIsActive(type)
    }
  }
  return (
    <div className="tp-header-top-menu d-flex align-items-center justify-content-end">
      <Language active={active} handleActive={handleActive} />
      <Currency active={active} handleActive={handleActive} />
      <Livechat active={active} handleActive={handleActive} />
      <Usd active={active} handleActive={handleActive} />
      <English active={active} handleActive={handleActive} />
      {/* <ProfileSetting active={active} handleActive={handleActive} /> */}
    </div>
  );
};

export default HeaderTopRight;
