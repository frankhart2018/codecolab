import './App.css';
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router";
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import Home from "./Home";
import SignIn from './Home/components/SignIn';
function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <div className="container">
            <Routes>
              <Route path="/*"
                element={<Home />} />
              <Route path="/components/login" element={<SignIn />} />
            </Routes>
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
