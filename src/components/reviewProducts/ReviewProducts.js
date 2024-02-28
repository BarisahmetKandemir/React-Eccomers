//// my orders sayfasından orderlardan birini tıklayıp review product kısmına girdiğimizde çıkan review (yorumlama) componentidir.
import React, { useEffect, useState } from 'react'
import styles from "./ReviewProducts.module.scss"
import spinnerImg from "../../assets/spinner.gif"
import StarsRating from 'react-star-rate';
import { useNavigate, useParams } from 'react-router-dom';
import useFetchDocument from '../../customHooks/useFetchDocument';
import { useSelector } from 'react-redux';
import { selectUserId, selectUserName } from '../../redux/slice/authSlice';
import Card from '../card/Card';
import { Timestamp, addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { toast } from 'react-toastify';

const ReviewProducts = () => {
  const [rate, setRate] = useState(0)
  const [review, setReview] = useState("")
  const [product, setProduct] = useState(null)
  const { id } = useParams()
  const document = useFetchDocument("products", id)
  const userID = useSelector(selectUserId)
  const userName = useSelector(selectUserName)

  const navigate = useNavigate()

  useEffect(() => {
    setProduct(document)
  }, [document])

  const submitReview = (e) => {
    e.preventDefault()
    // console.log(rate, review)
    const today = new Date()
    const date = today.toDateString()
    const reviewConfig = {
      userID,
      userName,
      productID: id,
      rate,
      review,
      reviewDate: date,
      createAt: Timestamp.now().toDate()
    }
    try{
      addDoc(collection(db,"reviews"),reviewConfig)
      toast.success("Review submitted successfuyl")
      setReview("")
    }
    catch(error){
      toast.error(error.message)
    }
  }

  return (
    <section>
      <div className={`container ${styles.review}`}>
        <h2>Review Products</h2>
        {product === null ? (
          <img src={spinnerImg} alt='Loading...' style={{ width: "50px" }} />
        ) : (
          <>
            <p><b>Product name:</b>{product.name}</p>
            <img src={product.imageURL} alt={product.name} style={{ width: "100px" }} />
          </>
        )}
        <Card cardClass={styles.card}>
          <form onSubmit={(e) => submitReview(e)}>
            <label>Rating:</label>
            <StarsRating value={rate} onChange={(rate) => setRate(rate)} />
            <label>Review</label>
            <textarea value={review} onChange={(e) => setReview(e.target.value)} required cols='50' rols='10'></textarea>
            <div>
              <button className='--btn --btn-secondary' onClick={() => navigate(-1)}>&larr; Back to Order details</button>
              <button type='submit' className='--btn --btn-primary'>Submit Review</button>
            </div>
          </form>
        </Card>
      </div>
    </section>
  )
}

export default ReviewProducts