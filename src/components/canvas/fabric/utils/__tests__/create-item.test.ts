import { describe, it, expect, vi, beforeEach } from 'vitest'
import { createItem } from '../create-item'
import { ADD_IMAGE, ADD_TEXT } from '@/global'
import { EventBusData } from '@/interfaces/rxjs'
import { ILayer, IImage } from '@/interfaces/editor'
import { Textbox, FabricImage } from 'fabric'

vi.mock('@/utils/fonts', () => ({
  loadFonts: vi.fn().mockResolvedValue(true)
}))

vi.mock('fabric', () => ({
  Textbox: vi.fn().mockImplementation((text, options) => ({
    text,
    ...options,
    type: 'textbox'
  })),
  FabricImage: {
    fromURL: vi.fn().mockResolvedValue({
      set: vi.fn(),
      type: 'image'
    })
  }
}))

describe('createItem', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should create textbox item when ADD_TEXT event is triggered', async () => {
    const textLayer: ILayer = {
      id: 'text-1',
      name: 'Test Text',
      type: 'textbox',
      details: {
        text: 'Hello World',
        fontSize: 16,
        fontFamily: 'Arial',
        fontUrl: 'https://fonts.googleapis.com/css2?family=Arial',
        color: '#000000',
        align: 'left',
        lineHeight: 1.2,
        letterSpacing: 0
      },
      metadata: {}
    }

    const event: EventBusData = {
      key: ADD_TEXT,
      val: { payload: textLayer }
    }

    const result = await createItem(event)

    expect(result).toBeDefined()
    expect(Textbox).toHaveBeenCalledWith('Hello World', {
      fontSize: 16,
      fontFamily: 'Arial',
      fontUrl: 'https://fonts.googleapis.com/css2?family=Arial',
      color: '#000000',
      align: 'left',
      lineHeight: 1.2,
      letterSpacing: 0
    })
  })

  it('should create image item when ADD_IMAGE event is triggered', async () => {
    const imageLayer: IImage = {
      id: 'image-1',
      name: 'Test Image',
      type: 'image',
      details: {
        src: 'https://example.com/image.jpg',
        width: 100,
        height: 100
      },
      metadata: {}
    }

    const event: EventBusData = {
      key: ADD_IMAGE,
      val: { payload: imageLayer }
    }

    const mockImage = {
      set: vi.fn(),
      type: 'image'
    }
    
    vi.mocked(FabricImage.fromURL).mockResolvedValue(mockImage as any)

    const result = await createItem(event)

    expect(result).toBeDefined()
    expect(FabricImage.fromURL).toHaveBeenCalledWith('https://example.com/image.jpg')
    expect(mockImage.set).toHaveBeenCalledWith({
      scaleX: 0.1,
      scaleY: 0.1
    })
  })

  it('should return undefined for unknown event types', async () => {
    const event: EventBusData = {
      key: 'UNKNOWN_EVENT',
      val: { payload: {} }
    }

    const result = await createItem(event)
    expect(result).toBeUndefined()
  })

  it('should load fonts before creating textbox', async () => {
    const { loadFonts } = await import('@/utils/fonts')
    
    const textLayer: ILayer = {
      id: 'text-1',
      name: 'Test Text',
      type: 'textbox',
      details: {
        text: 'Hello World',
        fontSize: 16,
        fontFamily: 'Roboto',
        fontUrl: 'https://fonts.googleapis.com/css2?family=Roboto',
        color: '#000000',
        align: 'left',
        lineHeight: 1.2,
        letterSpacing: 0
      },
      metadata: {}
    }

    const event: EventBusData = {
      key: ADD_TEXT,
      val: { payload: textLayer }
    }

    await createItem(event)

    expect(loadFonts).toHaveBeenCalledWith([{
      name: 'Roboto',
      url: 'https://fonts.googleapis.com/css2?family=Roboto'
    }])
  })
})