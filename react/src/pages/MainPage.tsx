import { BrowserRouter, Route, Routes } from "react-router-dom";

import Switch from "../components/functional/Switch";

const MainPage = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Switch />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MainPage;
