//// home daki ürünleri sergilerken yada admin panelindeki tüm ürünleri gösterirken kullandığımız pagination burada oluşturulur.
import React, { useState } from 'react'
import styles from "./Pagination.module.scss"
import { current } from '@reduxjs/toolkit'

const Pagination = ({currentPage,setCurrentPage,productsPerPage,totalProducts}) => {

  const pageNumbers = []
  const totalPages = Math.ceil(totalProducts/productsPerPage)
  const pageNumberLimit = 9
  const [maxPageNumberLimit,setMaxPageNumberLimit] = useState(5)
  const [minPageNumberLimit,setMinPageNumberLimit] = useState(0)

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const paginateNext = () => {
    if(currentPage === maxPageNumberLimit){
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit)
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit)
    }
    setCurrentPage(currentPage + 1)
  }
  const paginatePrev = () => {
    if((currentPage - 1) === minPageNumberLimit){
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit)
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit)
    }
    setCurrentPage(currentPage - 1)
  }

  for(let i = 1 ; i <= totalPages ; i++){
    pageNumbers.push(i)
  }

  return (
    <ul className={styles.pagination}>
      <li onClick={paginatePrev} className={currentPage === pageNumbers[0] ? `${styles.hidden}` : null }>Prev
      </li>
      {pageNumbers.map((number)=>{
        if(number<maxPageNumberLimit + 1 && number > minPageNumberLimit){
          return(
            <li key={number} onClick={()=> paginate(number)} className={currentPage === number ? `${styles.active}` : null}>
              {number}
            </li>
          )
        }
        return null;
      })}
      <li onClick={paginateNext} className={currentPage === pageNumbers[pageNumbers.length - 1] ? `${styles.hidden}` : null}>Next</li>

      <p>
        <b className={styles.page}>{`page ${currentPage}`}</b>
        <span>{` of `}</span>
        <b>{`${totalPages}`}</b>
      </p>
    </ul>
  )
}

export default Pagination