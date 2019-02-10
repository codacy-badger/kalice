import chalk from 'chalk'
import * as is from './is'
import values from '../values'
const types : any = {}
types.js = values
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
  string: { values: { js: ['\'string\''], json: ['string'] } },
  number: { values: { js: ['0', '1', '0.1', '-1', '-0.1', 'Number.NaN', 'Number.POSITIVE_INFINITY', 'Number.NEGATIVE_INFINITY'], json: ['number'] } },
  object: { values: { js: ['{}'], json: ['object'] } },
  array: { values: { js: ['[]'], json: ['array'] } },
}
describe('json:is', () => {
  for (const description in descriptions) {
    const method = is[description.toUpperCase()]
    describe(description, () => {
      for (const { value: type, display } of types.js) {
        const expected = descriptions[description].values.js.includes(display)
        const color = expected ? 'green' : 'red'
        it(`primitive ${chalk.blue(display)} should be ${chalk.keyword(color)(expected)}`, () => {
          expect(method(type)).toBe(expected)
        })
      }
      for (const type of types.json) {
        const expected = descriptions[description].values.json.includes(type)
        const color = expected ? 'green' : 'red'
        it(`object ${chalk.blue('{ type: \'' + type + '\' }')} should be ${chalk.keyword(color)(expected)}`, () => {
          expect(method({ type })).toBe(expected)
        })
      }
    })
  }
})