import { useState, useEffect} from "react";
import { supabase } from '../supabaseClient';
import { useNavigate,useParams } from "react-router-dom";


function ProdCatList({prodCat,product,handleChange}){
  
  return(
    <select name="category" onChange={handleChange} className="prodCatList" value={product.category}required>
      <option value="">Select the option</option>
      {
          prodCat.map((item,index)=>(
            <option key={index} value={item.tea_cats_id}>{item.tea_cats_nm}</option>
          ))
        
      }
    </select>
  )
}
function AdminProduct(){
  const navigate = useNavigate();
  let editMode = 'N';
  const [prevImg,setPrevImg] = useState('');
  const {id} = useParams();
  const [product, setProduct] = useState({
    name: '',
    price: 0,
    category: '',
    description: '',
    onSale: 'N',
    salePrice : '',
    quantity: '',
    productId: ''
  });
  const [imgPreview, setImgPreview] = useState(null);
  const [imgFile, setImgFile] = useState(null);


  if(id || id != null){
    editMode='Y';
  }

  // get tea category data from tea_category table
  const [prodCat,setProdCat] = useState([]);
  useEffect(() => {
    async function categorySelect() {
      const { data, error } = await supabase.from("tea_category")
      .select('*')
      .eq('use_yn','Y')
      .order('created_at', { ascending: false });

      if (error) {
        console.error("Supabase connect fail:", error);
      } else {
        console.log("Supabase connect success:", data);
        setProdCat(data);
      }
    }
    async function productSelect(){
      const{data:productData, error:productError} = await supabase.from("tea_product")
      .select(`tea_name: name,
              tea_id: product_id,
              tea_description: description,
              tea_price: price,
              tea_img: image_url,
              tea_stock: stock_quantity,
              tea_on_sale: is_on_sale,
              tea_sale_price: sale_price,
              tea_category: category,
              tea_img_nm : img_nm
            `)
        .eq('product_id', id)
        .single();
        
        if(productError){
          console.error("Supabase connect fail:", productError);
        } else { 
          console.log("Supabase connect success:", productData);
          const pdData = {
            name: productData.tea_name,
            price: productData.tea_price,
            category: productData.tea_category,
            description: productData.tea_description,
            onSale: productData.tea_on_sale,
            salePrice : productData.tea_sale_price,
            quantity: productData.tea_stock,
            productId: productData.tea_id
          };
          setProduct(pdData);
          setImgPreview(productData.tea_img);
          setPrevImg(productData.tea_img_nm);
        }
    }
    if(editMode == 'Y'){
      productSelect();
    }
    
    categorySelect();
  }, []);

  function imageChange(e){
    console.log("image",e.target);
    console.log("image",e.target.files[0]);
    const originalFile = e.target.files[0];
    if (originalFile) {
      const fileExtension = originalFile.name.split('.').pop();
      console.log("originalFile.name",originalFile.name.split('.'));
      console.log("fileExtension",fileExtension);
      const newFileName = `product_${Date.now()}.${fileExtension}`; 

      const renamedFile = new File([originalFile], newFileName, {
        type: originalFile.type,
      });

      setImgFile(renamedFile);

      setImgPreview(URL.createObjectURL(renamedFile));
    }
  }

  function handleChange(e){
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  }

  async function productSubmit(e){
    e.preventDefault();
    console.log('insert product : ',product);

    // upload the image to superbase and 
    const { data:imgData, error:imgError } = await supabase.storage
    .from('product_img')
    .upload(`tea-folder/${imgFile.name}`, imgFile);
    if(imgError){
      console.log("uploading image is fail :",imgError);
    }else {
      console.log("uploading image is success : ", imgData);
    }

    // get public url of img
    const { data: { publicUrl } } = supabase.storage
    .from('product_img')
    .getPublicUrl(imgData.path);
    if(publicUrl){
      console.log("publicUrl : ",publicUrl);
    }

    const { data: prodData, error: prodError } = await supabase
      .from("tea_product")
      .insert([
        {
          product_id : product.productId,
          name: product.name,
          description : product.description,
          price : Number(product.price),
          category: product.category,
          image_url: publicUrl, 
          stock_quantity: product.quantity,
          is_on_sale:product.onSale,
          sale_price:Number(product.salePrice),
          img_nm : imgFile.name
        }
      ])
      .select();

    if (prodError){
      console.log("insert product data is fail : ", prodError);
    } else{
      console.log("prodData :: ",prodData);
    }
    navigate('/admin/adminProductList');
  }
  async function editSubmit(e){
    e.preventDefault();
    console.log('edit product :: ',product);
    let finalImageUrl = imgPreview;
    let finalImgNm = prevImg;
    if(imgFile){
      // upload the image to superbase and 
      const { data:imgData, error:imgError } = await supabase.storage
      .from('product_img')
      .upload(`tea-folder/${imgFile.name}`, imgFile);
      if(imgError){
        console.log("uploading image is fail :",imgError);
      }else {
        console.log("uploading image is success : ", imgData);
      }

      // get public url of img
      const { data: { publicUrl } } = supabase.storage
      .from('product_img')
      .getPublicUrl(imgData.path);
      if(publicUrl){
        console.log("publicUrl : ",publicUrl);
        finalImageUrl = publicUrl;
      }
      finalImgNm = imgFile.name;
      // remove previous image
      console.log('prevImg : ', prevImg);
      if(prevImg){
        await supabase.storage.from('product_img').remove([`tea-folder/${prevImg}`]);
      }
    }
    

    const { data: prodData, error: prodError } = await supabase
      .from("tea_product")
      .update(
        {
          product_id : product.productId,
          name: product.name,
          description : product.description,
          price : Number(product.price),
          category: product.category,
          image_url: finalImageUrl, 
          stock_quantity: product.quantity,
          is_on_sale:product.onSale,
          sale_price:Number(product.salePrice),
          img_nm:finalImgNm
        }
      )
      .eq("product_id",product.productId)
      .select();

    if (prodError){
      console.log("insert product data is fail : ", prodError);
    } else{
      console.log("prodData :: ",prodData);
    }
    navigate('/admin/adminProductList');
  }
  return(
    <div className="innerContainer product">
      <h2 className="adminTitle">{editMode == 'Y' ? 'Edit Product' : 'New Product'}</h2>
      <form className="productEditCon" onSubmit={editMode=='Y'? editSubmit:productSubmit}>
        <div className="uploadImgBox">
          {
            imgPreview ? <img src={imgPreview} alt="uploadImg" className="uploadImg"/> : <div className="uploadImgText">upload your image</div>
          }
        </div>
        <label className="prodConList" htmlFor=""><span className="labelText">Product Img</span><input type="file" accept="image/*" name="productImg" onChange={imageChange}/></label>
        <label className="prodConList" htmlFor=""><span className="labelText">Product Name</span><input type="text" name="name" onChange={handleChange} value={product.name} /></label>
        <label className="prodConList" htmlFor=""><span className="labelText">Product Price</span><input type="number" step="0.01" name="price" onChange={handleChange} value={product.price} /></label>
        <label className="prodConList" htmlFor=""><span className="labelText">On Sale</span>
          <label htmlFor=""><input type="radio" value="Y" checked={product.onSale == "Y"} name="onSale" onChange={handleChange} />Y</label>
          <label htmlFor=""><input type="radio" value="N" checked={product.onSale == "N"} name="onSale" onChange={handleChange} />N</label>
        </label>
        {
          product.onSale == 'Y' ? <label className="prodConList" htmlFor=""><span className="labelText">Sale Price</span><input type="number" name="salePrice" step="0.01" onChange={handleChange} value={product.salePrice}/></label> : null
        }
        
        <label className="prodConList" htmlFor=""><span className="labelText">Product Quantity</span><input type="number" name="quantity" onChange={handleChange} value={product.quantity} /></label>
        <label className="prodConList" htmlFor=""><span className="labelText">Product ID</span><input type="text" name="productId" onChange={handleChange} value={product.productId} readOnly={ editMode=='Y'}/></label>
        <label className="prodConList" htmlFor="">
          <span className="labelText">Product Category</span>
          <ProdCatList prodCat={prodCat} product={product} handleChange={handleChange}></ProdCatList>
        </label>
        
        <label  className="prodConList"><span className="labelText">Product Info</span><textarea name="description" id="" placeholder="describe about the product" onChange={handleChange} value={product.description}></textarea></label>
        <button className="prodSaveBtn btnStyle">Save</button>
      </form>
    </div>
  )
}

export default AdminProduct;