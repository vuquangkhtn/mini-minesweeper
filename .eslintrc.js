module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:react/jsx-runtime',
		'plugin:jest/recommended',
		'plugin:react-hooks/recommended',
	],
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: ['react', 'prettier', 'jest', 'react-hooks'],
	rules: {
		'react/react-in-jsx-scope': 'off',
		'react/prop-types': 'off',
		'prettier/prettier': [
			'error',
			{
				trailingComma: 'es5',
				semi: true,
				jsxSingleQuote: true,
				singleQuote: true,
				useTabs: true,
			},
		],
	},
};
