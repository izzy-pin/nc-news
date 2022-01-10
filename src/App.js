import { BrowserRouter } from "react-router-dom";
import "./App.css";
import DateBar from "./components/DateBar";
import Nav from "./components/Nav";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Nav />
        <DateBar />
        <p> nothing here yet</p>
      </div>
    </BrowserRouter>
  );
}

export default App;
