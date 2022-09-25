import Filter from "../components/Filter";
import Palette from "../components/Palette";

function Home() {
  // pageTitle?

  return (
    <section className="relative overflow-hidden w-full min-h-screen flex flex-col">
      <Palette />
      <div className="w-full flex justify-between items-center p-5">
        <Filter />
      </div>
    </section>
  );
}

export default Home;
