<template>
	<!-- Dealer Cards -->
	<div class="flex-box py-3">
		<h3>Dealer Card</h3>
		<slider :data="cards" :action="this.addDealerCard" />
	</div>

	<!-- Selected Dealer Cards -->
	<div class="d-flex playcard-container justify-content-center py-3">
		<!-- Cards -->
		<li class="d-inline-block" v-for="(value, key) in current.hand.dealer">
			<div class="playcard d-flex flex-column">
				<!-- Remove -->
				<button class="btn btn-close btn-danger" v-on:click="this.removeDealerCard(key)">
					<i class="fas fa-times"></i>
				</button>
				
				<!-- Information -->
				<strong class="text-left">{{ cards[value] ?? value }}</strong>
				<h2 class="d-flex flex-grow-1 align-items-center justify-content-center color-muted">
					<i class="far fa-dice"></i>
				</h2>
				<strong class="text-right">{{ cards[value] ?? value }}</strong>
			</div>
		</li>
	</div>

	<!-- Current Count -->
	<div class="d-flex flex-box flex-grow-1 justify-content-center flex-column">
		<div class="card card-soft">
			<div class="row">
				<div class="col-xs-6 col-md-6">
					<div class="card-content">
						<small>True Count</small>
						<h2>{{ current.trueCount }}</h2>
					</div>
				</div>
				<div class="col-xs-6 col-md-6">
					<div class="card-content">
						<small>Action</small>
						<h2>?</h2>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Selected Players Cards -->
	<div class="d-flex playcard-container justify-content-center py-3">
		<!-- Cards -->
		<li class="d-inline-block" v-for="(value, key) in current.hand.player">
			<div class="playcard d-flex flex-column">
				<!-- Remove -->
				<button class="btn btn-close btn-danger" v-on:click="this.removePlayerCard(key)">
					<i class="fas fa-times"></i>
				</button>
				
				<!-- Information -->
				<strong class="text-left">{{ cards[value] ?? value }}</strong>
				<h2 class="d-flex flex-grow-1 align-items-center justify-content-center color-muted">
					<i class="far fa-dice"></i>
				</h2>
				<strong class="text-right">{{ cards[value] ?? value }}</strong>
			</div>
		</li>
	</div>

	<!-- Players Cards -->
	<div class="flex-box py-3">
		<h3>Player Cards (2)</h3>
		<slider :data="cards" :action="this.addPlayerCard" />
	</div>

	<!-- Deck Options -->
	<div class="flex-box text-center py-3">
		<button class="btn btn-transparent" @click="decreaseDeck">
			<i class="far fa-minus"></i>
		</button>
		{{ current.decks }}
		<button class="btn btn-transparent" @click="increaseDeck">
			<i class="far fa-plus"></i>
		</button>
		<p class="hint">Total Decks In Game</p>
	</div>
	
	<!-- Main Options -->
	<div class="flex-box d-flex">
		<button class="btn btn-danger btn-block me-1" v-on:click="this.attemptResetCount">Reset Deck</button>
		<button class="btn btn-block ms-1" v-on:click="this.resetHand">New Hand</button>
	</div>

	<snackbars />
</template>

