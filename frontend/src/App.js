import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import "./App.css";

import CodeEditorScreen from "./components/code-editor-screen/CodeEditorScreen";
import pyrunnerReducer from "./reducers/pyrunner-reducer";

const store = configureStore({
  reducer: {
    pyrunner: pyrunnerReducer,
  },
});

function App() {
  return (
    <Provider store={store}>
      <CodeEditorScreen />
    </Provider>
  );
}

export default App;
