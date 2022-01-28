<template>
	<div class="container">
		<v-counter />
	</div>
</template>

<script>
	import VCounter from '../components/VCounter.vue'

	export default {
		name: 'Home',

		components: {
			VCounter
		},
	}
</script>
