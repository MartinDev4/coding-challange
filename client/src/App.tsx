import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import RandomQuote from "./Pages/RandomQuote";
import QuotesTable from "./Pages/QuotesTable";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/quotes" />} />
        <Route path="/quotes" element={<QuotesTable />} />
        <Route path="/random-quote" element={<RandomQuote />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
