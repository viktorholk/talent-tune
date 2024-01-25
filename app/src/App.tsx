import { useState } from "react";
import "./App.css";
import axios from "axios";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import OptimizeForm from "./components/optimizeForm";
import Markdown from "react-markdown";
import { Box } from "@mui/material";

export default function App() {
  const [output, setOutput] = useState("");

  const handlePart = (data: string) => {
    console.log(data);
    setOutput((o) => o + data);
  };

  return (
    <>
      <OptimizeForm onPart={handlePart} onStart={() => setOutput("")} />
      <Divider></Divider>

      <Box p={5}>
        <Markdown>{output}</Markdown>
      </Box>
    </>
  );
}
