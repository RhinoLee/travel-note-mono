/**
 * @typedef {Object.<string, string>} StringObject
 */

/**
 * @typedef {Object} Schema
 * @property {Object} fields - The fields of the schema.
 * @property {Function} validate - The validate function of the schema.
 * @property {Function} validateAt - The validateAt function of the schema.
 */

/**
 * @typedef {Object} ValidationResult
 * @property {Function} handleValidate
 * @property {import('vue').Ref<StringObject>} error
 * @property {import('vue').ComputedRef<boolean>} isValid
 */

/**
 * err 的屬性：https://github.com/jquense/yup?tab=readme-ov-file#validationerrorerrors-string--arraystring-value-any-path-string
 * @typedef {Object} YupValidationError
 * @property {String} name
 * @property {Array<{path: string, message: string}>} inner
 * @property {Array<String>} errors
 */

export const Types = {};
