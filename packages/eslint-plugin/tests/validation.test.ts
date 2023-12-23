import rule from '../src/rules/class-validation'
import { RuleTester } from 'eslint'

new RuleTester({
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
    }
}).run('invalid', rule, {
    valid: [
        {
            code: `<div class="bg:black f:24 fg:white m:8 p:8">Simple, basic</div>`,
        },
        {
            code: `<path style="fill: #FFFFFF">path</path>`,
        },
        {
            code: `<div ref="loginBox":class="[\`r:\${cssCalculate(20, 200)}vw\`, verificationCodeBoxDisplay ? 'max-h:585' : 'max-h:485']">Vue template</div>`,
            filename: 'test.vue',
            parser: require.resolve('vue-eslint-parser')
        }
    ],
    invalid: [
        {
            code: `<div class="bg:black m:mistake rrr">Simple, basic</div>`,
            errors: [
                { messageId: 'invalidClass' },
                { messageId: 'disallowUnknownClass' }
            ],
            options: [
                {
                    disallowUnknownClass: true
                }
            ]
        },
        {
            code: `<div class="bg:black m:mistake rrr">Simple, basic</div>`,
            errors: [
                { messageId: 'invalidClass' },
            ]
        },
        {
            code: `<div class="a c d hello:world font:error mt:0 mt:0@sm">Error class</div>`,
            errors: [
                { messageId: 'disallowUnknownClass' },
                { messageId: 'disallowUnknownClass' },
                { messageId: 'disallowUnknownClass' },
                { messageId: 'disallowUnknownClass' },
                { messageId: 'invalidClass' }
            ],
            options: [
                {
                    disallowUnknownClass: true
                }
            ]
        },
        {
            code: `<div class="a c d hello:world font:error mt:0 mt:0@sm">Error class</div>`,
            errors: [
                { messageId: 'invalidClass' }
            ]
        }
    ]
})

new RuleTester({
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
    },
    settings: {
        '@master/css': {
            config: {
                styles: { btn: 'block' }
            }
        }
    }
}).run('invalid', rule, {
    valid: [
        {
            code: `<div :class="[\`r:\${cssCalculate(20, 200)}vw\`]">Vue template</div>`,
            filename: 'test.vue',
            parser: require.resolve('vue-eslint-parser'),
            options: [
                {
                    disallowUnknownClass: true
                }
            ]
        }
    ],
    invalid: [
        {
            code: `<div class="btn rrr bg:black m:mistake">Simple, basic</div>`,
            errors: [
                { messageId: 'disallowUnknownClass' },
                { messageId: 'invalidClass' }
            ],
            options: [
                {
                    disallowUnknownClass: true
                }
            ]
        },
        {
            code: `<div class="btn a c d hello:world font:error mt:0 mt:0@sm">Error class</div>`,
            errors: [
                { messageId: 'disallowUnknownClass' },
                { messageId: 'disallowUnknownClass' },
                { messageId: 'disallowUnknownClass' },
                { messageId: 'disallowUnknownClass' },
                { messageId: 'invalidClass' }
            ],
            options: [
                {
                    disallowUnknownClass: true
                }
            ]
        }
    ],
})