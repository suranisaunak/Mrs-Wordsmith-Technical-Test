function convertToRoman(num: number): string {
  if (num <= 0) {
    throw new Error('Invalid input. Please provide a positive whole number (N >= 1).');
  }

  const romanNumerals: [number, string][] = [
    [1000, 'M'],
    [900, 'CM'],
    [500, 'D'],
    [400, 'CD'],
    [100, 'C'],
    [90, 'XC'],
    [50, 'L'],
    [40, 'XL'],
    [10, 'X'],
    [9, 'IX'],
    [5, 'V'],
    [4, 'IV'],
    [1, 'I']
  ];

  let result = '';
  let remaining = num;

  for (const [value, symbol] of romanNumerals) {
    while (remaining >= value) {
      result += symbol;
      remaining -= value;
    }
  }

  return result;
}

// Example usage
console.log(convertToRoman(1)); // I
console.log(convertToRoman(4)); // IV
console.log(convertToRoman(9)); // IX
console.log(convertToRoman(49)); // XLIX
console.log(convertToRoman(99)); // XCIX
console.log(convertToRoman(3999)); // MMMCMXCIX
