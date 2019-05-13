import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import compose from 'recompose/compose';
import classNames from 'classnames';
import Hidden from '@material-ui/core/Hidden';
import withWidth from '@material-ui/core/withWidth';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ExpandMore from '@material-ui/icons/ExpandMore';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Drawer from '@material-ui/core/Drawer';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import ImageLoader from 'react-loading-image';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import materialStyles from 'styles/material';


class HeadshotHeader extends Component {
  static defaultProps = {
    member: {},
    auth: {}
  };

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      anchorEl: null,
      mobileMoreAnchorEl: null,
      open: false,
      search: ''
    };
  }

  componentDidMount() {
  }

  hanldeClickLogout = () => {
    this.props.logout(this.props.auth.access.token);
    this.props.history.push('/login')
  };

  handleClick = event => {
    this.setState({
      anchorEl: event.currentTarget,
    });
  };

  handleClickLogin = () => {
    this.props.history.push('/login')
  };

  handleClickSignUp = () => {
    this.props.history.push('/sign-up')
  };

  handleMenuClose = () => {
    this.setState({
      anchorEl: null,
    });
    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  getUserAvatarFromProps() {
    const { clientInfo } = this.props

    return null
  }

  renderTopbarMenuItem(title, link) {
    const { classes } = this.props;
    return (
      <Link to={link} style={{display: 'inline-block', textDecorationLine: 'none'}}>
        <Typography
          className={classNames(classes.menuItemText, classes.topbarMenuItemTitle, classes.topbarDynamicShow)}
        >
          {title}
        </Typography>
      </Link>
    )
  }

  renderDrawerListItem(title, key) {
    return (
      <div onClick={() => this.handleClickListItem(key)}>
        <ListItem button>
          <ListItemText primary={title} />
        </ListItem>
      </div>
    );
  }

  handleClickListItem = (key) => {
    this.setState({ open: false });
    if (this.props.onChangeMenu) this.props.onChangeMenu({key})
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };
  
  handleSearchChange = (event) => {
    this.setState({ search: event.target.value });
  };
  
  handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.handleSearch();
    }
  };

  handleSearch = () => {
    let data = {
      talent_name_or_tid: this.state.search
    };
    // this.props.clientActions.talentSearch(data);
    // this.props.history.push('/client/talent_search_result');
  };

  render() {
    const { auth, clientInfo, classes } = this.props;
    const { anchorEl, mobileMoreAnchorEl, open } = this.state;
    const openAnchor = Boolean(anchorEl);
    const loggedIn = (auth && auth.access && auth.access.email);
    let username = "";
    let userAvatar = null;

    if (loggedIn) {
      if (clientInfo){
        username = clientInfo.user.first_name;
        if (username !== "")
          username = username.charAt(0).toUpperCase() + username.slice(1);
        userAvatar = this.getUserAvatarFromProps()
      }
    }

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const renderMenu = loggedIn ? (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.hanldeClickLogout}>{"Logout"}</MenuItem>
      </Menu>
    ) : (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.handleClickLogin}>{"Login"}</MenuItem>
        <MenuItem onClick={this.handleClickSignUp}>{"Sign Up"}</MenuItem>
      </Menu>
    );

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar className={classes.appBar}>
            <Hidden only={['xl', 'lg']}>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleDrawerOpen}
                className={classNames(classes.drawerMenuButton, open && classes.hide)}
              >
                <MenuIcon />
              </IconButton>
            </Hidden>
            <Hidden only={['md', 'sm', 'xs']}>
              <Typography
                className={classNames(classes.brandTitle, classes.topbarDynamicShow)}
              >
              </Typography>
              {/* <img className={classes.brandImage}
                alt="Logo"
                src={require('../../images/logo.jpg')} 
              /> */}
            </Hidden>

            <div className={classes.grow}/>

            <Hidden only={['md', 'sm', 'xs']}>
              <div className={classNames(classes.topbarDynamicShow, )}>
                {this.renderTopbarMenuItem('HOME', '/')}
                {this.renderTopbarMenuItem('CONTACT', '/contact')}
              </div>
            </Hidden>
            
          </Toolbar>
        </AppBar>

        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <img 
              className={classes.drawerBandImage}
              alt="Logo"
              src={require('../../images/logo.jpg')} 
            />
            <IconButton onClick={this.handleDrawerClose}>
              {<ChevronLeftIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>
            {this.renderDrawerListItem('Productions', 'productions')}
          </List>
        </Drawer>
      </div>
    )
  }
}

export default compose(withStyles(materialStyles, { withTheme: true }),
  withWidth(),)(HeadshotHeader);
