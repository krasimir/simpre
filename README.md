# SimPre - a 10KB HTML presentation framework

I've always wanted a minimalistic presentation framework that formats my slides correctly. SimPre scales and positions my content, using all the available space. In addition, it comes with a syntax highlighter and progress indicator.<br /><br /><small>Move on and see how to use it.

* Demo [simpre.vercel.app](https://simpre.vercel.app)
* Download [simpre.zip](https://simpre.vercel.app/simpre.zip)

## Usage

It's just a single HTML file:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SimPre - The Simplest Presentation HTML Framework</title>
  <link rel="stylesheet" href="https://simpre.vercel.app/assets/styles.css" />
  <script src="https://simpre.vercel.app/assets/simpre.js"></script>
</head>
<body>
  <section>
    <h1>Hey 👋</h1>
  </section>
  <div id="progress"></div>
</body>
</html>
```

Every &lt;section&gt; tag is a slide:

```html
<section>
  <p>Slide with text</p>
</section>
```

All the code lives outside the framework. Create a file, add the code inside and load the file via the following &lt;script&gt; tag:

```html
<section>
  <script
    src="https://simpre.vercel.app/assets/is.js"
    data-file="<path to a file>">
  </script>
<section>
```

There is "smart" selection mode. When showing code, I often want to emphasize or hide part of it. To help myself in this direction, I did a little feature that you can turn on and off via the Shift key. Select part of the text on [this page](https://simpre.vercel.app) and press the Shift key to see how it works.

If you need to emphasize on a part of the code you can use the `data-sections` attribute on the `<script>` tag. This will create a seprate slide for each of the sections. For example:

```html
<script
  src="https://simpre.vercel.app/assets/is.js"
  data-file="slides/template.html"
  data-sections="2-8,10">
</script>
```

This will highlight the code between line 2 and 8 including. After that the code at line 10.

In some cases you may need to implement a custom logic for your slide. If that's the case use the following data attributes attached to your `<section>` tag:

```html
<script>
  window.onEnter = async function (element) {
    // ... do some potential async logic
  }
  window.onChange = async function (element, direction) {
    // Return "true" if you want to move forward
    // with the slide change.
    return true;
  }
</script>
<section data-onenter="onEnter" data-onchange="onChange"></section>
```

The `onChangeCustomLogic` function will be fired when you try to go away from the slide. It will be called again and again until you execute the passed `done` callback. The `onEnterCustomLogic` is called when you enter the slide.


