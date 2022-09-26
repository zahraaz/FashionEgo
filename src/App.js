import './App.css';
import Home from './pages/Home';
import Login from "./pages/Login";
import Signup from './pages/signup';
import Bag from './pages/Bag';
import NotFound from './pages/notfound';
import Header from './components/Header';
import Footer from './components/Footer';
import {Switch, Route } from "react-router-dom";
import Product from './components/product';
 import Admin from './components/adminDashboard';
import Logout from './pages/logout';
import CreateProduct from './components/CreateProduct';
import UserProfile from './pages/userProfile';
// ----------------------------------------------------------------------

function App() {

  return (
    <div className="App">
      <Header />


      <Switch>
      <Route path='/' exact >
      <Home /></Route> 

      <Route path='/login' >
      <Login /></Route>

      <Route path="/signup">
        <Signup /></Route>

     <Route path="/logout">
     <Logout /></Route> 

      <Route path="/bag">
      <Bag/></Route> 

      
      <Route path="/userprofile">
      <UserProfile/></Route> 

      <Route path="/product/:id" exact>
      <Product/></Route>

      {/* <Route path="/order" > <Order/></Route>*/}
      <Route path="/admin/dashboard" >
            <Admin/></Route>
     
            <Route path="/admin/addproduct" >
            <CreateProduct/></Route>
     
      <Route >
      < NotFound/></Route> 

      </Switch>

      <Footer />
    </div>
  );
}

export default App;