export const formatPrice = (price: number, cents = true) => {
  const p = cents ? price / 100 : price;
  return `${p.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} €`;
};
