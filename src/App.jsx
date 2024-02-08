import { useState, useEffect } from "react";
import {
  Header,
  AllArticles,
  SingleArticle,
  Topic,
  NotFound,
} from "./components /Index";
import { Routes, Route } from "react-router-dom";
import { fetchUsers } from "./utils/api";

function App() {
  const [singleArticle, setSingleArticle] = useState({});
  const [user, setUser] = useState({});

  useEffect(() => {
    fetchUsers().then((res) => {
      setUser(res[0]);
    });
  }, []);
  return (
    <main>
      <Header user={user} />
      <Routes>
        <Route path="/" element={<AllArticles />} />
        <Route path="/topic/:topic" element={<Topic />} />
        <Route
          path="/SingleArticle/:article_id"
          element={<SingleArticle user={user} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  );
}

export default App;
