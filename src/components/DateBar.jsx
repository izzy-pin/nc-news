const DateBar = () => {
  const currentDate = new Date();

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return (
    <section className="Section--Date">
      {currentDate.toLocaleDateString("en-uk", options)}
    </section>
  );
};

export default DateBar;
