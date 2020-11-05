module.exports = {
    parser: '@typescript-eslint/parser', // Specifies the ESLint parser
    extends: [
        'plugin:react/recommended', // Uses the recommended rules from @eslint-plugin-react
        'plugin:@typescript-eslint/recommended', // Uses the recommended rules from @typescript-eslint/eslint-plugin
    ],
    plugins: ['import', 'react-hooks'],
    parserOptions: {
        ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
        sourceType: 'module', // Allows for the use of imports
        ecmaFeatures: {
            jsx: true, // Allows for the parsing of JSX
        },
    },
    rules: {
        // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/prefer-interface': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/indent': 'off',
        '@typescript-eslint/ban-ts-ignore': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        'react/prop-types': 'off',
        'react/no-unescaped-entities': 'off',
        '@typescript-eslint/camelcase': 'off',
        '@typescript-eslint/explicit-member-accessibility': 'off',
        '@typescript-eslint/no-use-before-define': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        'react/display-name': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/no-object-literal-type-assertion': 'off',
        '@typescript-eslint/class-name-casing': 'off',
        'import/order': ['error', { 'newlines-between': 'always' }],
        'react/jsx-no-useless-fragment': ['error'],
        'react/jsx-curly-brace-presence': [1, { props: 'never', children: 'never' }],
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'error',
        'no-console': ['error', { allow: ['warn', 'error'] }],
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        'no-restricted-globals': ['error', 'name', 'close', 'open'],
    },
    settings: {
        react: {
            version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
        },
    },
};
