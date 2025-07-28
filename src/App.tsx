import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import TodoPage from './pages/TodoPage';
import WeatherPage from './pages/WeatherPage';
import ShoppingPage from './pages/ShoppingPage';
import './App.css';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/todo" element={<TodoPage />} />
      <Route path="/weather" element={<WeatherPage />} />
      <Route path="/shopping" element={<ShoppingPage />} />
    </Routes>
  );
};

export default App;
