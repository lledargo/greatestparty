function _randomInt(n: number): number {
  n = Math.floor(n);
  if (Number.isNaN(n)) {
    throw new Error('Bad number.');
  } else if (n > 4294967296) {
    throw new Error('Too big.');
  } else if (n < 1) {
    throw new Error('Too small.');
  }
  const buffer = new Uint8Array(1);
  function doroll() {
    let i = 1;
    let value = 0;
    while (i <= n) {
      crypto.getRandomValues(buffer);
      value = (value * 256) + buffer[0];
      i *= 256;
    }
    while ((i / 2) > n) {
      i /= 2;
    }
    return value % i;
  }
  let v = doroll();
  while (v >= n) {
    v = doroll();
  }
  return v;
}

function rollDie(sides: number): number {
  return _randomInt(sides) + 1;
}

function rollRatio(): number {
  return _randomInt(65536) / 65536;
}
