import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";

function App() {
  const [key, setKey] = useState("");

  async function hello() {
    const res = await invoke("health");

    console.log("res = ", res);
  }

  async function insert() {
    const res = await invoke("make_set", { key });

    console.log("res = ", res);

    setGroups(await invoke<string[][]>("groups"));
  }

  const [groups, setGroups] = useState<string[][]>([]);

  return (
    <main className="container">
      <h1>UFDB GUI APP</h1>

      <div className="row">
        <a href="https://tauri.app" target="_blank">
          <img src="/tauri.svg" className="logo tauri" alt="Tauri logo" />
        </a>
      </div>

      <form
        className="row"
        onSubmit={(e) => {
          e.preventDefault();
          insert();
        }}
      >
        <input
          value={key}
          onChange={(e) => setKey(e.currentTarget.value)}
          placeholder="Enter a key..."
        />
        <button type="submit">Insert</button>
      </form>

      <h1>森</h1>
      <ul>
        {groups.map((group, i) => (
          <li key={i}>{group.join(", ")}</li>
        ))}
      </ul>
    </main>
  );
}

export default App;
