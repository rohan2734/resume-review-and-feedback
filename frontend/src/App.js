//react-packages
import {BrowserRouter,Route,Routes} from "react-router-dom";


// routes
import CustomRoutes from "./Routes/CustomRoutes";

//pages
// import Home from "./Pages/Home";

//components
import Navbar from "./Components/Navbar";

import './App.css';


function App() {
  return (
    <div className="App">
      {/* <h1>App.js s</h1> */}
      <Navbar />
      <BrowserRouter>
         <CustomRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;
