import { useState } from "react";
import "./App.css";

export default function App() {
  const [timestamp, setTimestamp] = useState("NULL");

  const handleButtonPress = () => {
    fetch("http://localhost:3001/timestamp")
      .then((response) => response.text())
      .then((text) => {
        setTimestamp(text);
      });
  };

  return (
    <>
      <button onClick={handleButtonPress}>Fetch current time</button>
      {timestamp && (
        <p className="App-intro">
          <b>{timestamp}</b>
        </p>
      )}
    </>
  );
}
