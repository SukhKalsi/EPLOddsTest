function GCD(num1, num2) {
  var a; var b;
  if (num1 < num2) {a = num2; b = num1;}
  else if (num1 > num2) {a = num1; b = num2;}
  else if (num1 == num2) {return num1;}
  while(1) {
    if (b == 0) {
      return a;
    }
    else {
      var temp = b;
      b = a % b;
      a = temp;
    }
  }
}

module.exports = GCD;
