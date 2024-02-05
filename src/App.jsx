import { useState, useEffect } from "react";
import { Header, AllArticles } from "./components /Index";

function App() {
  const [count, setCount] = useState(0);

  return (
    <main>
      <Header />
      <AllArticles />
    </main>
  );
}

export default App;
