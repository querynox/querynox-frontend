import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { Check, X, Copy, Share, Bookmark, Trash2 } from 'lucide-react'

interface ToastProps {
  message: string
  type: 'success' | 'error' | 'info'
  isVisible: boolean
  onClose: () => void
}

const Toast = ({ message, type, isVisible, onClose }: ToastProps) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose()
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [isVisible, onClose])

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <Check className="h-4 w-4 text-green-500" />
      case 'error':
        return <Trash2 className="h-4 w-4 text-red-500" />
      case 'info':
        return <Copy className="h-4 w-4 text-blue-500" />
      default:
        return <Check className="h-4 w-4 text-green-500" />
    }
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
      <div className={cn(
        "flex items-center space-x-2 px-4 py-3 rounded-lg shadow-lg text-white transition-all duration-300",
        "bg-secondary text-secondary-foreground",
        isVisible ? "animate-in slide-in-from-bottom-4" : "animate-out slide-out-to-bottom-4"
      )}>
        {getIcon()}
        <span className="text-sm font-medium">{message}</span>
        <button
          onClick={onClose}
          className="ml-2 hover:bg-white/20 rounded-full p-1 transition-colors"
        >
          <X className="h-3 w-3" />
        </button>
      </div>
    </div>
  )
}

export default Toast
