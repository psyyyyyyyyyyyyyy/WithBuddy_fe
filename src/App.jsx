import AppRoutes from "./router/Routes";
import "./App.css";
import "./util/settingFCM.js";
export default function App() {
  return (
    <div className="container">
      <AppRoutes />
    </div>
  );
}
