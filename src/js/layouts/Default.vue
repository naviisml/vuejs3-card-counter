<template>
	<div class="flex flex-col justify-center max-w-sm min-h-full px-6 py-12 mx-auto lg:px-8">
		<div class="py-5 d-flex flex-column align-items-center">
			<navigation />
			
			<router-view />
		</div>
	</div>
</template>

<script>
	import Navigation from '/src/js/components/Navigation.vue'

	export default {
		name: 'DefaultLayout',

		components: {
			Navigation
		}
	}
</script>

