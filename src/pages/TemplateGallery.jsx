import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import ApperIcon from '../components/ApperIcon'

const TemplateGallery = () => {
  const navigate = useNavigate()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [previewTemplate, setPreviewTemplate] = useState(null)

  const categories = [
    { id: 'all', name: 'All Templates', icon: 'Grid3X3' },
    { id: 'customer', name: 'Customer Experience', icon: 'Heart' },
    { id: 'hr', name: 'HR & Employee', icon: 'Users' },
    { id: 'marketing', name: 'Marketing & Research', icon: 'TrendingUp' },
    { id: 'event', name: 'Event Planning', icon: 'Calendar' },
    { id: 'product', name: 'Product Development', icon: 'Lightbulb' }
  ]

  const templates = [
    {
      id: 1,
      title: 'Customer Satisfaction Survey',
      description: 'Measure customer satisfaction and identify areas for improvement',
      category: 'customer',
      questions: 8,
      estimatedTime: '3-5 mins',
      responses: '2.3k',
      rating: 4.8,
      preview: [
        'How satisfied are you with our product/service?',
        'How likely are you to recommend us to others?',
        'What could we improve?',
        'Rate your overall experience',
        'How did we meet your expectations?'
      ]
    },
    {
      id: 2,
      title: 'Employee Engagement Survey',
      description: 'Assess employee satisfaction and engagement levels',
      category: 'hr',
      questions: 12,
      estimatedTime: '5-7 mins',
      responses: '1.8k',
      rating: 4.6,
      preview: [
        'How satisfied are you with your current role?',
        'Do you feel valued by your manager?',
        'Rate your work-life balance',
        'How likely are you to recommend this company as a place to work?',
        'What motivates you most at work?'
      ]
    },
    {
      id: 3,
      title: 'Market Research Survey',
      description: 'Gather insights about market trends and consumer behavior',
      category: 'marketing',
      questions: 15,
      estimatedTime: '7-10 mins',
      responses: '3.1k',
      rating: 4.7,
      preview: [
        'What is your age group?',
        'Which brands do you currently use?',
        'How important is price when making purchase decisions?',
        'Where do you typically shop for this product?',
        'What influences your buying decisions most?'
      ]
    },
    {
      id: 4,
      title: 'Event Feedback Survey',
      description: 'Collect feedback from event attendees to improve future events',
      category: 'event',
      questions: 10,
      estimatedTime: '4-6 mins',
      responses: '950',
      rating: 4.5,
      preview: [
        'How would you rate the overall event?',
        'Which sessions were most valuable?',
        'How was the venue and logistics?',
        'Would you attend future events?',
        'What topics would you like to see covered?'
      ]
    },
    {
      id: 5,
      title: 'Product Feedback Survey',
      description: 'Get user feedback on product features and usability',
      category: 'product',
      questions: 9,
      estimatedTime: '4-5 mins',
      responses: '1.2k',
      rating: 4.9,
      preview: [
        'How easy is our product to use?',
        'Which features do you use most?',
        'What features are missing?',
        'How does our product compare to alternatives?',
        'Rate the overall design and interface'
      ]
    },
    {
      id: 6,
      title: 'Website Usability Survey',
      description: 'Evaluate website user experience and navigation',
      category: 'customer',
      questions: 7,
      estimatedTime: '3-4 mins',
      responses: '1.7k',
      rating: 4.4,
      preview: [
        'How easy was it to find what you were looking for?',
        'Rate the website design and layout',
        'Did you encounter any technical issues?',
        'How was the checkout process?',
        'What would improve your experience?'
      ]
    }
  ]

  const filteredTemplates = selectedCategory === 'all' 
    ? templates 
    : templates.filter(template => template.category === selectedCategory)

  const handleUseTemplate = (template) => {
    toast.success(`Using template: ${template.title}`)
    navigate('/survey-builder', { state: { template } })
  }

  const handlePreviewTemplate = (template) => {
    setPreviewTemplate(template)
  }

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
                <h1 className="text-xl sm:text-2xl font-bold gradient-text">Template Gallery</h1>
                <p className="text-xs sm:text-sm text-surface-600 hidden sm:block">Choose from Pre-built Templates</p>
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
              <button 
                onClick={() => navigate('/survey-builder')}
                className="flex items-center space-x-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-xl hover:shadow-soft transition-all duration-200 text-sm sm:text-base"
              >
                <ApperIcon name="Plus" className="h-4 w-4" />
                <span className="font-medium">Create from Scratch</span>
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold gradient-text mb-4">
            Choose Your Template
          </h2>
          <p className="text-lg text-surface-600 max-w-2xl mx-auto">
            Get started quickly with professionally designed survey templates. Preview and customize to fit your needs.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-soft'
                    : 'bg-white text-surface-600 hover:text-primary hover:shadow-card'
                }`}
              >
                <ApperIcon name={category.icon} className="w-4 h-4" />
                <span className="text-sm">{category.name}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Templates Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredTemplates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="survey-card p-6 hover:scale-105 transition-transform duration-300 group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-surface-900 mb-2">{template.title}</h3>
                  <p className="text-surface-600 text-sm leading-relaxed">{template.description}</p>
                </div>
                <div className="flex items-center space-x-1 text-amber-500">
                  <ApperIcon name="Star" className="w-4 h-4 fill-current" />
                  <span className="text-sm font-medium">{template.rating}</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-surface-500 mb-6">
                <div className="flex items-center space-x-1">
                  <ApperIcon name="FileText" className="w-3 h-3" />
                  <span>{template.questions} questions</span>
                </div>
                <div className="flex items-center space-x-1">
                  <ApperIcon name="Clock" className="w-3 h-3" />
                  <span>{template.estimatedTime}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <ApperIcon name="Users" className="w-3 h-3" />
                  <span>{template.responses} responses</span>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => handlePreviewTemplate(template)}
                  className="w-full bg-surface-100 text-surface-700 py-2 px-4 rounded-lg font-medium hover:bg-surface-200 transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <ApperIcon name="Eye" className="w-4 h-4" />
                  <span>Preview Template</span>
                </button>
                <button
                  onClick={() => handleUseTemplate(template)}
                  className="w-full bg-gradient-to-r from-primary to-secondary text-white py-2 px-4 rounded-lg font-medium hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <ApperIcon name="Play" className="w-4 h-4" />
                  <span>Use This Template</span>
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Template Preview Modal */}
        {previewTemplate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setPreviewTemplate(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-surface-900 mb-2">{previewTemplate.title}</h3>
                  <p className="text-surface-600">{previewTemplate.description}</p>
                </div>
                <button
                  onClick={() => setPreviewTemplate(null)}
                  className="p-2 hover:bg-surface-100 rounded-lg transition-colors duration-200"
                >
                  <ApperIcon name="X" className="w-5 h-5 text-surface-500" />
                </button>
              </div>

              <div className="mb-6">
<h4 className="font-semibold text-surface-900 mb-4">Template Information:</h4>
                <div className="space-y-3">
                  <div className="bg-surface-50 p-3 rounded-lg">
                    <span className="text-sm font-medium text-surface-700">Category:</span>
                    <span className="text-sm text-surface-600 ml-2">{previewTemplate.category}</span>
                  </div>
                  <div className="bg-surface-50 p-3 rounded-lg">
                    <span className="text-sm font-medium text-surface-700">Estimated Time:</span>
                    <span className="text-sm text-surface-600 ml-2">{previewTemplate.estimated_time || 'Not specified'}</span>
                  </div>
                  <div className="bg-surface-50 p-3 rounded-lg">
                    <span className="text-sm font-medium text-surface-700">Rating:</span>
                    <span className="text-sm text-surface-600 ml-2">{previewTemplate.rating || 'No rating'}</span>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setPreviewTemplate(null)}
                  className="flex-1 bg-surface-100 text-surface-700 py-3 px-4 rounded-xl font-medium hover:bg-surface-200 transition-colors duration-200"
                >
                  Close Preview
                </button>
                <button
                  onClick={() => handleUseTemplate(previewTemplate)}
                  className="flex-1 bg-gradient-to-r from-primary to-secondary text-white py-3 px-4 rounded-xl font-medium hover:shadow-lg transition-all duration-200"
                >
                  Use This Template
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </main>
    </div>
  )
}

export default TemplateGallery