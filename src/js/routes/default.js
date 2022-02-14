import Simple from '../pages/Simple.vue'
import Advanced from '../pages/Advanced.vue'

export default [
	{
		path: '/',
		name: 'home',
		component: Simple
	},
	{
		path: '/advanced',
		name: 'advanced',
		component: Advanced
	},
]
