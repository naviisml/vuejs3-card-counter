<template>
	<div class="flex-box py-3">
		<h3>Dealer Card</h3>
		<slider :data="cards" />
	</div>

	<div class="d-flex flex-box flex-grow-1 justify-content-center flex-column">
		<div class="card card-soft">
			<div class="row">
				<div class="col-xs-6 col-md-6">
					<div class="card-content">
						<small>True Count</small>
						<h2>0</h2>
					</div>
				</div>
				<div class="col-xs-6 col-md-6">
					<div class="card-content">
						<small>Action</small>
						<h2>Split</h2>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="flex-box py-3">
		<h3>Player Cards (2)</h3>
		<slider :data="cards" />
	</div>

	<div class="flex-box text-center py-3">
		<button class="btn btn-transparent" @click="decreaseDeck">
			<i class="far fa-minus"></i>
		</button>
		{{ decks }}
		<button class="btn btn-transparent" @click="increaseDeck">
			<i class="far fa-plus"></i>
		</button>
		<p class="hint">Total Decks In Game</p>
	</div>

	<div class="flex-box d-flex">
		<button class="btn btn-danger btn-block me-1" v-on:click="this.attemptResetCount">Reset Deck</button>
		<button class="btn btn-block ms-1" v-on:click="this.resetHand">New Hand</button>
	</div>
</template>

<script>
	import Slider from '/src/js/components/Slider.vue'
	import cards from '/src/data/cards.json'

	export default {
		name: 'Advanced',

		components: {
			Slider
		},

		data () {
			return {
				cards: cards,
				drawnCards: [],
				hand: {
					player: null,
					dealer: null
				},
				decks: 2,
			}
		},
		
		mounted() {
			this.resetCount()
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
			attemptResetCount() {
				let text = "Are you sure you want to reset the count?"

				if (confirm(text) == true) {
					this.resetCount()
				}
			},
			resetCount() {
				this.resetHand()
				this.drawnCards = []
			},
			decreaseDeck() {
				if (this.decks > 1)
					this.decks -= 1
				this.updateTrueCount()
			},
			increaseDeck() {
				this.decks += 1
				this.updateTrueCount()
			},
			updateTrueCount() {
				this.trueCount = (this.count / this.decks).toFixed(2)
			},
		},
	}
</script>