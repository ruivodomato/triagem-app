export function Title({ text }: { text: string }) {
  return <h1 style={{ fontSize: 22, marginBottom: 12, fontWeight: 700 }}>{text}</h1>;
}

export function ButtonPrimary({
  text,
  onClick,
}: {
  text: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        width: "100%",
        padding: 14,
        backgroundColor: "#0A7C7B",
        color: "#fff",
        border: "none",
        borderRadius: 10,
        marginTop: 12,
        fontSize: 16,
        fontWeight: 600,
      }}
    >
      {text}
    </button>
  );
}

export function Card({
  title,
  subtitle,
  onClick,
}: {
  title: string;
  subtitle?: string;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      style={{
        background: "#fff",
        padding: 14,
        borderRadius: 12,
        boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
        marginTop: 12,
        cursor: onClick ? "pointer" : "default",
      }}
    >
      <div style={{ fontWeight: 700, fontSize: 16 }}>{title}</div>
      {subtitle && <div style={{ opacity: 0.7, marginTop: 6 }}>{subtitle}</div>}
    </div>
  );
}
