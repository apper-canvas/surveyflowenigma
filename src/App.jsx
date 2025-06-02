import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import SurveyLanding from './pages/SurveyLanding'
import SurveyBuilder from './pages/SurveyBuilder'
import TemplateGallery from './pages/TemplateGallery'
function App() {
  return (
    <Router>
<div className="min-h-screen bg-gradient-to-br from-surface-50 via-primary-50 to-secondary-50">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/survey-landing" element={<SurveyLanding />} />
          <Route path="/survey-builder" element={<SurveyBuilder />} />
          <Route path="/template-gallery" element={<TemplateGallery />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          toastClassName="rounded-xl shadow-soft"
          bodyClassName="text-sm font-medium"
          progressClassName="bg-primary"
        />
      </div>
    </Router>
  )
}

export default App