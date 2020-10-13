# fro-up

Module for working with pop-up banners.

## Getting Started

To install the banner, you can either manually download the repository (https://github.com/froweb/fro-up) or use npm:

```
$ npm install fro-up --save
```

Add a custom class to your css file like this:

```css
...
.visually-hidden {
	border: 0;
	clip: rect(0 0 0 0);
	clip-path: inset(50%);
	height: 1px;
	margin: -1px;
	overflow: hidden;
	padding: 0;
	position: absolute;
	width: 1px;
	white-space: nowrap;
}
...
```

Then you need to apply the banner HTML code in the right place of your page. The result should look something like this:

```html
<body>
...
<div class="fro-up" id="sale">
  ...
  <button class="fro-up__close" aria-label="Close" title="Close">
  </button>
</div>
...
</body>
```

Add the lines below to your index.js file and the banner will work with default settings!

```js
const FroUp = require('fro-up');
...
const saleBanner = new FroUp('sale');
saleBanner.start();
```

The default settings do not suit you? You can customize the slider like this:

```js
const FroUp = require('fro-up');
...
const saleBanner = new FroUp('sale', 4, true);
saleBanner.start();
```

or

```js
const FroUp = require('fro-up');
...
const saleBanner = new FroUp();
saleBanner.options = {
  id: 'sale',
  interval: 4,
  block: true,
}
saleBanner.start();
```

## Settings

|Setting|Default Value|Type|Description|
|---|---|---|---|
|id|no default|String|ID selector for the banner|
|interval|0|Number|Delay time (in seconds) before the banner is shown|
|block|false|Boolean|Blocking scrolling on the page|

## Demos

coming soon ...

## License

ISC

