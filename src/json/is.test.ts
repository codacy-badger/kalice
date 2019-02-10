import chalk from 'chalk'
import * as is from './is'
const types : any = {}
types.js = [
  'string',
  1,
  0.1,
  -1,
  -0.1,
  undefined,
  null,
  false,
  true,
  {},
  [],
  // Date.now()
]
types.json = [
  'null',
  'boolean',
  'string',
  'number',
  'object',
  'array'
]
const descriptions = {
  null: { values: { js: ['null'], json: ['null'] } },
  boolean: { values: { js: ['false', 'true'], json: ['boolean'] } },
  string: { values: { js: ['"string"'], json: ['string'] } },
  number: { values: { js: ['1', '0.1', '-1', '-0.1'], json: ['number'] } },
  object: { values: { js: ['{}'], json: ['object'] } },
  array: { values: { js: ['[]'], json: ['array'] } },
}
describe('json:is', () => {
  for (const description in descriptions) {
    const method = is[description.toUpperCase()]
    describe(description, () => {
      for (const type of types.js) {
        const expected = descriptions[description].values.js.includes(JSON.stringify(type))
        it(`primitive ${chalk.blue(JSON.stringify(type))} should be ${expected}`, () => {
          expect(method(type)).toBe(expected)
        })
      }
      for (const type of types.json) {
        const expected = descriptions[description].values.json.includes(type)
        it(`object ${chalk.blue('{ type: \'' + type + '\' }')} should be ${expected}`, () => {
          expect(method({ type })).toBe(expected)
        })
      }
    })
  }
})