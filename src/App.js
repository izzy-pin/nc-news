import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import DateBar from "./components/DateBar";
import Nav from "./components/Nav";
import ArticlesList from "./components/ArticlesList";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Nav />
        <DateBar />
        <Routes>
          <Route path="/" element={<ArticlesList />} />
          <Route path="/articles" element={<ArticlesList />} />
          <Route path="/topics/:topic" element={<ArticlesList />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
