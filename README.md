# fro-up

Module for show pop-up banners and modal windows.

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
	<button class="some-class">Inquire about the sale</button>
	...
	<div class="fro-up visually-hidden" id="sale">
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
saleBanner.start('some-class');// don't forget to specify a class for the show button
```

The default settings do not suit you? You can customize the banner like this:

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
|escEvent|true|Boolean|Closing the banner by pressing the ESC key|
|autoFocus|true|Boolean|Autofocus on banner elements|

## Important features

The popup with timer will not work if another open banner includ a fro-up class.
Example:

```js
const FroUp = require('fro-up');
...
const saleBanner = new FroUp('email', 0, true);
saleBanner.start('email__btn');// if the banner is shown by the button
const saleBanner = new FroUp('sale', 4, true);
saleBanner.start();// the timer expires, then the second banner will not be shown
```

If autoFocus = true, then the first input element of the active banner gets focus. If there are no input elements, focus will go to the first textarea. if the banner does not contain input or textarea, the focus will go to the element with class="fro-up__body".

## Demos

coming soon ...

## License

ISC

