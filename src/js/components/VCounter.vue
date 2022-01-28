<template>
	<div class="wrapcontent d-flex flex-column align-items-center py-5">
		<div class="flex-box py-2">
			<h2>
				<span class="mr-2"><i class="far fa-dice"></i></span>
				Blackjack Counter
			</h2>
		</div>

		<div class="flex-box py-3">
			<div class="card card-soft">
				<div class="row">
					<div class="col-md-6">
						<div class="card-content">
							<p>
								True Count

								<span class="float-right tooltip-bottom tooltip-medium" aria-label="Lala">
									<i class="fal fa-info-circle"></i>
								</span>
							</p>
							<h1>{{ trueCount }}</h1>
						</div>
					</div>
					<div class="col-md-6">
						<div class="card-content">
							<p>Odds</p>
							<h1 v-if="trueCount >= 3">High</h1>
							<h1 v-if="trueCount <= 2 && trueCount >= 0">Normal</h1>
							<h1 v-if="trueCount < 0">Low</h1>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="flex-grow-1 py-3">
			<div> 
				<button class="btn btn-rounded btn-green mx-2" @click="increaseCount">2 - 6</button>
				<button class="btn btn-rounded btn-green mx-2">7 - 9</button>
				<button class="btn btn-rounded btn-green mx-2" @click="decreaseCount">10 - A</button>
			</div>
			<p class="hint text-center py-3">Dealt Card</p>
		</div>

		<div class="flex-grow-1 text-center py-3">
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

		<button class="btn btn-block" @click="attemptResetCount">Reset</button>
	</div>
</template>

<script>
	export default {
		name: 'VCounter',

		data () {
			return {
				count: 0,
				trueCount: 0,
				decks: 2
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
				this.count = 0
				this.updateTrueCount()
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

<style scoped>
.flex-box {
	position: relative;
	width: 100%;
}

.card-soft {
	--card-background-color: 0, 0, 0;
	--card-foreground-color: 255, 255, 255;
	border: none;
}
</style>
