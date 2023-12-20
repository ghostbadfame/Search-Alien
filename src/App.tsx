import ResultList from "./components/ResultList";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useEffect, useState } from "react";
import Fuse from "fuse.js";

const BENTENALIENS = [
  {
    name: "Heatblast",
    description:
      "A magma-based lifeform that can generate intense heat and fire from his body.",
    origin: "Pyronite (Planet Pyros)",
    funFact: "Heatblast was the first alien ever used by Ben.",
  },
  {
    name: "Diamondhead",
    description:
      "A silicon-based lifeform that can transform his body into diamond-like material and manipulate crystal shards.",
    origin: "Petrosapien (Petropia)",
    funFact: "Diamondhead's crystals can reflect energy-based attacks.",
  },
  {
    name: "XLR8",
    description:
      "A speedster alien that can move at incredible speeds and run on any surface.",
    origin: "Kineceleran (Planet Kinet)",
    funFact: "XLR8's top speed is over 500 miles per hour.",
  },
  {
    name: "Four Arms",
    description: "A four-armed alien with incredible strength and durability.",
    origin: "Tetramand (Khoros)",
    funFact: "Four Arms can lift up to ten times his own weight.",
  },
  {
    name: "Grey Matter",
    description:
      "A tiny alien with a large brain that gives him incredible intelligence and problem-solving skills.",
    origin: "Galvan (Galvan Prime)",
    funFact:
      "Grey Matter is only one foot tall, but his intellect makes up for his lack of size.",
  },
  {
    name: "Stinkfly",
    description:
      "A winged insectoid alien with the ability to fly and release a foul-smelling gas.",
    origin: "Lepidopterran (Lepidopterra)",
    funFact: "Stinkfly's wings can generate a powerful sonic blast.",
  },
  {
    name: "Upgrade",
    description:
      "A technorganic alien that can merge with and control any technology.",
    origin: "Galvanic Mechamorph (Galvan B)",
    funFact:
      "Upgrade is Ben's go-to alien for repairing and upgrading technology.",
  },
  {
    name: "Ripjaws",
    description:
      "A shark-like alien with incredible aquatic abilities, including enhanced strength and agility underwater.",
    origin: "Piscciss Volann (Planet Piscciss)",
    funFact: "Ripjaws can regenerate his teeth and breathe underwater.",
  },
  {
    name: "Wildmutt",
    description: "A feral alien with enhanced senses and razor-sharp claws.",
    origin: "Vulpimancer (Vulpin)",
    funFact:
      "Wildmutt's sense of smell is so acute that he can track a scent across galaxies.",
  },
];

const KEYS = ["name", "description"];

function App() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [results, setResults] = useState<any>(null);
  const [selectedAlien, setSelectedAlien] = useState<any>(null);
  const [parent] = useAutoAnimate();

  const fuse = new Fuse(BENTENALIENS, {
    findAllMatches: false,
    keys: KEYS,
  });

  useEffect(() => {
    if (searchTerm === "") {
      setResults(null);
    } else {
      setResults(fuse.search(searchTerm));
    }
  }, [searchTerm]);

  const handleSelect = (result: any) => {
    setSearchTerm("");
    setSelectedAlien(result);
  };

  const handleClear = () => {
    setSearchTerm("");
    setSelectedAlien(null);
  };

  return (
    <>
      <div className="min-h-screen flex justify-center items-center bg-gray-950 text-gray-100">
        <div className="h-[750px] w-[600px] bg-gray-100 flex flex-col rounded-md overflow-hidden relative">
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Enter any benten alien name"
            className="w-full p-2 px-4 border-b-2 rounded-sm outline-none active:border-gray-300 focus-within:border-gray-300 text-gray-700 font-black text-xl"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />

          <div className="flex-1 overflow-y-auto overflow-x-clip">
            {results?.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full">
                <p className="text-gray-700 text-xl font-semibold">
                  No results found
                </p>
              </div>
            ) : (
              <ResultList results={results} handleSelect={handleSelect} />
            )}
          </div>

          <div
            className="w-full bg-white border-t-2 flex flex-col p-4 gap-2 h-2/5 relative"
            ref={parent}
          >
            {selectedAlien ? (
              <>
                <p className="text-gray-700 text-xl font-black">
                  {selectedAlien?.item.name}
                </p>
                <div>
                  <span className="text-gray-700 text-lg font-black">
                    About
                  </span>
                  <p className="text-gray-700 text-lg font-semibold">
                    {selectedAlien?.item.description}
                  </p>
                </div>
                <div>
                  <span className="text-gray-700 text-lg font-black">
                    Origin
                  </span>
                  <p className="text-gray-700 text-lg font-semibold">
                    {selectedAlien?.item.origin}
                  </p>
                </div>
                <div>
                  <span className="text-gray-700 text-lg font-black">
                    Fun Fact
                  </span>
                  <p className="text-gray-700 text-lg font-semibold">
                    {selectedAlien?.item.funFact}
                  </p>
                </div>
                <span
                  className="absolute top-0 right-2 text-gray-700 font-semibold text-3xl rounded-full cursor-pointer hover:text-gray-800 select-none"
                  onClick={handleClear}
                >
                  x
                </span>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full">
                <p className="text-gray-600 text-xl font-semibold">
                  try searching for an alien
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
