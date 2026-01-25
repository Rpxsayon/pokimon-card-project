import React from "react";

const PokemonCard = ({ pokemonData }) => {
  console.log(pokemonData);

  return (
    <li className="bg-white rounded-2xl shadow-lg p-5 flex flex-col items-center gap-4 hover:scale-105 transition-transform duration-300">
      <figure className="w-32 h-32 flex items-center justify-center">
        <img
          className="w-full h-full object-contain"
          src={pokemonData.sprites.other.dream_world.front_default}
          alt={pokemonData.name}
        />
      </figure>

      <h1 className="pokemon-name text-2xl font-bold capitalize text-gray-800">
        {pokemonData.name}
      </h1>

      <div className="text-sm text-gray-600">
        <p className="font-medium">
          {pokemonData.types.map((curType) => curType.type.name).join(", ")}
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4 text-sm text-gray-700 w-full text-center">
        <p>
          <span className="font-semibold block">Height</span>
          {pokemonData.height}
        </p>
        <p>
          <span className="font-semibold block">Weight</span>
          {pokemonData.weight}
        </p>
        <p>
          <span className="font-semibold block">Speed</span>
          {pokemonData.stats[5].base_stat}
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4 text-sm text-gray-700 w-full text-center mt-2">
        <div>
          <p className="font-semibold">{pokemonData.base_experience}</p>
          <span className="text-xs text-gray-500">Experience</span>
        </div>

        <div>
          <p className="font-semibold">{pokemonData.stats[1].base_stat}</p>
          <span className="text-xs text-gray-500">Attack</span>
        </div>

        <div>
          <p className="font-semibold capitalize">
            {pokemonData.abilities
              .map((abilityInfo) => abilityInfo.ability.name)
              .slice(0, 1)
              .join(", ")}
          </p>
          <span className="text-xs text-gray-500">Abilities</span>
        </div>
      </div>
    </li>
  );
};

export default PokemonCard;
