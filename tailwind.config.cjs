const colors = require('tailwindcss/colors');
var flattenColorPalette = require('tailwindcss/lib/util/flattenColorPalette').default;

const config = {
	mode: "jit",
	purge: [
		"./src/**/*.{html,js,svelte,ts}",
	],
	theme: {
		colors: {
			transparent: 'transparent',
			current: 'currentColor',
			black: colors.black,
			white: colors.white,
			grey: colors.gray,
			green: colors.green,
			yellow: colors.yellow,
			// Custom blue
			blue: {
				"0": "#0C1827",
				"1": "#142942",
				"2": "#1D395D",
				"3": "#254A78",
				"4": "#2D5B93",
				"5": "#3B6EB3", // vNAAATS plugin screen colour
				"6": "#427DC5",
				"7": "#5D8FCD",
				"8": "#78A2D5",
				"9": "#93B5DE",
				"10": "#BBD6EE" // vNAAATS plugin window border colour
			}
		},
		fontFamily: {
			"regular": ["Verdana, sans-serif"],
			"mono": ["Lucida Console, mono"],
			"bitmap": ["Expo"]
		},
		extend: {
			height: {
				"1/10": "10%",
				"1/14": "7.14%",
				"1/25": "4%"
			}
		},
	},
	plugins: [
		// Custom left, top, right and bottom border colours
		({ addUtilities, e, theme, variants }) => {
			let colors = flattenColorPalette(theme('borderColor'));
			delete colors['default'];

			// Replace or Add custom colors
			if(this.theme?.extend?.colors !== undefined){
				colors = Object.assign(colors, this.theme.extend.colors);
			}

			const colorMap = Object.keys(colors)
				.map(color => ({
					[`.border-t-${color}`]: {borderTopColor: colors[color]},
					[`.border-r-${color}`]: {borderRightColor: colors[color]},
					[`.border-b-${color}`]: {borderBottomColor: colors[color]},
					[`.border-l-${color}`]: {borderLeftColor: colors[color]},
				}));
			const utilities = Object.assign({}, ...colorMap);

			addUtilities(utilities, variants('borderColor'));
		},
	],
};

module.exports = config;
