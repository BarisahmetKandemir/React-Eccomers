//// her sayfanın altında bulunan footer kısmı
import React from 'react'
import styles from "./Footer.module.scss"

const Footer = () => {

  const date = new Date()
  const year = date.getFullYear()

  return (
    <div className={styles.footer}>
      &copy; {year} All right Revest

    </div>
  )
}

export default Footer