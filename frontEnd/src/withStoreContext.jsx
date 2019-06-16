// Wrapper  allow the state of App.jsx to be accessed by any component that uses
// import withStoreContext .... export default withStoreContext(Component)

import React from "react";
import { StoreConsumer } from "./storeContext";

export function withStoreContext(Component) {
  return function WrapperComponent(props) {
    return (
      <StoreConsumer>
        {state => <Component {...props} context={state} />}
      </StoreConsumer>
    );
  };
}
