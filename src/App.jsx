import { useState, useEffect } from "react";
import { Header, AllArticles } from "./components /Index";
import { Routes, Route } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);

  return (
    <main>
      <Header />
      <Routes>
        <Route path="/" element={<AllArticles />} />
      </Routes>
    </main>
  );
}

export default App;
