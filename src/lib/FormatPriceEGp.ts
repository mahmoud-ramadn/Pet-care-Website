export function formatPriceEGP(price: number) {
  const formatter = new Intl.NumberFormat("ar-EG", {
    style: "currency",
    currency: "EGP",
    minimumFractionDigits: 2,
  })

  return formatter.format(price)
}
