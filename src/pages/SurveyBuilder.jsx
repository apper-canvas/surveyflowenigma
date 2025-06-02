import MainFeature from '../components/MainFeature'
import ApperIcon from '../components/ApperIcon'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const SurveyBuilder = () => {
  const navigate = useNavigate()

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
              <button 
                onClick={() => navigate('/')}
                className="p-2 bg-gradient-to-br from-primary to-secondary rounded-xl hover:scale-105 transition-transform duration-200"
              >
                <ApperIcon name="FormInput" className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </button>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold gradient-text">Survey Builder</h1>
                <p className="text-xs sm:text-sm text-surface-600 hidden sm:block">Create from Scratch</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 sm:space-x-4">
              <button 
                onClick={() => navigate('/')}
                className="hidden sm:flex items-center space-x-2 px-4 py-2 text-surface-600 hover:text-primary transition-colors duration-200"
              >
                <ApperIcon name="ArrowLeft" className="h-4 w-4" />
                <span className="text-sm font-medium">Back</span>
              </button>
              <button className="flex items-center space-x-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-xl hover:shadow-soft transition-all duration-200 text-sm sm:text-base">
                <ApperIcon name="Save" className="h-4 w-4" />
                <span className="font-medium">Save Survey</span>
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <MainFeature />
      </main>
    </div>
  )
}

export default SurveyBuilder