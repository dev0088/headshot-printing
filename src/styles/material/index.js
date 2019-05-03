import { createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import grey from '@material-ui/core/colors/grey';
import blue from '@material-ui/core/colors/blue';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { Color } from '../../utils/appUtils';

const drawerWidth = 240;
const fontFamily = "'Clarkson',Helvetica,sans-serif";
//'-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji'
//"Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace";
//"'Open Sans', sans-serif"; 


export const materialStyles = theme => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    flexWrap: 'wrap',
  },
  button: {
    margin: theme.spacing.unit,
  },
  paper: {
    height: 140,
    width: 100,
  },
  progress: {
    margin: theme.spacing.unit * 2,
  },
  typography: {
    fontFamily: fontFamily,
    textTransform: "none",
    color: theme.palette.white.main,
  },
  buttonIcon: {
    margin: 0,
  },
  brandImage: {
    height: 40,
  },
  rootAutoScroll: {
    overflow: 'auto'
  },
  brandTitle: {
    paddingLeft: '40px',
    paddingRight: '8px',
    color: theme.palette.white.main,
    fontSize: '1.5rem',
    fontWeight: 'bold',
    paddingTop: '3px',
    textTransform: 'none',
    display: 'inline-block',
    whiteSpace: 'nowrap',
    marginRight: '18px',
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto',
    },
  },
  searchIconContainer: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchIcon: {
    cursor: 'pointer'
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
  selectedButton: {
    display: 'block!important',
    width: '100%',
    borderRadius: '13px!important',
  },
  selectedButtonTitle: {
    color: theme.button.primaryColor,
    fontSize: theme.button.primaryFontSize,
    fontWeight: 600,
    paddingTop: '0.8rem',
    paddingBottom: '0.8rem',
    lineHeight: 1.3,
    textTransform: 'none',
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing.unit / 4,
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 190,
    width: '100%',
    backgroundColor: theme.palette.white.main,
    borderRadius: 7
  },
  flatPrimary: {
    color: theme.palette.white.main,
  },
  grow: {
    flexGrow: 1,
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
  },
  groupMenuItem: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)'
  },
  input: {
    display: 'none',
  },
  icon: {
    margin: theme.spacing.unit * 2,
  },
  iconHover: {
    margin: theme.spacing.unit * 2,
    '&:hover': {
      color: red[800],
    },
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  menuitem: {
    color: theme.palette.white.main
  },
  menuItemText: {
    color: theme.palette.white.main,
    fontSize: '0.85rem',
    fontWeight: 400,
    paddingTop: '3px',
    textTransform: 'none',
    display: 'inline-block',
    whiteSpace: 'nowrap',
    marginRight: '10px',
  },
  drawerMenuButton: {
    marginLeft: 12,
    marginRight: 20,
    color: '#FFF',
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  drawerBandImage: {
    paddingTop: '0.3rem',
    width: '100px',
    textAlign: 'left',
    marginLeft: '10px',
    marginRight: 'auto'
  },
  appBar: {
    width: '100%',
    position: 'absolute',
    paddingRight: 0,
    paddingLeft: 0
  },
  topbarMenuItemTitle: {
    paddingLeft: '8px',
    paddingRight: '8px',
    '&:hover': {
      color: theme.palette.grey.light,
    },
  },
  topbarDynamicShow: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  topbarMenuItem: {
    display: 'inline-block'
  },
  avatarImage: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    objectFit: 'cover',
  },
  avatarMenuItemText: {
    color: theme.palette.white.main,
    fontSize: '1rem',
    fontWeight: 400,
    paddingLeft: '7px'
  },
  optionMenuItem: {
    backgroundColor: 'rgba(0, 0, 0, 0)!important',
    paddingLeft: '40px',
  },
  paperContent: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  paperDescription: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  slide: {
    padding: 10,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  searchTextField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  descriptionUl: {
    paddingInlineStart: '15px',
  },
  olParentheses: {
    counterReset: 'list',
    paddingInlineStart: '0px',
    '& > li': {
      listStyle: 'none',
      '&:before': {
        textAlign: 'center',
        content: `counter(list) ") "`,
        counterIncrement: 'list',
        paddingRight: '0.5rem'
      }
    },
  },
  auditionTableContentText: {
    color: theme.palette.black.main,
    fontSize: '1rem',
    fontWeight: 400,
    lineHeight: '1em',
  },
  descriptionText: {
    color: '#2a3134',
    fontSize: '1rem',
    fontWeight: 400,
    fontFamily: fontFamily,
    lineHeight: '1.46429em',
  },
  descriptionStrongRed: {
    color: theme.palette.red.main,
    display: 'inline',
    fontSize: '1rem',
    fontWeight: 600,
    fontFamily: fontFamily,
    lineHeight: '1.46429em',
  },
  descriptionItalicRed: {
    color: theme.palette.red.main,
    display: 'inline',
    fontSize: '1rem',
    fontWeight: 600,
    fontStyle: 'italic',
    fontFamily: fontFamily,
    lineHeight: '1.46429em',
  },
  h4NoMargin: {
    color: 'rgba(0, 0, 0, 0.87)',
    fontSize: '2.125rem',
    fontFamily: fontFamily,
    fontWeight: 400,
    lineHeight: 1.17,
    letterSpacing: '0.00735em',
    marginBlockStart: '0em',
    marginBlockEnd: '0em',
    marginInlineStart: '0px',
    marginInlineEnd: '0px',
  },
  h4SmallMargin: {
    color: 'rgba(0, 0, 0, 0.87)',
    fontSize: '2.125rem',
    fontFamily: fontFamily,
    fontWeight: 400,
    lineHeight: 1.17,
    letterSpacing: '0.00735em',
    marginBlockStart: '0.5em',
    marginBlockEnd: '0.5em',
    marginInlineStart: '0px',
    marginInlineEnd: '0px',
  },
  h4: {
    color: 'rgba(0, 0, 0, 0.87)',
    fontSize: '2.125rem',
    fontFamily: fontFamily,
    fontWeight: 400,
    lineHeight: 1.17,
    letterSpacing: '0.00735em',
    marginBlockStart: '1.33em',
    marginBlockEnd: '1.33em',
    marginInlineStart: '0px',
    marginInlineEnd: '0px',
  },
  h5: {
    display: 'block',
    fontSize: '0.83em',
    marginBlockStart: '1.67em',
    marginBlockEnd: '1.67em',
    marginInlineEtart: '0px',
    marginInlineEnd: '0px',
    fontWeight: 'bold',
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  footerLayout: {
    backgroundColor: '#007bff',
    bottom: 0,
    width: '100%',
    paddingRight: 15,
    paddingLeft: 15,
    marginTop: 16,
    // position: 'sticky'
  },
  footerBackground: {
    width: '100%',
    borderRadius: 0,
    marginBottom: 0,
    paddingTop: 0,
    paddingBottom: 0
  },
  footerMenuItemText: {
    color: theme.palette.white.main,
    fontWeight: 'bold',
    textTransform: 'none',
    display: 'inline-block'
  },
  footerItemSeparator: {
    color: theme.palette.white.main,
    marginLeft: 10,
    marginRight: 10,
    fontWeight: 'bold',
    textTransform: 'none',
    display: 'inline-block'
  },
  footerDescriptionText: {
    color: '#212529',
    textTransform: 'none',
    paddingBottom: '10px'
  },
  underlineText: {
    textDecoration: 'underline',
    display: 'inline',
    fontSize: '1rem'
  },
  boldText: {
    fontWeight: 600,
    display: 'inline',
    fontSize: '1rem',
    fontFamily: fontFamily,
    lineHeight: '1.46429em',
  },
  boldUnderlineText: {
    fontWeight: 600,
    textDecoration: 'underline',
    display: 'inline',
    fontSize: '1rem',
    lineHeight: '1.46429em',
  },
  fontLightWeight: {
    fontWeight: 100
  },
  fontMiddleWeight: {
    fontWeight: 400
  },
  italicText: {
    fontStyle: 'italic',
  },
  inlineText: {
    display: 'inline'
  },
  centerText: {
    textAlign: 'center',
  },
  leftText: {
    textAlign: 'left',
  },
  rightText: {
    textAlign: 'right',
  },
  fullWidth: {
    width: '100%'
  },
  bold: {
    fontWeight: 600,
  },
  red: {
    color: theme.palette.red.main
  },
  white: {
    color: theme.palette.white.main
  },
  whiteImportant: {
    color: '#CCC !important',
  },
  black: {
    color: theme.palette.black.main
  },
  blue: {
    color: theme.palette.blue.main
  },
  green: {
    color: theme.palette.green.main
  },
  containerPaper: {
    padding: 20
  },
  pageTitleText: {
    fontSize: '2rem',
    fontWeight: 600,
    color: theme.palette.black.main
  },
  itemTitleText: {
    fontSize: '1.35rem',
    fontWeight: 600,
    color: theme.palette.black.main
  },
  itemSubTitleText: {
    fontSize: '1.2rem',
    fontWeight: 600,
    color: theme.palette.black.main
  },
  generalDescriptionText: {
    fontSize: '1rem',
    fontWeight: 400,
    color: theme.palette.black.thin
  },
  productionsGalleryImage: {
    width: '100%',
    height: '100%'
  },
  productionGalleryImage: {
    width: '100%',
    height: 'auto'
  },
  nextButton: {
    margin: theme.spacing.unit,
  },
  orderRadioGroup: {
    margin: `${theme.spacing.unit}px 0`,
  },
  orderRadio: {
    marginLeft: 0,
    marginRight: 40
  },
  listItems: {
    marginLeft: 20
  },
  whitSpacer: {
    width: 50
  },
  homeButton: {
    margin: theme.spacing.unit,
    color: theme.palette.white.main,
    borderRadius: 20,
    border: `1px solid ${theme.palette.white.main}`
  },
  generalLink: {
    textDecorationLine: 'none'
  },
  homeContainerGrid: {
    position: 'absolute',
    width: '100%',
    height: '100%'
  },
  homeTitle: {
    fontSize: '2.5rem',
    fontWeight: 600,
    color: theme.palette.white.main
  },
  homeSloganTitle: {
    fontSize: '1.75rem',
    fontWeight: 400,
    color: theme.palette.white.main
  },
  homeSloganSubTitle: {
    fontSize: '1.25rem',
    fontWeight: 100,
    color: theme.palette.white.main,
    fontStyle: 'italic',
    lineHeight: 1.25
  },
  homeBackgroundImageContainer: {
    background: 'url(static/media/background.jpg)',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: -1,
  },
  homeBackgroundImage: {
    width: '100%',
    height: 994,
    objectFit: 'cover'
  },
  orderPrintsSteperLayout: {
    paddingTop: 65,
    paddingBottom: 20,
    width: '100%'
  },
  orderContainer: {
    // backgroundImage: `url(${orderContainerBackgroundImage})`,
    background: '#000',
    backgroundSize: '100% 100%',
    minHeight: '100vh',
  },
  orderPrintsSteperBody: {
    
  },
  swipeableGridContainer: {
    width: '100%',
    background: '#FFF',
    minWidth: 200,
    padding: '32px 16px !important',
    borderRadius: 16,
    marginTop: 16,
  },
  steperGridContainer: {
    background: 'transparent',
    '& svg': {
      color: 'rgba(255,255,255, 0.5)',
    },
  },
  previewContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '5px 0',
  },
  previewStyle: {
    width: 160,
    height: 200,
    objectFit: 'cover'
  },
  previewClose: {
    cursor: 'pointer',
    opacity: 0.6,
    position: 'relative',
    bottom: -92,
    right: 0,
    '&:hover': {
      opacity: 1,
    },
  },
  previewCloseIcon: {
    fontSize: '1.5em',
  },
  addImageContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    display: 'flex',
    flexDirection: 'row',
    height: 140,
  },
  addImageIcon: {
    borderRadius: '50%',
    backgroundColor: theme.palette.black.main,
    height: 36,
    marginRight: 10,
    width: 36,
    boxShadow: '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)'
  },
  largeIcon: {
    fontSize: '2.2em',
    color: theme.palette.white.main,
    height: 40,
    position: 'relative',
    top: -2,
  },
  addImageText: {
    fontSize: '1.5em',
    userSelect: 'none',
  },
  sampleContainer: {
    alignItems: 'center',
    display: 'flex',
    flexWrap: 'wrap',
  },
  samplePhotoEach: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 300,
  },
  itemLayoutImage: {
    border: '1px solid #222',
    padding: 8,
    marginBottom: 15,
    position: 'relative',
    '& img': {
      width: '100%',
      maxHeight: 200,
    }
  },
  itemLayoutImageName: {
    position: 'absolute',
    bottom: 0,
    fontSize: 8,
  },
  reviewImageContainerGridItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  itemRealImage: {
    border: '4px solid #0000001f',
    position: 'relative',
    '& img': {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  },
  itemRealImageName: {
    position: 'relative',
    bottom: 10,
    fontSize: 16,
  },
  loadingProgress: {
    color: '#6798e5',
    animationDuration: '550ms',
  },
  noMargin: {
    margin: 0,
  },
  colorBlack: {
    color: theme.palette.black.main,
  },
  customizeTitle: {
    fontSize: 20,
  },
  customizeDescription: {
    fontSize: 12,
  },
  customizeTextLabel: {
    fontSize: 14,
  },
  flexContainer: {
    display: 'flex',
    minHeight: 56,
  },
  descriptionContainer: {
    padding: 20,
  },
  formTextControl: {
    minWidth: 'initial',
  },
  colorCustomizeTitle: {
    alignSelf: 'center',
    color: '#218fff',
    fontSize: 14,
    '& > label': {
      marginLeft: 0,
    }
  },
  alignItemCenter: {
    alignItems: 'center',
  },
  colorTitle: {
    color: '#4e321f',
  },
  additionalContainer: {

  },
  filePathContainer: {
    display: 'flex',
    position: 'relative',
  },
  pathRemove: {
    position: 'absolute',
    textAlign: 'right',
  },
  totalPrice: {
    textAlign: 'right',
    marginRight: 0,
    fontSize: 20,
    fontWeight: '600',
    marginTop: 20,
  },
  borderColorWhite: {
    borderColor: 'white'
  },
  borderColorBlack: {
    borderColor: 'black'
  },
  borderColorNone: {
    borderColor: null
  }

  /////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////
  
});



