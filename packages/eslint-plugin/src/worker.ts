import process from 'node:process'
import exploreConfig from 'explore-config'
import { runAsWorker } from 'synckit'
import MasterCSS, { Config, reorderForReadableClasses } from '@master/css'
import { validate, createValidRules } from '@master/css-validator'
import { Rule } from '@master/css'

let masterCSS: MasterCSS
let masterConfig: string | Config

// bypass icon rules in ESLint
process.env.ESLINT ||= 'true'

function _getMasterCSS(config: string | Config) {
    console.log('new master css')
    return new MasterCSS(typeof config === 'object' ? config : exploreConfig(config || ''))
}

export function getMasterCSS(config: string | Config) {
    if (!masterCSS || masterConfig !== config) {
        masterCSS = _getMasterCSS(config)
        masterConfig = config
    }
    return masterCSS
}

function actionSort(classNames: string[], config: string | Config) {
    return reorderForReadableClasses(classNames, { css: getMasterCSS(config) })
        .filter((eachOrderedClassName: string) => classNames.includes(eachOrderedClassName))
}

function actionValidate(className: string, config: string | Config) {
    return validate(className, { css: getMasterCSS(config) })
}

function actionRuleOfClass(classNames: string[], config: string | Config) {
    const ruleOfClass = {}
    classNames
        .forEach(eachClassName => {
            ruleOfClass[eachClassName] = createValidRules(eachClassName, { css: getMasterCSS(config) })[0]
        })
    return ruleOfClass
}

export function run(action: 'sort', classNames: string[], config: string | Config): string[]
export function run(action: 'validate', className: string, config: string | Config): {isMasterCSS: boolean;errors: SyntaxError[]}
export function run(action: 'ruleOfClass', className: string, config: string | Config): Rule
export function run(action: string, ...args: any[]): any {
    switch (action) {
        case 'sort':
            // @ts-expect-error cast
            return actionSort(...args)
        case 'validate':
            // @ts-expect-error cast
            return actionValidate(...args)
        case 'ruleOfClass':
            // @ts-expect-error cast
            return actionRuleOfClass(...args)
    }
}

runAsWorker(run as any)