// src/App.js
import React from "react";
import { Container, CssBaseline, Paper, Typography } from "@material-ui/core";
import VideoChat from "./components/VideoChat";

function App() {
  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Paper style={{ marginTop: 20, padding: 20 }}>
        <Typography variant="h5">P2P Video Call</Typography>
        <VideoChat />
      </Paper>
    </Container>
  );
}

export default App;
