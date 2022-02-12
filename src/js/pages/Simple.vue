<template>
	<!-- Current Count -->
	<div class="flex-box">
		<div class="card card-soft">
			<div class="row">
				<div class="col-xs-6 col-md-6">
					<div class="card-content">
						<small>True Count</small>
						<h2>{{ trueCount }}</h2>
					</div>
				</div>
				<div class="col-xs-6 col-md-6">
					<div class="card-content">
						<small>Odds</small>
						<h2 v-if="trueCount >= 3">High</h2>
						<h2 v-else-if="trueCount >= 0">Normal</h2>
						<h2 v-else>Low</h2>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Card Options -->
	<div class="d-flex flex-grow-1 align-items-center">
		<div class="flex-box">
			<button class="btn btn-rounded btn-green mx-2" @click="increaseCount">2 - 6</button>
			<button class="btn btn-rounded btn-green mx-2">7 - 9</button>
			<button class="btn btn-rounded btn-green mx-2" @click="decreaseCount">10 - A</button>
			<p class="hint text-center pt-2">Dealt Card</p>
		</div>
	</div>

	<!-- Deck Options -->
	<div class="text-center py-3">
		<button class="btn btn-transparent" @click="decreaseDeck">
			<i class="far fa-minus"></i>
		</button>
		{{ decks }}
		<button class="btn btn-transparent" @click="increaseDeck">
			<i class="far fa-plus"></i>
		</button>
		<p class="hint">Total Decks In Game</p>
	</div>

	<!-- Main Options -->
	<button class="btn btn-block" @click="attemptResetCount">Reset</button>
</template>

<script>
	export default {
		name: 'Simple',

		data () {
			return {
				count: 0,
				trueCount: 0,
				decks: 2
			}
		},

		created() {
			this.resetCount()
		},

		methods: {
			decreaseCount() {
				this.count -= 1
			},
			increaseCount() {
				this.count += 1
			},
			attemptResetCount() {
				let text = "Are you sure you want to reset the count?"

				if (confirm(text) == true) {
					this.resetCount()
				}
			},
			resetCount() {
				this.count = 0
			},
			decreaseDeck() {
				if (this.decks > 1)
					this.decks -= 1
			},
			increaseDeck() {
				this.decks += 1
			},
			updateTrueCount() {
				this.trueCount = (this.count / this.decks).toFixed(2)
			},
		},

		watch: {
			"current.count": function (val) {
				this.updateTrueCount()
			},
			"current.decks": function (val) {
				this.updateTrueCount()
			},
		}
	}
</script>