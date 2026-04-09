import { createBrowserRouter } from "react-router";
import { Root } from "./Root";
import { HomePage } from "./pages/HomePage";
import { EvaluationPage } from "./pages/EvaluationPage";
import { PreventionPage } from "./pages/PreventionPage";
import { AboutPage } from "./pages/AboutPage";
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: HomePage },
      { path: "evaluation", Component: EvaluationPage },
      { path: "prevention", Component: PreventionPage },
      { path: "a-propos", Component: AboutPage },
      { path: "*", Component: NotFound },
    ],
  },
]);
