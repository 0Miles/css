/**
 * @fileoverview Detect classnames which do not belong to Tailwind CSS
 * @author François Massart
 */
'use strict'

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require('../lib/rules/no-custom-classname')
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

const skipClassAttributeOptions = [
  {
    skipClassAttribute: true,
    config: {
      theme: {},
      plugins: [],
    },
  },
]
var generateErrors = (classnames) => {
  const errors = []
  if (typeof classnames === 'string') {
    classnames = classnames.split(' ')
  }
  classnames.map((classname) => {
    errors.push({
      messageId: 'customClassnameDetected',
      data: {
        classname: classname,
      },
    })
  })
  return errors
}

var ruleTester = new RuleTester({ parserOptions })

ruleTester.run('no-custom-classname', rule, {
  valid: [
    {
      code: `<div className="ns-dark">Custom dark class</div>`,
      options: [
        {
          config: { darkMode: ['class', '.ns-dark'] },
        },
      ],
    }
  ],

  invalid: [
    {
      code: `
      export interface FakePropsInterface {
        readonly name?: string;
      }
      function Fake({
        name = 'yolo'
      }: FakeProps) {
        return (
          <>
            <h1 className={"w-12 my-custom"}>Welcome {name}</h1>
            <p>Bye {name}</p>
          </>
        );
      }
      export default Fake;
      `,
      parser: require.resolve('@typescript-eslint/parser'),
      errors: generateErrors('my-custom'),
    }
  ],
})
