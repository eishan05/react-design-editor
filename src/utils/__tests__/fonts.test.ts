import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { loadFonts, getCompactFontData } from '../fonts'
import { IFont } from '@/interfaces/editor'

// Mock document.fonts
const mockFontFace = {
  family: 'Arial',
  load: vi.fn()
}

const mockDocumentFonts = {
  add: vi.fn()
}

Object.defineProperty(document, 'fonts', {
  value: mockDocumentFonts,
  writable: true
})

global.FontFace = vi.fn().mockImplementation((family, source) => ({
  family,
  source,
  load: vi.fn().mockResolvedValue(mockFontFace)
}))

describe('fonts utils', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('loadFonts', () => {
    it('should load fonts successfully', async () => {
      const fonts = [
        { name: 'Arial', url: 'https://fonts.googleapis.com/css2?family=Arial' },
        { name: 'Roboto', url: 'https://fonts.googleapis.com/css2?family=Roboto' }
      ]

      const mockFontFace = { family: 'Arial' }
      vi.mocked(FontFace).mockImplementation(() => ({
        load: vi.fn().mockResolvedValue(mockFontFace)
      }) as any)

      const result = await loadFonts(fonts)

      expect(result).toBe(true)
      expect(FontFace).toHaveBeenCalledTimes(2)
      expect(FontFace).toHaveBeenCalledWith('Arial', 'url(https://fonts.googleapis.com/css2?family=Arial)')
      expect(FontFace).toHaveBeenCalledWith('Roboto', 'url(https://fonts.googleapis.com/css2?family=Roboto)')
    })


    it('should add fonts to document when loaded successfully', async () => {
      const fonts = [
        { name: 'Arial', url: 'https://fonts.googleapis.com/css2?family=Arial' }
      ]

      const mockFontFace = { family: 'Arial' }
      vi.mocked(FontFace).mockImplementation(() => ({
        load: vi.fn().mockResolvedValue(mockFontFace)
      }) as any)

      await loadFonts(fonts)

      expect(mockDocumentFonts.add).toHaveBeenCalledWith(mockFontFace)
    })
  })

  describe('getCompactFontData', () => {
    const mockFonts: IFont[] = [
      {
        id: '1',
        family: 'Arial',
        fullName: 'Arial Regular',
        postScriptName: 'Arial-Regular',
        preview: 'preview1',
        style: 'regular',
        url: 'url1',
        category: 'sans-serif',
        createdAt: '2023-01-01',
        updatedAt: '2023-01-01',
        userId: 'user1'
      },
      {
        id: '2',
        family: 'Arial',
        fullName: 'Arial Bold',
        postScriptName: 'Arial-Bold',
        preview: 'preview2',
        style: 'bold',
        url: 'url2',
        category: 'sans-serif',
        createdAt: '2023-01-01',
        updatedAt: '2023-01-01',
        userId: 'user1'
      },
      {
        id: '3',
        family: 'Roboto',
        fullName: 'Roboto Regular',
        postScriptName: 'Roboto-Regular',
        preview: 'preview3',
        style: 'regular',
        url: 'url3',
        category: 'sans-serif',
        createdAt: '2023-01-01',
        updatedAt: '2023-01-01',
        userId: 'user1'
      }
    ]

    it('should group fonts by family', () => {
      const result = getCompactFontData(mockFonts)

      expect(result).toHaveLength(2)
      expect(result.map(f => f.family)).toContain('Arial')
      expect(result.map(f => f.family)).toContain('Roboto')
    })

    it('should include all styles for each family', () => {
      const result = getCompactFontData(mockFonts)
      const arialFont = result.find(f => f.family === 'Arial')
      
      expect(arialFont?.styles).toHaveLength(2)
      expect(arialFont?.styles.map(s => s.style)).toContain('regular')
      expect(arialFont?.styles.map(s => s.style)).toContain('bold')
    })

    it('should select regular font as default when available', () => {
      const result = getCompactFontData(mockFonts)
      const arialFont = result.find(f => f.family === 'Arial')
      
      expect(arialFont?.default.style).toBe('regular')
      expect(arialFont?.default.fullName).toBe('Arial Regular')
    })

    it('should select first font as default when no regular font exists', () => {
      const fontsWithoutRegular: IFont[] = [
        {
          id: '1',
          family: 'CustomFont',
          fullName: 'CustomFont Bold',
          postScriptName: 'CustomFont-Bold',
          preview: 'preview1',
          style: 'bold',
          url: 'url1',
          category: 'sans-serif',
          createdAt: '2023-01-01',
          updatedAt: '2023-01-01',
          userId: 'user1'
        }
      ]

      const result = getCompactFontData(fontsWithoutRegular)
      expect(result[0].default.style).toBe('bold')
    })

    it('should handle empty font array', () => {
      const result = getCompactFontData([])
      expect(result).toHaveLength(0)
    })

    it('should handle single font', () => {
      const singleFont = [mockFonts[0]]
      const result = getCompactFontData(singleFont)
      
      expect(result).toHaveLength(1)
      expect(result[0].family).toBe('Arial')
      expect(result[0].styles).toHaveLength(1)
      expect(result[0].default).toEqual(singleFont[0])
    })
  })
})