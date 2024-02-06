////admin panelindeki sol navbar
import React from 'react'
import styles from "./Navbar.module.scss"
import { useSelector } from 'react-redux'
import { selectUserName } from '../../../redux/slice/authSlice'
import { FaUserCircle } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'

const Navbar = () => {

  const activeLink = ({isActive}) => (isActive ? `${styles.active}`:"")
  const userName = useSelector(selectUserName)

  return (
    <div className={styles.navbar}>
      <div className={styles.user}>
        <FaUserCircle size={40} color='white'/>
        <h4>{userName}</h4>
      </div>
      <nav>
        <ul>
          <li>
            <NavLink to="/admin/home" className={activeLink}>Home</NavLink>
          </li>
          <li>
            <NavLink to="/admin/all-products" className={activeLink}>All Products</NavLink>
          </li>
          <li>
            <NavLink to="/admin/add-product" className={activeLink}>Add Produtc</NavLink>
          </li>
          <li>
            <NavLink to="/admin/orders" className={activeLink}>Orders</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar