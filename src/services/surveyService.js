const { ApperClient } = window.ApperSDK;

class SurveyService {
  constructor() {
    this.apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    this.tableName = 'survey';
    this.allFields = [
      'Name', 'Tags', 'Owner', 'CreatedOn', 'CreatedBy', 'ModifiedOn', 'ModifiedBy',
      'title', 'description', 'created_at', 'updated_at', 'question_count'
    ];
    this.updateableFields = [
      'Name', 'Tags', 'title', 'description', 'created_at', 'updated_at', 'question_count'
    ];
  }

  async fetchAllSurveys(params = {}) {
    try {
      const defaultParams = {
        fields: this.allFields,
        orderBy: [{ fieldName: 'CreatedOn', SortType: 'DESC' }],
        pagingInfo: { limit: 20, offset: 0 }
      };
      
      const response = await this.apperClient.fetchRecords(this.tableName, { ...defaultParams, ...params });
      
      if (!response || !response.data || response.data.length === 0) {
        return [];
      }
      
      return response.data;
    } catch (error) {
      console.error("Error fetching surveys:", error);
      return [];
    }
  }

  async getSurveyById(surveyId) {
    try {
      const params = { fields: this.allFields };
      const response = await this.apperClient.getRecordById(this.tableName, surveyId, params);
      
      if (!response || !response.data) {
        return null;
      }
      
      return response.data;
    } catch (error) {
      console.error(`Error fetching survey with ID ${surveyId}:`, error);
      return null;
    }
  }

  async createSurvey(surveyData) {
    try {
      // Filter to only include updateable fields
      const filteredData = {};
      this.updateableFields.forEach(field => {
        if (surveyData[field] !== undefined && surveyData[field] !== null) {
          filteredData[field] = surveyData[field];
        }
      });

      const params = {
        records: [filteredData]
      };

      const response = await this.apperClient.createRecord(this.tableName, params);
      
      if (response && response.success && response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        if (successfulRecords.length > 0) {
          return successfulRecords[0].data;
        }
      }
      
      throw new Error("Survey creation failed");
    } catch (error) {
      console.error("Error creating survey:", error);
      throw error;
    }
  }

  async updateSurvey(surveyId, surveyData) {
    try {
      // Filter to only include updateable fields plus ID
      const filteredData = { Id: surveyId };
      this.updateableFields.forEach(field => {
        if (surveyData[field] !== undefined && surveyData[field] !== null) {
          filteredData[field] = surveyData[field];
        }
      });

      const params = {
        records: [filteredData]
      };

      const response = await this.apperClient.updateRecord(this.tableName, params);
      
      if (response && response.success && response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        if (successfulUpdates.length > 0) {
          return successfulUpdates[0].data;
        }
      }
      
      throw new Error("Survey update failed");
    } catch (error) {
      console.error("Error updating survey:", error);
      throw error;
    }
  }

  async deleteSurvey(surveyIds) {
    try {
      const recordIds = Array.isArray(surveyIds) ? surveyIds : [surveyIds];
      const params = { RecordIds: recordIds };

      const response = await this.apperClient.deleteRecord(this.tableName, params);
      
      if (response && response.success) {
        return true;
      }
      
      throw new Error("Survey deletion failed");
    } catch (error) {
      console.error("Error deleting survey:", error);
      throw error;
    }
  }
}

export default new SurveyService();