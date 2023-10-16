'use strict'
const exploreConfig = require('explore-config').default

function getOption(context, name) {
    // Options (defined at rule level)
    const options = context.options[0] || {}
    if (options[name] != undefined) {
        return options[name]
    }
    // Settings (defined at plugin level, shared accross rules)
    if (context.settings && context.settings.mastercss && context.settings.mastercss[name] != undefined) {
        return context.settings.mastercss[name]
    }
    // Fallback to defaults
    switch (name) {
        case 'callees':
            return ['classnames', 'clsx', 'ctl', 'cva']
        case 'ignoredKeys':
            return ['compoundVariants', 'defaultVariants']
        case 'classRegex':
            return '^class(Name)?$'
        case 'config':
            return exploreConfig('master.css.*', {})
        case 'tags':
            return []
    }
}

module.exports = getOption
