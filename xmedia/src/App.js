import {
  Switch,
  Route,
  useHistory
} from "react-router-dom";

import './App.css';
import Home from "./components/Home";
import Landing from "./components/Landing";
import NotFound from "./components/NotFound";
import './App.css'
import { connect } from "react-redux";
import { useEffect } from "react";
import * as actionCreators from "./reducer/actionCreator";

function App(props) {

  const history = useHistory()

  useEffect(() => {
    props.fetchData()
    if (props.auth) {
      history.push('/browse')
    } else {
      history.push('/')
    }
  }, [props.auth])

  return (
    <div className="App">
      <Switch>
        <Route path="/browse">
          <Home />
        </Route>
        <Route path="/">
          <Landing />
        </Route>
        <Route component={NotFound} />
      </Switch>
    </div>
  );

}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    auth: state.isLoggedIn
  }
}

export default connect(mapStateToProps, actionCreators)(App);
