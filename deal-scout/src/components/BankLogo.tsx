import { bankColors } from "@/lib/workspace";

export const BankLogo = ({ bank, size = 40 }: { bank: string; size?: number }) => {
  const { from, to, initials } = bankColors(bank);
  return (
    <div
      className="rounded-lg grid place-items-center font-display font-semibold text-white shadow-elegant shrink-0"
      style={{
        width: size,
        height: size,
        background: `linear-gradient(135deg, ${from}, ${to})`,
        fontSize: size * 0.38,
      }}
      aria-hidden
    >
      {initials}
    </div>
  );
};
