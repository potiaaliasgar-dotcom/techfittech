import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { ScrollToTop } from "./components/layout/ScrollToTop";
import { GlobalLoader } from "./components/layout/GlobalLoader";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { MMACages } from "./pages/MMACages";
import { CrossFitRigs } from "./pages/CrossFitRigs";
import { FreeWeights } from "./pages/FreeWeights";
import { PadelPickleball } from "./pages/PadelPickleball";
import { Aqua } from "./pages/Aqua";
import { GetAQuote } from "./pages/GetAQuote";

// Page stubs
const NotFound = () => <div className="p-24 text-center text-4xl font-black uppercase text-red-600 min-h-[60vh]">404 - Page Not Found</div>;

function App() {
  return (
    <Router>
      <GlobalLoader />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="mma-cages" element={<MMACages />} />
          <Route path="crossfit-rigs" element={<CrossFitRigs />} />
          <Route path="free-weights" element={<FreeWeights />} />
          <Route path="padel-pickleball" element={<PadelPickleball />} />
          <Route path="aqua" element={<Aqua />} />
          <Route path="get-a-quote" element={<GetAQuote />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
