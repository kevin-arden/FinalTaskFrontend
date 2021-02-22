import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

//context
import { AppContext } from "../Context/globalContext";

const PrivateRouteAdmin = ({ component: Component, ...rest }) => {
  const [state] = useContext(AppContext);
  const isLogin = state.isLogin;
  const isAdmin = state.isAdmin;

  return (
    <Route
      {...rest}
      render={(props) =>
        isLogin && isAdmin ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

export default PrivateRouteAdmin;
