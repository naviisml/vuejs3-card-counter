<template>
	<div class="container">
		<form @submit.prevent="attemptLogin">
			<div class="form-group">
				<label>Email</label>
				<input class="form-control" type="email" v-model="form.email" placeholder="Email">
			</div>
			<div class="form-group">
				<label>Password</label>
				<input class="form-control" type="password" v-model="form.password" placeholder="Password">
			</div>

			<button class="btn btn-green btn-block" type="submit">Sign In</button>

			<p>Or <router-link :to="{ name: 'register' }"><u>click here</u></router-link> to register</p>
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
					email: '',
					password: ''
				}
			}
		},

		methods: {
			async attemptLogin() {
				const { data } = await axios.post('/api/v1/login', this.form)
				
				// Save the Bearer token
				this.$store.dispatch('auth/saveToken', { token: data.token })

				// Redirect to home
				this.$router.push({ name: 'home' })
			}
		},
	}
</script>
