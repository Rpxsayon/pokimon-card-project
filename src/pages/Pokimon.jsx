import React, { useEffect, useState } from "react";
import PokemonCard from "../component/PokemonCard";

const Pokimon = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  const fetchPokimon = async () => {
    try {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=24",
      );
      const data = await response.json();

      const detailedPokemonData = data.results.map(async (currentdata) => {
        const res = await fetch(currentdata.url);
        const data = await res.json();
        return data;
      });

      const detailedResponses = await Promise.all(detailedPokemonData);
      console.log(detailedResponses);
      setPokemon(detailedResponses);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error);
    }
  };

  useEffect(() => {
    fetchPokimon();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-gray-100">
        {/* Spinner */}
        <div className="w-16 h-16 border-4 border-gray-700 border-t-yellow-400 rounded-full animate-spin mb-6"></div>

        {/* Loading Text */}
        <h1 className="text-2xl font-semibold tracking-wide animate-pulse text-yellow-400">
          Content is Loading...
        </h1>

        <p className="mt-2 text-sm text-gray-400">
          Catching Pokémon for you ⚡
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-gray-100 px-4">
        {/* Error Icon */}
        <div className="text-red-500 text-6xl mb-4">⚠️</div>

        {/* Error Message */}
        <h1 className="text-2xl font-bold text-red-400 mb-2">
          Something went wrong
        </h1>

        <p className="text-gray-400 text-center max-w-md">
          An error occurred while loading the data. Please check the console for
          more details.
        </p>

        {/* Hint */}
        <span className="mt-4 text-sm text-gray-500">
          Try refreshing the page 🔄
        </span>
      </div>
    );
  }

  const searchdata = pokemon.filter((curPokemon) =>
    curPokemon.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <>
      <section className="min-h-screen bg-gray-900 text-gray-100 px-6 py-10">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-extrabold tracking-wide text-yellow-400">
            Let’s Catch Pokémon
          </h1>
          <p className="text-gray-400 mt-2">
            Explore and discover your favorite Pokémon
          </p>
        </header>

        <div className="flex justify-center mb-8">
          <input
            className="w-full max-w-md px-4 py-2 rounded-xl bg-gray-800 border border-gray-700 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Pokémon..."
          />
        </div>

        <div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {searchdata.map((curPokemon) => (
              <PokemonCard key={curPokemon.id} pokemonData={curPokemon} />
            ))}
          </ul>
        </div>
      </section>
    </>
  );
};

export default Pokimon;
