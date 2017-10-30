function replace (map) {
  return function (str) {
    return str.replace(/./g, function (i) {
      return map[i] || i
    })
  }
}

function convert (map) {
  var reverse = { }
  var full = { }

  for (var key in map) {
    var value = map[key]
    full[key] = value
    reverse[value] = key

    var upper = key.toUpperCase()
    if (upper !== key) {
      full[upper] = value.toUpperCase()
      reverse[full[upper]] = upper
    }
  }

  return { fromEn: replace(full), toEn: replace(reverse) }
}

module.exports = convert
