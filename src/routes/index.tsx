import { Routes, Route } from "react-router-dom";
import { Dashboard } from "../pages/Dashboard";
import { Repo } from "../pages/Repo";

export const MyRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/repositories/:repository" element={<Repo />} />
    </Routes>
  );
};
