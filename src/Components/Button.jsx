
export default function Button({ children, onClick, type }) {
  const base =
    "text-xl font-semibold text-slate-300 border-2 rounded-md px-3 py-1 hover:bg hover:bg-red-500 transition-all duration-700";
  const styles = {
    primary: base,
    secondary: "text-xl font-semibold border-2 rounded-md px-3 py-1 hover:ring hover:ring-offset-1 ring-yellow-500 transition-all duration-700 bg-yellow-400",
    small: 'text-md bg-red-500 px-3 py-1 font-semibold rounded-2xl uppercase',
    round: 'rounded-full px-3 py-1.5 font-semibold bg-red-500'
  };
  return (
    <button onClick={onClick} className={styles[type]}>
      {children}
    </button>
  );
}
