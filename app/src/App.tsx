import { useState } from "react";
import "./App.css";

import Button from "@mui/material/Button"

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
      <Button onClick={handleButtonPress}>Fetch current time</Button>
      {timestamp && (
        <p className="App-intro">
          <b>{timestamp}</b>
        </p>
      )}
    </>
  );
}
