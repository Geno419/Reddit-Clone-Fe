import { useState, useEffect } from "react";
import { Header, AllArticles, SingleArticle } from "./components /Index";
import { Routes, Route } from "react-router-dom";
import { fetchUsers } from "./utils/api";

function App() {
  const [singleArticle, setSingleArticle] = useState({});
  const [user, setUser] = useState({});

  useEffect(() => {
    fetchUsers().then((res) => {
      setUser(res[4]); //use this to change user range 0-5
    });
  }, []);
  return (
    <main>
      <Header user={user} />
      <Routes>
        <Route
          path="/"
          element={<AllArticles setSingleArticle={setSingleArticle} />}
        />
        <Route
          path="/SingleArticle/:article_id"
          element={<SingleArticle user={user} />}
        />
      </Routes>
    </main>
  );
}

export default App;
