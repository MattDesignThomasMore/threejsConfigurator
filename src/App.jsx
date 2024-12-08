import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Scene from "./components/scene/Scene.jsx";
import CustomizationContextProvider from "./context/CustomizationContex.jsx";
import CustomizationInterface from "./components/CustomizationInterface.jsx";
import Media from "react-media";
import OrderPage from './components/OrderPage';
import OrderConfirmation from './components/OrderConfirmation'; 

function App() {
  return (
    <CustomizationContextProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/order" element={<OrderPage />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            <Route
              path="/"
              element={
                <>
                  <Scene />
                  <Media queries={{ small: "(max-width: 599px)" }}>
                    {(matches) => (matches.small ? <MobileCustomizationInterface /> : <CustomizationInterface />)}
                  </Media>
                </>
              }
            />
          </Routes>
        </div>
      </Router>
    </CustomizationContextProvider>
  );
}

export default App;
