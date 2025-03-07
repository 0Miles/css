import cv from 'class-variant'

const btn = cv(
    `font:semibold rounded`,
    {
        intent: {
            primary: 'bg:blue fg:white bg:blue-55:hover',
            secondary: 'bg:white fg:slate-30 bg:slate-90:hover',
        },
        size: {
            sm: 'text:14 py:5 px:8',
            md: 'text:16 py:10 px:15'
        }
    },
    ['uppercase', { intent: 'primary', size: 'md' }],
    ({ indent, size }) => indent && size && 'font:italic'
)

btn.default = {
    intent: 'primary',
    size: 'sm'
}

// Basic usage

/* 預設 */
btn()
// -> bg:blue fg:white bg:blue-55:hover text-sm py-1 px-2

btn({ indent: 'secondary', size: 'sm' })
btn('secondary', 'sm')          // shorthand ( 忽略屬性名稱，相同屬性值都將被搜集 )
btn.secondary.sm()              // shorthand ( 忽略屬性名稱，相同屬性值都將被搜集 )
btn.sm.secondary()              // shorthand ( 忽略屬性名稱，相同屬性值都將被搜集 )
// -> font:semibold rounded + bg:white fg:slate-30 bg:slate-90:hover + text-sm py-1 px-2