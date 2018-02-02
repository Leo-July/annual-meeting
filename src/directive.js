import Vue from 'vue'

Vue.directive(
	'head', (el, binding) =>{
		el.style.background = `url(${binding.value}) no-repeat center / cover`
	}  
)

Vue.directive(
	'root-font', (el, binding) => {
		const html = document.querySelector('html')
		const screen = window.innerWidth
		let fontSize = 0

		switch (binding.arg) {
		case 'mobile': 
			fontSize = screen / 375 * 100
			break
		default :
			fontSize = screen / 1920 *100
		}
    
		html.style.fontSize = fontSize
	}
)