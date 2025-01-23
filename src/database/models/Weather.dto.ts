// ~/api/serializers/. not ~/database/models/. ?
export interface WeatherDto {
    city: string
    country: string
    temperature: number
    forecast: string
    time: Date
}
export function serializeDto(input: Record<string, any>): WeatherDto {
    return {
        city: String(input.city),
        country: String(input.country),
        temperature: Number(input.temperature),
        forecast: String(input.forecast),
        time: new Date(input.time)
    }
}

export function serializePartialDto(input: Record<string, any>): Partial<WeatherDto> {
    const allowedKeys: (keyof WeatherDto)[] = ['city', 'country', 'temperature', 'forecast', 'time']

    const filteredData = Object.fromEntries(
        Object.entries(input).filter(([key, value]) => allowedKeys.includes(key as keyof WeatherDto) && value !== undefined && value !== '')
    )

    return {
        ...filteredData,
        temperature: filteredData.temperature !== undefined ? Number(filteredData.temperature) : undefined, // Převod temperature na number
        time: filteredData.time ? new Date(filteredData.time as string) : undefined // Pokud je time definované, převedeme na Date
    } as Partial<WeatherDto>
}
