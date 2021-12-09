import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";

import { AppContextProvider } from "./Context/globalContext";
import { CartContextProvider } from "./Context/cartContext";

import { setAuthToken } from "./Config/api";


// import SubscribePage from "./Pages/SubscribePage/SubscribePage";
import ProfilePage from "./Pages/ProfilePage/ProfilePage";
import PrivateRoute from "./Components/PrivateRoute";
import PrivateRouteAdmin from "./Components/PrivateRouteAdmin";
import TransactionPage from "./Pages/TransactionPage/TransactionPage";
import AddBook from "./Pages/AddBook/AddBook";
import DetailBook from "./Pages/DetailBook/DetailBook";
// import ReadBook from "./Pages/ReadBook/ReadBook";
import LandingPage from "./Pages/LandingPage/LandingPage";
import Cart from "./Pages/CartPage/CartPage"

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  return (
    <CartContextProvider>
      <AppContextProvider>
        <Router>
          <div>
            <Switch>
              <Route path="/" exact>
                <LandingPage />
              </Route>
              
              <PrivateRoute path="/profile" exact component={ProfilePage} />
              <PrivateRoute path="/cart" exact component={Cart} />
              <PrivateRoute path="/book/:id" exact component={DetailBook} />
           
              <PrivateRouteAdmin
                path="/transaction"
                exact
                component={TransactionPage}
              />
              <PrivateRouteAdmin path="/addbook" exact component={AddBook} />
            </Switch>
          </div>
        </Router>
      </AppContextProvider>
    </CartContextProvider>
  );
}

export default App;
