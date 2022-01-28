<template>
	<div class="d-flex flex-column flex-fill align-items-center">
		<div class="py-5">
			<h2>Blackjack Counter</h2>
		</div>

		<div class="py-5">
			<p>Count: {{ count }}</p>
			<p>True Count: {{ trueCount }}</p>
		</div>

		<div class="py-5">
			<div> 
				<button class="btn btn-rounded btn-green mx-2" @click="increaseCount">2 - 6</button>
				<button class="btn btn-rounded btn-green mx-2">7 - 9</button>
				<button class="btn btn-rounded btn-green mx-2" @click="decreaseCount">10 - A</button>
			</div>
			<p class="hint text-center py-3">Dealt Card</p>
		</div>

		<div class="text-center py-5">
			<div>
				<button class="btn btn-transparent" @click="decreaseDeck">
					<i class="far fa-minus"></i>
				</button>
				{{ decks }}
				<button class="btn btn-transparent" @click="increaseDeck">
					<i class="far fa-plus"></i>
				</button>
			</div>
			<p class="hint text-center">Total Decks In Game</p>
		</div>

		<button class="btn btn-block" @click="resetCount">Reset</button>
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
