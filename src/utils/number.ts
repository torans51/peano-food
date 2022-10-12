export const formatPrice = (price: number) =>
  `${price.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}€`;
