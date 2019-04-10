import apiConfig from '../constants/api';

export const generateImageUrl = (imagePath) =>{
  return `${apiConfig.server}${imagePath}`;
};

export const getSteps = () => {
  return [
    '1. Select quantity', 
    '2. Input your info', 
    '3. Upload your photo', 
    '4. Review',
    '5. Proof',
    '6. Check out'
  ];
}

export const reviewLayout = [
  {
    title: 'Vertical With Border',
    photo: 'photo1.jpg',
    id: '1',
  },
  {
    title: 'Horizontal with Borders',
    photo: 'photo2.jpg',
    id: '2',
  },
  {
    title: 'Horizontal on Vertical Border',
    photo: 'photo3.jpg',
    id: '3',
  },
  {
    title: 'Vertical Borderless',
    photo: 'photo4.jpg',
    id: '4',
  },
  {
    title: 'Horizontal Borderless',
    photo: 'photo5.jpg',
    id: '5',
  },
  {
    title: 'Horizontal on Vertical Bleed',
    photo: 'photo6.jpg',
    id: '6',
  }
]