import apiConfig from '../constants/api';

export const generateImageUrl = (imagePath) =>{
  return `${apiConfig.server}${imagePath}`;
};

export const getSteps = () => {
  return ['1. Select quantity', '2. Input your info', '3. Upload your photo', '4. Review'];
}