import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";

import AuthPanel from "./forms/AuthPanel";
import PrivateRoutes from "./routes/PrivateRoutes";
import ClassList from "./components/ClassList/ClassList";
import Class from "./components/Class/Class";
import Home from "./pages/Home/Home";
import HomeRoutes from "./routes/HomeRoutes";
import ViewAllSubmissions from "./pages/ViewAllSubmissions/ViewAllSubmissions";
import Profile from "./components/Profile/Profile";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route element={<HomeRoutes />}>
        <Route path="/authPanel" element={<AuthPanel />} />
      </Route>
      <Route element={<PrivateRoutes />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="dashboard" element={<Dashboard />}>
          <Route index element={<ClassList />} /> {/* Default route */}
          <Route path=":classId" element={<Class />} /> {/* Dynamic route */}
          <Route path=":classId/:taskId" element={<ViewAllSubmissions />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
