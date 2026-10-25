import { Navigate, Link, Route, Routes } from "react-router";
import { useAuth } from "./AuthContext.tsx";
import MyBooks from "./MyBooks.tsx";
import Login from "./Login.tsx";
import Library from "./Library.tsx";

function App() {
  const { token, login, logout } = useAuth();

  return (
    <>
      <h1>Моя библиотека</h1>
      {token ? (
        <p>
          Вы вошли <button onClick={logout}>Выйти</button>
        </p>
      ) : (
        <Login onLogin={login} />
      )}
      <nav>
        <Link to="/">Каталог</Link>{" "}
        {token && <Link to="/my-books">Мои книги</Link>}
      </nav>
      <Routes>
        <Route path="/" element={<Library />} />
        <Route
          path="/my-books"
          element={token ? <MyBooks /> : <Navigate to="/" />}
        />
      </Routes>
    </>
  );
}

export default App;
