import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { ApplicationForm } from "./pages/ApplicationForm";
import { ApplicationStatus } from "./pages/ApplicationStatus";
import { TrackApplication } from "./pages/TrackApplication";
import { PaymentPage } from "./pages/PaymentPage";
import { AdminDashboard } from "./pages/AdminDashboard";
import { Layout } from "./components/Layout";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/apply" element={<ApplicationForm />} />
          <Route path="/track" element={<TrackApplication />} />
          <Route path="/payment/:id" element={<PaymentPage />} />
          <Route path="/status/:id" element={<ApplicationStatus />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;