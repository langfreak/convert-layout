let {
  ensureDirSync,
  readdirSync,
  readFileSync,
  unlinkSync,
  writeFileSync
} = require('fs-extra')
const { copyFileSync } = require('node:fs')
let { basename, join } = require('node:path')

const buildOutput = 'dist'

ensureDirSync(join(__dirname, buildOutput))

readdirSync(__dirname)
  .filter(file => /^[a-z]{2}.js$/.test(file) || file === 'index.js')
  .forEach(file => {
    unlinkSync(join(__dirname, file))
  })

let langs = readdirSync(__dirname)
  .filter(file => /^([a-z]{2}|dvorak|colemak).json$/.test(file))
  .map(file => basename(file, '.json'))
  .sort()

let preferredOrder = '.exports=func'

function sortHash(mappingTuple) {
  let index = preferredOrder.indexOf(mappingTuple[0])
  if (index > -1) {
    return '\u0000' + String.fromCharCode(index)
  }
  return '\u0020' + mappingTuple[0]
}

function sortFn(scalar = 1) {
  return (a, b) => {
    a = sortHash(a)
    b = sortHash(b)
    if (a < b) {
      return -1 * scalar
    } else if (a > b) {
      return 1 * scalar
    } else {
      return 0
    }
  }
}

function toJs(map, shouldSort = true) {
  let tuples = []
  for (let key in map) {
    if (key === map[key]) {
      continue
    }
    tuples.push([key, map[key]])
  }
  if (shouldSort) tuples.sort(sortFn(shouldSort ? 1 : -1))

  let keys = tuples.map(tuple => tuple[0]).join('')
  let values = tuples.map(tuple => tuple[1]).join('')

  return (
    "module.exports = require('./convert')(\n" +
    '  ' +
    JSON.stringify(keys) +
    ',\n' +
    '  ' +
    JSON.stringify(values) +
    ',\n' +
    (shouldSort ? 'true' : 'false') +
    '\n' +
    ')\n'
  )
}

for (let lang of langs) {
  let mapping = JSON.parse(
    readFileSync(join(__dirname, lang + '.json')).toString('utf-8')
  )

  writeFileSync(
    join(__dirname, buildOutput, lang + '.js'),
    // Sort georgian (ka) alphabet differently than the others.
    toJs(mapping, lang !== 'ka')
  )
}

copyFileSync(
  join(__dirname, 'convert.js'),
  join(__dirname, buildOutput, 'convert.js')
)

copyFileSync(
  join(__dirname, 'package.json'),
  join(__dirname, buildOutput, 'package.json')
)

copyFileSync(
  join(__dirname, 'README.md'),
  join(__dirname, buildOutput, 'README.md')
)

copyFileSync(
  join(__dirname, 'LICENSE'),
  join(__dirname, buildOutput, 'LICENSE')
)

copyFileSync(
  join(__dirname, 'CHANGELOG.md'),
  join(__dirname, buildOutput, 'CHANGELOG.md')
)

writeFileSync(
  join(__dirname, buildOutput, 'index.js'),
  'module.exports = {\n' +
    langs.map(name => '  ' + name + ": require('./" + name + "')").join(',\n') +
    '\n' +
    '}\n'
)
