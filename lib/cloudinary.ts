import crypto from 'crypto'

export async function uploadToCloudinary(
  file: File,
  folder: string = 'portfolio'
): Promise<{ url: string; publicId: string }> {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME
  const apiKey = process.env.CLOUDINARY_API_KEY
  const apiSecret = process.env.CLOUDINARY_API_SECRET

  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error('Cloudinary credentials not configured')
  }

  const isPdf = file.type === 'application/pdf'

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)
  const base64 = buffer.toString('base64')
  const dataUri = `data:${file.type};base64,${base64}`

  const timestamp = Math.round(Date.now() / 1000)

  // For PDFs: resource_type=raw, for images: resource_type=image
  // We include resource_type in the signature params
  const resourceType = isPdf ? 'raw' : 'image'

  // Params must be alphabetically sorted for Cloudinary signature
  const paramsToSign = `folder=${folder}&timestamp=${timestamp}`
  const signature = crypto
    .createHmac('sha1', apiSecret)
    .update(paramsToSign)
    .digest('hex')

  const formData = new FormData()
  formData.append('file', dataUri)
  formData.append('api_key', apiKey)
  formData.append('timestamp', timestamp.toString())
  formData.append('folder', folder)
  formData.append('signature', signature)

  const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`
  console.log(`Uploading to Cloudinary [${resourceType}]:`, uploadUrl)

  const response = await fetch(uploadUrl, { method: 'POST', body: formData })
  const data = await response.json()

  if (!response.ok) {
    console.error('Cloudinary response error:', JSON.stringify(data))
    throw new Error(data.error?.message || `Cloudinary upload failed (${response.status})`)
  }

  console.log('Cloudinary upload success, url:', data.secure_url)
  return { url: data.secure_url, publicId: data.public_id }
}

export async function deleteFromCloudinary(publicId: string): Promise<void> {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME
  const apiKey = process.env.CLOUDINARY_API_KEY
  const apiSecret = process.env.CLOUDINARY_API_SECRET

  if (!cloudName || !apiKey || !apiSecret) return

  const timestamp = Math.round(Date.now() / 1000)
  const paramsToSign = `public_id=${publicId}&timestamp=${timestamp}`
  const signature = crypto
    .createHmac('sha1', apiSecret)
    .update(paramsToSign)
    .digest('hex')

  const formData = new FormData()
  formData.append('public_id', publicId)
  formData.append('api_key', apiKey)
  formData.append('timestamp', timestamp.toString())
  formData.append('signature', signature)

  // Try image first, then raw (for PDFs)
  await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`, {
    method: 'POST',
    body: formData,
  })
}
