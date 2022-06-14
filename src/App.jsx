import { Switch, Route } from "react-router-dom";
import { Header, Footer, Home, Images, News, Search, Videos, SettingsPanel } from './components';
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { deviceIsDarkScheme } from "./features/theme";

const App = () => {
  const { pathname } = useLocation();
  const theme = useSelector(state => state.theme.value); // Selecting current theme state -> (light || dark || deviceDefault)
  
  return ( 
    ///** Adds "dark" class to App root if theme value is 'dark' or is 'deviceDefault' but Browser theme is Dark */
    <div className={`${(theme === 'dark' || (theme === 'deviceDefault' && deviceIsDarkScheme)) ? 'dark ' : ''}flex flex-col min-h-screen`}>
      { pathname !== "/" && <Header page={ pathname.slice(1) } /> /** Renders Header Component Everywhere except on the HOME path */ }
        
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

        { /** Settings Panel Component Rendered for all Components */ }
        <SettingsPanel /> 
        {/* --- */}

      { pathname !== "/" && <Footer />  /** Renders Footer Component Everywhere except on the HOME path */  }
    </div>
   );
}
 
export default App;