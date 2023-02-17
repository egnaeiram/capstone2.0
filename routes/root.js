import React from 'react';
import ReactDOM from 'react-dom';
import '..public/styles.css';
import App from './App';
import {AuthProvider} from './context/AuthProvider';
const express = require('express');
const router = express.Router();
const path = require('path');

router.get('^/$|/main(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'main.html'));
});

ReactDOM.render(
    <React.StrictMode>
      <AuthProvider>
        <App />
      </AuthProvider>
    </React.StrictMode>,
    document.getElementById('root')
  );

module.exports = router;