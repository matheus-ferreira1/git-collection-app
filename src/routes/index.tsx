import React from "react";
import { Routes, Route } from "react-router-dom";
// import { Dashboard } from "../pages/Dashboard";
// import { Repo } from "../pages/Repo";

const Dashboard = React.lazy(() => import("../pages/Dashboard"));
const Repo = React.lazy(() => import("../pages/Repo"));

export const MyRoutes: React.FC = () => {
  return (
    <React.Suspense fallback={"Loading..."}>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/repositories/:repository" element={<Repo />} />
      </Routes>
    </React.Suspense>
  );
};
