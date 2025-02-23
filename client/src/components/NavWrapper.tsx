import Navbar from "./Navbar";

export default function NavWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="d-flex">
      <main className="flex-grow-1">{children}</main>
      <Navbar />
    </div>
  );
}
