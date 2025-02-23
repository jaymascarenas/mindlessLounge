import mindlessLogo from "../assets/images/mindless-logo.png";

export default function Footer() {
  return (
    <footer className="footer">
      <div
        className="footer-content"
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "40px",
          marginTop: "20px",
        }}
      >
        <img
          src={mindlessLogo}
          alt="Mindless Lounge"
          style={{
            width: "300px",
            filter: "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))",
          }}
        />
      </div>
    </footer>
  );
}
