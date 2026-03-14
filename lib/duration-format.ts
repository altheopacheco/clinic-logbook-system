export default function formatDuration(durationMs: number) {

    const duration = Math.floor(durationMs / 1000);

    if (duration < 60) {
        return `${duration}s`
    }

    if (duration < 60 * 60) {
        const minutes = Math.floor(duration / 60)
        const seconds = duration % 60
        return seconds ? `${minutes}m ${seconds}s` : `${minutes}m`
    }

    const hours = Math.floor(duration / 3600)
    const minutes = Math.floor((duration % 3600) / 60)

    return minutes ? `${hours}h ${minutes}m` : `${hours}h`
}