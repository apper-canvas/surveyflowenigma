import React, { useState, useRef, useCallback, useEffect } from 'react'
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
  const [savedSurveys, setSavedSurveys] = useState([])
  const [currentSurveyId, setCurrentSurveyId] = useState(null)
  const [showSavedSurveys, setShowSavedSurveys] = useState(false)
  const [lastSaved, setLastSaved] = useState(null)
  const [isAutoSaving, setIsAutoSaving] = useState(false)
  const [loadingTemplates, setLoadingTemplates] = useState(false)
  const dragCounter = useRef(0)
  const autoSaveTimer = useRef(null)
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

  const surveyTemplates = [
    {
      id: 'customer-satisfaction',
      title: 'Customer Satisfaction Survey',
      description: 'Measure customer satisfaction and identify areas for improvement',
      category: 'Customer Experience',
      estimatedTime: '3-5 min',
      questions: [
        {
          id: 'cs-1',
          type: 'rating',
          text: 'How satisfied are you with our service overall?',
          options: [],
          required: true
        },
        {
          id: 'cs-2',
          type: 'multiple-choice',
          text: 'How likely are you to recommend us to others?',
          options: ['Very Likely', 'Likely', 'Neutral', 'Unlikely', 'Very Unlikely'],
          required: true
        },
        {
          id: 'cs-3',
          type: 'checkbox',
          text: 'Which aspects of our service did you find most valuable?',
          options: ['Product Quality', 'Customer Support', 'Pricing', 'Delivery Speed', 'User Experience'],
          required: false
        },
        {
          id: 'cs-4',
          type: 'textarea',
          text: 'What can we do to improve your experience?',
          options: [],
          required: false
        }
      ]
    },
    {
      id: 'employee-feedback',
      title: 'Employee Engagement Survey',
      description: 'Assess employee satisfaction and workplace engagement',
      category: 'HR & Employee',
      estimatedTime: '5-7 min',
      questions: [
        {
          id: 'ef-1',
          type: 'rating',
          text: 'How satisfied are you with your current role?',
          options: [],
          required: true
        },
        {
          id: 'ef-2',
          type: 'multiple-choice',
          text: 'How would you rate work-life balance at our company?',
          options: ['Excellent', 'Good', 'Fair', 'Poor', 'Very Poor'],
          required: true
        },
        {
          id: 'ef-3',
          type: 'checkbox',
          text: 'Which workplace benefits are most important to you?',
          options: ['Health Insurance', 'Flexible Hours', 'Remote Work', 'Professional Development', 'Retirement Plans'],
          required: false
        },
        {
          id: 'ef-4',
          type: 'text',
          text: 'What motivates you most at work?',
          options: [],
          required: false
        }
      ]
    },
    {
      id: 'market-research',
      title: 'Market Research Survey',
      description: 'Gather insights about market trends and customer preferences',
      category: 'Marketing & Research',
      estimatedTime: '4-6 min',
      questions: [
        {
          id: 'mr-1',
          type: 'multiple-choice',
          text: 'What is your age group?',
          options: ['18-24', '25-34', '35-44', '45-54', '55+'],
          required: true
        },
        {
          id: 'mr-2',
          type: 'dropdown',
          text: 'Which industry do you work in?',
          options: ['Technology', 'Healthcare', 'Finance', 'Education', 'Retail', 'Other'],
          required: true
        },
        {
          id: 'mr-3',
          type: 'checkbox',
          text: 'Which social media platforms do you use regularly?',
          options: ['Facebook', 'Instagram', 'Twitter/X', 'LinkedIn', 'TikTok', 'YouTube'],
          required: false
        },
        {
          id: 'mr-4',
          type: 'rating',
          text: 'How important is brand reputation when making purchases?',
          options: [],
          required: true
        }
      ]
    },
    {
      id: 'event-feedback',
      title: 'Event Feedback Survey',
      description: 'Collect feedback from event attendees to improve future events',
      category: 'Event Planning',
      estimatedTime: '2-4 min',
      questions: [
        {
          id: 'ev-1',
          type: 'rating',
          text: 'How would you rate the overall event experience?',
          options: [],
          required: true
        },
        {
          id: 'ev-2',
          type: 'multiple-choice',
          text: 'How did you hear about this event?',
          options: ['Social Media', 'Email', 'Website', 'Word of Mouth', 'Advertisement'],
          required: false
        },
        {
          id: 'ev-3',
          type: 'checkbox',
          text: 'Which sessions did you find most valuable?',
          options: ['Keynote Speech', 'Workshop Sessions', 'Networking', 'Panel Discussions', 'Q&A Sessions'],
          required: false
        },
        {
          id: 'ev-4',
          type: 'textarea',
          text: 'What suggestions do you have for future events?',
          options: [],
          required: false
        }
      ]
    },
    {
      id: 'product-feedback',
      title: 'Product Feedback Survey',
      description: 'Gather user feedback on product features and usability',
      category: 'Product Development',
      estimatedTime: '3-5 min',
      questions: [
        {
          id: 'pf-1',
          type: 'rating',
          text: 'How easy was it to use our product?',
          options: [],
          required: true
        },
        {
          id: 'pf-2',
          type: 'multiple-choice',
          text: 'How often do you use our product?',
          options: ['Daily', 'Weekly', 'Monthly', 'Rarely', 'First Time'],
          required: true
        },
        {
          id: 'pf-3',
          type: 'checkbox',
          text: 'Which features do you use most frequently?',
          options: ['Dashboard', 'Reports', 'Settings', 'Integrations', 'Mobile App'],
          required: false
        },
        {
          id: 'pf-4',
          type: 'textarea',
          text: 'What new features would you like to see?',
          options: [],
          required: false
        }
      ]
    },
    {
      id: 'website-usability',
      title: 'Website Usability Survey',
      description: 'Evaluate website user experience and navigation',
      category: 'Customer Experience',
      estimatedTime: '3-4 min',
      questions: [
        {
          id: 'wu-1',
          type: 'rating',
          text: 'How easy was it to find what you were looking for?',
          options: [],
          required: true
        },
        {
          id: 'wu-2',
          type: 'multiple-choice',
          text: 'How would you rate the website design?',
          options: ['Excellent', 'Good', 'Average', 'Poor', 'Very Poor'],
          required: true
        },
        {
          id: 'wu-3',
          type: 'text',
          text: 'What was the main purpose of your visit today?',
          options: [],
          required: false
        },
        {
          id: 'wu-4',
          type: 'checkbox',
          text: 'Which devices did you use to access our website?',
          options: ['Desktop Computer', 'Laptop', 'Smartphone', 'Tablet'],
          required: false
        }
      ]
    }
  ]

  const templateCategories = [
    { name: 'Customer Experience', count: surveyTemplates.filter(t => t.category === 'Customer Experience').length },
    { name: 'HR & Employee', count: surveyTemplates.filter(t => t.category === 'HR & Employee').length },
    { name: 'Marketing & Research', count: surveyTemplates.filter(t => t.category === 'Marketing & Research').length },
    { name: 'Event Planning', count: surveyTemplates.filter(t => t.category === 'Event Planning').length },
    { name: 'Product Development', count: surveyTemplates.filter(t => t.category === 'Product Development').length }
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

const updateQuestion = useCallback((id, updates) => {
    setQuestions(prev => prev.map(q => 
      q.id === id ? { ...q, ...updates } : q
    ))
  }, [])

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

  // Load saved surveys from localStorage on component mount
  useEffect(() => {
    const saved = localStorage.getItem('savedSurveys')
    if (saved) {
      setSavedSurveys(JSON.parse(saved))
    }
  }, [])

  // Auto-save functionality
  useEffect(() => {
    if (surveyTitle || surveyDescription || questions.length > 0) {
      if (autoSaveTimer.current) {
        clearTimeout(autoSaveTimer.current)
      }
      
      autoSaveTimer.current = setTimeout(() => {
        if (currentSurveyId) {
          autoSaveSurvey()
        }
      }, 30000) // Auto-save every 30 seconds
    }

    return () => {
      if (autoSaveTimer.current) {
        clearTimeout(autoSaveTimer.current)
      }
    }
  }, [surveyTitle, surveyDescription, questions, currentSurveyId])

  // Keyboard shortcut for saving
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault()
        saveSurvey()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const saveSurvey = () => {
    if (!surveyTitle.trim()) {
      toast.error('Please enter a survey title before saving')
      return
    }

    const surveyData = {
      id: currentSurveyId || Date.now().toString(),
      title: surveyTitle,
      description: surveyDescription,
      questions: questions,
      createdAt: currentSurveyId ? savedSurveys.find(s => s.id === currentSurveyId)?.createdAt || new Date().toISOString() : new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      questionCount: questions.length
    }

    const existingSurveys = JSON.parse(localStorage.getItem('savedSurveys') || '[]')
    const existingIndex = existingSurveys.findIndex(s => s.id === surveyData.id)
    
    if (existingIndex >= 0) {
      existingSurveys[existingIndex] = surveyData
      toast.success('Survey updated successfully!')
    } else {
      existingSurveys.unshift(surveyData)
      toast.success('Survey saved successfully!')
    }

    localStorage.setItem('savedSurveys', JSON.stringify(existingSurveys))
    setSavedSurveys(existingSurveys)
    setCurrentSurveyId(surveyData.id)
    setLastSaved(new Date())
  }

  const autoSaveSurvey = () => {
    if (!surveyTitle.trim()) return

    setIsAutoSaving(true)
    const surveyData = {
      id: currentSurveyId,
      title: surveyTitle,
      description: surveyDescription,
      questions: questions,
      createdAt: savedSurveys.find(s => s.id === currentSurveyId)?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      questionCount: questions.length
    }

    const existingSurveys = JSON.parse(localStorage.getItem('savedSurveys') || '[]')
    const existingIndex = existingSurveys.findIndex(s => s.id === currentSurveyId)
    
    if (existingIndex >= 0) {
      existingSurveys[existingIndex] = surveyData
      localStorage.setItem('savedSurveys', JSON.stringify(existingSurveys))
      setSavedSurveys(existingSurveys)
      setLastSaved(new Date())
    }

    setTimeout(() => setIsAutoSaving(false), 1000)
  }

  const loadSavedSurvey = (survey) => {
    setSurveyTitle(survey.title)
    setSurveyDescription(survey.description)
    setQuestions(survey.questions)
    setCurrentSurveyId(survey.id)
    setShowSavedSurveys(false)
    toast.success(`Survey "${survey.title}" loaded successfully!`)
  }

  const deleteSavedSurvey = (surveyId, event) => {
    event.stopPropagation()
    const updatedSurveys = savedSurveys.filter(s => s.id !== surveyId)
    setSavedSurveys(updatedSurveys)
    localStorage.setItem('savedSurveys', JSON.stringify(updatedSurveys))
    
    if (currentSurveyId === surveyId) {
      setCurrentSurveyId(null)
    }
    
    toast.success('Survey deleted successfully!')
  }

  const createNewSurvey = () => {
    setSurveyTitle('')
    setSurveyDescription('')
    setQuestions([])
    setCurrentSurveyId(null)
    setShowSavedSurveys(false)
    toast.success('New survey created!')
  }

  const loadTemplate = (template) => {
    setSurveyTitle(template.title)
    setSurveyDescription(template.description)
    setQuestions(template.questions.map(q => ({
      ...q,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9)
    })))
    setCurrentSurveyId(null)
    setActiveTab('builder')
    toast.success(`Template "${template.title}" loaded successfully!`)
}

  // Isolated option input component to prevent cursor jumping
  const OptionInput = React.memo(({ questionId, optionIndex, value, onRemove, canRemove }) => {
    const [localValue, setLocalValue] = useState(value)
    const inputRef = useRef(null)
    const debounceTimer = useRef(null)

    useEffect(() => {
      setLocalValue(value)
    }, [value])

    const handleChange = useCallback((e) => {
      const newValue = e.target.value
      setLocalValue(newValue)
      
      // Clear existing timer
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current)
      }
      
      // Debounce the update to prevent excessive re-renders
      debounceTimer.current = setTimeout(() => {
        const question = questions.find(q => q.id === questionId)
        if (question) {
          const newOptions = [...question.options]
          newOptions[optionIndex] = newValue
          updateQuestion(questionId, { options: newOptions })
        }
      }, 300)
    }, [questionId, optionIndex])

    useEffect(() => {
      return () => {
        if (debounceTimer.current) {
          clearTimeout(debounceTimer.current)
        }
      }
    }, [])

    return (
      <div className="flex items-center space-x-2">
        <input
          ref={inputRef}
          type="text"
          value={localValue}
          onChange={handleChange}
          className="flex-1 px-3 py-2 bg-white border border-surface-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 text-sm"
        />
        {canRemove && (
          <button
            onClick={() => onRemove(questionId, optionIndex)}
            className="p-1.5 text-surface-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200"
          >
            <ApperIcon name="X" className="h-3 w-3" />
          </button>
        )}
      </div>
    )
  }, (prevProps, nextProps) => {
    return prevProps.questionId === nextProps.questionId &&
           prevProps.optionIndex === nextProps.optionIndex &&
           prevProps.value === nextProps.value &&
           prevProps.canRemove === nextProps.canRemove
  })

