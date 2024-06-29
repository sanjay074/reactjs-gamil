import React, { useState } from 'react';
import './App.css'
import axios from 'axios';
import { Container, TextField, Button, Typography, Box, Alert, Grid, Paper } from '@mui/material';

function App() {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [text, setText] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');

    try {
      const response = await axios.post('https://node-gmail-1.onrender.com/send-email', {
        to,
        subject,
        text,
      });

      if (response.status === 200) {
        setMessage('Email sent successfully');
      } else {
        setMessage('Error sending email');
      }
    } catch (error) {
      console.error(error);
      setMessage('Error sending email');
    }
  };

  return (
    <Container maxWidth="xl" sx={{ height: '100vh' }}>
      <Grid
        container
        spacing={0}
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}
      >
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <Paper elevation={3} sx={{ padding: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              Send Anonymous Email
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="To"
                type="email"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                required
                margin="normal"
              />
              <TextField
                fullWidth
                label="Subject"
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
                margin="normal"
              />
              <TextField
                fullWidth
                label="Message"
                multiline
                rows={4}
                value={text}
                onChange={(e) => setText(e.target.value)}
                required
                margin="normal"
              />
              <Button variant="contained" color="primary" type="submit" fullWidth sx={{ mt: 2 }}>
                Send Email
              </Button>
            </form>
            {message && (
              <Alert severity={message.includes('successfully') ? 'success' : 'error'} sx={{ mt: 2 }}>
                {message}
              </Alert>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
