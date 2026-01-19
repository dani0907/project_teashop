import { useState, useEffect } from 'react'

import MainBanner from "../component/mainBanner";
import ShopButton from "../component/shopButton";
import { Link ,useNavigate} from 'react-router-dom';

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
function TeaListCon(){
  const [activeIndex, setActiveIndex] = useState(null);
  const teaData = [
    { id: 0, 
      title: 'Chamomile', 
      desc: 'We use whole, premium chamomile buds (never the chopped stuff) for their pure, clean flavour and naturally soothing, bedtime-worthy comfort.',
      img:'teaListImg_01.png'
    },
    { id: 1, 
      title: 'Peppermint', 
      desc: 'Our North American peppermint is rich in menthol and has a sweet, crisp taste—ideal for digesting after a heavy meal or winding down in the evenings.',
      img:'teaListImg_02.png'
    },
    { id: 2, 
      title: 'Matcha', 
      desc: 'Our premium ceremonial grade matcha is sourced from our partners in Kyushu and Nishio, Japan for that signature smooth caffeine and fresh green flavour.',
      img:'teaListImg_03.png'
    },
    { id: 3, 
      title: 'Cinnamon', 
      desc: 'We blend with sweet & spicy Saigon cinnamon—naturally higher in essential oils—for its bold aroma and naturally calming warmth.',
      img:'teaListImg_04.png' 
    },
    { id: 4, 
      title: 'Hibiscus', 
      desc: 'We choose the most vibrant, juicy & naturally ruby-red hibiscus so our blends burst with colour and flavour, no synthetic dyes needed.',
      img:'teaListImg_05.png' 
    }
  ];
  return(
    <>
    {
      teaData.map((tea, index) => (
        <div className={`teaConBox ${activeIndex === index ? 'on' : ''}`} key={tea.id}>
          <button className="teaOpenBtn" onClick={() => setActiveIndex(activeIndex === index ? null : index)}>
            <div className="teaListCon">
                <img className="teaListImg" src={`image/${tea.img}`} alt="teaListImg" />
                <span className='teaListNm'>{tea.title}</span>
                <i class="bi bi-chevron-down teaBtnArrow"></i>
            </div>
          </button>
          <div className="teaDescript">
            <p>{tea.desc}</p>
            <a className="teaDescriptBtn" href="#">{`Shop ${tea.title} Teas`}</a>
          </div>
        </div>
      ))
    }
    </>
  )
}

