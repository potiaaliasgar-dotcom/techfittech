import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Layout } from "./components/layout/Layout";
import { ScrollToTop } from "./components/layout/ScrollToTop";
import { GlobalLoader } from "./components/layout/GlobalLoader";
import { Home } from "./pages/Home";

// Lazy load non-critical routes
const About = lazy(() => import("./pages/About").then(m => ({ default: m.About })));
const MMACages = lazy(() => import("./pages/MMACages").then(m => ({ default: m.MMACages })));
const CrossFitRigs = lazy(() => import("./pages/CrossFitRigs").then(m => ({ default: m.CrossFitRigs })));
const FreeWeights = lazy(() => import("./pages/FreeWeights").then(m => ({ default: m.FreeWeights })));
const PadelPickleball = lazy(() => import("./pages/PadelPickleball").then(m => ({ default: m.PadelPickleball })));
const Aqua = lazy(() => import("./pages/Aqua").then(m => ({ default: m.Aqua })));
const GetAQuote = lazy(() => import("./pages/GetAQuote").then(m => ({ default: m.GetAQuote })));

// Page stubs
const NotFound = () => <div className="p-24 text-center text-4xl font-black uppercase text-red-600 min-h-[60vh]">404 - Page Not Found</div>;

function App() {
  return (
    <Router>
      <GlobalLoader />
      <ScrollToTop />
      <Suspense fallback={null}>
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
      </Suspense>
    </Router>
  );
}

export default App;
