import { useState } from "react";
import { Navigate, Link, Route, Routes } from "react-router";
import MyBooks from "./MyBooks.tsx";
import Login from "./Login.tsx";
import Library from "./Library.tsx";

function App() {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token"),
  );

  function handleLogin(newToken: string) {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  }

  function handleLogout() {
    setToken(null);
    localStorage.removeItem("token");
  }

  return (
    <>
      <h1>Моя библиотека</h1>
      {token ? (
        <p>
          Вы вошли <button onClick={handleLogout}>Выйти</button>
        </p>
      ) : (
        <Login onLogin={handleLogin} />
      )}
      <nav>
        <Link to="/">Каталог</Link>{" "}
        {token && <Link to="/my-books">Мои книги</Link>}
      </nav>
      <Routes>
        <Route path="/" element={<Library token={token} />} />
        <Route
          path="/my-books"
          element={token ? <MyBooks token={token} /> : <Navigate to="/" />}
        />
      </Routes>
    </>
  );
}

export default App;
