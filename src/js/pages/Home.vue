<template>
	<p>Count: {{ count }}</p>
	<p>True Count: {{ trueCount }}</p>

	<div>
		<h2>Cards</h2>
		<button @click="increaseCount">2 - 6</button>
		<button>7 - 9</button>
		<button @click="decreaseCount">10 - A</button>
	</div>

	<div>
		<h2>Decks</h2>
		<button @click="decreaseDeck">-</button>
		{{ decks }}
		<button @click="increaseDeck">+</button>
	</div>
	
	<p v-if="trueCount >= 3">You should take insurance.</p>
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
			}
		},
	}
</script>
