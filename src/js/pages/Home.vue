<template>
	<div class="d-flex flex-column align-items-center">
		<div class="row">
			<div class="col-md-6">
				<div class="card-content">
					Count: {{ count }}
				</div>
			</div>
			<div class="col-md-6">
				<div class="card-content">
					True Count: {{ trueCount }}
				</div>
			</div>
		</div>

		<div class="py-3">
			<h2>Cards</h2>
			<button class="btn btn-rounded btn-green mx-2" @click="increaseCount">2 - 6</button>
			<button class="btn btn-rounded btn-green mx-2">7 - 9</button>
			<button class="btn btn-rounded btn-green mx-2" @click="decreaseCount">10 - A</button>
		</div>

		<div class="py-3">
			<h2>Decks</h2>
			<button class="btn btn-transparent" @click="decreaseDeck">-</button>
			{{ decks }}
			<button class="btn btn-transparent" @click="increaseDeck">+</button>
		</div>

		<button @click="resetCount">Reset</button>
		
		<p v-if="trueCount >= 3">You should take insurance.</p>
	</div>
</template>

<script>
	export default {
		name: 'Home',

		data () {
			return {
				count: 0,
				trueCount: 0,
				decks: 2
			}
		},

		methods: {
			decreaseCount() {
				this.count -= 1
				this.updateTrueCount()
			},
			increaseCount() {
				this.count += 1
				this.updateTrueCount()
			},
			resetCount() {
				let text = "Are you sure you want to reset the count?"

				if (confirm(text) == true) {
					this.count = 0
					this.updateTrueCount()
				}
			},
			decreaseDeck() {
				this.decks -= 1
				this.updateTrueCount()
			},
			increaseDeck() {
				this.decks += 1
				this.updateTrueCount()
			},
			updateTrueCount() {
				this.trueCount = Math.round(this.count / this.decks)
			},
		},
	}
</script>

<style scoped>
.btn-rounded {
	width: 70px;
	height: 70px;
	text-align: center;
}
</style>
