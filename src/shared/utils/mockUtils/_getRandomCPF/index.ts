export type getRandomCPFOptions = {
  masked?: boolean;
};

function _getRandomCPF(options?: getRandomCPFOptions) {
  const { masked } = options || {};

  function mod(dividendo: number) {
    return Math.round(dividendo - Math.floor(dividendo / 11) * 11);
  }

  const cpfArray: number[] = [];
  let digito1 = 0;

  for (let index = 0; index < 9; index++) {
    const baseCalculo = Math.round(Math.random() * 9);
    cpfArray.push(baseCalculo);
    digito1 += baseCalculo * (10 - index);
  }

  digito1 = 11 - mod(digito1);
  if (digito1 >= 10) digito1 = 0;
  cpfArray.push(digito1);

  let digito2 = 0;
  cpfArray.forEach((number, i) => (digito2 += number * (11 - i)));

  digito2 = 11 - mod(digito2);
  if (digito2 >= 10) digito2 = 0;
  cpfArray.push(digito2);

  let thisCpf = '';

  cpfArray.forEach((number, i) => {
    let thisMask = '';
    if (masked) {
      if (i === 3 || i === 6) thisMask = '.';
      else if (i === 9) thisMask = '-';
    }
    thisCpf += `${thisMask}${number}`;
  });

  return thisCpf;
}

export default _getRandomCPF;
