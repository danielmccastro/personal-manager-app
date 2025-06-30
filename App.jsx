import { useContext } from "react";
import { AppContext } from "./contexts/AppContext";
import AppProvider from "./contexts/AppContext";
import Home from "./pages/Home";
import Splash from "./pages/Splash";

function MainApp() {
  const { loading } = useContext(AppContext);
  return loading ? <Splash /> : <Home />;
}

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}
