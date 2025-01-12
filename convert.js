module.exports = function convert(keys, values, autoCapitalize = true) {
  let reverse = {}
  let full = {}
  let i

  for (i = keys.length; i--; ) {
    if (autoCapitalize) {
      full[keys[i].toUpperCase()] = values[i].toUpperCase()
    }

    full[keys[i]] = values[i]
  }

  for (i in full) {
    reverse[full[i]] = i
  }

  return {
    fromEn: function (str) {
      return str.replace(/./g, ch => {
        return full[ch] || (autoCapitalize ? ch : '')
      })
    },
    toEn: function (str) {
      return str.replace(/./g, ch => {
        return reverse[ch] || ch
      })
    }
  }
}