export const themeMaterial = createMuiTheme ({
  palette: {
    primary: {
      main: '#FFFFFF',
      // light: '#2196F3'
      light: grey[400]
    },
    secondary: {
      main: '#C00'
    },
    green: {
      main: '#28a745'
    },
    teal: {
      main: '#20c997'
    },
    white: {
      main: '#FFFFFF',
      light: grey[100],
      dark: grey[300],
      thin: '#d6d7d8',
      contrastText: '#fff'
    },
    black: {
      main: grey[900],
      dark: grey[800],
      thin: grey[700],
      light: grey[600],
    },
    grey: {
      main: grey[900],
      dark: grey[800],
      light: grey[400],
      thin: grey[200],
    },
    darkGrey: {
      main: grey[800]
    },
    lightGrey: {
      main: grey[400]
    },
    red: {
      main: '#C00',
      thin: red[400],
      light: red[400],
      dark: red[900]
    },
    blue: {
      main: blue[700],
      light: blue[400],
      dark: blue[900]
    }
  },
  '@global': {
    body: {
      overflow: 'auto'
    },
  },
  typography: {
    fontFamily: fontFamily,
    textTransform: "none",
    useNextVariants: true,
    color: '#FFFFFF',
  },
  button: {
    primaryColor: '#FFFFFF',
    primaryFontSize: '1.5rem'
  },
});

export const themeClientSpecialActionButton = createMuiTheme ({
  palette: {
    primary: {
      main: '#2a3134',
    },
    secondary: {
      main: '#C00'
    }
  }
});

export const clientDesigns = {
  talentSearch: {
    PositionsTableItems: { xl: 1, lg: 1, md: 2, sm: 3, xs: 4 },
  },
};

export default materialStyles;
