//// alışveriş sepeti (cart) sayfası
import React, { useEffect } from 'react'
import styles from "./Cart.module.scss"
import { useDispatch, useSelector } from 'react-redux'
import { ADD_TO_CART, CALCULATE_SUBTOTAL, CALCULATE_TOTAL_QUANTITY, CLEARE_CART, DECREASE_CART, REMOVE_FROM_CART, SAVE_URL, selectCartItems, selectCartTotalAmount, selectCartTotalQuantity } from '../../redux/slice/cartSlice'
import { Link, useNavigate } from 'react-router-dom'
import { FaTrashAlt } from 'react-icons/fa'
import Card from '../../components/card/Card'
import { selectIsLoggedIn } from '../../redux/slice/authSlice'

const Cart = () => {

  const cartItems = useSelector(selectCartItems)
  const cartTotalAmount = useSelector(selectCartTotalAmount)
  const cartTotalQuantity = useSelector(selectCartTotalQuantity)
  const dispatch = useDispatch()
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const navigate = useNavigate()
  const url = window.location.href

  const increaseCart = (cartItem) => {
    dispatch(ADD_TO_CART(cartItem))
  }
  const decraeseCart = (cartItem) => {
    dispatch(DECREASE_CART(cartItem))
  }
  const removeFromCart = (cartItem) => {
    dispatch(REMOVE_FROM_CART(cartItem))
  }
  const cleareCart = () => {
    dispatch(CLEARE_CART())
  }
  useEffect(()=>{
    dispatch(CALCULATE_SUBTOTAL())
    dispatch(CALCULATE_TOTAL_QUANTITY())
  },[dispatch,cartItems])

  useEffect(()=>{
    dispatch(SAVE_URL(url));
  },[dispatch,url])

  const checkOut = () => {
    if(isLoggedIn){
      navigate('/checkout-details')
    }
    else{
      navigate('/login')
    }
  }

  return (
    <section className={`container ${styles.table}`}>
      <div>
        <h2>Shopping Cart</h2>
        {cartItems.length === 0 ? (
          <>
            <p>Your Cart İs Currently Empy.</p>
            <br />
            <div>
              <Link to="/#products">&larr;Continue Shopping</Link>
            </div>
          </>
        ) : (
          <>
            <table>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quatity</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((cartItem, index) => {
                  const { id, name, price, imageURL, cartQuantity } = cartItem
                  return (
                    <tr key={id}>
                      <td>{index + 1}</td>
                      <td>
                        <p>
                          <b>{name}</b>
                        </p>
                        <img src={imageURL} alt={name} style={{ width: "100px" }} />
                      </td>
                      <td>{price}</td>
                      <td>
                        <div className={styles.count}>
                          <button className='--btn' onClick={()=>decraeseCart(cartItem)}>-</button>
                          <p>
                            <b>{cartQuantity}</b>
                          </p>
                          <button className='--btn' onClick={()=>increaseCart(cartItem)}>+</button>
                        </div>
                      </td>
                      <td>{(price * cartQuantity).toFixed(2)}</td>
                      <td className={styles.icons}>
                        <FaTrashAlt size={19} color='red' onClick={()=>removeFromCart(cartItem)}/>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>

            <div className={styles.summary}>
              <button className="--btn --btn-danger" onClick={cleareCart}>Cleare Cart</button>
              <div className={styles.checkout}>
                <div>
                  <Link to="/#products">&larr; Continue Shopping</Link>
                </div>
                <br/>
                <Card cardClass={styles.card}>
                  <p>
                    <b>{`Cart item(s) ${cartTotalQuantity}`}</b>
                  </p>
                  <div className={styles.text}>
                    <h4>Subtotal:</h4>
                    <h3>{`$${cartTotalAmount.toFixed(2)}`}</h3>
                  </div>
                  <p>Tax and shipping calculated at checkout</p>
                  <button className="--btn --btn-primary --btn-block" onClick={checkOut}>Check Out</button>
                </Card>
              </div>
            </div>
          </>
        )}

      </div>
    </section>
  )
}

export default Cart