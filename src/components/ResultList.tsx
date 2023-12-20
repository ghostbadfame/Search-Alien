import { useAutoAnimate } from "@formkit/auto-animate/react";
import ResultItem from "./ResultItem";

export default function ResultList({ results, handleSelect }: any) {
  const [parent] = useAutoAnimate();

  return (
    <ul className="divide-y divide-gray-300" ref={parent}>
      {results?.map((result: any, index: number) => (
        <ResultItem result={result} handleSelect={handleSelect} key={index} />
      ))}
    </ul>
  );
}
