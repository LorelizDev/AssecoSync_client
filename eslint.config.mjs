import globals from 'globals';
import pluginReact from 'eslint-plugin-react';
import prettierPlugin from 'eslint-plugin-prettier';
import eslintJs from '@eslint/js';

export default [
	// Configuración global
	{
		languageOptions: {
			parser: '@babel/eslint-parser',
			globals: { ...globals.browser, ...globals.node },
		},
		plugins: {
			react: pluginReact,
			prettier: prettierPlugin,
		},
		rules: {
			'prettier/prettier': 'error',
			'react/react-in-jsx-scope': 'off',
		},
	},

	// Configuración para archivos React y JSX/TSX
	{
		files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
		settings: {
			react: {
				version: 'detect',
			},
		},
		plugins: {
			react: pluginReact,
		},
		rules: {
			...pluginReact.configs.recommended.rules,
			'react/prop-types': 'off',
		},
	},

	// Configuración de Prettier
	{
		plugins: {
			prettier: prettierPlugin,
		},
		rules: {
			'prettier/prettier': 'error',
		},
	},

	// Reglas recomendadas de ESLint
	eslintJs.configs.recommended,
];
