import "../styles/globals.css";
import Navbar from "../components/Navbar";
import { Provider } from "react-redux";
import { store } from "../store/store";
import Layout  from "components/Layout";

export default function MyApp({ Component, pageProps }) {
  return (
   
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
    
   
  );
}


