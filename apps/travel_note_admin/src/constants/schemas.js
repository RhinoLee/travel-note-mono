import { object, string } from "yup";

export const userSchema = object({
	account: string().required("帳號為必填項").email(),
	password: string().required("密碼為必填項").min(8),
});
