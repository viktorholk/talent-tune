import "./App.css";
import { Container} from "@mui/material";
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import  Login  from "./components/Login";
import Register from "./components/Register";
import Homepage from "./components/Homepage";

/*export default function App() {
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
}*/

export default function App() {
  return (
    <Router>
      <Container>
          <Routes>
            <Route path="/home" element={<Homepage/>}>
            </Route>
            <Route path="/register" element={<Register></Register>}>
            </Route>
            <Route path="/" element={<Login/>}>
            </Route>
          </Routes>
      </Container>
    </Router>
    
  );
}
