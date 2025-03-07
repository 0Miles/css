'use strict'

const astUtil = require('../utils/ast')
const resolveContext = require('../utils/resolve-context')
const { reorderForReadableClasses } = require('@master/css')

module.exports = {
    meta: {
        docs: {
            description: 'Enforce a consistent and logical order of classes',
            category: 'Stylistic Issues',
            recommended: false,
            url: 'https://beta.css.master.co/docs/code-linting#enforce-a-consistent-and-logical-order-of-classes',
        },
        messages: {
            invalidClassOrder: 'No consistent class order followed.',
        },
        fixable: 'code'
    },
    create: function (context) {
        const { options, settings, config } = resolveContext(context)
        const sortNodeArgumentValue = (node, arg = null) => {
            let originalClassNamesValue = null
            let start = null
            let end = null
            let prefix = ''
            let suffix = ''
            if (arg === null) {
                originalClassNamesValue = astUtil.extractValueFromNode(node)
                const range = astUtil.extractRangeFromNode(node)
                if (node.type === 'TextAttribute') {
                    start = range[0]
                    end = range[1]
                } else {
                    start = range[0] + 1
                    end = range[1] - 1
                }
            } else {
                switch (arg.type) {
                    case 'Identifier':
                        return
                    case 'TemplateLiteral':
                        arg.expressions.forEach((exp) => {
                            sortNodeArgumentValue(node, exp)
                        })
                        arg.quasis.forEach((quasis) => {
                            sortNodeArgumentValue(node, quasis)
                        })
                        return
                    case 'ConditionalExpression':
                        sortNodeArgumentValue(node, arg.consequent)
                        sortNodeArgumentValue(node, arg.alternate)
                        return
                    case 'LogicalExpression':
                        sortNodeArgumentValue(node, arg.right)
                        return
                    case 'ArrayExpression':
                        arg.elements.forEach((el) => {
                            sortNodeArgumentValue(node, el)
                        })
                        return
                    case 'ObjectExpression':
                        const isUsedByClassNamesPlugin = node.callee && node.callee.name === 'classnames'
                        const isVue = node.key && node.key.type === 'VDirectiveKey'
                        arg.properties.forEach((prop) => {
                            const propVal = isUsedByClassNamesPlugin || isVue ? prop.key : prop.value
                            sortNodeArgumentValue(node, propVal)
                        })
                        return
                    case 'Property':
                        sortNodeArgumentValue(node, arg.key)
                        break
                    case 'Literal':
                        originalClassNamesValue = arg.value
                        start = arg.range[0] + 1
                        end = arg.range[1] - 1
                        break
                    case 'SvelteLiteral':
                        originalClassNamesValue = arg.value
                        if (originalClassNamesValue === '') {
                            return
                        }
                        start = arg.range[0]
                        end = arg.range[1]
                        break
                    case 'TemplateElement':
                        originalClassNamesValue = arg.value.raw
                        if (originalClassNamesValue === '') {
                            return
                        }
                        start = arg.range[0]
                        end = arg.range[1]
                        // https://github.com/eslint/eslint/issues/13360
                        // The problem is that range computation includes the backticks (`test`)
                        // but value.raw does not include them, so there is a mismatch.
                        // start/end does not include the backticks, therefore it matches value.raw.
                        const txt = context.getSourceCode().getText(arg)
                        prefix = astUtil.getTemplateElementPrefix(txt, originalClassNamesValue)
                        suffix = astUtil.getTemplateElementSuffix(txt, originalClassNamesValue)
                        originalClassNamesValue = astUtil.getTemplateElementBody(txt, prefix, suffix)
                        break
                }
            }

            let { classNames, whitespaces, headSpace, tailSpace } =
                astUtil.extractClassnamesFromValue(originalClassNamesValue)

            if (classNames.length <= 1) {
                // Don't run sorting for a single or empty className
                return
            }

            let orderedClassNames = reorderForReadableClasses(classNames, config)
                .filter(eachOrderedClassName => classNames.includes(eachOrderedClassName))

            orderedClassNames = classNames.filter(x => !orderedClassNames.includes(x))
                .concat(orderedClassNames)
                .filter(x => x.trim() !== '')

            // Generates the validated/sorted attribute value
            let validatedClassNamesValue = ''
            for (let i = 0; i < orderedClassNames.length; i++) {
                const w = whitespaces[i] ?? ''
                const cls = orderedClassNames[i]
                validatedClassNamesValue += headSpace ? `${w}${cls}` : `${cls}${w}`
                if (headSpace && tailSpace && i === orderedClassNames.length - 1) {
                    validatedClassNamesValue += whitespaces[whitespaces.length - 1] ?? ''
                }
            }

            if (originalClassNamesValue !== validatedClassNamesValue) {
                validatedClassNamesValue = prefix + validatedClassNamesValue + suffix
                context.report({
                    node: node,
                    messageId: 'invalidClassOrder',
                    fix: function (fixer) {
                        return fixer.replaceTextRange([start, end], validatedClassNamesValue)
                    },
                })
            }
        }

        const callExpressionVisitor = function (node) {
            const calleeStr = astUtil.calleeToString(node.callee)
            if (settings.callees.findIndex((name) => calleeStr === name) === -1) {
                return
            }

            node.arguments.forEach((arg) => {
                sortNodeArgumentValue(node, arg)
            })
        }

        const scriptVisitor = {
            CallExpression: callExpressionVisitor,
            JSXAttribute: function (node) {
                if (!node.name || !new RegExp(settings.classMatching).test(node.name.name)) return
                if (node.value && node.value.type === 'Literal') {
                    sortNodeArgumentValue(node)
                } else if (node.value && node.value.type === 'JSXExpressionContainer') {
                    sortNodeArgumentValue(node, node.value.expression)
                }
            },
            SvelteAttribute: function (node) {
                if (!node.key?.name || !new RegExp(settings.classMatching).test(node.key.name)) return
                for (const eachValue of node.value) {
                    sortNodeArgumentValue(node, eachValue)
                }
            },
            TextAttribute: function (node) {
                if (!node.name || !new RegExp(settings.classMatching).test(node.name)) return
                sortNodeArgumentValue(node)
            },
            TaggedTemplateExpression: function (node) {
                if (!settings.tags.includes(node.tag.name)) {
                    return
                }
                sortNodeArgumentValue(node, node.quasi)
            },
        }
        const templateBodyVisitor = {
            CallExpression: callExpressionVisitor,
            VAttribute: function (node) {
                if (node.value && node.value.type === 'VLiteral') {
                    sortNodeArgumentValue(node)
                } else if (node.value && node.value.type === 'VExpressionContainer' && node.value.expression.type === 'ArrayExpression') {
                    node.value.expression.elements.forEach((arg) => {
                        sortNodeArgumentValue(node, arg)
                    })
                } else if (node.value && node.value.type === 'VExpressionContainer' && node.value.expression.type === 'ObjectExpression') {
                    sortNodeArgumentValue(node, prop)
                }
            },
        }

        if (context.parserServices == null || context.parserServices.defineTemplateBodyVisitor == null) {
            return scriptVisitor
        } else {
            return context.parserServices.defineTemplateBodyVisitor(templateBodyVisitor, scriptVisitor)
        }
    },
}
