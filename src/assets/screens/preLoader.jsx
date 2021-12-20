const preLoader = async (context) => {
  return (
    <div className="col-12 full-height">
      <div>
        <h1 id="text">{context.done ? "Press any button" : "Loading..."}</h1>
      </div>
    </div>
  );
};

export default preLoader;
