import apiConfig from '../constants/api';

export const generateImageUrl = (imagePath) =>{
  return `${apiConfig.server}${imagePath}`;
};

export const getSteps = () => {
  return [
    '1. Select quantity', 
    '2. Input your info', 
    '3. Design', 
    '4. Review',
    '5. Payment'
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
  {caption: "Left", id: "Left"},
  {caption: "Right", id: "Right"}
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
  white: 'white',
  black: 'black'
};

export const reviewLayout = [
  {
    title: 'Vertical With Border',
    photo: 'headshot-vertical-with-borders.jpg',
    isBorder: true,
    id: '0',
    style: {
      containerStyle: {
        width: 400,
        minWidth: 400,
        height: 500,
        padding: '30px 24px 30px 24px',
        backgroundColor: Color.white,
        border: `2px solid ${Color.black}`
      },
      captionStyle: {
        fontFamily: FontFamilyList[0].id,
        textTransform: TextStyleList[0].id,
        color: Color.black,
        bottom: -3,
        right: 0,
        textAlign: 'right'
      },
      imageStyle: {
        width: '100%',
        height: '100%',
        objectFit: 'cover'
      }
    },
  },
  {
    title: 'Horizontal with Borders',
    photo: 'headshot-horizontal-with-borders.jpg',
    isBorder: true,
    id: '1',
    style: {
      containerStyle: {
        width: 500,
        minWidth: 500,
        height: 400,
        padding: '30px 24px 30px 24px',
        backgroundColor: Color.white,
        border: `2px solid ${Color.black}`
      },
      captionStyle: {
        fontFamily: FontFamilyList[0].id,
        textTransform: TextStyleList[0].id,
        color: Color.black,
        bottom: -3,
        left: 0,
        textAlign: 'left'
      },
      imageStyle: {
        width: '100%',
        height: '100%',
        objectFit: 'cover'
      }
    }
  },
  {
    title: 'Horizontal on Vertical Border',
    photo: 'headshot-horizontal-on-vertical-border.jpg',
    isBorder: true,
    id: '2',
    style: {
      containerStyle: {
        width: 400,
        minWidth: 400,
        height: 500,
        padding: '30px 24px 30px 24px',
        backgroundColor: Color.white,
        border: `2px solid ${Color.black}`
      },
      captionStyle: {
        fontFamily: FontFamilyList[0].id,
        textTransform: TextStyleList[0].id,
        color: Color.black,
        bottom: -3,
        left: 0,
        textAlign: 'left'
      },
      imageStyle: {
        width: '100%',
        height: 282,
        objectFit: 'cover',
        outline: `3px solid ${Color.black}`,
        outlineOffset: '-3px'
      }
    },
  },
  {
    title: 'Vertical Borderless',
    photo: 'headshot-vertical-borderless.jpg',
    isBorder: false,
    id: '3',
    style: {
      containerStyle: {
        width: 400,
        minWidth: 400,
        height: 500,
        padding: 0,
        backgroundColor: Color.white,
      },
      captionStyle: {
        fontFamily: FontFamilyList[0].id,
        textTransform: TextStyleList[0].id,
        color: Color.white,
        bottom: 33,
        left: 12,
        textAlign: 'left'
      },
      imageStyle: {
        width: '100%',
        height: '100%',
        objectFit: 'cover'
      }
    },
  },
  {
    title: 'Horizontal Borderless',
    photo: 'headshot-horizontal-borderless.jpg',
    isBorder: false,
    id: '4',
    style: {
      containerStyle: {
        width: 500,
        minWidth: 500,
        height: 400,
        padding: 0,
        backgroundColor: Color.white
      },
      captionStyle: {
        fontFamily: FontFamilyList[0].id,
        textTransform: TextStyleList[0].id,
        color: Color.white,
        bottom: 33,
        right: 12,
        textAlign: 'right'
      },
      imageStyle: {
        width: '100%',
        height: '100%',
        objectFit: 'cover'
      }
    }
  },
  {
    title: 'Horizontal on Vertical Bleed',
    photo: 'headshot-horizontal-on-vertical-bleed.jpg',
    isBorder: true,
    id: '5',
    style: {
      containerStyle: {
        width: 400,
        minWidth: 400,
        height: 500,
        padding: '30px 0px 30px 0px',
        backgroundColor: Color.white,
        border: `2px solid ${Color.black}`
      },
      captionStyle: {
        fontFamily: FontFamilyList[0].id,
        textTransform: TextStyleList[0].id,
        color: Color.black,
        bottom: -3,
        left: 12,
        textAlign: 'left'
      },
      imageStyle: {
        width: '100%',
        height: 282,
        objectFit: 'cover'
      }
    },
  }
];

export const linkOptionList = [
  {id: 0, caption: 'Release of images from order only as E-mail or CD(+$12.5)', price: 12.5},
  {id: 1, caption: 'Photo shoot only(DVD only)(+$25.00)', price: 25},
  {id: 2, caption: 'Both release of images and photo shoot (DVD only)(+$25.00)', price: 25}
]

export const makeFullName = (firstName, middleName, lastName) => {
  let res = '';
  if (firstName) res = firstName;
  if (middleName) res = `${res} middleName`;
  if (lastName) res = `${res} lastName`;
  return res;
}

