
export const tagFn = fn => (strings, ...parts) => fn(parts.reduce((tpl, value, i) => `${tpl}${strings[i]}${value}`, '').concat(strings[parts.length]))
export const html = tagFn(s => new DOMParser().parseFromString(`<template>${s}</template>`, 'text/html').querySelector('template'))
export const css = tagFn(s => s)

export const tagFn2 = fn => (strings, ...parts) => fn(parts.reduce((tpl, value, i) => `${tpl}${strings[i]}${value}`, '').concat(strings[parts.length]))
export const html2 = tagFn2(s => new DOMParser().parseFromString(`<template>${s}</template>`, 'text/html').querySelector('template'))
export const css2 = tagFn2(s => new CSSStyleSheet().replace(s))