const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
const snarkjs = require('snarkjs');

// Serve static files from the public directory
app.use(express.static('public'));

// Serve snarkjs from node_modules
app.use('/node_modules', express.static('node_modules'));

app.use(express.json());

app.post('/verify', async (req, res) => {
    console.log('Received verification request');
    const { proof, publicSignals } = req.body;
    console.log('Proof:', proof);
    console.log('Public Signals:', publicSignals);

    // Read the verification key
    const vKey = JSON.parse(fs.readFileSync('verification_key.json'));

    // Verify the proof
    const verified = await snarkjs.plonk.verify(vKey, publicSignals, proof);
    console.log('Verification result:', verified);

    res.json({ verified });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
