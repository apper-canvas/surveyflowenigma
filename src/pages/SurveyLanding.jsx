import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import ApperIcon from '../components/ApperIcon'

const SurveyLanding = () => {
  const navigate = useNavigate()

  const handleCreateFromScratch = () => {
    navigate('/survey-builder')
  }

  const handleCreateFromTemplate = () => {
    navigate('/template-gallery')
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold gradient-text mb-6">
          Create Amazing Surveys
        </h1>
        <p className="text-lg sm:text-xl text-surface-600 max-w-3xl mx-auto mb-8">
          Build engaging surveys with our powerful no-code platform. Choose from templates or start from scratch.
        </p>
      </motion.div>

      {/* Main Options */}
      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Create from Scratch */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="survey-card p-8 hover:scale-105 transition-transform duration-300 cursor-pointer group"
          onClick={handleCreateFromScratch}
        >
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <ApperIcon name="Plus" className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-surface-900 mb-4">Create from Scratch</h3>
            <p className="text-surface-600 mb-6 leading-relaxed">
              Start with a blank canvas and build your survey exactly how you want it. Full creative control with our drag-and-drop builder.
            </p>
            <div className="space-y-3 text-sm text-surface-500">
              <div className="flex items-center justify-center space-x-2">
                <ApperIcon name="Palette" className="w-4 h-4" />
                <span>Complete customization</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <ApperIcon name="Layers" className="w-4 h-4" />
                <span>Drag & drop builder</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <ApperIcon name="Zap" className="w-4 h-4" />
                <span>Advanced question types</span>
              </div>
            </div>
            <div className="mt-8">
              <button className="w-full bg-gradient-to-r from-primary to-primary-600 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transition-all duration-200">
                Start Building
              </button>
            </div>
          </div>
        </motion.div>

        {/* Create from Template */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="survey-card p-8 hover:scale-105 transition-transform duration-300 cursor-pointer group"
          onClick={handleCreateFromTemplate}
        >
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-secondary to-secondary-dark rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <ApperIcon name="FileText" className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-surface-900 mb-4">Choose a Template</h3>
            <p className="text-surface-600 mb-6 leading-relaxed">
              Get started quickly with professionally designed templates for common use cases. Customize to fit your needs.
            </p>
            <div className="space-y-3 text-sm text-surface-500">
              <div className="flex items-center justify-center space-x-2">
                <ApperIcon name="Clock" className="w-4 h-4" />
                <span>Quick setup</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <ApperIcon name="Star" className="w-4 h-4" />
                <span>Professional designs</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <ApperIcon name="Users" className="w-4 h-4" />
                <span>Proven templates</span>
              </div>
            </div>
            <div className="mt-8">
              <button className="w-full bg-gradient-to-r from-secondary to-secondary-dark text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transition-all duration-200">
                Browse Templates
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Features Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mt-20 text-center"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-surface-900 mb-12">
          Why Choose SurveyFlow?
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mx-auto">
              <ApperIcon name="MousePointer" className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-surface-900">Drag & Drop</h3>
            <p className="text-sm text-surface-600">Intuitive builder with no coding required</p>
          </div>
          <div className="space-y-4">
            <div className="w-12 h-12 bg-secondary-light/20 rounded-xl flex items-center justify-center mx-auto">
              <ApperIcon name="BarChart3" className="w-6 h-6 text-secondary" />
            </div>
            <h3 className="font-semibold text-surface-900">Real-time Analytics</h3>
            <p className="text-sm text-surface-600">Track responses and generate insights</p>
          </div>
          <div className="space-y-4">
            <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center mx-auto">
              <ApperIcon name="Share2" className="w-6 h-6 text-accent" />
            </div>
            <h3 className="font-semibold text-surface-900">Easy Sharing</h3>
            <p className="text-sm text-surface-600">Share via link, email, or embed</p>
          </div>
          <div className="space-y-4">
            <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mx-auto">
              <ApperIcon name="Sparkles" className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-surface-900">AI-Powered</h3>
            <p className="text-sm text-surface-600">Smart question suggestions</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default SurveyLanding