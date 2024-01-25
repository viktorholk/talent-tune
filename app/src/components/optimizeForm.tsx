import LoadingButton from "@mui/lab/LoadingButton";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import styles from "./optimizeForm.module.css";
import { useState } from "react";
import axios from "axios";

export default function optimizeForm(props: {
  onPart: (data: string) => void;
  onStart: () => void;
}) {
  const [snackBarOpen, setSnackbarOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [snackSeverity, setSnackSeverity] = useState<AlertColor>("success");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    jobDescription: "",
    resume: "",
    instructions: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    props.onStart();
    setLoading(true);

    const response = await fetch("http://localhost:3001/optimize", {
      method: "post",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok || !response.body) {
      throw response.statusText;
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    const loopRunner = true;

    while (loopRunner) {
      const { value, done } = await reader.read();
      if (done) {
        setLoading(false);
        break;
      }
      const decodedChunk = decoder.decode(value, { stream: true });
      props.onPart(decodedChunk);
    }
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    setSnackBarOpen(false);
  };

  return (
    <div className={styles.container}>
      <Typography variant="h3" fontWeight={"bold"}>
        Optimize your resume
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          name="jobDescription"
          label="Job description"
          required
          multiline
          maxRows={16}
          margin="normal"
          onChange={handleChange}
        />
        <TextField
          name="resume"
          label="Resume"
          required
          multiline
          maxRows={16}
          margin="normal"
          onChange={handleChange}
        />
        <TextField
          name="instructions"
          label="Instructions"
          margin="normal"
          onChange={handleChange}
        />

        <div className={styles.action_panel}>
          <LoadingButton type="submit" loading={loading} variant="outlined">
            <span>Submit</span>
          </LoadingButton>
        </div>
      </form>
    </div>
  );
}
