import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient';
import Login from './pages/login';
import SignUp from './pages/signUp';
import ProductDetail from './pages/productDetail';
import MainPage from './pages/mainPage';
import UserLayout from './component/userLayout';
import CartPage from './pages/cartPage';
import SuccessPage from './pages/successPage';
import OrderHistPage from './pages/orderHistPage';
import AllProductPage from './pages/allProductPage';

import AdminLayout from './component/adminLayout';
import AdminProduct from './pages/adminProduct';
import AdminProductList from './pages/adminProductList';
import AdminDashboard from './pages/adminDashboard';
import AdminUser from './pages/adminUserPage';

import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';

import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';


function App() {
  let navigate = useNavigate();
  const [count, setCount] = useState(0);
  let [loginName, setLoginName] = useState();
  let [loginData, setLoginData] = useState();
  const [mainProduct, setMainProduct] = useState([]);
  let [cart, setCart] = useState([]);
  useEffect(() => {
    async function productSelect() {
      const { data, error } = await supabase.from("tea_product")
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

      if (error) {
        console.error("Supabase connect fail:", error);
      } else {
        console.log("Supabase connect success:", data);
        setMainProduct(data);
      }
    }

    productSelect();
  }, []);

  function addCart(product){
    const find = cart.find((item)=>item.tea_id == product.tea_id);
    console.log("cart count :: "+ product.tea_count);

    if(find){
      const updatedCart = cart.map((item) => item.tea_id == find.tea_id  ? {...item, tea_count:item.tea_count + product.tea_count} : item);
      setCart(updatedCart);
      localStorage.setItem('cartData',JSON.stringify(updatedCart));
    } else{
      setCart([...cart, { ...product }]);
      localStorage.setItem('cartData',JSON.stringify([...cart, { ...product }]));
    }
    alert("Added to your cart successfully!");
  }
  function updateCart(product,updown){
    const find = cart.find((item)=>item.tea_id == product.tea_id);
    console.log("cart count :: "+ product.tea_count);
    if(find){
      const updatedCart = cart.map((item) => item.tea_id == find.tea_id  ? {...item, tea_count:Math.max(1,product.tea_count + updown)} : item);
      setCart(updatedCart);
      localStorage.setItem('cartData',JSON.stringify(updatedCart));
    } 
    
  }
  function deleteCart(teaId){
    let newCart = cart.filter(item => item.tea_id != teaId);
    setCart(newCart);
    localStorage.setItem('cartData',JSON.stringify(newCart));
    console.log("newCart : ",newCart);
  }
  function clearCart(){
    setCart([]);
    localStorage.setItem('cartData',null);
  }

  const logout = async()=>{
    console.log("***logout***");
    const { error } = await supabase.auth.signOut();
    if(error){
      console.error("logout fail : ", error.message);
    } else {
      console.log("***logout success***");
      localStorage.clear();
      setLoginData(null);
      setLoginName(null);
      alert('logout success!');
      navigate('/');
    }
  };
  function loginDataFunc(){
    console.log("**login data receive**");
    if(localStorage.getItem('loginData') != null ){
      const parsedData = JSON.parse(localStorage.getItem('loginData'));
      setLoginData(parsedData);
      console.log("App jsx loginData ::", parsedData);

      setLoginName(parsedData.firstName + " "+parsedData.lastName);
    }
  }

  return (
    <>
        <Routes>
          <Route path='/' element={<UserLayout loginData={loginData} logoutFunc={logout} ></UserLayout>}>
            <Route index element={<MainPage mainProduct = {mainProduct}></MainPage>}></Route>
            <Route path='/login' element = {<Login loginDataFunc = {loginDataFunc}></Login>}></Route>
            <Route path='/signUp' element = {<SignUp></SignUp>}></Route>
            <Route path='/detail/:id' element = {<ProductDetail products = {mainProduct} addCart={addCart}></ProductDetail>}></Route>
            <Route path='/cart' element = {<CartPage cartData = {cart} loginData={loginData} clearCart={clearCart} updateCart={updateCart} deleteCart={deleteCart}></CartPage>}></Route>
            <Route path='/success' element = {<SuccessPage cartData = {cart}></SuccessPage>}></Route>
            <Route path='/order' element={<OrderHistPage loginData={loginData}></OrderHistPage>}></Route>
            <Route path='/allproduct' element={<AllProductPage></AllProductPage>}></Route>
          </Route>
          <Route path='/admin' element={<AdminLayout></AdminLayout>}>
            <Route index element={<AdminDashboard></AdminDashboard>}></Route>
            <Route path='adminBoard' index element={<AdminDashboard></AdminDashboard>}></Route>
            <Route path='adminProduct' element={<AdminProduct></AdminProduct>}></Route>
            <Route path='adminProduct/:id' element={<AdminProduct></AdminProduct>}></Route>
            <Route path='adminProductList' element={<AdminProductList></AdminProductList>}></Route>
            <Route path='adminUser' element={<AdminUser></AdminUser>}></Route>
          </Route>

        </Routes>
    </>
  )
}

export default App
