import React from 'react';
import './App.css';
import routes from './routes';
import ListIssues from './Pages/ListIssues';
import IssuesForm from './Pages/IssuesForm';
import { Button } from "@mui/material"
import { useRoutes } from 'react-router-dom';

function App() {
  const routing = useRoutes(routes)
  return (
    <div>
     {routing}
    </div>
  );
}

export default App;
