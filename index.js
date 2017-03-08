module.exports = function(inClassName){
  var elements;
  var pattern;
  var i;
  var results = [];

  if (doc.querySelectorAll) { // IE8
    return doc.querySelectorAll('.' + inClassName);
  }

  if (doc.evaluate) { // IE6, IE7
    pattern = './/*[contains(concat(" ", @class, " "), " " + inClassName + " ")]';
    elements = doc.evaluate(pattern, d, null, 0, null);
    while ((i = elements.iterateNext())) {
      results.push(i);
    }
  } else {
    elements = doc.getElementsByTagName('*');
    pattern = new RegExp('(^|\\s)' + inClassName + '(\\s|$)');
    for (var i = 0, length = elements.length; i < length; i++) {
      if (pattern.test(elements[i].className)) {
        results.push(elements[i]);
      }
    }
  }

  return results;
};
