<script setup>
import { ref } from "vue";
import { userSchema } from "@/constants/schemas";
import { useValidator } from "@/composables/common/useValidator";

const userLoginParmas = ref({
	account: "",
	password: "",
});
const { error } = useValidator({ schema: userSchema, data: userLoginParmas, options: { abortEarly: false } });
</script>

<template>
	<h1>Login Page</h1>
	<!-- login form -->
	<div>
		<form>
			<div>
				<label for="account">Account: </label>
				<input v-model="userLoginParmas.account" class="border" type="text" id="account" />
				<span v-if="error?.account" class="block text-red-500">{{ error.account }}</span>
			</div>
			<div>
				<label for="password">Password: </label>
				<input v-model="userLoginParmas.password" class="border" type="text" id="password" />
				<span v-if="error?.password" class="block text-red-500">{{ error.password }}</span>
			</div>

			<button class="border" type="submit">登入</button>
		</form>
	</div>
</template>
