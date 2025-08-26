import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
  drawHorizontalIcon,
  drawVerticalIcon,
  drawRotateIcon,
  drawCircleIcon
} from '../drawer'

vi.mock('fabric', () => ({
  util: {
    degreesToRadians: (deg: number) => (deg * Math.PI) / 180
  }
}))

describe('drawer utilities', () => {
  let ctx: any
  const fabricObject = { angle: 45 }

  beforeEach(() => {
    ctx = {
      save: vi.fn(),
      translate: vi.fn(),
      rotate: vi.fn(),
      restore: vi.fn(),
      drawImage: vi.fn(),
      beginPath: vi.fn(),
      arc: vi.fn(),
      fill: vi.fn(),
      shadowBlur: 0,
      shadowOffsetY: 0,
      shadowColor: '',
      lineCap: '',
      lineWidth: 0,
      fillStyle: ''
    }
    vi.clearAllMocks()
  })

  it('drawHorizontalIcon draws image with correct parameters', () => {
    const cornerSize = 20
    drawHorizontalIcon.call({ cornerSize }, ctx, 10, 20, {}, fabricObject)
    expect(ctx.translate).toHaveBeenCalledWith(10, 20)
    expect(ctx.rotate).toHaveBeenCalledWith((45 * Math.PI) / 180)
    expect(ctx.drawImage).toHaveBeenCalled()
    const [img, x, y, w, h] = ctx.drawImage.mock.calls[0]
    expect(img.src).toBe('https://ik.imagekit.io/uonadbo34e6/icons/horizontal_7M4-rXo2E.svg')
    expect(x).toBe(-cornerSize / 2)
    expect(y).toBe(-5)
    expect(w).toBe(cornerSize)
    expect(h).toBe(10)
    expect(ctx.restore).toHaveBeenCalled()
  })

  it('drawVerticalIcon rotates context 90 degrees plus object angle', () => {
    drawVerticalIcon(ctx, 5, 6, {}, fabricObject)
    expect(ctx.translate).toHaveBeenCalledWith(5, 6)
    expect(ctx.rotate).toHaveBeenCalledWith(((90 + 45) * Math.PI) / 180)
    expect(ctx.restore).toHaveBeenCalled()
  })

  it('drawRotateIcon draws rotate icon with shadow', () => {
    drawRotateIcon(ctx, 1, 2, {}, fabricObject)
    expect(ctx.shadowBlur).toBe(15)
    expect(ctx.shadowOffsetY).toBe(8)
    expect(ctx.shadowColor).toBe('rgba(0,0,0,0.08)')
    const [img, x, y, w, h] = ctx.drawImage.mock.calls[0]
    expect(img.src).toBe('https://ik.imagekit.io/uonadbo34e6/icons/Rotate_qCgLn7Jao.svg')
    expect(x).toBe(-13)
    expect(y).toBe(-13)
    expect(w).toBe(26)
    expect(h).toBe(26)
    expect(ctx.restore).toHaveBeenCalled()
  })

  it('drawCircleIcon draws a styled circle', () => {
    drawCircleIcon(ctx, 3, 4, {}, fabricObject)
    expect(ctx.translate).toHaveBeenCalledWith(3, 4)
    expect(ctx.rotate).toHaveBeenCalledWith((45 * Math.PI) / 180)
    expect(ctx.beginPath).toHaveBeenCalled()
    expect(ctx.lineCap).toBe('round')
    expect(ctx.lineWidth).toBe(3)
    expect(ctx.shadowBlur).toBe(2)
    expect(ctx.shadowColor).toBe('black')
    expect(ctx.arc).toHaveBeenCalledWith(0, 0, 5.5, 0, 2 * Math.PI)
    expect(ctx.fillStyle).toBe('#ffffff')
    expect(ctx.fill).toHaveBeenCalled()
    expect(ctx.restore).toHaveBeenCalled()
  })
})

