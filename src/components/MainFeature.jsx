import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from './ApperIcon'

const MainFeature = () => {
  const [surveyTitle, setSurveyTitle] = useState('')
  const [surveyDescription, setSurveyDescription] = useState('')
  const [questions, setQuestions] = useState([])
  const [selectedQuestionType, setSelectedQuestionType] = useState(null)
  const [activeTab, setActiveTab] = useState('builder')
  const [draggedItem, setDraggedItem] = useState(null)
  const [responses, setResponses] = useState([])
  const dragCounter = useRef(0)

  const questionTypes = [
    {
      id: 'multiple-choice',
      name: 'Multiple Choice',
      icon: 'CheckCircle2',
      description: 'Select one option from a list'
    },
    {
      id: 'text',
      name: 'Text Input',
      icon: 'Type',
      description: 'Short text response'
    },
    {
      id: 'textarea',
      name: 'Long Text',
      icon: 'FileText',
      description: 'Paragraph text response'
    },
    {
      id: 'rating',
      name: 'Rating Scale',
      icon: 'Star',
      description: '1-5 star rating'
    },
    {
      id: 'checkbox',
      name: 'Checkboxes',
      icon: 'Square',
      description: 'Select multiple options'
    },
    {
      id: 'dropdown',
      name: 'Dropdown',
      icon: 'ChevronDown',
      description: 'Select from dropdown menu'
    }
  ]

  const handleDragStart = (e, questionType) => {
    setDraggedItem(questionType)
    e.dataTransfer.effectAllowed = 'copy'
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'copy'
  }

  const handleDragEnter = (e) => {
    e.preventDefault()
    dragCounter.current++
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    dragCounter.current--
  }

  const handleDrop = (e) => {
    e.preventDefault()
    dragCounter.current = 0
    
    if (draggedItem) {
      addQuestion(draggedItem.id)
      setDraggedItem(null)
      toast.success(`${draggedItem.name} question added!`)
    }
  }

  const addQuestion = (type) => {
    const newQuestion = {
      id: Date.now().toString(),
      type,
      text: '',
      options: type === 'multiple-choice' || type === 'checkbox' || type === 'dropdown' 
        ? ['Option 1', 'Option 2'] 
        : [],
      required: false
    }
    setQuestions([...questions, newQuestion])
  }

  const updateQuestion = (id, updates) => {
    setQuestions(questions.map(q => 
      q.id === id ? { ...q, ...updates } : q
    ))
  }

  const deleteQuestion = (id) => {
    setQuestions(questions.filter(q => q.id !== id))
    toast.success('Question deleted')
  }

  const addOption = (questionId) => {
    updateQuestion(questionId, {
      options: [...questions.find(q => q.id === questionId).options, `Option ${questions.find(q => q.id === questionId).options.length + 1}`]
    })
  }

  const removeOption = (questionId, optionIndex) => {
    const question = questions.find(q => q.id === questionId)
    if (question.options.length > 2) {
      updateQuestion(questionId, {
        options: question.options.filter((_, index) => index !== optionIndex)
      })
    }
  }

  const generateSurveyLink = () => {
    const surveyId = Date.now().toString()
    const link = `${window.location.origin}/survey/${surveyId}`
    navigator.clipboard.writeText(link)
    toast.success('Survey link copied to clipboard!')
  }

  const previewSurvey = () => {
    if (questions.length === 0) {
      toast.error('Add at least one question to preview')
      return
    }
    setActiveTab('preview')
  }

  const generateAIQuestions = () => {
    const aiQuestions = [
      {
        id: Date.now().toString(),
        type: 'rating',
        text: 'How satisfied are you with our service?',
        options: [],
        required: true
      },
      {
        id: (Date.now() + 1).toString(),
        type: 'multiple-choice',
        text: 'How did you hear about us?',
        options: ['Social Media', 'Google Search', 'Friend Referral', 'Advertisement'],
        required: false
      }
    ]
    setQuestions([...questions, ...aiQuestions])
    toast.success('AI questions generated successfully!')
  }

  const QuestionEditor = ({ question }) => (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="survey-card p-4 sm:p-6 group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary-100 rounded-lg">
            <ApperIcon 
              name={questionTypes.find(t => t.id === question.type)?.icon || 'HelpCircle'} 
              className="h-4 w-4 text-primary-600" 
            />
          </div>
          <span className="text-sm font-medium text-surface-600 capitalize">
            {question.type.replace('-', ' ')}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => updateQuestion(question.id, { required: !question.required })}
            className={`px-2 py-1 rounded-md text-xs font-medium transition-colors duration-200 ${
              question.required 
                ? 'bg-accent text-white' 
                : 'bg-surface-100 text-surface-600 hover:bg-surface-200'
            }`}
          >
            Required
          </button>
          <button
            onClick={() => deleteQuestion(question.id)}
            className="p-1.5 text-surface-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200"
          >
            <ApperIcon name="Trash2" className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <input
          type="text"
          value={question.text}
          onChange={(e) => updateQuestion(question.id, { text: e.target.value })}
          placeholder="Enter your question..."
          className="w-full px-4 py-3 bg-surface-50 border border-surface-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 text-sm sm:text-base"
        />

        {(question.type === 'multiple-choice' || question.type === 'checkbox' || question.type === 'dropdown') && (
          <div className="space-y-2">
            {question.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={option}
                  onChange={(e) => {
                    const newOptions = [...question.options]
                    newOptions[index] = e.target.value
                    updateQuestion(question.id, { options: newOptions })
                  }}
                  className="flex-1 px-3 py-2 bg-white border border-surface-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 text-sm"
                />
                {question.options.length > 2 && (
                  <button
                    onClick={() => removeOption(question.id, index)}
                    className="p-1.5 text-surface-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200"
                  >
                    <ApperIcon name="X" className="h-3 w-3" />
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={() => addOption(question.id)}
              className="flex items-center space-x-2 px-3 py-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-200 text-sm"
            >
              <ApperIcon name="Plus" className="h-3 w-3" />
              <span>Add Option</span>
            </button>
          </div>
        )}

        {question.type === 'rating' && (
          <div className="flex items-center space-x-2 p-3 bg-surface-50 rounded-lg">
            {[1, 2, 3, 4, 5].map((star) => (
              <ApperIcon key={star} name="Star" className="h-5 w-5 text-accent" />
            ))}
            <span className="text-sm text-surface-600 ml-2">1-5 Rating Scale</span>
          </div>
        )}
      </div>
    </motion.div>
  )

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-4 sm:space-y-6"
      >
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold gradient-text">
          Build Surveys That Convert
        </h1>
        <p className="text-lg sm:text-xl text-surface-600 max-w-3xl mx-auto">
          Create professional surveys with our intuitive drag-and-drop builder. 
          Collect responses, analyze data, and make informed decisions.
        </p>
      </motion.div>

      {/* Survey Builder Interface */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="bg-white rounded-2xl shadow-soft border border-surface-200 overflow-hidden"
      >
        {/* Tab Navigation */}
        <div className="border-b border-surface-200 bg-surface-50">
          <div className="flex overflow-x-auto scrollbar-none">
            {[
              { id: 'builder', name: 'Builder', icon: 'Wrench' },
              { id: 'preview', name: 'Preview', icon: 'Eye' },
              { id: 'analytics', name: 'Analytics', icon: 'BarChart3' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 sm:px-6 py-3 sm:py-4 font-medium transition-all duration-200 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'text-primary border-b-2 border-primary bg-white'
                    : 'text-surface-600 hover:text-primary hover:bg-white'
                }`}
              >
                <ApperIcon name={tab.icon} className="h-4 w-4" />
                <span className="text-sm sm:text-base">{tab.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-4 sm:p-6 lg:p-8">
          <AnimatePresence mode="wait">
            {activeTab === 'builder' && (
              <motion.div
                key="builder"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Survey Details */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-surface-700 mb-2">
                      Survey Title
                    </label>
                    <input
                      type="text"
                      value={surveyTitle}
                      onChange={(e) => setSurveyTitle(e.target.value)}
                      placeholder="e.g., Customer Satisfaction Survey"
                      className="w-full px-4 py-3 bg-surface-50 border border-surface-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-surface-700 mb-2">
                      Description
                    </label>
                    <input
                      type="text"
                      value={surveyDescription}
                      onChange={(e) => setSurveyDescription(e.target.value)}
                      placeholder="Brief description of your survey"
                      className="w-full px-4 py-3 bg-surface-50 border border-surface-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
                  {/* Question Types Sidebar */}
                  <div className="xl:col-span-1">
                    <div className="sticky top-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-surface-800">
                          Question Types
                        </h3>
                        <button
                          onClick={generateAIQuestions}
                          className="flex items-center space-x-1 px-3 py-1.5 bg-gradient-to-r from-secondary to-accent text-white rounded-lg hover:shadow-soft transition-all duration-200 text-sm"
                        >
                          <ApperIcon name="Sparkles" className="h-3 w-3" />
                          <span>AI</span>
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-2 xl:grid-cols-1 gap-3">
                        {questionTypes.map((type) => (
                          <div
                            key={type.id}
                            draggable
                            onDragStart={(e) => handleDragStart(e, type)}
                            className="question-type-card p-3 sm:p-4 group cursor-grab active:cursor-grabbing"
                          >
                            <div className="flex items-center space-x-3">
                              <div className="p-2 bg-primary-100 rounded-lg group-hover:bg-primary-200 transition-colors duration-200">
                                <ApperIcon name={type.icon} className="h-4 w-4 text-primary-600" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="text-sm font-medium text-surface-800 truncate">
                                  {type.name}
                                </h4>
                                <p className="text-xs text-surface-600 truncate">
                                  {type.description}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Survey Canvas */}
                  <div className="xl:col-span-3">
                    <div
                      onDragOver={handleDragOver}
                      onDragEnter={handleDragEnter}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      className={`min-h-96 border-2 border-dashed rounded-2xl transition-all duration-300 ${
                        draggedItem
                          ? 'border-primary bg-primary-50'
                          : 'border-surface-300 bg-surface-50'
                      }`}
                    >
                      {questions.length === 0 ? (
                        <div className="flex items-center justify-center h-96">
                          <div className="text-center space-y-4">
                            <div className="p-4 bg-surface-200 rounded-full mx-auto w-16 h-16 flex items-center justify-center">
                              <ApperIcon name="MousePointer2" className="h-8 w-8 text-surface-500" />
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold text-surface-700 mb-2">
                                Drag & Drop Questions
                              </h3>
                              <p className="text-surface-600 text-sm">
                                Drag question types from the sidebar to start building your survey
                              </p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="p-4 sm:p-6 space-y-4">
                          <AnimatePresence>
                            {questions.map((question) => (
                              <QuestionEditor key={question.id} question={question} />
                            ))}
                          </AnimatePresence>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    {questions.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col sm:flex-row gap-3 mt-6"
                      >
                        <button
                          onClick={previewSurvey}
                          className="flex items-center justify-center space-x-2 px-4 sm:px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary-dark transition-all duration-200 font-medium"
                        >
                          <ApperIcon name="Eye" className="h-4 w-4" />
                          <span>Preview Survey</span>
                        </button>
                        <button
                          onClick={generateSurveyLink}
                          className="flex items-center justify-center space-x-2 px-4 sm:px-6 py-3 bg-secondary text-white rounded-xl hover:bg-secondary-dark transition-all duration-200 font-medium"
                        >
                          <ApperIcon name="Share" className="h-4 w-4" />
                          <span>Generate Link</span>
                        </button>
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'preview' && (
              <motion.div
                key="preview"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="max-w-2xl mx-auto"
              >
                <div className="survey-card p-6 sm:p-8">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-surface-800 mb-2">
                      {surveyTitle || 'Untitled Survey'}
                    </h2>
                    {surveyDescription && (
                      <p className="text-surface-600">{surveyDescription}</p>
                    )}
                  </div>

                  <div className="space-y-6">
                    {questions.map((question, index) => (
                      <div key={question.id} className="space-y-3">
                        <label className="block text-sm font-medium text-surface-700">
                          {index + 1}. {question.text || 'Untitled Question'}
                          {question.required && (
                            <span className="text-accent ml-1">*</span>
                          )}
                        </label>

                        {question.type === 'text' && (
                          <input
                            type="text"
                            className="w-full px-4 py-3 border border-surface-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                            placeholder="Your answer..."
                          />
                        )}

                        {question.type === 'textarea' && (
                          <textarea
                            rows={4}
                            className="w-full px-4 py-3 border border-surface-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                            placeholder="Your answer..."
                          />
                        )}

                        {question.type === 'multiple-choice' && (
                          <div className="space-y-2">
                            {question.options.map((option, optIndex) => (
                              <label key={optIndex} className="flex items-center space-x-3 p-3 border border-surface-200 rounded-lg hover:bg-surface-50 cursor-pointer">
                                <input type="radio" name={`question-${question.id}`} className="text-primary" />
                                <span className="text-surface-700">{option}</span>
                              </label>
                            ))}
                          </div>
                        )}

                        {question.type === 'checkbox' && (
                          <div className="space-y-2">
                            {question.options.map((option, optIndex) => (
                              <label key={optIndex} className="flex items-center space-x-3 p-3 border border-surface-200 rounded-lg hover:bg-surface-50 cursor-pointer">
                                <input type="checkbox" className="text-primary rounded" />
                                <span className="text-surface-700">{option}</span>
                              </label>
                            ))}
                          </div>
                        )}

                        {question.type === 'rating' && (
                          <div className="flex space-x-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button key={star} className="p-2 hover:bg-accent-100 rounded-lg">
                                <ApperIcon name="Star" className="h-6 w-6 text-surface-300 hover:text-accent" />
                              </button>
                            ))}
                          </div>
                        )}

                        {question.type === 'dropdown' && (
                          <select className="w-full px-4 py-3 border border-surface-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent">
                            <option>Select an option...</option>
                            {question.options.map((option, optIndex) => (
                              <option key={optIndex} value={option}>{option}</option>
                            ))}
                          </select>
                        )}
                      </div>
                    ))}
                  </div>

                  {questions.length > 0 && (
                    <div className="mt-8 pt-6 border-t border-surface-200">
                      <button className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl hover:shadow-soft transition-all duration-200 font-medium">
                        Submit Survey
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {activeTab === 'analytics' && (
              <motion.div
                key="analytics"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                  {[
                    { label: 'Total Responses', value: '1,247', icon: 'Users', color: 'primary' },
                    { label: 'Response Rate', value: '78.5%', icon: 'TrendingUp', color: 'secondary' },
                    { label: 'Avg. Time', value: '4m 32s', icon: 'Clock', color: 'accent' },
                    { label: 'Completion Rate', value: '92.1%', icon: 'CheckCircle', color: 'primary' }
                  ].map((metric, index) => (
                    <motion.div
                      key={metric.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="response-metric p-4 sm:p-6"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className={`p-2 rounded-lg bg-${metric.color}-100`}>
                          <ApperIcon name={metric.icon} className={`h-5 w-5 text-${metric.color}-600`} />
                        </div>
                      </div>
                      <div>
                        <p className="text-2xl sm:text-3xl font-bold text-surface-800 mb-1">
                          {metric.value}
                        </p>
                        <p className="text-sm text-surface-600">{metric.label}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="survey-card p-6">
                  <h3 className="text-lg font-semibold text-surface-800 mb-4">
                    Response Overview
                  </h3>
                  <div className="h-64 bg-surface-50 rounded-xl flex items-center justify-center">
                    <div className="text-center space-y-2">
                      <ApperIcon name="BarChart3" className="h-12 w-12 text-surface-400 mx-auto" />
                      <p className="text-surface-600">Analytics charts will appear here</p>
                      <p className="text-sm text-surface-500">Collect responses to see detailed analytics</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}

export default MainFeature