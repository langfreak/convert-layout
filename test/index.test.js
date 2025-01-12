let main = require('../dist/')
let ka = require('../dist/ka')
let ru = require('../dist/ru')

it('has all languages in index', () => {
  expect(main.ru).toEqual(ru)
})

it('converts lowers to English', () => {
  expect(ru.fromEn('ntcn/')).toEqual('тест.')
})

it('converts uppers to English', () => {
  expect(ru.fromEn('NTCN?&')).toEqual('ТЕСТ,?')
})

it('converts lowers from English', () => {
  expect(ru.toEn('еуыею')).toEqual('test.')
})

it('converts uppers from English', () => {
  expect(ru.toEn('ЕУЫЕ№')).toEqual('TEST#')
})

it('ignores unknown symbols', () => {
  expect(ru.toEn('test!')).toEqual('test!')
})

it('ignores unknown symbols in reverse direction', () => {
  expect(ru.fromEn('проверка!')).toEqual('проверка!')
})

it('converts to Georgian', () => {
  expect(ka.fromEn('qwertyQWERTYzxcZXC')).toEqual('ქწერტყჭღთზხცძჩ')
})
