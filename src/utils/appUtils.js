import apiConfig from '../constants/api';

export const generateImageUrl = (imagePath) =>{
  return `${apiConfig.server}${imagePath}`;
};

export const getSteps = () => {
  return ['1. Select quantity', '2. Upload', '3. Design', '4. Review'];
}