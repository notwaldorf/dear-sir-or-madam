$(function() {
  // Find everything that has a text, isn't just a space, and wrap it
  // in something we can track later.
  $('body *').contents().filter(function() {
    return (this.nodeType == 3) && this.nodeValue.match(/\S/);
  }).wrap("<span class='bork-this'></span>");

  var elements = $('.bork-this');
  for (var e = 0; e < elements.length; e++) {
    var text = elements[e].innerHTML;
    $(elements[e]).empty();
    var node;
    var letter;
    for (var i = 0; i < text.length; i++ ) {
      var node = $('<span></span');
      var letter = text.charAt(i)
      if ( letter != ' ') {
        var fontsize = fontSize();
        node.css({
          'margin' : '0 2px 0 2px',
          'padding' : '2px',
          'text-align' : 'center',
          'background-color' : background(),
          'color' : foreground(),
          'font-size' : fontsize + 'px',
          'line-height' : fontsize + 15 + 'px',
          'font-family' : font(),
          'text-transform' : textCase(),
          'font-weight' : flip() ? 'bold' : 'normal',
          'font-style' : flip() ? 'italic' : 'normal',
        });
      } else {
        node.css('margin', '0 5px 0 5px');
      }
      node.text(letter);
      $(elements[e]).append(node);
    }
  };
});

function flip() {
  return Math.floor((Math.random() * 2) + 0);
}

function background() {
  // Nice pastel-y backgrounds.
  var r = Math.floor(Math.random() * (254)),
      g = Math.floor(Math.random() * (254)),
      b = Math.floor(Math.random() * (254));
  return "rgba(" + r + ", " + g + ", " + b + ", 0.5)";
}
function foreground() {
  // Only dark colours!
  var r = Math.floor(Math.random() * (154)),
      g = Math.floor(Math.random() * (154)),
      b = Math.floor(Math.random() * (154));
  return "rgb(" + r + ", " + g + ", " + b + ")";
}

function fontSize() {
  return Math.floor((Math.random() * 4) + 20);
}

function font() {
  var fonts = ['serif', 'sans-serif', 'monospace', 'Comic Sans'];
  var which = Math.floor((Math.random() * 5) + 0);
  return fonts[which];
}

function textCase() {
  return flip() ? 'lowercase' : 'uppercase';
}
