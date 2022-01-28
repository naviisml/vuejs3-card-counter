<template>
	<div class="slider">
		<div class="slider-container">
			<li class="slide" v-for="(value, key) in data">
				<div class="d-flex flex-column" style="height: 100%">
					<strong class="text-left">{{ value }}</strong>
					<h2 class="d-flex flex-grow-1 align-items-center justify-content-center color-gray">
						<i class="far fa-dice"></i>
					</h2>
					<strong class="text-right">{{ value }}</strong>
				</div>
			</li>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Slider',

		props: {
			data: {
				type: Object,
				default: null
			}
		},

		data () {
			return {
				items: [],
				slider: false,
				container: false,
				slide: 0,
			}
		},

		mounted() {
			this.setupSlide()

			// Touchscreen Fix
			if ((('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0)) == true) {
				this.enableTouchscreen()
			}

			// Scrollwheel fix
			this.container.addEventListener('wheel', this.handleScroll, false)
		},

		destroyed() {
			this.container.removeEventListener('wheel', this.handleScroll, false)
		},

		methods: {
			setupSlide() {
				let slider = document.querySelector('.slider')
				let container = slider.querySelector('.slider-container')
				let items = [...slider.querySelectorAll('.slider-container .slide')]

				items.map(item => {
					this.items.push(item)
				})
				this.slider = slider
				this.container = container
			},
			handleScroll(event) {
				if (event.deltaY < 0) {
					this.slideToElement(this.slide + 1)
				} else {
					this.slideToElement(this.slide - 1)
				}
			},
			enableTouchscreen() {
				this.slider.style.overflowX = "scroll"
			},
			slideToElement(slideId) {
				let slide = this.items[slideId]
				
				if (this.slider && slide) {
					this.slideTo(slide.offsetLeft)
					this.slide = slideId
				}
			},
			slideTo(offset) {
				if (this.container.scrollWidth - (this.slider.clientWidth)) {
					this.slider.scrollTo({
						top: 0,
						left: offset,
						behavior: 'smooth'
					})
				}
			},
			previousSlide() {
				this.slideToElement(this.slide - 1)
			},
			nextSlide() {
				this.slideToElement(this.slide + 1)
			}
		},
	}
</script>

<style scoped>
.slider {
	position: relative;
	width: 100%;
}

.slide-container {
	position: relative;
	height: 100%;
	width: auto;
	overflow: auto;
}
.slide {
	background: white;
	color: black;
	border-radius: 5px;
	padding: 12px;
	height: 100px;
	width: 75px;
	margin: 10px;
	display: inline-block;
}

.slide:hover {
	box-shadow: 0px 0px 16px 0px rgba(19, 107, 255, 1);
}
</style>