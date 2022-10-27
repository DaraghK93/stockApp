import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import { useState } from 'react';

const Leaf = (
  <path d="M210.214,0.106l-0.336,0.004c-49.919,1.145-96.832,21.196-132.095,56.46C6.057,128.295,2.659,242.868,67.586,318.656
  L0,386.24l21.213,21.213l67.583-67.583c34.955,29.999,78.987,46.363,125.537,46.363c51.578,0,100.078-20.089,136.549-56.561
  c35.253-35.251,55.303-82.152,56.459-132.061L407.453,0L210.214,0.106z M377.346,197.081
  c-1.016,42.099-17.943,81.645-47.676,111.377c-30.808,30.808-71.768,47.774-115.337,47.774
  c-38.529,0-75.014-13.278-104.247-37.653l34.012-34.012H293.45v-30h-119.35l33.64-33.64h85.711v-30H237.74l52.175-52.175
  l-21.213-21.213l-52.175,52.175v-55.711h-30v85.711l-33.64,33.64V114.003h-30v149.351l-34.005,34.005
  C35.61,233.343,38.974,137.804,98.995,77.783c29.743-29.742,69.301-46.67,111.407-47.677l167.035-0.09L377.346,197.081z" />
);

const myStyles = {
  itemShapes: Leaf,
  boxBorderWidth: 3,

  activeFillColor: ['#FFBB28', '#FFEDD5', '#FF8042', '#ECFCCB', '#00C49F'],
  activeBoxColor: ['#FF8042', '#FF9E35', '#FFBB28', '#80C064', '#00C49F'],
  activeBoxBorderColor: ['#c41400', '#d05e00', '#cca300', '#498d00', '#00724c'],

  inactiveFillColor: 'white',
  inactiveBoxColor: '#dddddd',
  inactiveBoxBorderColor: '#a8a8a8',
};



function EnvironmentalRating({erating}) {
  // const [rating, setRating] = useState(0);
  
  return (
    <Rating
      readOnly
      style={{ maxWidth: 300, margin:'auto'}}
      value={erating}
      halfFillMode="box"
      // onChange={setRating}
      itemStyles={myStyles}
      radius="large"
      spaceInside="large"
    />
  );
}

export default EnvironmentalRating