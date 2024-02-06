//// tüm linklerin olduğu başlık kısmı
import React, { useEffect, useState } from 'react'
import styles from "./Header.module.scss"
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { FaShoppingCart, FaTimes, FaUserCircle } from "react-icons/fa";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/config"
import { toast } from "react-toastify"
import { useDispatch } from 'react-redux';
import { SET_ACTIVE_USER, REMOVE_ACTİVE_USER } from '../../redux/slice/authSlice';
import { ShowOnLogin, ShowOnLogout } from '../hiddenLink/hiddenLink';
import { AdminOnlyLink } from '../adminOnlyRoute/AdminOnlyRoute';

const Header = () => {

  const [showMenu, setShowMenu] = useState(false)

  const [displayName, setDisplayName] = useState("")

  const navigate = useNavigate();

  const dispatch = useDispatch()

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        let displayNameValue = user.displayName;

        if (displayNameValue === null) {
          const u1 = user.email.slice(0, user.email.lastIndexOf("@"));

          // Parantez hatasını düzelt
          const uName = u1.charAt(0).toUpperCase() + u1.slice(1);

          displayNameValue = uName;
        }

        setDisplayName(displayNameValue);

        // await veya .then() kullanarak dispatch işleminin tamamlanmasını bekleyin
        await dispatch(SET_ACTIVE_USER({
          email: user.email,
          userName: displayNameValue,
          userId: user.uid
        }));
      } else {
        setDisplayName("");
        dispatch(REMOVE_ACTİVE_USER())
      }
    });
  }, [dispatch]);

  const toggleMenu = () => {
    setShowMenu(!showMenu)
  }
  const hideMenu = () => {
    setShowMenu(false)
  }

  const logoutUser = () => {
    signOut(auth).then(() => {
      toast.success("Logout successful...")
      navigate("/")
    }).catch((error) => {
      toast.error(error.message)
    });
  }


  const logo = (
    <div className={styles.logo}>
      <Link to="/">
        <h2>e<span>Shop</span></h2>
      </Link>
    </div>
  )

  const cart = (
    <span className={styles.cart}>
      <Link to="cart">
        Cart
        <FaShoppingCart size={20} />
        <p>0</p>
      </Link>
    </span>
  )

  const activeLink = ({ isActive }) => (isActive ? `${styles.active}` : "")

  return (
    <header>
      <div className={styles.header}>
        {logo}
        <nav className={showMenu ? `${styles["show-nav"]}` : `${styles["hide-nav"]}`}>
          <div className={showMenu ? `${styles["nav-wrapper"]} ${styles["show-nav-wrapper"]}` : `${styles["nav-wrapper"]}`} onClick={hideMenu}>
          </div>


          <ul onClick={hideMenu}>
            <li className={styles["logo-mobile"]}>
              {logo}
              <FaTimes size={22} color="#fff" onClick={hideMenu} />
            </li>
            <AdminOnlyLink>
              <Link to="/admin/home">
              <li>
                <button className='--btn --btn-primary'>Admin</button>
              </li>
              </Link>
            </AdminOnlyLink>
            <li>
              <NavLink to="/" className={activeLink}>Home</NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={activeLink}>Contact us</NavLink>
            </li>
          </ul>
          <div className={styles["header-right"]} onClick={hideMenu}>
            <span className={styles.links}>
              <ShowOnLogout>
                <NavLink to="/login" className={activeLink}>Login</NavLink>
              </ShowOnLogout>
              <ShowOnLogin>
                <a href="#home" style={{ color: "#ff7722" }}>
                  <FaUserCircle size={16} />&nbsp;
                  Hi,{displayName}
                </a>
                <NavLink to="/order-history" className={activeLink}>My orders</NavLink>
                <NavLink to="/" onClick={logoutUser}>Logout</NavLink>
              </ShowOnLogin>
            </span>
            {cart}
          </div>
        </nav>
        <div className={styles["menu-icon"]}>
          {cart}
          <HiOutlineMenuAlt3 size={30} onClick={toggleMenu} />
        </div>
      </div>
    </header>
  )
}

export default Header