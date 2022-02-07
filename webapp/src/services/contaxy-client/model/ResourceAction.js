/**
 * Contaxy API
 * Functionality to create and manage projects, services, jobs, and files.
 *
 * The version of the OpenAPI document: 0.0.7
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

import ApiClient from '../ApiClient';

/**
 * The ResourceAction model module.
 * @module model/ResourceAction
 * @version 0.0.7
 */
class ResourceAction {
  /**
   * Constructs a new <code>ResourceAction</code>.
   * @alias module:model/ResourceAction
   * @param actionId {String} ID used to identify this action.
   */
  constructor(actionId) {
    ResourceAction.initialize(this, actionId);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  static initialize(obj, actionId) {
    obj['action_id'] = actionId;
  }

  /**
   * Constructs a <code>ResourceAction</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ResourceAction} obj Optional instance to populate.
   * @return {module:model/ResourceAction} The populated <code>ResourceAction</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new ResourceAction();

      if (data.hasOwnProperty('action_id')) {
        obj['action_id'] = ApiClient.convertToType(data['action_id'], 'String');
      }
      if (data.hasOwnProperty('display_name')) {
        obj['display_name'] = ApiClient.convertToType(
          data['display_name'],
          'String'
        );
      }
      if (data.hasOwnProperty('icon')) {
        obj['icon'] = ApiClient.convertToType(data['icon'], 'String');
      }
      if (data.hasOwnProperty('extension_id')) {
        obj['extension_id'] = ApiClient.convertToType(
          data['extension_id'],
          'String'
        );
      }
      if (data.hasOwnProperty('extension_name')) {
        obj['extension_name'] = ApiClient.convertToType(
          data['extension_name'],
          'String'
        );
      }
      if (data.hasOwnProperty('instructions')) {
        obj['instructions'] = ApiClient.convertToType(data['instructions'], [
          Object,
        ]);
      }
    }
    return obj;
  }
}

/**
 * ID used to identify this action.
 * @member {String} action_id
 */
ResourceAction.prototype['action_id'] = undefined;

/**
 * Display name of this action.
 * @member {String} display_name
 */
ResourceAction.prototype['display_name'] = undefined;

/**
 * Material Design Icon name or image URL used for displaying this action.
 * @member {String} icon
 */
ResourceAction.prototype['icon'] = undefined;

/**
 * The extension ID associated with this action.
 * @member {String} extension_id
 */
ResourceAction.prototype['extension_id'] = undefined;

/**
 * The extension name associated with this action.
 * @member {String} extension_name
 */
ResourceAction.prototype['extension_name'] = undefined;

/**
 * A list of instructions for the frontend application.
 * @member {Array.<Object>} instructions
 */
ResourceAction.prototype['instructions'] = undefined;

export default ResourceAction;
