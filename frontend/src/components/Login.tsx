import { useState } from "react";

function Login({ onLogin }: { onLogin: (token: string) => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    const res = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    if (!res.ok) {
      setError("Invalid login or password");
      return;
    }
    const data = await res.json();
    onLogin(data.token);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder="Username"
        />
        <p />
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Password"
        />
        <p />
        <button type="submit">Enter</button>
        {error && <p>{error}</p>}
      </form>
    </>
  );
}

export default Login;
