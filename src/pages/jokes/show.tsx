import { useOne } from "@refinedev/core";

export const ShowJokes= () => {
  const { data, isLoading } = useOne({ id: 4 });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <div>Joke setup: {data?.data.setup}</div>;
};