import { useValidator } from "@/composables/common/useValidator";
import { describe, expect, it } from "vitest";
import { object, string } from "yup";

const testSchema = object({
	name: string().required("name 為必填項"),
});

describe("useValidator", () => {
	it("should validate valid input", async () => {
		const { error, isValid, handleValidate } = useValidator(testSchema);

		await handleValidate({ name: "test string" }, "name");
		expect(isValid.value).toBe(true);
		expect(error.value).toEqual({});

		await handleValidate({ name: "" }, "name");
		expect(isValid.value).toBe(false);
		expect(error.value.name).toEqual("name 為必填項");
	});

	// it("check invalid input", async () => {
	// 	const { validate, state } = useValidatior(testSchema);
	// 	const isValid = await validate({ name: "" });
	// 	expect(isValid).toBe(false);
	// 	expect(state.isValid).toBe(false);
	// 	expect(state.errors).toEqual({ name: "name 為必填項" });
	// });

	// it("should throw an error when a non-ValidationError occurs", async () => {
	// 	const testSchema = object({
	// 		name: string().test("Test non-ValidationError", "test error", () => {
	// 			throw new Error("Unexpected Error");
	// 		}),
	// 	});

	// 	const { state } = useValidatior(testSchema);

	// 	// 檢查 state.errors 和 state.isValid 的狀態，確保它們沒有被更新
	// 	expect(state.errors).toEqual({});
	// 	expect(state.isValid).toBe(true);
	// });
});
