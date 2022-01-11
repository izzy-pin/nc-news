import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import ArticlesList from "./components/ArticlesList";
import Header from "./components/header/Header";
import SingleArticle from "./components/ArticlePage/SingleArticlePage";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<ArticlesList />} />
          <Route path="/articles" element={<ArticlesList />} />
          <Route path="/topics/:topic" element={<ArticlesList />} />
          <Route path="/articles/:article_id" element={<SingleArticle />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
