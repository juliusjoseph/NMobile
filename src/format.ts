export const naira = (n: number) => {
  const v = Math.abs(n);
  const s = Number.isInteger(v) ? String(v) : v.toFixed(2);
  const [whole, dec] = s.split(".");
  return "₦" + whole.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (dec ? "." + dec : "");
};

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
export const when = (iso: string) => {
  const d = new Date(iso);
  const p = (x: number) => String(x).padStart(2, "0");
  return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}, ${p(d.getHours())}:${p(d.getMinutes())}`;
};
