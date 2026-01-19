
import { supabase } from '../supabaseClient';
import { useState,useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";

function OrderListInner({orderInnerData}){
  return(<>{
    orderInnerData.map((item,index)=>(
      <div className="orderListInner">
        <div className="orderBoxLeft">
          <img className="orderHistImg" src={item.tea_img} alt="" />
        </div>
        <div className="orderBoxRight">
          <p className="orderProduct">{item.tea_name}</p>
          <span className="orderQuant">{item.tea_count}</span>
          <span className="orderPrice">${item.tea_sale_yn == 'Y'?item.tea_sale_price :item.tea_price} <span className='salePrice'>{item.tea_sale_yn == 'Y'? '$'+item.tea_price :null}</span></span>
        </div>
      </div>
    ))
  }
  </>)
}
function OrderListBox({orderData}){
  // const [orderInnerData,setOrderInnerData] = useState(orderData.cart_list);
  return(<>{
    orderData.map((item,index)=>(
      <div className="orderListBox" key={index}>
        <div className="orderStateBox">
          <div className="stateBoxLeft">
            <span className="orderState">{item.order_num}</span>
            <span className="orderDate">{item.order_date}</span>
          </div>
          <div className="stateBoxRight">
            <div className="totalPrice">{`Total : $${item.cart_subtotal}`}</div>
          </div>
        </div>
        <OrderListInner orderInnerData={item.cart_list}></OrderListInner>
      </div>
    ))
  }
  </>)
}

function OrderHistPage({loginData}){
  const [orderData, setOrderData] = useState([]);
  const navigate = useNavigate();
  console.log('login email : ',loginData.email );
  if(!loginData.email || loginData.email == null){
    navigate('/login');
  }
  useEffect(()=>{
    async function selectOrderHist(){
      const { data:orderData, error:orderError } = await supabase.from("order_history")
        .select(`order_num,
                order_date: created_at,
                cart_subtotal,
                cart_list
              `)
        .eq('cust_email',loginData.email)
        .order('created_at', { ascending: false });
  
      if (orderError) {
        console.error("Supabase connect error :", orderError);
      } else {
        console.log("Supabase connect success :", orderData);
        setOrderData(orderData);
      }
    }

    selectOrderHist();
    
  },[])
  return(
    <div className="mainContainer">
      <div className="histInner">
        <div className="innterTop">
          <Link to="/"><i class="bi bi-chevron-left"></i>Continue Shopping</Link>
        </div>
        <div className="orderHistInner otherDataContainer">
          <h3 className="otherTitle">Order history</h3>
          <div className="innerBox">
            <OrderListBox orderData={orderData}></OrderListBox>
          </div>
        </div>

      </div>
    </div>
  )
}

export default OrderHistPage;