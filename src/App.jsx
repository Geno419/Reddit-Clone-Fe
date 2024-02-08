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
  const [user, setUser] = useState({});

  useEffect(() => {
    fetchUsers().then((res) => {
      setUser(res[2]);
    });
  }, []);
  return (
    <main>
      <Header user={user} />
      <Routes>
        <Route path="/" element={<AllArticles />} />
        <Route path="/:topic" element={<Topic />} />
        <Route
          path="/SingleArticle/:article_id"
          element={<SingleArticle user={user} />}
        />
        <Route path="/NotFound" element={<NotFound />} />
      </Routes>
    </main>
  );
}

export default App;
