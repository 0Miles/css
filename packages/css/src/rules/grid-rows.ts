import { Rule } from '../'

export class GridRows extends Rule {
    static override id = 'GridRows' as const
    static override unit = ''
    override get(declaration): { [key: string]: any } {
        return {
            display: { ...declaration, value: 'grid' },
            'grid-auto-flow': { ...declaration, value: 'column' },
            'grid-template-rows': {
                ...declaration,
                value: 'repeat'
                    + '(' + declaration.value
                    + ','
                    + 'minmax'
                    + '(' + 0 + ',' + 1 + 'fr' + '))'
            },
        }
    }
}