import MainFeature from '../components/MainFeature'
import ApperIcon from '../components/ApperIcon'
import { motion } from 'framer-motion'

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="border-b border-surface-200 bg-white bg-opacity-90 backdrop-blur-sm sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-primary to-secondary rounded-xl">
                <ApperIcon name="FormInput" className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold gradient-text">SurveyFlow</h1>
                <p className="text-xs sm:text-sm text-surface-600 hidden sm:block">No-Code Survey Builder</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 sm:space-x-4">
              <button className="hidden sm:flex items-center space-x-2 px-4 py-2 text-surface-600 hover:text-primary transition-colors duration-200">
                <ApperIcon name="BookOpen" className="h-4 w-4" />
                <span className="text-sm font-medium">Docs</span>
              </button>
              <button className="flex items-center space-x-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-xl hover:shadow-soft transition-all duration-200 text-sm sm:text-base">
                <ApperIcon name="Sparkles" className="h-4 w-4" />
                <span className="font-medium">Get Started</span>
              </button>
            </div>
          </div>
        </div>
      </motion.header>

{/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <SurveyLanding />
      </main>
      {/* Footer */}
      <motion.footer 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="border-t border-surface-200 bg-white bg-opacity-50 backdrop-blur-sm mt-16 sm:mt-24"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-3">
              <div className="p-1.5 bg-gradient-to-br from-primary to-secondary rounded-lg">
                <ApperIcon name="FormInput" className="h-5 w-5 text-white" />
              </div>
              <span className="text-surface-700 font-semibold">SurveyFlow</span>
            </div>
            <div className="flex items-center space-x-6 text-sm text-surface-600">
              <button className="hover:text-primary transition-colors duration-200">Privacy</button>
              <button className="hover:text-primary transition-colors duration-200">Terms</button>
              <button className="hover:text-primary transition-colors duration-200">Support</button>
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  )
}

export default Home