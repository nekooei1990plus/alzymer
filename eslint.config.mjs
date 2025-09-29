import antfu from "@antfu/eslint-config"
import { FlatCompat } from "@eslint/eslintrc"

const compat = new FlatCompat()

const otherFlattenedPlugins = compat.config({
	extends: ["plugin:oxlint/recommended"],
})

const antfuConfig = antfu({
	stylistic: {
		indent: "tab",
		quotes: "double",
		semi: false,
	},
	rules: {
		"jsdoc/require-returns-check": "off",
		"jsdoc/require-returns-description": "off",
		"no-console": "off",
		"unused-imports/no-unused-imports": "warn",
		"node/handle-callback-err": "off",
		"eslint-comments/no-unlimited-disable": "off",
		"style/max-statements-per-line": "off",
		"ts/consistent-type-imports": "off",
		"ts/consistent-type-definitions": "off",
		"brace-style": ["warn", "stroustrup", { allowSingleLine: false }],
		"node/prefer-global/process": "off",
		"prefer-regex-literals": "off",
		"eqeqeq": "off",
	},
	// @ts-expect-error unmatched library versions
}, otherFlattenedPlugins)

export default antfuConfig
