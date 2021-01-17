import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
//import "../node_modules/bootstrap/dist/css/bootstrap.bundle"
import Home from './Components/Home'
import Activities from './Components/Activities'
import Goals from './Components/Goals'
import Help from './Components/Help'
import Error from './Components/Error404'
import Navbar from './Components/Navbar'
import { Switch, Route, Redirect } from "react-router-dom";



const App = () =>{
  return (
    <div className="App">
      <Navbar/>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/home" component={Home}/>
        <Route exact path="/activities" component={Activities} />
        <Route exact path="/goals" component={Goals} />
        <Route exact path="/help" component={Help} />
        <Route exact path="/Error404" component={Error} />
        <Redirect to="/Error404" /> 
      </Switch>
     
      
    </div>
  );
}

export default App;
