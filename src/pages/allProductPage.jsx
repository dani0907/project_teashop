import { supabase } from '../supabaseClient';
import { useState, useEffect } from "react";
import { Link ,useNavigate, useSearchParams} from 'react-router-dom';


function ProductBox(props){
  let product = props.product;
  console.log("ProductBox :: "+JSON.stringify(product));
  const displayPrice = product.tea_on_sale === "Y" 
  ? <p className='productPrice'>{`$${product.tea_sale_price}`}<span className='originalPrice'>{`$${product.tea_price}`}</span></p>
  : <p className='productPrice'>{`$${product.tea_price}`}</p>;
  if(!product) return null;
  return(
    <div className='productBox'>
      {/* <a href=''> */}
      <Link to={`/detail/${product.tea_id}`}>
        {product.tea_on_sale == "Y" ? <div className='afterDisc'>{`$${product.tea_sale_price}`}</div> : <></>}
        <img className='productImg' src={product.tea_img} alt="productImg" />
        <h4 className='productNm'>{product.tea_name}</h4>
        <span className='productRt'>★★★★★</span>
        {displayPrice}
      </Link>
    </div>
  )
}
function AllProductPage(){
  const [allProduct, setAllProduct] = useState([]);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search');

  useEffect(() => {
    async function productSelect() {
      let query = supabase.from("tea_product")
        .select(`
          tea_name: name,
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
        `);
      
      if (searchQuery) {
        query = query.ilike('name', `%${searchQuery}%`);
      }
      const { data, error } = await query;
      if (error) {
        console.error("Supabase connect error :", error);
      } else {
        console.log("Supabase connect success :", data);
        setAllProduct(data);
      }
    }

    productSelect();
  }, [searchQuery]);
  return(
    <div className="mainContainer">
      <div className="mainInner">
        <div className="innerContainer product">
          <h2>All Products</h2>
          <div className="innerBox">
            {
              allProduct.map((item,index)=>(
                <ProductBox key={index} product={item}></ProductBox>
              ))
            }
            
          </div>
        </div>

      </div>
    </div>
  )
}

export default AllProductPage;