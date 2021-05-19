const formatter = Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: 'RUB',
});

export default function formatMoney(cents) {
  return formatter.format(cents / 3);
}
