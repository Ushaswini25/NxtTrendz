// Write your code here
import {Component} from 'react'
import Popup from 'reactjs-popup'
import CartContext from '../../context/CartContext'
import './index.css'

class CartSummary extends Component {
  state = {paymentMethod: '', orderPlaced: false}

  handlePaymentChange = event => {
    this.setState({paymentMethod: event.target.value})
  }

  triggerSuccessMessage = () => {
    this.setState({orderPlaced: true})
  }

  resetPopupState = closeFormCallback => {
    this.setState({paymentMethod: '', orderPlaced: false})
    closeFormCallback()
  }

  render() {
    const {paymentMethod, orderPlaced} = this.state
    const isConfirmDisabled = paymentMethod !== 'COD'

    return (
      <CartContext.Consumer>
        {value => {
          const {cartList} = value
          let total = 0
          cartList.forEach(eachCartItem => {
            total += eachCartItem.price * eachCartItem.quantity
          })

          const totalItemsCount = cartList.length

          return (
            <div className="cart-summary-container">
              <h1 className="order-total-value">
                <span className="order-total-label">Order Total:</span> Rs{' '}
                {total}
                /-
              </h1>
              <p className="total-items">{cartList.length} Items in cart</p>

              <Popup
                trigger={
                  <button type="button" className="checkout-button">
                    Checkout
                  </button>
                }
                modal
                nested
                closeOnDocumentClick
              >
                {close => (
                  <div className="modal-overlay-container">
                    <div className="modal-content-card">
                      <button
                        type="button"
                        className="modal-close-btn"
                        onClick={() => this.resetPopupState(close)}
                      >
                        &times;
                      </button>
                      {orderPlaced /* Success Notification Layout view layer*/ ? (
                        <div className="success-message-container">
                          <p className="success-text">
                            Your order has been placed successfully
                          </p>
                          <button
                            type="button"
                            className="close-success-btn"
                            onClick={() => this.resetPopupState(close)}
                          >
                            Close
                          </button>
                        </div>
                      ) : (
                        /*standard user checkout interaction selectors form setup */
                        <>
                          <h1 className="model-heading">
                            Select Payment Method
                          </h1>
                          <form className="payment-options-form">
                            <label className="payment-option disabled-option">
                              <input
                                type="radio"
                                name="payment"
                                value="CARD"
                                disabled
                              />
                              <span>Card (Unavailable)</span>
                            </label>

                            <label className="payment-option disabled-option">
                              <input
                                type="radio"
                                name="payment"
                                value="NET_BANKING"
                                disabled
                              />
                              <span>Net Banking (Unavailable)</span>
                            </label>

                            <label className="payment-option disabled-option">
                              <input
                                type="radio"
                                name="payment"
                                value="UI"
                                disabled
                              />
                              <span>UPI (Unavailable)</span>
                            </label>

                            <label className="payment-option disabled-option">
                              <input
                                type="radio"
                                name="payment"
                                value="WALLET"
                                disabled
                              />
                              <span>Wallet (Unavailable)</span>
                            </label>

                            <label className="payment-option active-option">
                              <input
                                type="radio"
                                name="payment"
                                value="COD"
                                checked={paymentMethod === 'COD'}
                                onChange={this.handlePaymentChange}
                              />
                              <span>Cash on Delivery</span>
                            </label>
                          </form>
                          {/* Dynamic summary item count rows calculations*/}
                          <div className="popup-order-summary">
                            <h1 className="summary-title">Summary Details</h1>
                            <div className="summary-row">
                              <span>Total Items:</span>
                              <span className="summary-data">
                                {totalItemsCount}
                              </span>
                            </div>
                            <div className="summary-row summary-total-row">
                              <span>Total Amount:</span>
                              <span className="summary-data">Rs {total}</span>
                            </div>
                          </div>

                          <button
                            type="button"
                            className="confirm-order-button"
                            disabled={isConfirmDisabled}
                            onClick={this.triggerSuccessMessage}
                          >
                            Confirm Order
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </Popup>
            </div>
          )
        }}
      </CartContext.Consumer>
    )
  }
}
export default CartSummary
