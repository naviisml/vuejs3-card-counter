<template>
	<div class="container">
		<div class="wrapcontent d-flex flex-column align-items-center py-5">
			<navigation />
			
			<transition name="fade">
				<router-view />
			</transition>
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

