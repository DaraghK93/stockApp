import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import { useState } from 'react';

const Person = (
  <path d="M12 2.5a5.5 5.5 0 00-3.096 10.047 9.005 9.005 0 00-5.9 8.18.75.75 0 001.5.045 7.5 7.5 0 0114.993 0 .75.75 0 101.499-.044 9.005 9.005 0 00-5.9-8.181A5.5 5.5 0 0012 2.5zM8 8a4 4 0 118 0 4 4 0 01-8 0z" />
);

const myStyles = {
  itemShapes: Person,
  boxBorderWidth: 3,

  activeFillColor: ['#FEE2E2', '#FFEDD5', '#FEF9C3', '#ECFCCB', '#D1FAE5'],
  activeBoxColor: ['#da1600', '#db711a', '#dcb000', '#61bb00', '#009664'],
  activeBoxBorderColor: ['#c41400', '#d05e00', '#cca300', '#498d00', '#00724c'],

  inactiveFillColor: 'white',
  inactiveBoxColor: '#dddddd',
  inactiveBoxBorderColor: '#a8a8a8',
};



function SocialRating({srating}) {
  // const [rating, setRating] = useState(0);
  
  return (
    <Rating
      readOnly
      style={{ maxWidth: 400, margin:'auto'}}
      value={srating}
      halfFillMode="box"
      // onChange={setRating}
      itemStyles={myStyles}
      radius="large"
      spaceInside="large"
    />
  );
}

export default SocialRating