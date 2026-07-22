export function unsplash(id: string, width: number, height?: number, quality = 75): string {
  const params = new URLSearchParams({
    auto: 'format',
    fit: 'crop',
    w: String(width),
    q: String(quality),
  })
  if (height) params.set('h', String(height))
  return `https://images.unsplash.com/photo-${id}?${params.toString()}`
}
