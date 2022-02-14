<template>
	<div class="container">
		<form @submit.prevent="attemptRegister">
			<div class="form-group">
				<label>Name</label>
				<input class="form-control" type="text" v-model="form.username" placeholder="Name">
			</div>
			<div class="form-group">
				<label>Email</label>
				<input class="form-control" type="email" v-model="form.email" placeholder="Email">
			</div>
			<div class="form-group">
				<label>Password</label>
				<input class="form-control" type="password" v-model="form.password" placeholder="Password">
			</div>

			<div class="form-group">
				<label>Repeat password</label>
				<input class="form-control" type="password" v-model="form.password_confirm" placeholder="Password">
			</div>

			<button class="btn btn-green btn-block" type="submit">Sign Up</button>

			<p>Or <router-link :to="{ name: 'login' }"><u>click here</u></router-link> to sign in</p>
		</form>
	</div>
</template>

<script>
	import axios from 'axios'

	export default {
		name: 'Login',

		data() {
			return {
				form: {
					username: '',
					email: '',
					password: '',
					password_confirm: '',
				}
			}
		},

		methods: {
			async attemptRegister() {
				const { data } = await axios.post('/api/v1/register', this.form)
				
				if (data) {
					// Log the user in
					const { data } = await axios.post('/api/v1/login', this.form)

					// Save the Bearer token
					this.$store.dispatch('auth/saveToken', { token: data.token })
				}

				// Redirect to home
				this.$router.push({ name: 'home' })
			}
		},
	}
</script>
