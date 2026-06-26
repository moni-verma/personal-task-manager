const Navbar = () => {
  return (
    <div style={styles.nav}>
      <h2 style={styles.logo}>Task Manager</h2>
    </div>
  );
};


const styles = {
  nav: {
    width: "100%",
    padding: "15px 20px",
    background: "#111827",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: {
    margin: 0,
  },
};

export default Navbar;