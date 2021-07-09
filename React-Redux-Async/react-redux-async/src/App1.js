import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "./store/ui-slice";
import React, { useEffect } from "react";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";

const isInitial = true;

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart.items);
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    const sendCartData = async () => {
      dispatch(
        uiActions.showNotification({
          status: "pending",
          title: "Sending...",
          message: "Sending cart data!",
        })
      );

      const response = fetch(
        "https://redux-practice-c0b39-default-rtdb.firebaseio.com/cart",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );

      if (!response.ok) {
        dispatch(
          uiActions.showNotification({
            status: "error",
            title: "Error...",
            message: "Sending cart data Failed!",
          })
        );
      }
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success...",
          message: "Sending cart data successFully!",
        })
      );
    };

    if (isInitial) {
      isInitial = false;
      return;
    }
    
    sendCartData().catch((error) => {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Sending cart data failed!",
        })
      );
    });
  }, [cart]);

  return (
    <React.Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </React.Fragment>
  );
}

export default App;
