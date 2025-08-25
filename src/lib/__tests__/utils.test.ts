import { describe, it, expect } from 'vitest'
import { cn } from '../utils'

describe('utils', () => {
  describe('cn', () => {
    it('should merge class names correctly', () => {
      const result = cn('btn', 'btn-primary')
      expect(result).toBe('btn btn-primary')
    })

    it('should handle conditional classes', () => {
      const result = cn('btn', true && 'btn-primary', false && 'btn-secondary')
      expect(result).toBe('btn btn-primary')
    })

    it('should merge tailwind classes correctly', () => {
      const result = cn('p-2 m-2', 'p-4')
      expect(result).toBe('m-2 p-4')
    })

    it('should handle empty inputs', () => {
      const result = cn()
      expect(result).toBe('')
    })

    it('should handle null and undefined', () => {
      const result = cn('btn', null, undefined, 'text-white')
      expect(result).toBe('btn text-white')
    })

    it('should handle arrays of classes', () => {
      const result = cn(['btn', 'btn-primary'], 'text-white')
      expect(result).toBe('btn btn-primary text-white')
    })

    it('should handle objects with boolean values', () => {
      const result = cn({
        'btn': true,
        'btn-primary': true,
        'btn-disabled': false
      })
      expect(result).toBe('btn btn-primary')
    })

    it('should merge conflicting tailwind classes', () => {
      const result = cn('text-red-500', 'text-blue-500')
      expect(result).toBe('text-blue-500')
    })
  })
})