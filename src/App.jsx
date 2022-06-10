import { Switch, Route } from "react-router-dom";
import { Header, Footer, Home, Images, News, Search, Videos, SettingsPanel } from './components';
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { deviceIsDarkScheme } from "./features/theme";

const App = () => {
  const location = useLocation();
  const theme = useSelector(state => state.theme.value); // Selecting current theme state -> (light || dark || deviceDefault)
  
  return ( 
    <div className={(theme === 'dark' || (theme === 'deviceDefault' && deviceIsDarkScheme)) ? 'dark' : undefined}> {/** Adds "dark" class to App root if theme value is 'dark' or is 'deviceDefault' but Browser theme is Dark */}
      { location.pathname !== "/" && <Header page={ location.pathname.slice(1) } /> /** Renders Header Component Everywhere except on the HOME path */ }
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
        <SettingsPanel /> { /** Settings Panel Component Rendered for all Components */ }
      { location.pathname !== "/" && <Footer />  /** Renders Footer Component Everywhere except on the HOME path */  }
    </div>
   );
}
 
export default App;