import { Switch, Route } from "react-router-dom";
import { Home, Images, News, Search, Videos } from './components'

const App = () => {
  return ( 
    <>
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
    </>
   );
}
 
export default App;