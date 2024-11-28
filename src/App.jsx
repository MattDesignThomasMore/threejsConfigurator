// App.jsx
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Scene from "./components/scene/Scene.jsx";
import CustomizationContextProvider from "./context/CustomizationContex.jsx";
import CustomizationInterface from "./components/CustomizationInterface.jsx";
import MobileCustomizationInterface from "./components/MobileCustomizationInterface.jsx";
import Media from "react-media";
import OrderPage from './components/OrderPage'; // Zorg ervoor dat je deze component hebt

function App() {
  return (
    <CustomizationContextProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Als de route /order is, laat de OrderPage zien */}
            <Route path="/order" element={<OrderPage />} />

            {/* Als de route root ("/") is, laat de CustomizationInterface zien */}
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
