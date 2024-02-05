export const getKilometroRecorrido = (kmInicial: number, kmFinal: number) => {
  return kmFinal - kmInicial;
};

export const getKilometroPorGalon = (
  kmRecorridos: number,
  galon: number
): number => {
  if (galon === 0) return 0;

  //maximo 2 decimales
  return Math.round((kmRecorridos / galon) * 100) / 100;
};

export const getKilometroPorMoneda = (
  kmRecorridos: number,
  valorCompra: number
): number => {
  if (valorCompra === 0) return 0;
  //maximo 2 decimales
  return Math.round((kmRecorridos / valorCompra) * 100) / 100;
};
