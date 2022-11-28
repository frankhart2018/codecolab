import './App.css';
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router";
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import Home from "./Home";
import SignIn from './Home/components/SignIn';
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import userDetailsReducer from './reducers/user-details-reducer';
import SignUp from './Home/components/SignUp';
function App() {
  const store = configureStore({
    reducer: {
      userDetails: userDetailsReducer
    }
  });
  return (
    <div>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <div className="container">
              <Routes>
                <Route path="/*"
                  element={<Home />} />
                <Route path="/components/login" element={<SignIn />} />
                <Route path="/components/sign-up" element={<SignUp />} />
              </Routes>
            </div>
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    </div>
  );
}

export default App;
