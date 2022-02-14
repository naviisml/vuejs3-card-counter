<template>
	<div class="snackbar d-flex flex-row">
		<p class="p-1">{{ data.title }}</p>

		<div class="d-inline-block ml-auto">
			<div v-for="(action, key) in actions" :key="key">
				<button @click="this.close(action.callback)" class="btn btn-small btn-soft" :class="{[`btn-${action.type}`]: action.type, 'btn-light': !action.type}">
					{{ action.title }}
				</button>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Snackbar',
		
		data () {

		},

		props: {
			data: {
				type: Object,
				default: {}
			},
			actions: {
				type: Object,
				default: {}
			}
		},

		mounted () {
			this.setTimeout()
		},

		beforeDestroy () {
			this.clearTimeout()
		},

		methods: {
			setTimeout() {
				if (this.data.timeout > 0) {
					this.timeout = setTimeout(() => {
						this.remove()
					}, this.data.timeout)
				}
			},
			clearTimeout() {
				clearTimeout(this.timeout)
			},
			remove () {
				this.$el.parentNode.removeChild(this.$el)
			},
			close (callback) {
				this.clearTimeout()
				this.remove()

				callback()
			}
		}
	}
</script>
