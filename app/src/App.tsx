import { useState } from "react";
import "./App.css";
import Divider from "@mui/material/Divider";
import OptimizeForm from "./components/optimizeForm";
import Markdown from "react-markdown";
import { Box } from "@mui/material";

export default function App() {
  const [output, setOutput] = useState("");

  const handlePart = (data: string) => {
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
