export function formatName(name: string) {
    const split = name.split(",");
    return split[0].toLowerCase() + ", " + split[1].toLowerCase()
}