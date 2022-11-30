import './App.css';
import { Routes, Route } from "react-router";
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import Home from "./Home";
import SignIn from './Home/components/SignIn';
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import userDetailsReducer from './reducers/user-details-reducer';
import SignUp from './Home/components/SignUp';
import ForgotPassword from './Home/components/ForgotPassword';
import AllProjects from './Home/components/AllProjects';
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
            <div className="container">
              <Routes>
                <Route path="/*"
                  element={<Home />} />
                <Route path="/login" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/all-projects" element={<AllProjects />} />
              </Routes>
            </div>
        </ThemeProvider>
      </Provider>
    </div>
  );
}

export default App;
