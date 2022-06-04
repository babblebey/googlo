import { Switch, Route } from "react-router-dom";
import { Home, Images, Search } from './components'

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
      </Switch>
    </>
   );
}
 
export default App;