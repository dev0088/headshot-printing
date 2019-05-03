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
};

export const FontFamilyList = [
  {caption: "Arial", id: "Arial"},
  {caption: "Helvetica", id: "Helvetica"},
  {caption: "Times New Roman", id: "Times New Roman"},
  {caption: "Courier New", id: "Courier New"},
  {caption: "Verdana", id: "Verdana"}
];
export const TextStyleList = [
  {caption: "Uppercase", id: "uppercase"},
  {caption: "Upper and Lower Case", id: "capitalize"},
  {caption: "Lowercase", id: "lowercase"},
];
export const MoveNameList = [
  {caption: "Lower Top", id: "Lower Top"},
  {caption: "Higher Top", id: "Higher Top"},
  {caption: "More Left", id: "More Left"},
  {caption: "Less Left", id: "Less Left"},
];
export const TransformSyle = {
  "Uppercase" : "uppercase",
  "Upper and Lower Case": "capitalize",
  "Lowercase": "lowercase",
};
export const PlacemetList = [
  "On Border",
  "On Image"
];
export const LineColorList = [
  "Black Line",
  "White Line",
  "No Line"
]

export const Color = {
  white: '#ffffff',
  black: '#000000'
};


export const reviewLayout = [
  {
    title: 'Vertical With Border',
    photo: 'photo1.jpg',
    id: '0',
    style: {
      textAlign: 'right',
      right: 8,
      containerStyle: {
        width: 400,
        height: 500,
        padding: 25,
        backgroundColor: Color.white,
        borderColor: Color.black,
        // border: `2 px ${Color.black}`
        border: '4px solid'
      },
      captionStyle: {
        fontFamily: FontFamilyList[0].id,
        textTransform: TextStyleList[0].id,
        color: Color.black,
        bottom: 0,
        top: 0,
        right: 0,
        textAlign: 'right'
      },
      imageStyle: {
        width: 380,
        height: 480,
        objectFit: 'cover',
        borderColor: Color.white,
      }
    },
  },
  {
    title: 'Horizontal with Borders',
    photo: 'photo2.jpg',
    id: '1',
    style: {
      textAlign: 'left',
      left: 8,
    },
  },
  {
    title: 'Horizontal on Vertical Border',
    photo: 'photo3.jpg',
    id: '2',
    style: {
      textAlign: 'left',
      left: 8,
    },
  },
  {
    title: 'Vertical Borderless',
    photo: 'photo4.jpg',
    id: '3',
    style: {
      textAlign: 'left',
      left: 8,
    },
  },
  {
    title: 'Horizontal Borderless',
    photo: 'photo5.jpg',
    id: '4',
    style: {
      textAlign: 'right',
      right: 8,
    },
  },
  {
    title: 'Horizontal on Vertical Bleed',
    photo: 'photo6.jpg',
    id: '5',
    style: {
      textAlign: 'left',
      left: 8,
    },
  }
]