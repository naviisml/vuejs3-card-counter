<template>
	<div class="container py-5">
		<h2>Blackjack Counter</h2>
		<p>Count: {{ count }}</p>
		<p>
			True Count: {{ trueCount }}

			<span v-if="trueCount >= 3" class="tooltip tooltip-bottom tooltip-medium color-danger" aria-label="With a true count above 3, we recommend taking insurance.">
				<i class="fas fa-exclamation-triangle"></i>
			</span>
		</p>

		<div class="d-flex flex-column align-items-center">
			<div class="py-5">
				<button class="btn btn-rounded btn-green mx-2" @click="increaseCount">2 - 6</button>
				<button class="btn btn-rounded btn-green mx-2">7 - 9</button>
				<button class="btn btn-rounded btn-green mx-2" @click="decreaseCount">10 - A</button>
				<p class="hint text-center py-3">Dealt Card</p>
			</div>

			<div class="text-center py-5">
				<button class="btn btn-transparent" @click="decreaseDeck">
					<i class="far fa-minus"></i>
				</button>
				{{ decks }}
				<button class="btn btn-transparent" @click="increaseDeck">
					<i class="far fa-plus"></i>
				</button>
				<p class="hint text-center">Total Decks In Game</p>
			</div>

			<button class="btn btn-block" @click="resetCount">Reset</button>
		</div>
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
