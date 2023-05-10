import React from 'react';
import ReactDOM from 'react-dom/client';
import "bootstrap/dist/css/bootstrap.min.css";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter,
  Routes, Route
} from "react-router-dom";
import Login from './login.js'
import Home from './home.js'
import Signup from './signup.js'
import Disease from './Disease/disease'
import Createdisease from './Disease/createdisease'
import Editdisease from './Disease/editdisease';
import Drug from './Drug/drug';
import Createdrug from './Drug/createdrug';
import Editdrug from './Drug/editdrug';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/disease' element={<Disease/>}/>
      <Route path='/createdisease' element={<Createdisease/>}/>
      <Route path='/editdisease/:id' element={<Editdisease/>}/>
      <Route path='/drug' element={<Drug/>}/>
      <Route path='/createdrug' element={<Createdrug/>}/>
      <Route path='/editdrug/:id' element={<Editdrug/>}/>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
