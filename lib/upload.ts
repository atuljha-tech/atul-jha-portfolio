// Store files as base64 directly in MongoDB
// No external service needed - works everywhere

export async function uploadFile(file: File): Promise<string> {
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)
  const base64 = buffer.toString('base64')
  const dataUri = `data:${file.type};base64,${base64}`
  return dataUri
}
