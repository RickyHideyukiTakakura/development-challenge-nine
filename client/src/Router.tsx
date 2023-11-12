import { Route, Routes } from "react-router-dom";
import { DefaultLayout } from "./layouts/DefaultLayout";
import { Details } from "./pages/Details";
import { Edit } from "./pages/Edit";
import { Home } from "./pages/Home";
import { New } from "./pages/New";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/new" element={<New />} />
        <Route path="/edit" element={<Edit />} />
        <Route path="/details" element={<Details />} />
      </Route>
    </Routes>
  );
}
