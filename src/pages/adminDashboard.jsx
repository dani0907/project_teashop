import { useEffect,useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { supabase } from '../supabaseClient';

function AdminDashboard(){
  const [dashboardData, setDashboardData] = useState({
    todaySales: 0,
    recentProducts: [],
    weeklySales: []
  });
  let total = 0;

  useEffect(()=>{
    async function getData(){
      const today = new Date().toISOString().split('T')[0];
      console.log("today : ",today);
      const { data:salesData, error:salesrror } = await supabase.from("order_history")
        .select(`order_num,
                order_date: created_at,
                cart_subtotal,
                cart_list
              `)
        .gte('created_at', today);
  
      if (salesrror) {
        console.error("Supabase connect error :", salesrror);
      } else {
        console.log("Supabase connect success :", salesData);
        total = salesData?.reduce((sum, item) => sum + item.total_price, 0) || 0;
        console.log("todays total : ",total);
      }

      const { data: productData, error:productError } = await supabase
      .from('tea_product')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5);
      if (productError) {
        console.error("Supabase connect error :", productError);
      } else {
        console.log("Supabase connect success :", productData);
      }
      
      const { data:rpcData, error:rpcError } = await supabase.rpc('get_weekly_sales_trend');
      if(rpcError){
        console.log("call 7days data is fail : ",rpcError);
      } else {
        console.log("call 7days data is sucess : ", rpcData);
      }

      setDashboardData({
        todaySales : total,
        recentProducts : productData,
        weeklySales : rpcData
      })
    }
    getData();
  },[])
  return(
    <div>
      <div className="innerContainer">
        <h2 className="adminTitle">Dashboard</h2>
        <div className='todaysSaleCon'>
          <h2 className='dashboardTitle'>Today's Sales</h2>
          <p>{`$${dashboardData.todaySales}`}</p>
        </div>
        <div className='weeklySalesCon'>
          <h3 className='dashboardTitle'>Weekly Sales Trend</h3>
          <div className='chartBox' style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <LineChart data={dashboardData.weeklySales}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="sales_date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="daily_revenue" stroke="#819A91" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className='recentProductCon'>
          <div className="recent-list">
          <h3 className='dashboardTitle'>Recently Added Products</h3>
          <ul className='recentProBox'>
            {dashboardData.recentProducts.map(item => (
              <li className='recentProList' key={item.product_id}>
                <img className="recentProImg" src={item.image_url} />
                <span className='recentProTxt'>{item.name}</span>
              </li>
            ))}
          </ul>
        </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard; 