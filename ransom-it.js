$(function() {
  // Find everything that has a text, isn't just a space, and wrap it
  // in something we can track later. Unless we've already done so.
  if ($('#did-the-letter-parsing')[0])
    return;

  $('body :not(iframe)').contents().filter(function() {
    return (this.nodeType == 3) && this.nodeValue.match(/\S/);
  }).wrap("<span class='ransom-it'></span>");

  // Add a guard so that we don't do this twice. Bad Things happen if you
  // do this twice.
  $('body').append($('<span id="did-the-letter-parsing"></span>'));

  var elements = $('.ransom-it');
  var text, node, letter, container;

  // Tokenize the text and apply the style to each letter.
  for (var e = 0; e < elements.length; e++) {
    container = $(elements[e]);
    text = elements[e].innerHTML;
    container.empty();
    for (var i = 0; i < text.length; i++ ) {
      node = $('<span></span>');
      letter = text.charAt(i);
      if ( letter != ' ') {
        node.css(styleIt());
      } else {
        node.css('margin', '0 10px 0 10px');
      }
      node.text(letter);
      container.append(node);
    }
  };
});

function styleIt() {
  var fontsize = fontSize();
  var bright = flip();
  var padding = fontSize <= 20 ? '6px' : '3px';
  var rotation = (-4 + 8 * Math.random());
  return {'margin' : '0 2px 0 2px',
          'padding' : padding,
          'text-align' : 'center',
          'background-color' : background(bright),
          'color' : foreground(bright),
          'font-size' : fontsize + 'px',
          'line-height' : fontsize + 15 + 'px',
          'font-family' : font(),
          'text-transform' : textCase(),
          'font-weight' : fontWeight(),
          'font-style' : flip() ? 'italic' : 'normal',
          'display': 'inline-block',
          'transform': 'rotate(' + rotation + 'deg)'
        };
}
function flip() {
  return Math.floor((Math.random() * 2) + 0);
}

function background(brightBackground) {
  var r = Math.floor(Math.random() * (254)),
      g = Math.floor(Math.random() * (254)),
      b = Math.floor(Math.random() * (254)),
      a = brightBackground ? 1 : 0.5
  return "rgba(" + r + ", " + g + ", " + b + ", " + a + ")";
}

function foreground(brightBackground) {
  var max = brightBackground ? 254 : 200;
  var min = brightBackground ? 154 : 0;
  var r = Math.floor(Math.random() * (max - min) + min),
      g = Math.floor(Math.random() * (max - min) + min),
      b = Math.floor(Math.random() * (max - min) + min);
  return "rgb(" + r + ", " + g + ", " + b + ")";
}

function fontSize() {
  return Math.floor((Math.random() * 10) + 16);
}

function fontWeight() {
  var weights = ['lighter', 'normal', 'bold', 'bolder'];
  return weights[Math.floor((Math.random() * 5) + 0)];
}
function font() {
  var fonts = ['serif', 'sans-serif', 'monospace', 'Comic Sans'];
  return fonts[Math.floor((Math.random() * 5) + 0)];
}

function textCase() {
  return flip() ? 'lowercase' : 'uppercase';
}
