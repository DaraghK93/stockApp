import {Badge} from "react-bootstrap";

/// SentimentBadge ///
//  Passed to it is the sentiment of positive, Neutral or Negative
//  Returned is a badge which changes colour depedning upon sentiment
function SentimentBadge({sentiment,customStyle}){
    console.log(customStyle)
    /// Decide the class value 
    //      If this this not resolve to a value then badge cmponent will resolve to default bootsrap class 
    let classVal = ''
    if (sentiment === 'Positive'){
        classVal = 'positiveSentimentBadge'
    }else if (sentiment === 'Neutral'){
        classVal = 'neutralSentimentBadge'
    }else if (sentiment === 'Negative'){
        classVal = 'negativeSentimentBadge'
    }
    return(
        <Badge style={customStyle} className={classVal}>{sentiment}</Badge>
    )
}

export default SentimentBadge;