function MainPage(mainProduct){
  const mainProductList = mainProduct.mainProduct.slice(0, 4);
  const giftProductList = mainProduct.mainProduct.slice(0, 3);
  // console.log("MainPage mainProductList : "+JSON.stringify(mainProductList));

  return(
    // <div id="main">
      <div className="mainContainer">
        <div className="mTopContainer">
          {/* <div className='topBox num1'>
            <div className='thumInner'></div>
          </div>
          <div className="topBox num2">
            <div className='thumInner'></div>
          </div> */}
          <MainBanner></MainBanner>
        </div>
        <div className='mainInner'>
          <div className="innerContainer product">
            <h2>grab your tea</h2>
            <div className="innerBox">
              {
                mainProductList.map((item,index)=>(
                  <ProductBox key={index} product={item}></ProductBox>
                ))
              }
              
            </div>
            <div className='centerButton'>
              <ShopButton color="green" content="Shop Now" font="white"></ShopButton>
            </div>
          </div>
          <div className='innerContainer advertise ad01'>
            <div className='addInner'>
              <div className='centerButton'>
                <ShopButton color="#FFFFFF" content="Shop Bundles" font = "#B72B1F"></ShopButton>
              </div>
            </div>
          </div>
          <div className="innerContainer holiGift">
            <h2>a samll gifting made easy</h2>
            <div className="innerBox">
              <div className='holiGiftBox'>
                <img className='holiGiftImg' src="../public/image/product/product_001.png" alt="" />
                <h4 className='holiGiftName'>instant hosting hits</h4>
                <p className='holiGiftExpl'>Planners, RSVPers, coworkers, the list goes on. You can never have enough to offer up</p>
                <div className="centerButton">
                  <ShopButton color="green" content="Shop Now" font="white"></ShopButton>
                </div>
              </div>
              <div className='holiGiftBox'>
                <img className='holiGiftImg' src="../public/image/product/product_002.png" alt="" />
                <h4 className='holiGiftName'>instant hosting hits</h4>
                <p className='holiGiftExpl'>Planners, RSVPers, coworkers, the list goes on. You can never have enough to offer up</p>
                <div className="centerButton">
                  <ShopButton color="green" content="Shop Now" font="white"></ShopButton>
                </div>
              </div>
              <div className='holiGiftBox'>
                <img className='holiGiftImg' src="../public/image/product/product_003.png" alt="" />
                <h4 className='holiGiftName'>instant hosting hits</h4>
                <p className='holiGiftExpl'>Planners, RSVPers, coworkers, the list goes on. You can never have enough to offer up</p>
                <div className="centerButton">
                  <ShopButton color="green" content="Shop Now" font="white"></ShopButton>
                </div>
              </div>
            </div>
          </div>
          <div className='innerContainer advertise ad02'>
            <div className='addInner'>
              {/* <div className="adContent">
                <p>BUY MORE, SAVE MORE</p>
                <span>loose leaf teas<br/>& matchas</span>
                <span>200g-250g</span>
                <ShopButton color="green" content="Shop Now" font="white"></ShopButton>
              </div> */}
            </div>
          </div>
          <div className="innerContainer productBox">
            <div className='pbcCont pbcLeft'>
              <div className='pdcInner1'>
                <div className="pdcInnerBox">
                  <img className='pdcImg' src="../public/image/pdcImg01.png" alt="" />
                  <div className="pdc1conBox">
                    <span className='pdcName'>loose leaf teas</span>
                    <ShopButton color="green" content="Shop Now" font="white"></ShopButton>
                  </div>
                </div>
              </div>
              <div className='pdcInner2'>
                <div className='pdcInnerBox'>
                  <span className='pdcName'>sachets</span>
                  <img className='pdcImg' src="../public/image/pdcImg02.png" alt="" />
                  <ShopButton color="green" content="Shop Now" font="white"></ShopButton>
                </div>
                <div className='pdcInnerBox'>
                  <span className='pdcName'>teaware</span>
                  <img className='pdcImg' src="../public/image/pdcImg03.png" alt="" />
                  <ShopButton color="green" content="Shop Now" font="white"></ShopButton>
                </div>
              </div>
            </div>
            <div className="pbcCont pbcRight">
              <div className='pdcInner2'>
                <div className='pdcInnerBox'>
                  <span className='pdcName'>matcha</span>
                  <img className='pdcImg' src="../public/image/pdcImg04.png" alt="" />
                  <ShopButton color="green" content="Shop Now" font="white"></ShopButton>
                </div>
                <div className='pdcInnerBox'>
                  <span className='pdcName'>gifts</span>
                  <img className='pdcImg' src="../public/image/pdcImg05.png" alt="" />
                  <ShopButton color="green" content="Shop Now" font="white"></ShopButton>
                </div>
              </div>
              <div className='pdcInner1'>
                <div className="pdcInnerBox">
                  <img className='pdcImg' src="../public/image/pdcImg06.png" alt="" />
                  <div className="pdc1conBox">
                    <span className='pdcName'>caffeine-free</span>
                    <ShopButton color="green" content="Shop Now" font="white"></ShopButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="innerContainer social">
            <h2>sip and scroll on social</h2>
          </div> */}
          <div className="innerContainer review">
            <h2>+50,000 verified reviews</h2>
            <div className="innerBox">
              <div className='reviewBox'>
                <div className="reviewInner">
                  <p>name<span>12/13/25</span></p>
                  <span>★★★★★</span>
                  <h5>so good!</h5>
                  <p>
                    One of the best herbal teas I have ever tasted! Love this blend so much.
                    I don't like to buy teas that already have sugars in them, so this one is a total winner for me. 
                    Doesn't need any additives- in fact I prefer it as is.
                  </p>
                  <div><img src="" alt="" /><span></span></div>
                </div>
              </div>
              <div className='reviewBox'>
                <div className="reviewInner">
                  <p>name<span>12/13/25</span></p>
                  <span>★★★★★</span>
                  <h5>so good!</h5>
                  <p>
                    One of the best herbal teas I have ever tasted! Love this blend so much.
                    I don't like to buy teas that already have sugars in them, so this one is a total winner for me. 
                    Doesn't need any additives- in fact I prefer it as is.
                  </p>
                  <div><img src="" alt="" /><span></span></div>
                </div>
              </div>
              <div className='reviewBox'>
                <div className="reviewInner">
                  <p>name<span>12/13/25</span></p>
                  <span>★★★★★</span>
                  <h5>so good!</h5>
                  <p>
                    One of the best herbal teas I have ever tasted! Love this blend so much.
                    I don't like to buy teas that already have sugars in them, so this one is a total winner for me. 
                    Doesn't need any additives- in fact I prefer it as is.
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* <div className='innerContainer donated'>
            <span>WITH YOUR HELP, WE'VE DONATED</span>
            <div>2,000,000 CUPS</div>
            <span>LET'S GET TO 3,000,000 CUPS TOGETHER</span>
            <button>LEARN MORE</button>
          </div> */}
          <div className="innerContainer teaList">
            <div className="innerBox">
              <div className='teaConLeft'>
                <h3>the <span>best</span> ingredients<br/>make<br/>the <span>best</span> tea</h3>
                <p>
                  From powerful superfoods to good-for-you plants, <br/>
                  our ingredients are hand-selected from around the <br/>
                  globe for quality you can taste in every sip.
                </p>
              </div>
              <div className='teaConRight'>
                <TeaListCon></TeaListCon>
                {/* <div className="teaConBox">
                  <div className="teaListCon">
                    <img src="../public/image/teaListImg_01.avif" alt="" />
                    <span>chamomile</span>
                    <button className="teaOpenBtn" onClick={teaListOpen()}><i class="bi bi-chevron-down"></i></button>
                  </div>
                  <div className="teaDescript">
                    <p>We use whole, premium chamomile buds (never the chopped stuff) for their pure, clean flavour and naturally soothing, bedtime-worthy comfort.</p>
                    <a href="#">Shop Chamomile Teas</a>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
          {/* <div className="innerContainer about">
            <div>
              <div>
                <img src="" alt="" />
              </div>
              <h4>become an ambassador</h4>
              <p>We're all about fun tea content, especially when it brings tea lovers together. Apply to become an ambassador and discover the perks of sharing your sips!</p>
              <button>learn More</button>
            </div>

          </div> */}
        </div>
      </div>
    // </div>
  )
}

export default MainPage;