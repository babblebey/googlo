import { Switch, Route } from "react-router-dom";
import { Header, Footer, Home, Images, News, Search, Videos, Settings } from './components';
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const App = () => {
  const location = useLocation();
  console.log(location, location.pathname);

  // const settingsToggle = useSelector(state => state.settingsToggle.value);

  return ( 
    <>
      { location.pathname !== "/" && <Header page={ location.pathname.slice(1) } /> }
        <Switch>
          <Route exact path={'/'}>
            <Home />
          </Route>
          <Route path={'/search'}>
            <Search />
          </Route>
          <Route path={'/images'}>
            <Images />
          </Route>
          <Route path={'/videos'}>
            <Videos />
          </Route>
          <Route path={'/news'}>
            <News />
          </Route>
        </Switch>
        <Settings />
      { location.pathname !== "/" && <Footer /> }
      
    </>
   );
}
 
export default App;