import { describe, it, expect, beforeEach } from 'vitest'
import useDataState from '../use-data-state'
import { IFont, ICompactFont } from '@/interfaces/editor'

describe('useDataState', () => {
  beforeEach(() => {
    useDataState.setState({ fonts: [], compactFonts: [] })
  })

  it('should initialize with empty arrays', () => {
    const state = useDataState.getState()
    expect(state.fonts).toEqual([])
    expect(state.compactFonts).toEqual([])
  })

  it('should set fonts correctly', () => {
    const mockFonts: IFont[] = [
      {
        id: '1',
        family: 'Arial',
        fullName: 'Arial Regular',
        postScriptName: 'Arial-Regular',
        preview: 'preview-url',
        style: 'regular',
        url: 'font-url',
        category: 'sans-serif',
        createdAt: '2023-01-01',
        updatedAt: '2023-01-01',
        userId: 'user1'
      }
    ]

    useDataState.getState().setFonts(mockFonts)
    const state = useDataState.getState()
    expect(state.fonts).toEqual(mockFonts)
  })

  it('should set compact fonts correctly', () => {
    const mockFont: IFont = {
      id: '1',
      family: 'Arial',
      fullName: 'Arial Regular',
      postScriptName: 'Arial-Regular',
      preview: 'preview-url',
      style: 'regular',
      url: 'font-url',
      category: 'sans-serif',
      createdAt: '2023-01-01',
      updatedAt: '2023-01-01',
      userId: 'user1'
    }

    const mockCompactFonts: ICompactFont[] = [
      {
        family: 'Arial',
        styles: [mockFont],
        default: mockFont
      }
    ]

    useDataState.getState().setCompactFonts(mockCompactFonts)
    const state = useDataState.getState()
    expect(state.compactFonts).toEqual(mockCompactFonts)
  })

  it('should update state independently', () => {
    const mockFonts: IFont[] = [
      {
        id: '1',
        family: 'Arial',
        fullName: 'Arial Regular',
        postScriptName: 'Arial-Regular',
        preview: 'preview-url',
        style: 'regular',
        url: 'font-url',
        category: 'sans-serif',
        createdAt: '2023-01-01',
        updatedAt: '2023-01-01',
        userId: 'user1'
      }
    ]

    const mockCompactFonts: ICompactFont[] = [
      {
        family: 'Helvetica',
        styles: [],
        default: mockFonts[0]
      }
    ]

    useDataState.getState().setFonts(mockFonts)
    useDataState.getState().setCompactFonts(mockCompactFonts)

    const state = useDataState.getState()
    expect(state.fonts).toEqual(mockFonts)
    expect(state.compactFonts).toEqual(mockCompactFonts)
  })
})