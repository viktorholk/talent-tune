import React, { useState } from 'react'
import Header from './Header'
import optimizeForm from './optimizeForm'
import OptimizeForm from './optimizeForm';
import { Divider, Box } from '@mui/material';
import Markdown from 'react-markdown';

const Homepage = () => {

    const [output, setOutput] = useState("");

const handlePart = (data: string) => {
  setOutput((o) => o + data);
};
  return (
    <>
        <nav>
                  <Header></Header>
        </nav>
        
    <OptimizeForm onPart={handlePart} onStart={() => setOutput("")} />
    <Divider></Divider>
    <Box p={5}>
      <Markdown>{output}</Markdown>
    </Box>
    </>
  )
}

export default Homepage
