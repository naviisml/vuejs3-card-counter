<template>
	<div class="d-flex flex-box py-3">
		<i class="far fa-dice fa-lg"></i>
		<h2 class="mx-2">
			<router-link :to="{ name: 'home' }">
				Blackjack Counter
			</router-link>
		</h2>

		<span class="ml-auto">
			<router-link v-if="$route.matched.some(({ name }) => name === 'home')" :to="{ name: 'advanced' }" class="tooltip-left tooltip-medium" aria-label="Switch to Advanced">
				<i class="far fa-toggle-off fa-lg"></i>
			</router-link>
			<router-link v-else :to="{ name: 'home' }" class="tooltip-left tooltip-medium" aria-label="Switch to Normal">
				<i class="far fa-toggle-on fa-lg"></i>
			</router-link>
		</span>
		<!--<span class="ml-auto">
			<router-link :to="{ name: 'login' }">
				<i class="far fa-user"></i>
			</router-link>
		</span>-->
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'

	export default {
		name: 'Navigation',

		computed: mapGetters({
			user: 'auth/user'
		}),

		methods: {
			async logout () {
				// Log out the user
				await this.$store.dispatch('auth/logout')
				// Redirect to home
				this.$router.push({ name: 'home' })
			}
		}
	}
</script>

<style scoped>
a,
a:hover {
	text-decoration: none;
}
</style>