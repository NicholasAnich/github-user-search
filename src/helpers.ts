export function formatDate(created_at: string) {
    const date = new Date(created_at);
    const options: object = {
        day: "2-digit",
        month: "short",
        year: "numeric",
    };
    const formattedDate = date
        .toLocaleDateString("en-US", options)
        .split(" ");
    [formattedDate[0], formattedDate[1]] = [
        formattedDate[1],
        formattedDate[0],
    ];
    formattedDate[0] = formattedDate[0].slice(0, 2);
    const result = formattedDate.join(" ");

    return result;
}
