import { createBrowserRouter } from "react-router";
import { RootLayout } from "./components/RootLayout";
import { Home } from "./components/Home";
import { Attractions } from "./components/Attractions";
import { Gallery } from "./components/Gallery";
import { PlanVisit } from "./components/PlanVisit";
import { Contact } from "./components/Contact";
import { Login } from "./components/Login";
import { Signup } from "./components/Signup";
import { Dashboard } from "./components/Dashboard";
import { ForgotPassword } from "./components/ForgotPassword";
import { ResetPassword } from "./components/ResetPassword";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      { path: "attractions", Component: Attractions },
      { path: "gallery", Component: Gallery },
      { path: "plan-visit", Component: PlanVisit },
      { path: "contact", Component: Contact },
    ],
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/signup",
    Component: Signup,
  },
  {
    path: "/forgot-password",
    Component: ForgotPassword,
  },
  {
    path: "/reset-password",
    Component: ResetPassword,
  },
  {
    path: "/dashboard",
    Component: Dashboard,
  },
]);