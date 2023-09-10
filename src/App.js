import { ToastContainer } from "react-toastify";
import "./App.css";
import Home from "./container/Home";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Home />
    </div>
  );
}

export default App;
