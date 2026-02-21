const Joi = require('joi');

/**
 * VideoValidator
 *
 * Provides request validation logic for video-related query parameters.
 * Uses Joi schema to ensure that inputs are within expected format and limits.
 */
class VideoValidator {

  /**
   * Schema to validate query parameters for fetching video stats
   * 
   * @returns {Joi.ObjectSchema} Joi validation schema
   * 
   * Query Parameters:
   * - timeRange: one of 'week', 'month', 'year' (default: 'week')
   * - limit: integer between 1 and 50 (default: 5)
   */
  static getVideoStatsSchema() {
    return Joi.object({
      timeRange: Joi.string()
        .valid('week', 'month', 'year')
        .default('week'),
        
      limit: Joi.number()
        .integer()
        .min(1)
        .max(50)
        .default(5)
    });
  }

  /**
   * Middleware to validate request query using a Joi schema
   *
   * @param {Joi.ObjectSchema} schema - Joi schema to validate against
   * @returns {Function} Express middleware
   */
  static validateQuery(schema) {
    return (req, res, next) => {
      const { error } = schema.validate(req.query);
      
      if (error) {
        // Respond with 400 Bad Request and error details if validation fails
        return res.status(400).json({
          error: {
            message: error.details[0].message,
            status: 400
          }
        });
      }

      // Proceed to next middleware or route handler
      next();
    };
  }
}

module.exports = VideoValidator;
