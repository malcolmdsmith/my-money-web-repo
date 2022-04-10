export function currencyFormat(num, showDollarSign) {
  return showDollarSign
    ? "$"
    : "" +
        parseFloat(num)
          .toFixed(2)
          .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}
