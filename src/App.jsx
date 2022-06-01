import { Switch, Route } from "react-router-dom";
import { Home } from './components'

const App = () => {
  return ( 
    <>
      <Switch>
        <Route exact path={'/'}>
          <Home />
        </Route>
      </Switch>
    </>
   );
}
 
export default App;