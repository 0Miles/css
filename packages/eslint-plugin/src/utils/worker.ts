import exploreConfig from 'explore-config'
import { runAsWorker } from 'synckit'
import MasterCSS, { Config, reorderForReadableClasses } from '@master/css'
import { validate, createValidRules } from '@master/css-validator'
import { Rule } from '@master/css'

let currentCSS: MasterCSS
let currentConfig: string | Config

export function run(action: 'sort', classNames: string[], config: string | Config): string[]
export function run(action: 'validate', className: string, config: string | Config): { isMasterCSS: boolean; errors: SyntaxError[] }
export function run(action: 'collision', className: string, config: string | Config): Rule
export function run(action: string, className, config): any {
    // create a new Master CSS instance if the config is different
    if (!currentCSS || currentConfig !== config) {
        currentCSS = new MasterCSS(typeof config === 'object' ? config : exploreConfig(config || ''))
        currentConfig = config
    }
    switch (action) {
        case 'sort':
            return reorderForReadableClasses(className, { css: currentCSS })
                .filter((eachOrderedClassName: string) => className.includes(eachOrderedClassName))
        case 'validate':
            return validate(className, { css: currentCSS })
        case 'collision':
            // eslint-disable-next-line no-case-declarations
            const ruleOfClass = {}
            className
                .forEach(eachClassName => {
                    const validRule = createValidRules(eachClassName, { css: currentCSS })[0]
                    if (validRule)
                        ruleOfClass[eachClassName] = {
                            declarations: validRule?.declarations,
                            stateToken: validRule?.stateToken,
                        }
                })
            return ruleOfClass
    }
}

runAsWorker(run as any)