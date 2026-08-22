export const emptyToUndefined = (value) => {
    if (typeof value !== "string") {
        return value ?? undefined;
    }

    const trimmed = value.trim();

    return trimmed === "" ? undefined : trimmed;
};
