import { Link,useNavigate } from "react-router-dom";
import '../style/cartStyle.css';
import { supabase } from '../supabaseClient';
import { useState } from "react";

async function buyNow(cartData,loginData,totalPrice,clearCart,navigate){
  
  const ids = cartData.map(item => item.tea_id);
  if(!loginData){
    alert("Sign in to checkout!");
    navigate('/login');
    return;
  }
  try {
    console.log("ids :: ",ids);
    const { data : cartDBdata , error } = await supabase
      .from("tea_product")
      .select(`tea_name: name,
              tea_id: product_id,
              tea_price: price,
              tea_stock: stock_quantity,
              tea_on_sale: is_on_sale,
              tea_sale_price: sale_price
            `)
      .in('product_id',ids);
    if (error) {
      console.error("Supabase connect fail:", error);
      alert("we have a issue during the process.");
      return;
    } else {
      console.log("Supabase connect success, data:", cartDBdata);
    }
    
    for (const cartItem of cartData) {
      const dbItem = cartDBdata.find(p => p.tea_id === cartItem.tea_id);
      
      if (dbItem && dbItem.tea_stock < cartItem.tea_count) {
        alert(`${dbItem.tea_name}is not enough! (remaining quantity: ${dbItem.tea_stock})`);
        return;
      }
    }
    

    // ** table update and insert** 


    // make OrderNum
    let today = new Date();
    console.log(today);
    const year = String(today.getFullYear());
    const month = String(today.getMonth()).padStart(2,'0');
    const day = String(today.getDate()).padStart(2,'0');
    const hours = String(today.getHours()).padStart(2, '0');
    const minutes = String(today.getMinutes()).padStart(2, '0');
    const seconds = String(today.getSeconds()).padStart(2, '0');
    const mill = String(today.getMilliseconds()).padStart(3,'0');
    let orderNum = "OH"+month+day+year+hours+minutes+seconds+mill;
    console.log(orderNum);

    console.log("loginData : ",JSON.stringify(loginData));
    console.log("cartData : ",cartData);

    // insert data into history table
    const { data: orderData, error: orderError } = await supabase
        .from("order_history")
        .insert([
          {
            order_num : orderNum,
            cust_email: loginData.email,
            cust_first_nm : loginData.firstName,
            cust_last_nm : loginData.lastName,
            cart_subtotal: totalPrice,
            cart_list: cartData, 
            status: 'completed'
          }
        ])
        .select();

      if (orderError){
        throw new Error("Order history could not be saved.");
      } else{
        console.log("orderData :: ",orderData);
      }
    
    // update Product (include quantity columm) table
    const updatePromises = cartData.map(item => {
      const dbItem = cartDBdata.find(p => p.tea_id === item.tea_id);
      console.log("dbItem.tea_stock - item.tea_count :: ",dbItem.tea_stock - item.tea_count);
      return supabase
        .from("tea_product")
        .update({ stock_quantity: dbItem.tea_stock - item.tea_count })
        .eq('product_id', item.tea_id);
    });

    const updateResults = await Promise.all(updatePromises);
    const hasUpdateError = updateResults.some(result => result.error);
    
    if (hasUpdateError) throw new Error("An error occurred while updating the inventory.");

    if(orderData){
      const orderId = orderData[0].order_num;
      alert("Your payment has been processed!");
      clearCart();
      navigate('/success',{
        state:{
          orderNumber : orderId
        }
      });

    }
  } catch (err) {
    console.error("purchase process error:", err.message);
    alert(err.message);
  }
};

function CartList({cartData,updateCart,deleteCart}){
  console.log("cartPage data:: " + JSON.stringify(cartData));
  
  return(<>
  { 
    cartData.map((item,index)=>(
        <div className="cartDataList" key={index}>
          <div className="cartImgBox">
            <img className="cartImg" src={`${item.tea_img}`} alt="" />
          </div>
          <div className="cartTextBox">
            <p className="cartName">{item.tea_name}</p>
            <span className="cartPrice">{`$${item.tea_sale_yn == 'Y' ? item.tea_sale_price : item.tea_price}`} <span className="salePrice">{`${item.tea_sale_yn == 'Y' ? '$'+item.tea_price : ''}`}</span></span> 
          </div>
          <div className="cartProductCount">
            <div className="addCartBox">
              <div className="cartCountBox">
                  <button className="countDown" onClick={()=>updateCart(item, -1)}><i class="bi bi-chevron-down"></i></button>
                  <input type="number" name="cartCount" id="cartCount" className="cartCount"  value={item.tea_count} readOnly/>
                  <button className="countUp" onClick={()=>updateCart(item, +1)}><i class="bi bi-chevron-up"></i></button>
              </div>
            </div>
            <button className="cartRemove" onClick={()=>deleteCart(item.tea_id)}><i class="bi bi-trash-fill"></i></button>
          </div>
        </div>
    ))
    
  }
  </>
    
  )
}
function CartPage({cartData,loginData,clearCart,updateCart,deleteCart}){
  let navigate = useNavigate();
  if(!cartData || cartData.length === 0){
    return(
      <div className="mainContainer">
        <div className="cartInner">
          <div className="emptyCartInner">
            <p className="emptyCartText">your cart is empty!</p>
            <Link className="emptyCartBtn" to='/'>Continue shopping</Link>
          </div>
        </div>
      </div>
    )
  } else{
    const totalPrice = cartData.reduce((acc, curVal)=>{
      return acc+=((curVal.tea_sale_yn == 
        'Y' ? curVal.tea_sale_price : curVal.tea_price) * curVal.tea_count);
    },0);
    console.log("totalPrice :: ",totalPrice);
    return(
      <div className="mainContainer">
        <div className="cartInner">
          <div className="innterTop">
            <Link to="/"><i class="bi bi-chevron-left"></i>Continue Shopping</Link>
          </div>
          <div className="otherDataContainer">
            <h3 className="otherTitle">Shopping Bag</h3>
            <div className="cartDataBox">
              <div className="cartConLeft">
                <CartList cartData={cartData} updateCart={updateCart} deleteCart={deleteCart}></CartList>
              </div>
              <div className="cartConRight">
                <h4 className="conRightTitle">Order summary</h4>
                <div className="subtotalBox">
                  <p className="priceTxt">Subtotal</p>
                  <span className="subTotal">{`$${totalPrice}`}</span>
                </div>
                <div className="checkoutBox">
                  <button className="checkoutdBtn" onClick={()=>buyNow(cartData,loginData,totalPrice,clearCart,navigate)}>Proceed to Checkout</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
}

export default CartPage;