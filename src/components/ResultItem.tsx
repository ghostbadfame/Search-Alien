export default function ResultItem({ result, handleSelect }: any) {
  return (
    <li
      key={result.item.name}
      className="px-4 py-3 hover:bg-gray-300 duration-200 transition-all ease-in cursor-pointer"
      onClick={() => handleSelect(result)}
    >
      <h2 className="text-xl font-black text-gray-700">{result.item.name}</h2>
    </li>
  );
}
