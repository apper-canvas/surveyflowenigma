const { ApperClient } = window.ApperSDK;

class OptionService {
  constructor() {
    this.apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    this.tableName = 'option';
    this.allFields = [
      'Name', 'Tags', 'Owner', 'CreatedOn', 'CreatedBy', 'ModifiedOn', 'ModifiedBy',
      'value', 'question_id'
    ];
    this.updateableFields = [
      'Name', 'Tags', 'value', 'question_id'
    ];
  }

  async fetchOptionsByQuestion(questionId) {
    try {
      const params = {
        fields: this.allFields,
        where: [
          {
            fieldName: 'question_id',
            operator: 'EqualTo',
            values: [questionId.toString()]
          }
        ],
        orderBy: [{ fieldName: 'CreatedOn', SortType: 'ASC' }]
      };
      
      const response = await this.apperClient.fetchRecords(this.tableName, params);
      
      if (!response || !response.data || response.data.length === 0) {
        return [];
      }
      
      return response.data;
    } catch (error) {
      console.error("Error fetching options:", error);
      return [];
    }
  }

  async createOption(optionData) {
    try {
      const filteredData = {};
      this.updateableFields.forEach(field => {
        if (optionData[field] !== undefined && optionData[field] !== null) {
          filteredData[field] = optionData[field];
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
      
      throw new Error("Option creation failed");
    } catch (error) {
      console.error("Error creating option:", error);
      throw error;
    }
  }

  async updateOption(optionId, optionData) {
    try {
      const filteredData = { Id: optionId };
      this.updateableFields.forEach(field => {
        if (optionData[field] !== undefined && optionData[field] !== null) {
          filteredData[field] = optionData[field];
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
      
      throw new Error("Option update failed");
    } catch (error) {
      console.error("Error updating option:", error);
      throw error;
    }
  }

  async deleteOption(optionIds) {
    try {
      const recordIds = Array.isArray(optionIds) ? optionIds : [optionIds];
      const params = { RecordIds: recordIds };

      const response = await this.apperClient.deleteRecord(this.tableName, params);
      
      if (response && response.success) {
        return true;
      }
      
      throw new Error("Option deletion failed");
    } catch (error) {
      console.error("Error deleting option:", error);
      throw error;
    }
  }

  async createBulkOptions(optionsData) {
    try {
      const filteredRecords = optionsData.map(optionData => {
        const filteredData = {};
        this.updateableFields.forEach(field => {
          if (optionData[field] !== undefined && optionData[field] !== null) {
            filteredData[field] = optionData[field];
          }
        });
        return filteredData;
      });

      const params = {
        records: filteredRecords
      };

      const response = await this.apperClient.createRecord(this.tableName, params);
      
      if (response && response.success && response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        return successfulRecords.map(result => result.data);
      }
      
      throw new Error("Bulk option creation failed");
    } catch (error) {
      console.error("Error creating bulk options:", error);
      throw error;
    }
  }
}

export default new OptionService();