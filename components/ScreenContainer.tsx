export default function ScreenContainer({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        padding: 16,
        backgroundColor: "#F7F9FA",
        maxWidth: 520,
        margin: "0 auto",
      }}
    >
      {children}
    </div>
  );
}
