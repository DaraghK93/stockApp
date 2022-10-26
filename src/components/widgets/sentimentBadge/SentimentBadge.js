import {Badge} from "react-bootstrap";

/// SentimentBadge ///
//  Passed to it is the sentiment of positive, Neutral or Negative
//  Returned is a badge which changes colour depedning upon sentiment
function SentimentBadge({sentiment,customStyle}){
    /// Decide the class value 
    //      If this this not resolve to a value then badge cmponent will resolve to default bootsrap class 
    let classVal = ''
    if (sentiment.toLowerCase() === 'positive'){
        classVal = 'positiveSentimentBadge'
    }else if (sentiment.toLowerCase() === 'neutral'){
        classVal = 'neutralSentimentBadge'
    }else if (sentiment.toLowerCase() === 'negative'){
        classVal = 'negativeSentimentBadge'
    }
    return(
        <Badge style={customStyle} className={classVal}>{sentiment}</Badge>
    )
}

export default SentimentBadge;