import { computed, ref } from "vue";

import * as Types from "@/types/composables/common/useValidator.d";

/**
 * useValidator - 需要驗證欄位格式時使用的驗證器
 *
 * @param {Types.Schema} schema The Yup validation schema.
 * @returns {Types.ValidationResult}
 */
export function useValidator(schema) {
	/**
	 * @type {import('vue').Ref<Types.StringObject>}
	 */
	const error = ref({});
	const isValid = computed(() => Object.keys(error.value).length === 0);

	// 初始化 error
	Object.keys(schema.fields).forEach(column => {
		error.value[column] = "";
	});
	/**
	 * @param {Object} data
	 * @param {String} column
	 */
	async function handleValidate(data, column = "all") {
		try {
			if (column === "all") {
				await schema.validate(data, { abortEarly: false });
				error.value = {};
			} else {
				await schema.validateAt(column, data);
				delete error.value[column];
			}
		} catch (/** @type {any} */ err) {
			if (err?.name === "ValidationError") {
				/** @type {Types.YupValidationError} */
				const errorInstance = err;

				if (column === "all") {
					error.value = errorInstance.inner.reduce(
						/**
						 * @param {Types.StringObject} acc
						 */
						(acc, singleError) => {
							if (singleError.path) {
								acc[singleError.path] = singleError.message;
							}
							return acc;
						},
						{},
					);
				} else {
					error.value[column] = errorInstance.errors[0];
				}
			}
		}
	}

	return { handleValidate, error, isValid };
}
