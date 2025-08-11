export const formatCurrencyBRL = (value: number): string => {
  try {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(Number.isFinite(value) ? value : 0);
  } catch {
    const fixed = (Number.isFinite(value) ? value : 0)
      .toFixed(2)
      .replace(".", ",");
    return `R$ ${fixed}`;
  }
};
