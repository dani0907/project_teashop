import { Link, useNavigate} from "react-router-dom";
import { supabase } from '../supabaseClient';
import { useState,useEffect } from "react";
function ProdListBox({productList}){
  return(
    productList.map((item,index)=>(
      <Link key={index} to={`/admin/adminProduct/${item.tea_id}`}>
        <div className="productListBox">
          <div className="productImgBox">
            <img className="productImg" src={item.tea_img} alt="productimg" />
          </div>
          <div className="productTextBox">
            <p className="productCat">Tea/{item.tea_category.tea_cat_nm}</p>
            <div className="productInfo">
              <span className="prodNm">{item.tea_name}</span>
              <span className="prodPrice">price : ${item.tea_price}</span>
              <span className="prodQuantity">quantity : {item.tea_stock}</span>
            </div>
          </div>
        </div>
      </Link>
    ))
    
  )
}
function AdminProductList(){
  const [productList, setProductList] = useState([]);
  useEffect(() => {
      async function productSelect() {
        const { data : productData, error : dbError } = await supabase.from("tea_product")
        .select(`tea_name: name,
                tea_id: product_id,
                tea_description: description,
                tea_price: price,
                tea_img: image_url,
                tea_stock: stock_quantity,
                tea_on_sale: is_on_sale,
                tea_sale_price: sale_price,
                tea_category (
                  tea_cat_nm: tea_cats_nm
                )
              `)
         .order('created_at', { ascending: false });
  
        if (dbError) {
          console.error("Supabase connect fail:", dbError);
        } else {
          console.log("Supabase connect success:", productData);
          setProductList(productData);
        }
      }
  
      productSelect();
    }, []);
  let navigate = useNavigate();
  return(
    <div className="innerContainer productList">
      <h2 className="adminTitle">Product List</h2>
      <div className="productListCon">
        <ProdListBox productList={productList}></ProdListBox>
      </div>
      <div className="newProdBtnBox">
        <button className="newProdBtn" onClick={()=> navigate('/admin/adminProduct')}>Add New Product</button>
      </div>
    </div>
  )
}

export default AdminProductList;