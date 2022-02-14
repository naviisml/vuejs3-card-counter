<template>
	<div class="snackbar-container flex-box p-3" v-for="(snackbar, key) in snackbars" :key="key">
		<snackbar :data="snackbar.options" :actions="snackbar.actions" />
	</div>
</template>

<script>
	import Snackbar from './Snackbar.vue'
	import { mapGetters } from 'vuex'

	export default {
		name: 'Snackbars',
		
		components: {
			Snackbar
		},

		computed: mapGetters({
			snackbars: 'snackbar/list'
		}),
	}
</script>
