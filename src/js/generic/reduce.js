var GCD = require('./gcd');

function reduce(a, b) {
  var n  = new Array(2);
  var f = GCD(a, b);
  n[0] = a/f;
  n[1] = b/f;
  return n;
}

module.exports = reduce;
