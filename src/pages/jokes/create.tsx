import { useForm, useSelect } from "@refinedev/core";

export const CreateJokes = () => {
    const { onFinish, mutation } = useForm({
        action: "create",
        resource: "jokes",
    });

    // Fetch options from the 'types' resource
    const { options, isLoading, isError, data } = useSelect({
        resource: "jokes",
        optionLabel: "type", // Ensure the correct field is used for label
        optionValue: "type",   // Ensure the correct field is used for value
    });

    // Debugging: Check if data is coming in correctly
    console.log("Options data:", options); // Check if options are being populated
    console.log("Full data response:", data);

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = Object.fromEntries(new FormData(event.target).entries());
        onFinish(data);
    };

    return (
        <form onSubmit={onSubmit}>
            <label htmlFor="setup">Setup</label>
            <input type="text" name="setup" id="setup" required />

            <label htmlFor="punchline">Punchline</label>
            <input type="text" name="punchline" id="punchline" required />

            <label htmlFor="type">Type</label>
            <select id="type" name="type" required>
                {isLoading ? (
                    <option>Loading...</option>
                ) : isError ? (
                    <option>Error loading options</option>
                ) : options && options.length > 0 ? (
                    options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))
                ) : (
                    <option>No types available</option>
                )}
            </select>

            {mutation.isSuccess && <span>Joke created successfully!</span>}
            {mutation.isLoading && <span>Creating joke...</span>}
            {mutation.isError && <span>Error creating joke.</span>}
            
            <button type="submit" disabled={mutation.isLoading}>
                {mutation.isLoading ? "Submitting..." : "Create Joke"}
            </button>
        </form>
    );
};
