import { Button, TextInput, createTheme } from '@mantine/core'
import buttonClasses from '../components/core/button/Button.module.css'
import inputClasses from '../components/core/input/Input.module.css'

export const theme = createTheme({
	breakpoints: {
		xs: '32.5em',
		sm: '48em',
		md: '64em',
		lg: '80em',
		xl: '102.5em',
	},
	colors: {
		blue: [
			'#FAFDFF',
			'#F2F9FF',
			'#E4F3FF',
			'#E4F3FF',
			'#C6E0FF',
			'#B1D2FF',
			'#94C0FF',
			'#72A6FF',
			'#2D4B81',
			'#1E3B6F',
			'#3867BE',
			'#1B386C',
		],
	},
	primaryShade: 8,
	primaryColor: 'blue',
	defaultRadius: 'md',
	components: {
		Button: Button.extend({ classNames: buttonClasses }),
		TextInput: TextInput.extend({ classNames: inputClasses }),
	},
})
