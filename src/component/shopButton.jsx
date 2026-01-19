import styles from './css/button.module.css';
import { useNavigate } from 'react-router-dom';

function ShopButton({content, color, font, onClick}){
  // let content = content;
  // let color = color;
  // let font = font;
  let navigate = useNavigate();
  const btnStatus = onClick? 'active' : 'disabled';

  function moveToPage(){
    navigate('/allproduct');
  };

  const onClickEvent = onClick ? onClick : moveToPage;

  let bgColor;
  let ftColor;
  if (color == 'green') {
    bgColor = '#819A91'
  } else if (color == 'light'){
    bgColor = '#A7C1A8'
  } else {
    bgColor = color;
  }

  if(font == 'white'){
    ftColor = '#FFFFFF'
  } else {
    ftColor = font
  }

  return(
    <button className={styles.mainButton} style={{background : bgColor, borderColor:bgColor, color:ftColor}}
    onClick={onClickEvent}>{content}</button>
  )
}

export default ShopButton;