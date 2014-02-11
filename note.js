$(function() {
  // Find everything that has a text, isn't just a space, and wrap it
  // in something we can track later.
  $('body :not(iframe)').contents().filter(function() {
    return (this.nodeType == 3) && this.nodeValue.match(/\S/);
  }).wrap("<span class='ransom-it'></span>");

  var elements = $('.ransom-it');
  var text, node, letter, fontsize, bright;

  for (var e = 0; e < elements.length; e++) {
    text = elements[e].innerHTML;
    $(elements[e]).empty();
    for (var i = 0; i < text.length; i++ ) {
      node = $('<span></span');
      letter = text.charAt(i);
      if ( letter != ' ') {
        fontsize = fontSize();
        bright = flip();
        node.css({
          'margin' : '0 2px 0 2px',
          'padding' : '3px',
          'text-align' : 'center',
          'background-color' : background(bright),
          'color' : foreground(bright),
          'font-size' : fontsize + 'px',
          'line-height' : fontsize + 15 + 'px',
          'font-family' : font(),
          'text-transform' : textCase(),
          'font-weight' : fontWeight(),
          'font-style' : flip() ? 'italic' : 'normal',
        });
      } else {
        node.css('margin', '0 10px 0 10px');
      }
      node.text(letter);
      $(elements[e]).append(node);
    }
  };
});

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
