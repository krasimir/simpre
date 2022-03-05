# SimPre

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



