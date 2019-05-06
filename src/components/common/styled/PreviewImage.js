import styled from 'styled-components';

const PreviewImg = styled.img(props => {
  let imageTag = {src: `${props.src}`};
  imageTag = {...props.style};
  return imageTag;
});

export default PreviewImg;