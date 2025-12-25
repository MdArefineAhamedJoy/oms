export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export const formatNumber = (n: number) => new Intl.NumberFormat().format(n);
export const formatPercent = (v: number) => `${(v * 100).toFixed(0)}%`;
export const formatCurrency = (v: number, currency: string = "USD") =>
  new Intl.NumberFormat(undefined, { style: "currency", currency }).format(v);

