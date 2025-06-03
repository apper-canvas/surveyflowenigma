class TemplateService {
  constructor() {
    this.apperClient = null;
    this.tableName = 'template';
    this.allFields = [
      'Name', 'Tags', 'Owner', 'CreatedOn', 'CreatedBy', 'ModifiedOn', 'ModifiedBy',
      'title', 'description', 'category', 'estimated_time', 'rating'
    ];
    this.updateableFields = [
      'Name', 'Tags', 'title', 'description', 'category', 'estimated_time', 'rating'
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

  async fetchAllTemplates(params = {}) {
    try {
      const defaultParams = {
        fields: this.allFields,
        orderBy: [{ fieldName: 'rating', SortType: 'DESC' }],
        pagingInfo: { limit: 50, offset: 0 }
      };
      
const client = this.initializeClient();
      if (!client) {
        throw new Error("ApperClient not available");
      }

      const response = await client.fetchRecords(this.tableName, { ...defaultParams, ...params });
      
      if (!response || !response.data || response.data.length === 0) {
        return [];
      }
      
      return response.data;
    } catch (error) {
      console.error("Error fetching templates:", error);
      return [];
    }
  }

  async getTemplateById(templateId) {
    try {
      const params = { fields: this.allFields };
const client = this.initializeClient();
      if (!client) {
        throw new Error("ApperClient not available");
      }

      const response = await client.getRecordById(this.tableName, templateId, params);
      
      if (!response || !response.data) {
        return null;
      }
      
      return response.data;
    } catch (error) {
      console.error(`Error fetching template with ID ${templateId}:`, error);
      return null;
    }
  }

  async createTemplate(templateData) {
    try {
      const filteredData = {};
      this.updateableFields.forEach(field => {
        if (templateData[field] !== undefined && templateData[field] !== null) {
          filteredData[field] = templateData[field];
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
      
      throw new Error("Template creation failed");
    } catch (error) {
      console.error("Error creating template:", error);
      throw error;
    }
  }

  async updateTemplate(templateId, templateData) {
    try {
      const filteredData = { Id: templateId };
      this.updateableFields.forEach(field => {
        if (templateData[field] !== undefined && templateData[field] !== null) {
          filteredData[field] = templateData[field];
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
      
      throw new Error("Template update failed");
    } catch (error) {
      console.error("Error updating template:", error);
      throw error;
    }
  }

  async deleteTemplate(templateIds) {
    try {
      const recordIds = Array.isArray(templateIds) ? templateIds : [templateIds];
      const params = { RecordIds: recordIds };

const client = this.initializeClient();
      if (!client) {
        throw new Error("ApperClient not available");
      }

      const response = await client.deleteRecord(this.tableName, params);
      
      if (response && response.success) {
        return true;
      }
      
      throw new Error("Template deletion failed");
    } catch (error) {
      console.error("Error deleting template:", error);
      throw error;
    }
  }
}

export default new TemplateService();