import { Switch, Route } from "react-router-dom";
import { Home, Search } from './components'

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
      </Switch>
    </>
   );
}
 
export default App;