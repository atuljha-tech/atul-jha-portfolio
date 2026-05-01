'use client'

import { useState, useRef, useEffect } from 'react'
import { Upload, X, ImageIcon, FileText, Loader2 } from 'lucide-react'

interface FileUploadProps {
  currentImage?: string
  onFileSelect: (file: File | null) => void
  label?: string
  accept?: 'image' | 'both'
}

// Inject pdf.js script tag once into the page
function injectPdfJs(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') return reject('SSR')
    if ((window as any).pdfjsLib) return resolve()

    const existing = document.getElementById('pdfjs-script')
    if (existing) {
      // Script already injected, wait for it
      const check = setInterval(() => {
        if ((window as any).pdfjsLib) {
          clearInterval(check)
          resolve()
        }
      }, 50)
      return
    }

    const script = document.createElement('script')
    script.id = 'pdfjs-script'
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js'
    script.onload = () => {
      const lib = (window as any).pdfjsLib
      if (lib) {
        lib.GlobalWorkerOptions.workerSrc =
          'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js'
        resolve()
      } else {
        reject(new Error('pdfjsLib not found after script load'))
      }
    }
    script.onerror = () => reject(new Error('Failed to load pdf.js'))
    document.head.appendChild(script)
  })
}

async function pdfFirstPageToJpeg(file: File): Promise<string> {
  await injectPdfJs()
  const lib = (window as any).pdfjsLib

  const arrayBuffer = await file.arrayBuffer()
  const pdf = await lib.getDocument({ data: arrayBuffer }).promise
  const page = await pdf.getPage(1)

  const scale = 2
  const viewport = page.getViewport({ scale })

  const canvas = document.createElement('canvas')
  canvas.width = viewport.width
  canvas.height = viewport.height

  const ctx = canvas.getContext('2d')!
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  await page.render({ canvasContext: ctx, viewport }).promise

  return canvas.toDataURL('image/jpeg', 0.92)
}

export default function ImageUpload({
  currentImage,
  onFileSelect,
  label = 'Image',
  accept = 'both',
}: FileUploadProps) {
  const [preview, setPreview] = useState<string | null>(currentImage || null)
  const [converting, setConverting] = useState(false)
  const [dragging, setDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const acceptAttr = accept === 'both' ? 'image/*,application/pdf' : 'image/*'

  const handleFile = async (file: File) => {
    const isImage = file.type.startsWith('image/')
    const isPdf = file.type === 'application/pdf'

    if (!isImage && !isPdf) {
      alert('Only images (PNG, JPG, WEBP) and PDF files are supported')
      return
    }
    if (file.size > 15 * 1024 * 1024) {
      alert('File must be under 15MB')
      return
    }

    if (isImage) {
      const url = URL.createObjectURL(file)
      setPreview(url)
      onFileSelect(file)
      return
    }

    // PDF → convert first page to JPEG image
    setConverting(true)
    try {
      const jpegDataUrl = await pdfFirstPageToJpeg(file)
      setPreview(jpegDataUrl)

      // Turn the dataURL back into a File so the API receives an image
      const res = await fetch(jpegDataUrl)
      const blob = await res.blob()
      const imageFile = new File(
        [blob],
        file.name.replace(/\.pdf$/i, '.jpg'),
        { type: 'image/jpeg' }
      )
      onFileSelect(imageFile)
    } catch (err) {
      console.error('PDF conversion error:', err)
      alert('Could not render PDF. Try uploading as a JPG/PNG screenshot instead.')
    } finally {
      setConverting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file) handleFile(file)
  }

  const handleRemove = () => {
    setPreview(null)
    onFileSelect(null)
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <div>
      <label className="block text-sm font-medium text-slate-300 mb-2">
        {label}
        <span className="ml-2 text-xs text-slate-500 font-normal">
          {accept === 'both'
            ? '(Image or PDF — PDF auto-converts to image)'
            : '(Image, max 15MB)'}
        </span>
      </label>

      {/* Converting spinner */}
      {converting && (
        <div className="w-full h-48 rounded-xl border border-slate-700 bg-slate-800/50 flex flex-col items-center justify-center gap-3 mb-2">
          <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
          <p className="text-sm text-slate-400">Converting PDF to image...</p>
        </div>
      )}

      {/* Image preview */}
      {preview && !converting && (
        <div className="relative w-full h-48 rounded-xl overflow-hidden border border-slate-700 mb-2">
          <img src={preview} alt="Preview" className="w-full h-full object-cover" />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 w-8 h-8 rounded-full bg-red-500/80 backdrop-blur-sm flex items-center justify-center hover:bg-red-500 transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>
          <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/60 backdrop-blur-sm rounded-lg">
            <span className="text-xs text-slate-300">Preview ready ✓</span>
          </div>
        </div>
      )}

      {/* Drop zone */}
      {!preview && !converting && (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`w-full h-36 rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-2 cursor-pointer transition-all duration-200 ${
            dragging
              ? 'border-purple-500 bg-purple-500/10'
              : 'border-slate-700 hover:border-purple-500/50 hover:bg-slate-800/30'
          }`}
        >
          <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center">
            {dragging ? (
              <Upload className="w-5 h-5 text-purple-400" />
            ) : (
              <div className="flex gap-1">
                <ImageIcon className="w-4 h-4 text-slate-500" />
                {accept === 'both' && <FileText className="w-4 h-4 text-slate-500" />}
              </div>
            )}
          </div>
          <p className="text-sm text-slate-400">
            {dragging ? 'Drop to upload' : 'Click or drag to upload'}
          </p>
          <p className="text-xs text-slate-600">
            {accept === 'both'
              ? 'PNG, JPG, WEBP or PDF — PDF first page becomes the image'
              : 'PNG, JPG, WEBP — up to 15MB'}
          </p>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={acceptAttr}
        onChange={handleChange}
        className="hidden"
      />
    </div>
  )
}
