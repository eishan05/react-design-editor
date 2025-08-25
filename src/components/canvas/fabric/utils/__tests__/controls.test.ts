import { describe, it, expect, vi } from 'vitest'
import { rotateControl, createTextControls } from '../controls'
import { Control } from 'fabric'

vi.mock('fabric', () => ({
  Control: vi.fn().mockImplementation((options) => ({
    ...options,
    type: 'Control'
  })),
  controlsUtils: {
    scaleSkewCursorStyleHandler: vi.fn(),
    scaleCursorStyleHandler: vi.fn(),
    scalingEqually: vi.fn(),
    rotationWithSnapping: vi.fn(),
    rotationStyleHandler: vi.fn(),
    changeWidth: vi.fn()
  }
}))

vi.mock('./drawer', () => ({
  drawCircleIcon: vi.fn(),
  drawRotateIcon: vi.fn(),
  drawVerticalIcon: vi.fn()
}))

describe('controls', () => {
  describe('rotateControl', () => {
    it('should create rotate control with correct properties', () => {
      expect(rotateControl).toBeDefined()
      expect(rotateControl.x).toBe(0)
      expect(rotateControl.y).toBe(0.5)
      expect(rotateControl.offsetY).toBe(25)
      expect(rotateControl.withConnection).toBe(false)
      expect(rotateControl.actionName).toBe('rotate')
    })
  })

  describe('createTextControls', () => {
    it('should create all required text controls', () => {
      const controls = createTextControls()
      
      expect(controls).toHaveProperty('tlr')
      expect(controls).toHaveProperty('trr')
      expect(controls).toHaveProperty('brr')
      expect(controls).toHaveProperty('blr')
      expect(controls).toHaveProperty('mr')
      expect(controls).toHaveProperty('ml')
      expect(controls).toHaveProperty('tl')
      expect(controls).toHaveProperty('tr')
      expect(controls).toHaveProperty('bl')
      expect(controls).toHaveProperty('br')
    })

    it('should create corner rotation controls with correct positions', () => {
      const controls = createTextControls()
      
      expect(controls.tlr).toBeDefined()
      expect(controls.trr).toBeDefined()
      expect(controls.brr).toBeDefined()
      expect(controls.blr).toBeDefined()
    })

    it('should create side resize controls', () => {
      const controls = createTextControls()
      
      expect(controls.mr).toBeDefined()
      expect(controls.ml).toBeDefined()
    })

    it('should create corner scale controls', () => {
      const controls = createTextControls()
      
      expect(controls.tl).toBeDefined()
      expect(controls.tr).toBeDefined()
      expect(controls.bl).toBeDefined()
      expect(controls.br).toBeDefined()
    })

    it('should set correct action names for resize controls', () => {
      const controls = createTextControls()
      
      expect(controls.mr?.actionName).toBe('resizing')
      expect(controls.ml?.actionName).toBe('resizing')
    })

    it('should set correct positions for rotation controls', () => {
      const controls = createTextControls()
      
      expect(controls.tlr?.x).toBe(-0.5)
      expect(controls.tlr?.y).toBe(-0.5)
      expect(controls.trr?.x).toBe(0.5)
      expect(controls.trr?.y).toBe(-0.5)
      expect(controls.brr?.x).toBe(0.5)
      expect(controls.brr?.y).toBe(0.5)
      expect(controls.blr?.x).toBe(-0.5)
      expect(controls.blr?.y).toBe(0.5)
    })
  })
})