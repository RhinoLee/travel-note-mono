import { ref, watch } from "vue";

/**
 * Custom composable function for data validation.
 *
 * @param {Object} params - The params for the validator.
 * @param {Object} params.schema - The validation schema.
 * @param {Object} params.data - The data to be validated.
 * @param {Object} params.options - Additional options for validation.
 * @param {boolean} params.options.abortEarly - Whether to stop validation on the first error.
 *
 * @returns {Object} - An object containing the error and isValid properties.
 * @returns {Object|null} return.error - The validation error object, or null if no errors.
 * @returns {boolean} return.isValid - Whether the data is valid or not.
 */
export const useValidator = ({ schema, data, options }) => {
	const isValid = ref(true);
	const error = ref(null);

	watch(
		data,
		async newVal => {
			try {
				await handleValidate({ schema, data: newVal });
				isValid.value = true;
				error.value = null;
			} catch (err) {
				// err 的屬性：https://github.com/jquense/yup?tab=readme-ov-file#validationerrorerrors-string--arraystring-value-any-path-string
				isValid.value = false;
				if (err.name === "ValidationError") {
					if (options.abortEarly) {
						error.value = err.inner.reduce((acc, error) => {
							if (error.path) {
								acc[error.path] = error.message;
							}
							return acc;
						}, {});
					} else {
						error.value = {};
						error.value[err.path] = err.errors[0];
					}
				}
			}
		},
		{ deep: true },
	);

	return { error, isValid };
};

async function handleValidate({ schema, data }) {
	// validate options: https://github.com/jquense/yup?tab=readme-ov-file#schemavalidatevalue-any-options-object-promiseinfertypeschema-validationerror
	return await schema.validate(data);
}
