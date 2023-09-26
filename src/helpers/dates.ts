export function timestamp(timestamp: string): string {
    const date = new Date(timestamp);

    const timeHalf = date.toLocaleTimeString('en-GB', {
        hour: 'numeric',
        minute: 'numeric',
    });
    const dateHalf = date.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: '2-digit',
    });

    return `${timeHalf} - ${dateHalf}`;
}
