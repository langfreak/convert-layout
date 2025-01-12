# Convert Layout

**NOTE:** The upstream package was deprecated with this message "Use `KeyboardEvent#code` in `keyup` event." I couldn't find a way for that to substitute how I was using this package, so I created this fork.

A JavaScript library to convert text from one keyboard layout to other.

Useful to prevent errors on english-only fields, like a credit card owner field.

```js
var ru = require('convert-layout/ru');

bankcardName.keyup(function () {
  bankcardName.value = ru.toEn(bankcardName.value);
});
```

The upstream package was sponsored by Evil Martians.  
<a href="https://evilmartians.com/?utm_source=convert-layout">
  <img src="https://evilmartians.com/badges/sponsored-by-evil-martians.svg"
       alt="Sponsored by Evil Martians" width="236" height="54">
</a>

This fork is sponsored by [Langfreak](https://www.unutma.app/) where it is used as part of the virtual keyboard implementation which lets language learners type with the keyboard layout of their target language, without having to change their OS settings to support it.


## Usage

There are two ways to load a keyboard layout definition.
If you plan on using a single layout, just load the file directly:

```js
var ru = require('convert-layout/ru');
```

Also you can get a object with all layouts (but app size will be bigger):

```js
var layouts = require('convert-layout');
layout = layouts[name];
```

Every layout has `fromEn` and `toEn` methods:

```js
ru.toEn('руддщ')    //=> "hello"
ru.fromEn('ghbdtn') //=> "привет"
```


## Layouts

Currently supported keyboard layouts:

* Arabic
* Belarusian
* English (QWERTY, Dvorak, Colemak)
* French
* Italian
* Georgian
* German
* Greek
* Hungarian
* Kazakh
* Korean
* Russian
* Spanish
* Swedish
* Turkish
* Ukrainian
* Hebrew
* Persian
* Czech

If you want to add a new keyboard layout definition:

1. Fork a project. Create a branch.
2. Add a `CODE.json` file with layout buttons map. See example in `ru.json`.
   Lower case letters will be converted to upper case automatically.
   However, all non-letters symbols should be added both
   in uppercase and lowercase.
3. Run `yarn test`. Project will be built automatically.
4. Add layout to the list above.
5. Send a pull request.
