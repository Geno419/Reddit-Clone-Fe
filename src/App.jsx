import { useState, useEffect } from "react";
import { Header, AllArticles, SingleArticle } from "./components /Index";
import { Routes, Route } from "react-router-dom";

function App() {
  const [singleArticle, setSingleArticle] = useState({});

  return (
    <main>
      <Header />
      <Routes>
        <Route
          path="/"
          element={<AllArticles setSingleArticle={setSingleArticle} />}
        />
        <Route
          path="/SingleArticle"
          element={<SingleArticle singleArticle={singleArticle} />}
        />
      </Routes>
    </main>
  );
}

export default App;
