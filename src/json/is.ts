const R = require('ramda')
const TYPE = (o, type) => R.equals(type, R.prop('type', o))
const TYPEOF = (o, type) => typeof o === type
export const NULL = o => o === null || TYPE(o, 'null')
export const BOOLEAN = o => TYPEOF(o, 'boolean') || TYPE(o, 'boolean')
export const NUMBER = o => TYPEOF(o, 'number') || TYPE(o, 'number')
export const STRING = o => TYPEOF(o, 'string') || TYPE(o, 'string')
export const ARRAY = o => Array.isArray(o) || TYPE(o, 'array')
export const OBJECT = o => TYPE(o, 'object') || (!R.prop('type', o) && o !== null && !Array.isArray(o) && typeof o === 'object')