<script>
	import Snackbars from '/src/js/components/Snackbar/Snackbars.vue'
	import Slider from '/src/js/components/Slider.vue'
	import cards from '/src/data/cards.json'

	export default {
		name: 'Advanced',
		//guards: 'auth',

		components: {
			Slider,
			Snackbars
		},

		data () {
			return {
				cards: cards,
				current: {
					drawnCards: [],
					hand: {
						player: [],
						dealer: []
					},
					decks: 2,
					count: 0,
					trueCount: 0,
				},
				actions: [],
				actionCount: 0
			}
		},

		methods: {
			/**
			 * Add a specific card to dealer's hand
			 */
			addDealerCard(card) {
				if (!this.cards[card])
					return 0, console.error("Card doesn't exist:", card)
				
				// add the card
				this.addDeckCard(card)
				this.current.hand.dealer.push(card)
			},
			/**
			 * Remove a specific card from the dealer's hand
			 */
			removeDealerCard(key) {
				let card = this.current.hand.dealer[key]
				
				// check if the card exists
				if (!card)
					return 0, console.error("Card doesn't exist:", card)
				
				this.removeDeckCard(card)
				this.current.hand.dealer.splice(key, 1)
			},
			/**
			 * Add a specific card to player's hand
			 */
			addPlayerCard(card) {
				if (!this.cards[card])
					return 0, console.error("Card doesn't exist:", card)

				// add the card
				this.addDeckCard(card)
				this.current.hand.player.push(card)
			},
			/**
			 * Remove a specific card from the player's hand
			 */
			removePlayerCard(key) {
				let card = this.current.hand.player[key]

				// check if the card exists
				if (!card)
					return 0, console.error("Card doesn't exist:", card)
				
				// remove the card
				this.removeDeckCard(card)
				this.current.hand.player.splice(key, 1)
			},
			/**
			 * Add a specific card to the list
			 */
			addDeckCard(card) {
				if (!this.current.drawnCards[card])
					this.current.drawnCards[card] = 0
				
				// Add the card to the drawn cards array
				this.current.drawnCards[card] += 1

				// Re-calculate the count with this card
				if (card >= 2 && card <= 6)
					this.current.count += 1
				else if (!(card >= 7 && card <= 9))
					this.current.count -= 1
			},
			/**
			 * Remove a specific card from the list
			 */
			removeDeckCard(card) {
				if (!this.current.drawnCards[card])
					return 0, console.error("Card doesn't exist:", card)

				// Decrease or remove a card from the drawn deck
				if (this.current.drawnCards[card] > 1)
					this.current.drawnCards[card] -= 1
				else
					this.current.drawnCards.splice(card, 1)

				// Re-calculate the count without this card
				if (card >= 2 && card <= 6)
					this.current.count -= 1
				else if (!(card >= 7 && card <= 9))
					this.current.count += 1
			},
			/**
			 * Re-calculate the true count
			 */
			updateTrueCount() {
				this.current.trueCount = (this.current.count / this.current.decks).toFixed(2)
			},
			/**
			 * Attempt to reset the count
			 */
			attemptResetCount() {
				let text = "Are you sure you want to reset the count?"

				if (confirm(text) == true) {
					this.resetHand()
					this.resetCount()
				}
			},
			/**
			 * Increate the decks
			 */
			increaseDeck() {
				this.current.decks += 1
			},
			/**
			 * Decrease the decks
			 */
			decreaseDeck() {
				if (this.current.decks > 1)
					this.current.decks -= 1
			},
			/**
			 * Reset the current hand
			 */
			resetHand() {
				if (this.current.hand.player.length == 0 && this.current.hand.dealer.length == 0)
					return false
				
				// save to the actions array
				this.log({
					count: this.current.count,
					trueCount: this.current.trueCount,
					drawnCards: [...this.current.drawnCards],
					hand: {
						player: [...this.current.hand.player],
						dealer: [...this.current.hand.dealer]
					},
					decks: this.current.decks
				})

				// reset the arrays
				this.current.hand.player = []
				this.current.hand.dealer = []
			},
			/**
			 * Reset the current count
			 */
			resetCount() {
				// save to the actions array
				this.log({
					count: this.current.count,
					trueCount: this.current.trueCount,
					drawnCards: [...this.current.drawnCards],
					hand: {
						player: [...this.current.hand.player],
						dealer: [...this.current.hand.dealer]
					},
					decks: this.current.decks
				})

				// reset the data
				this.current.count = 0
				this.current.drawnCards = []
			},
			/**
			 * Log
			 */
			log(data) {
				this.$store.dispatch('snackbar/add', { 
					options: { 
						title: 'Undo',
						timeout: 3000
					},
					actions: [
						{
							title: 'Undo',
							type: 'success',
							callback: this.undo
						}
					]
				})
				
				this.actions.splice(this.actionCount, 0, data)
				this.actionCount += 1
			},
			/**
			 * Undo
			 */
			undo () {
				let item = this.actions[this.actionCount - 1]

				if (!item)
					return false
				
				this.current = item
				this.updateTrueCount()
				this.actionCount -= 1
			},
			/**
			 * Redo
			 */
			redo () {
				let item = this.actions[this.actionCount + 1]

				if (!item)
					return false
				
				this.current = item
				this.updateTrueCount()
				this.actionCount += 1
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