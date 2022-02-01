<template>
	<div class="d-flex flex-box py-3">
		<i class="far fa-dice fa-lg"></i>
		<h2>Blackjack Counter</h2>

		<span class="ml-auto">
			<router-link v-if="$route.matched.some(({ name }) => name === 'home')" :to="{ name: 'advanced' }" class="tooltip-left tooltip-medium" aria-label="Switch to Advanced">
				<i class="far fa-toggle-off fa-lg"></i>
			</router-link>
			<router-link v-else :to="{ name: 'home' }" class="tooltip-left tooltip-medium" aria-label="Switch to Normal">
				<i class="far fa-toggle-on fa-lg"></i>
			</router-link>
		</span>
	</div>
</template>

<script>
	export default {
		name: 'Navigation',
	}
</script>
