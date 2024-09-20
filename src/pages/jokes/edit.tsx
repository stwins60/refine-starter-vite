import { useOne, useUpdate } from "@refinedev/core";

export const EditJokes = () => {
    const { data, isLoading } = useOne({
        resource: "jokes", // Specify the resource name here
        id: 4,
    });

    const { mutate, isLoading: isUpdating } = useUpdate();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const updatePunchline = async () => {
        await mutate({
            resource: "jokes", // Specify the resource name here
            id: 4,
            values: { punchline: "New punchline", setup: "New setup", type: "general" },
        });
    };

    return (
        <div>
            <div>Joke setup: {data?.data.setup}</div>
            <div>Joke punchline: {data?.data.punchline}</div>
            <button onClick={updatePunchline} disabled={isUpdating}>
                {isUpdating ? "Updating..." : "Update punchline"}
            </button>
        </div>
    );
};
