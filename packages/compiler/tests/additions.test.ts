import MasterCSSCompiler from '../src'

test('additions', () => {
    const compiler = new MasterCSSCompiler({
        additions: ['./test.html'],
        cwd: __dirname
    })

    const classes = [
        '{fg:blue-40/.5;font:32;p:16;w:full;text:center}>li:hover@md',
        'w:calc(+100%-1.25rem)',
        'p:10|20|30|40',
        'm:20|30',
        '~transform|.1s|ease-out,width|.1s|ease-out',
        'bg:rgb(51|170|51|.4)',
        'width:51px',
        'scale(20px)',
        'transform:translateX(20px)',
        'bg:indigo-40:hover@3xs',
        'translate(20px,50)',
        'rotate(45deg)',
        'blur(2px)',
        'width:34:active:not([disabled])+svg>rect',
        'cursor:no-drop[disabled]+svg',
        'drop-shadow(0|2px|2px|rgba(0,0,0,.2))',
        'font:var(--size)',
        'font:$(size)',
        'bg:blue:hover@media(any-hover:hover)',
        'bg:gray-1@supports(backdrop-filter:none)',
        'font:24:hover@sm',
        'text:center:hover@sm',
        'fg:sky-60/.5:hover@sm',
        '{p:10|20|30|40;text:center;fg:sky-60/.5}:hover@sm',
        'width:34:active:not([disabled])+svg>rect',
        'cursor:no-drop[disabled]+svg',
        'translateX(20px)',
        'translate(20px,50)',
        'rotate(45deg)',
        '~transform|.1s|ease-out,width|.1s|ease-out',
        'drop-shadow(0|2px|2px|rgba(0,0,0,.2))',
        'font:var(--size)',
        'font:$(size)',
        '@shake|1s|infinite>li',
        '@shake|1s|infinite>li:nth-child(2)',
        'bg:red:nth(2)',
        'bg:red:odd',
        'bg:red:even',
        'bg:red:first',
        'bg:red:last',
        '{w:5;h:5;rounded;bg:slate-90}::scrollbar',
        'bg:gray-20::scrollbar@dark',
        'bg:slate-86::scrollbar-thumb',
        'bg:slate-76::scrollbar-thumb:hover',
        'bg:slate-66::scrollbar-thumb:active',
        'bg:gray-30::scrollbar-thumb@dark',
        'bg:gray-40::scrollbar-thumb:hover@dark',
        'bg:gray-50::scrollbar-thumb:active@dark',
        'bg:transparent::scrollbar-corner',
        'rounded::scrollbar-thumb',
        'bg:gray-60::scrollbar-thumb:active@dark',
        'm:10|20',
        'bg:blue-60',
        'outline:3|solid|red:hover',
        'text:center@sm',
        'opacity:.5',
        '.sidebar:hover_{opacity:.75}',
        '.navitem:hover_{bg:black/.75}'
    ]

    expect(classes.filter((x) => !compiler.css.rules.map((eachRule) => eachRule.className).includes(x)))
        .toEqual([])
})