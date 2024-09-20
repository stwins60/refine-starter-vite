import { useList } from "@refinedev/core";
import { c } from "node_modules/vite/dist/node/types.d-aGj9QkWt";

export const ListJokes = () => {
  const { data, isLoading } = useList({
    resource: "jokes",
    pagination: {
      current: 1,
      pageSize: 20,
    },
    sorters: [{ field: "type", order: "asc" }],
    filters: [{ field: "type", operator: "eq", value: "general" }],
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    console.log(data),
    <div>
      <h1>Jokes</h1>
        <ul>
            {data?.data?.map((joke) => (
            <li key={joke.id}>
                <div>Setup: {joke.setup}</div>
                <div>Punchline: {joke.punchline}</div>
                <div>Type: {joke.type}</div>
            </li>
            ))}
        </ul>
    </div>
  );
};