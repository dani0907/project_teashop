import { useState, useEffect } from "react";
import { useParams,Link } from "react-router-dom";
import { supabase } from '../supabaseClient';

import '../style/detailStyle.css'

function ProductDetail({products, addCart}){
  let cartContain = {};
  let [inputCart,setInputCart] = useState(1);
  const { id } = useParams();
  const [mainProduct, setMainProduct] = useState([]);
  console.log(id);

  useEffect(() => {
    const getProduct = async () => {
      const { data, error } = await supabase
        .from('tea_product')
        .select(`tea_name: name,
              tea_id: product_id,
              tea_description: description,
              tea_price: price,
              tea_img: image_url,
              tea_stock: stock_quantity,
              tea_on_sale: is_on_sale,
              tea_sale_price: sale_price,
              tea_category : tea_category (
                tea_cat_nm: tea_cats_nm
              )
            `)
        .eq('product_id', id)
        .single();
      
      if(error){
        console.log("product Detail error::", error);
      }
      else {
        console.log("product Detail :: select single data :: ", data);
        setMainProduct(data);
      };
    };

    getProduct();
    
  }, [id]);
  // const product = mainProduct.find(item => item.tea_id == id);
  console.log("produt Detail mainProduct ::",mainProduct);
  if(mainProduct){
    // console.log("productDetail product :: "+ JSON.stringify(product));
    cartContain = {
      tea_name : mainProduct.tea_name,
      tea_id : mainProduct.tea_id,
      tea_price : mainProduct.tea_price,
      tea_img : mainProduct.tea_img,
      tea_count : Number(inputCart),
      tea_sale_yn : mainProduct.tea_on_sale,
      tea_sale_price : mainProduct.tea_sale_price
    };
  }
  
  function changeCount(upDown){
    if(upDown == "up"){
      setInputCart(inputCart+1);
    } else{
      if(inputCart > 0){
        setInputCart(inputCart-1);
      }
    }
    console.log("changeCount :: " + inputCart)
  }

  return(
    <div className="mainContainer">
      {
            // cartData.map((item,index)=>(
            //   <div key={index}>{`${item.tea_name} : ${item.tea_count}`}</div>
            // ))
          }
      <div className="innterTop">
        <Link to="/"><i class="bi bi-chevron-left"></i>Continue Shopping</Link>
      </div>
      <div className="detailInner">
        <div className="detailCon">
          <div className="detailImgBox">
            <div className="imgInner">
              <img className="detailImg" src={mainProduct.tea_img} alt="" />
            </div>
          </div>
          <div className="detailTextBox">
            <div className="detailInfo">
              <p>{`Tea/${mainProduct.tea_category?.tea_cat_nm}`}</p>
            </div>
            <h3 className="detailNm">{mainProduct.tea_name}</h3>
            <span className="detailPrice">{`$${mainProduct.tea_on_sale == 'Y' ? mainProduct.tea_sale_price : mainProduct.tea_price}`} <span className="detailSale">{`${mainProduct.tea_on_sale == 'Y' ? '$'+mainProduct.tea_price : ''}`}</span></span>
            <p className="detailDesc">{mainProduct.tea_description}</p>
            <div className="cartCountBox">
              <button className="countDown" onClick={()=>changeCount("down")}><i class="bi bi-chevron-down"></i></button>
              <input type="number" name="cartCount" id="cartCount" className="cartCount"defaultValue={1} value={inputCart} />
              <button className="countUp" onClick={()=>changeCount("up")}><i class="bi bi-chevron-up"></i></button>
            </div>
            <div className="detailBtnBox">
              <button className="addCartBtn" onClick={()=>addCart(cartContain,'add')}>Add Cart <i class="bi bi-bag-fill"></i></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail;