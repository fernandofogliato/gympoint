export const { format: formatPrice } = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  minimumFractionDigits: 2,
});

export const { format: formatQuantity } = new Intl.NumberFormat('pt-BR', {
  style: 'decimal',
});
