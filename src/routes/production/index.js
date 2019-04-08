import Home from 'components/home/Home';
import Productions from 'components/productions/Productions';
import Production from 'components/production/Production';
import HeadshotHomeContainer from 'containers/template/HeadshotHomeContainer';
import HeadshotContainer from 'containers/template/HeadshotContainer';
// import ImageMapEditor from '../../components/imagemap/ImageMapEditor';


const productionRoutes = [
  {
    path: "/",
    layout: HeadshotHomeContainer,
    component: Home,
    exact: true
  },
  {
    path: "/productions",
    layout: HeadshotContainer,
    component: Productions,
    exact: true
  },
  {
    path: "/production",
    layout: HeadshotContainer,
    component: Production,
    exact: true
  },
];

export default productionRoutes;