"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Upload, X, FileImage, File, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface ModernUploadProps {
  onFileSelect?: (files: File[]) => void
  accept?: string
  multiple?: boolean
  maxSize?: number // in MB
  className?: string
  placeholder?: string
  description?: string
}

export function ModernUpload({
  onFileSelect,
  accept = "image/*",
  multiple = false,
  maxSize = 10,
  className,
  placeholder = "Drop files here or click to upload",
  description = "Supports JPG, PNG, GIF up to 10MB",
}: ModernUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({})

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragOver(false)

      const droppedFiles = Array.from(e.dataTransfer.files)
      const validFiles = droppedFiles.filter((file) => {
        if (maxSize && file.size > maxSize * 1024 * 1024) {
          return false
        }
        if (accept && !file.type.match(accept.replace("*", ".*"))) {
          return false
        }
        return true
      })

      if (multiple) {
        setFiles((prev) => [...prev, ...validFiles])
      } else {
        setFiles(validFiles.slice(0, 1))
      }

      // Simulate upload progress
      validFiles.forEach((file) => {
        simulateUpload(file.name)
      })

      onFileSelect?.(validFiles)
    },
    [accept, maxSize, multiple, onFileSelect],
  )

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFiles = Array.from(e.target.files || [])
      const validFiles = selectedFiles.filter((file) => {
        if (maxSize && file.size > maxSize * 1024 * 1024) {
          return false
        }
        return true
      })

      if (multiple) {
        setFiles((prev) => [...prev, ...validFiles])
      } else {
        setFiles(validFiles.slice(0, 1))
      }

      // Simulate upload progress
      validFiles.forEach((file) => {
        simulateUpload(file.name)
      })

      onFileSelect?.(validFiles)
    },
    [maxSize, multiple, onFileSelect],
  )

  const simulateUpload = (fileName: string) => {
    let progress = 0
    const interval = setInterval(() => {
      progress += Math.random() * 30
      if (progress >= 100) {
        progress = 100
        clearInterval(interval)
      }
      setUploadProgress((prev) => ({ ...prev, [fileName]: progress }))
    }, 200)
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  return (
    <div className={cn("w-full", className)}>
      <div
        className={cn(
          "relative border-2 border-dashed rounded-xl p-8 transition-all duration-200 cursor-pointer group",
          isDragOver
            ? "border-[#635BFF] bg-[#635BFF]/5 scale-[1.02]"
            : "border-gray-300 hover:border-[#635BFF] hover:bg-gray-50",
          "bg-gradient-to-br from-gray-50/50 to-white",
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => document.getElementById("file-upload")?.click()}
      >
        <input
          id="file-upload"
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileSelect}
          className="hidden"
        />

        <div className="flex flex-col items-center justify-center space-y-4">
          <div
            className={cn(
              "w-16 h-16 rounded-full flex items-center justify-center transition-all duration-200",
              isDragOver
                ? "bg-[#635BFF] text-white scale-110"
                : "bg-gray-100 text-gray-400 group-hover:bg-[#635BFF] group-hover:text-white group-hover:scale-110",
            )}
          >
            <Upload className="w-8 h-8" />
          </div>

          <div className="text-center">
            <p className="text-lg font-medium text-gray-700 mb-1">{placeholder}</p>
            <p className="text-sm text-gray-500">{description}</p>
          </div>

          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <span>or</span>
            <button
              type="button"
              className="text-[#635BFF] hover:text-[#635BFF]/80 font-medium underline underline-offset-2"
            >
              browse files
            </button>
          </div>
        </div>

        {/* Animated background effect */}
        <div
          className={cn(
            "absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300",
            isDragOver && "opacity-100",
          )}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#635BFF]/10 via-transparent to-[#635BFF]/10 animate-pulse rounded-xl" />
        </div>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg shadow-sm"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                  {file.type.startsWith("image/") ? (
                    <FileImage className="w-5 h-5 text-gray-500" />
                  ) : (
                    <File className="w-5 h-5 text-gray-500" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700 truncate max-w-[200px]">{file.name}</p>
                  <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {uploadProgress[file.name] !== undefined && (
                  <div className="flex items-center space-x-2">
                    {uploadProgress[file.name] === 100 ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <div className="w-8 h-8 relative">
                        <svg className="w-8 h-8 transform -rotate-90" viewBox="0 0 32 32">
                          <circle
                            cx="16"
                            cy="16"
                            r="14"
                            stroke="currentColor"
                            strokeWidth="2"
                            fill="none"
                            className="text-gray-200"
                          />
                          <circle
                            cx="16"
                            cy="16"
                            r="14"
                            stroke="currentColor"
                            strokeWidth="2"
                            fill="none"
                            strokeDasharray={`${uploadProgress[file.name] * 0.88} 88`}
                            className="text-[#635BFF]"
                          />
                        </svg>
                        <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-gray-600">
                          {Math.round(uploadProgress[file.name])}%
                        </span>
                      </div>
                    )}
                  </div>
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    removeFile(index)
                  }}
                  className="w-6 h-6 rounded-full bg-gray-100 hover:bg-red-100 flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4 text-gray-500 hover:text-red-500" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
