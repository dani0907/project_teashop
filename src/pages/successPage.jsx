import { useLocation,Link } from "react-router-dom";

function SuccessPage(){
  const location = useLocation();
  const orderNumber = location.state?.orderNumber;
  return(
    <div className="mainContainer">
      <div className="successInner">
        <h4 className="successTitle">Your payment has been processed!</h4>
        <p className="successOrderNumber">your order number is <span>{orderNumber}</span></p>
        <Link className="emptyCartBtn" to='/'>Continue shopping</Link>
      </div>
    </div>
  )
}

export default SuccessPage;