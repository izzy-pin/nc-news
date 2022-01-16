import Nav from "./Nav";

const Header = () => {
  const currentDate = new Date();

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return (
    <header>
      <Nav />
      <section className="Section--Date">
        {currentDate.toLocaleDateString("en-uk", options)}
      </section>
    </header>
  );
};

export default Header;
