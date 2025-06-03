class QuestionService {
  constructor() {
    this.apperClient = null;
    this.tableName = 'question';
    this.allFields = [
      'Name', 'Tags', 'Owner', 'CreatedOn', 'CreatedBy', 'ModifiedOn', 'ModifiedBy',
      'type', 'text', 'required', 'survey_id'
    ];
    this.updateableFields = [
      'Name', 'Tags', 'type', 'text', 'required', 'survey_id'
    ];
  }

  initializeClient() {
    if (!this.apperClient && window.ApperSDK && window.ApperSDK.ApperClient) {
      try {
        this.apperClient = new window.ApperSDK.ApperClient({
          apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
          apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
        });
      } catch (error) {
        console.error("Failed to initialize ApperClient:", error);
        throw new Error("ApperSDK not available");
      }
    }
    return this.apperClient;
  }

  async fetchQuestionsBySurvey(surveyId) {
    try {
      const params = {
        fields: this.allFields,
        where: [
          {
            fieldName: 'survey_id',
            operator: 'EqualTo',
            values: [surveyId.toString()]
          }
        ],
        orderBy: [{ fieldName: 'CreatedOn', SortType: 'ASC' }]
      };
      
const client = this.initializeClient();
      if (!client) {
        throw new Error("ApperClient not available");
      }

      const response = await client.fetchRecords(this.tableName, params);
      
      if (!response || !response.data || response.data.length === 0) {
        return [];
      }
      
      return response.data;
    } catch (error) {
      console.error("Error fetching questions:", error);
      return [];
    }
  }

  async createQuestion(questionData) {
    try {
      const filteredData = {};
      this.updateableFields.forEach(field => {
        if (questionData[field] !== undefined && questionData[field] !== null) {
          // Convert boolean to proper format
          if (field === 'required') {
            filteredData[field] = Boolean(questionData[field]);
          } else {
            filteredData[field] = questionData[field];
          }
        }
      });

      const params = {
        records: [filteredData]
      };

const client = this.initializeClient();
      if (!client) {
        throw new Error("ApperClient not available");
      }

      const response = await client.createRecord(this.tableName, params);
      
      if (response && response.success && response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        if (successfulRecords.length > 0) {
          return successfulRecords[0].data;
        }
      }
      
      throw new Error("Question creation failed");
    } catch (error) {
      console.error("Error creating question:", error);
      throw error;
    }
  }

  async updateQuestion(questionId, questionData) {
    try {
      const filteredData = { Id: questionId };
      this.updateableFields.forEach(field => {
        if (questionData[field] !== undefined && questionData[field] !== null) {
          if (field === 'required') {
            filteredData[field] = Boolean(questionData[field]);
          } else {
            filteredData[field] = questionData[field];
          }
        }
      });

      const params = {
        records: [filteredData]
      };

const client = this.initializeClient();
      if (!client) {
        throw new Error("ApperClient not available");
      }

      const response = await client.updateRecord(this.tableName, params);
      
      if (response && response.success && response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        if (successfulUpdates.length > 0) {
          return successfulUpdates[0].data;
        }
      }
      
      throw new Error("Question update failed");
    } catch (error) {
      console.error("Error updating question:", error);
      throw error;
    }
  }

  async deleteQuestion(questionIds) {
    try {
      const recordIds = Array.isArray(questionIds) ? questionIds : [questionIds];
      const params = { RecordIds: recordIds };

const client = this.initializeClient();
      if (!client) {
        throw new Error("ApperClient not available");
      }

      const response = await client.deleteRecord(this.tableName, params);
      
      if (response && response.success) {
        return true;
      }
      
      throw new Error("Question deletion failed");
    } catch (error) {
      console.error("Error deleting question:", error);
      throw error;
    }
  }

  async createBulkQuestions(questionsData) {
    try {
      const filteredRecords = questionsData.map(questionData => {
        const filteredData = {};
        this.updateableFields.forEach(field => {
          if (questionData[field] !== undefined && questionData[field] !== null) {
            if (field === 'required') {
              filteredData[field] = Boolean(questionData[field]);
            } else {
              filteredData[field] = questionData[field];
            }
          }
        });
        return filteredData;
      });

      const params = {
        records: filteredRecords
      };

const client = this.initializeClient();
      if (!client) {
        throw new Error("ApperClient not available");
      }

      const response = await client.createRecord(this.tableName, params);
      
      if (response && response.success && response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        return successfulRecords.map(result => result.data);
      }
      
      throw new Error("Bulk question creation failed");
    } catch (error) {
      console.error("Error creating bulk questions:", error);
      throw error;
    }
  }
}

export default new QuestionService();