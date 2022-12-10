import "./App.css";
import { Routes, Route } from "react-router";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import Home from "./Home";
import SignIn from "./Home/components/SignIn";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import userDetailsReducer from "./reducers/user-details-reducer";
import pyrunnerReducer from "./reducers/pyrunner-reducer";
import SignUp from "./Home/components/SignUp";
import ForgotPassword from "./Home/components/ForgotPassword";
import AllProjects from "./Home/components/AllProjects";
import CodeEditorScreen from "./components/code-editor-screen/CodeEditorScreen";
import ResetPassword from "./Home/components/ResetPassword";
import CodeSharer from "./components/code-sharer/CodeSharer";
import projectReducer from "./reducers/project-reducer";
import CurrentUser from "./Home/components/CurrentUser";
import ProfilePage from "./Home/components/ProfilePage";
import EditProfilePage from "./Home/components/EditProfilePage";
import ProtectedRoute from "./Home/components/ProtectedRoute";

const store = configureStore({
  reducer: {
    userDetails: userDetailsReducer,
    pyrunner: pyrunnerReducer,
    project: projectReducer,
  },
});

const App = () => {
  return (
    <div>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <div className="container">
            <CurrentUser>
              <Routes>
                <Route path="/*" element={<Home />} />
                <Route path="/login" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/profile" element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                } />
                <Route path="/edit-profile" element={
                  <ProtectedRoute>
                    <EditProfilePage />
                  </ProtectedRoute>
                } />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/all-projects" element={
                  <ProtectedRoute>
                    <AllProjects />
                  </ProtectedRoute>
                } />
                <Route path="/code-editor/*" element={<CodeEditorScreen />} />
                <Route path="/code-sharer/*" element={<CodeSharer />} />
                <Route
                  path="/api/reset-password/:id/:token"
                  element={<ResetPassword />}
                />
              </Routes>
            </CurrentUser>
          </div>
        </ThemeProvider>
      </Provider>
    </div>
  );
};

export default App;
