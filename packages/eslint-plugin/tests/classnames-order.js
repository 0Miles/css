/**
 * @fileoverview Use a consistent orders for the Tailwind CSS classnames, based on property then on variants
 * @author François Massart
 */
'use strict'

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require('../lib/rules/classnames-order')
var RuleTester = require('eslint').RuleTester

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var parserOptions = {
    ecmaVersion: 2019,
    sourceType: 'module',
    ecmaFeatures: {
        jsx: true,
    },
}

var ruleTester = new RuleTester({ parserOptions })

const generateErrors = (count) => {
    const errors = []

    for (let i = 0; i < count; i++) {
        errors.push({
            messageId: 'invalidOrder',
        })
    }

    return errors
}

const errors = generateErrors(1)

const sharedOptions = [
    {
        config: {
            theme: {
                extend: {
                    fontSize: { large: '20rem' },
                    colors: {
                        'deque-blue': '#243c5a',
                    },
                },
            },
            plugins: [],
        },
    },
]

const skipClassAttributeOptions = [
    {
        skipClassAttribute: true,
        config: {
            theme: {},
            plugins: [],
        },
    },
]

ruleTester.run('classnames-order', rule, {
    valid: [
        {
            code: `<div class="p:8 m:8 f:24 fg:white bg:black">Simple, basic</div>`,
        }
    ],
    invalid: [],
})
