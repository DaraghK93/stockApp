import {Card} from 'react-bootstrap'
import TickerCard from '../tickercard/Tickercard'


// this function creates a side scrolling menu for showing categories of stocks
// in the stock discovery page
function StockSideScrollMenu(props){
    
// returns a horizontally scrolling container that is called in the stock discovery page
// the array of stocks relating to that category is passed in as "data" props
    return(
        <>
        <Card style={{  border:"none"}}>
            <div className='cardContainer'>
                {props.data.map((stockObj) => (
                    <div className='tickercard' key={stockObj._id}>
                    <TickerCard key={stockObj._id} stock={stockObj}/>
                    </div>
                 ))}
         
             </div>
        </Card>
        </>

 )
}


export default StockSideScrollMenu;