const QuestionEditor = React.memo(({ question }) => {
    const inputRef = useRef(null)
    
  const [localText, setLocalText] = useState(question.text)

  useEffect(() => {
    setLocalText(question.text)
  }, [question.text])

  const handleTextChange = useCallback((e) => {
    const newText = e.target.value
    setLocalText(newText)
  }, [])

  const handleTextBlur = useCallback(() => {
    if (localText !== question.text) {
      updateQuestion(question.id, { text: localText })
    }
  }, [localText, question.id, question.text])
    
    return (
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
          <QuestionInput
            questionId={question.id}
            value={question.text}
          />

          {(question.type === 'multiple-choice' || question.type === 'checkbox' || question.type === 'dropdown') && (
            <div className="space-y-2">
              {question.options.map((option, index) => (
                <OptionInput
                  key={`${question.id}-option-${index}`}
                  questionId={question.id}
                  optionIndex={index}
                  value={option}
                  onRemove={removeOption}
                  canRemove={question.options.length > 2}
                />
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
  }, (prevProps, nextProps) => {
    return prevProps.question.id === nextProps.question.id &&
           prevProps.question.text === nextProps.question.text &&
           prevProps.question.type === nextProps.question.type &&
           prevProps.question.required === nextProps.question.required &&
           JSON.stringify(prevProps.question.options) === JSON.stringify(nextProps.question.options)
  })
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
              { id: 'templates', name: 'Templates', icon: 'Layout' },
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
                      {/* Save/Load Controls */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-semibold text-surface-800">Survey Actions</h3>
                          {lastSaved && (
                            <span className="text-xs text-surface-500">
                              {isAutoSaving ? 'Saving...' : `Saved ${lastSaved.toLocaleTimeString()}`}
                            </span>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-1 gap-2">
                          <button
                            onClick={saveSurvey}
                            className="flex items-center justify-center space-x-2 px-3 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-all duration-200 text-sm font-medium"
                          >
                            <ApperIcon name="Save" className="h-3 w-3" />
                            <span>Save Survey</span>
                          </button>
                          
                          <button
                            onClick={() => setShowSavedSurveys(!showSavedSurveys)}
                            className="flex items-center justify-center space-x-2 px-3 py-2 bg-secondary text-white rounded-lg hover:bg-secondary-dark transition-all duration-200 text-sm font-medium"
                          >
                            <ApperIcon name="FolderOpen" className="h-3 w-3" />
                            <span>Load Survey</span>
                          </button>
                          
                          <button
                            onClick={createNewSurvey}
                            className="flex items-center justify-center space-x-2 px-3 py-2 bg-surface-600 text-white rounded-lg hover:bg-surface-700 transition-all duration-200 text-sm font-medium"
                          >
                            <ApperIcon name="FileText" className="h-3 w-3" />
                            <span>New Survey</span>
                          </button>
                        </div>

                        {showSavedSurveys && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="border border-surface-200 rounded-lg p-3 bg-surface-50"
                          >
                            <h4 className="text-sm font-medium text-surface-700 mb-2">Saved Surveys</h4>
                            {savedSurveys.length === 0 ? (
                              <p className="text-xs text-surface-500">No saved surveys yet</p>
                            ) : (
                              <div className="space-y-2 max-h-48 overflow-y-auto">
                                {savedSurveys.map((survey) => (
                                  <div
                                    key={survey.id}
                                    onClick={() => loadSavedSurvey(survey)}
                                    className="flex items-center justify-between p-2 bg-white rounded border border-surface-200 hover:bg-surface-50 cursor-pointer group"
                                  >
                                    <div className="flex-1 min-w-0">
                                      <p className="text-xs font-medium text-surface-800 truncate">
                                        {survey.title}
                                      </p>
                                      <p className="text-xs text-surface-500">
                                        {survey.questionCount} questions
                                      </p>
                                    </div>
                                    <button
                                      onClick={(e) => deleteSavedSurvey(survey.id, e)}
                                      className="p-1 text-surface-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all duration-200"
                                    >
                                      <ApperIcon name="Trash2" className="h-3 w-3" />
                                    </button>
                                  </div>
                                ))}
                              </div>
                            )}
                          </motion.div>
                        )}
                      </div>

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
                          onClick={saveSurvey}
                          className="flex items-center justify-center space-x-2 px-4 sm:px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all duration-200 font-medium"
                        >
                          <ApperIcon name="Save" className="h-4 w-4" />
                          <span>Save Survey</span>
                        </button>
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

            {activeTab === 'templates' && (
              <motion.div
                key="templates"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="text-center space-y-2">
                  <h2 className="text-2xl font-bold text-surface-800">Survey Templates</h2>
                  <p className="text-surface-600">Choose from professionally designed templates to get started quickly</p>
                </div>

                <div className="space-y-6">
                  {templateCategories.map((category) => (
                    <motion.div
                      key={category.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-4"
                    >
                      <div className="flex items-center space-x-3">
                        <h3 className="text-lg font-semibold text-surface-800">{category.name}</h3>
                        <span className="px-2 py-1 bg-primary-100 text-primary-600 text-xs font-medium rounded-full">
                          {category.count}
                        </span>
                      </div>
                      
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {loadingTemplates ? (
                          <div className="col-span-full text-center py-8">
                            <p className="text-surface-500">Loading templates...</p>
                          </div>
                        ) : (
                          surveyTemplates
                            .filter(template => template.category === category.name)
.map((template) => (
                              <motion.div
                                key={template.id}
                                whileHover={{ y: -2 }}
                                className="survey-card p-4 group cursor-pointer"
                                onClick={() => loadTemplate(template)}
                              >
                                <div className="space-y-3">
<div className="flex items-start justify-between">
                                    <h4 className="font-semibold text-surface-800 group-hover:text-primary transition-colors duration-200">
                                      {template.title}
                                    </h4>
                                    <div className="flex items-center space-x-1 text-xs text-surface-500">
                                      <ApperIcon name="Clock" className="h-3 w-3" />
                                      <span>{template.estimatedTime}</span>
                                    </div>
                                  </div>
                                  
                                  <p className="text-sm text-surface-600 line-clamp-2">
                                    {template.description}
                                  </p>
                                  
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2 text-xs text-surface-500">
                                      <ApperIcon name="FileText" className="h-3 w-3" />
                                      <span>Template questions</span>
                                    </div>
                                    
                                    <button className="flex items-center space-x-1 px-3 py-1.5 bg-primary text-white rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 text-xs font-medium">
                                      <ApperIcon name="Plus" className="h-3 w-3" />
                                      <span>Use Template</span>
                                    </button>
                                  </div>
                                </div>
                              </motion.div>
                            ))
                        )}
                      </div>
                    </motion.div>
                  ))}
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