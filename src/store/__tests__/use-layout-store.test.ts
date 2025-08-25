import { describe, it, expect, beforeEach } from 'vitest'
import useLayoutStore from '../use-layout-store'
import { IMenuItem } from '@/interfaces/layout'

describe('useLayoutStore', () => {
  beforeEach(() => {
    useLayoutStore.setState({
      activeMenuItem: null,
      showMenuItem: false,
      showControlItem: false,
      showToolboxItem: false,
      activeToolboxItem: null
    })
  })

  it('should initialize with default values', () => {
    const state = useLayoutStore.getState()
    expect(state.activeMenuItem).toBeNull()
    expect(state.showMenuItem).toBe(false)
    expect(state.showControlItem).toBe(false)
    expect(state.showToolboxItem).toBe(false)
    expect(state.activeToolboxItem).toBeNull()
  })

  it('should set active menu item', () => {
    const menuItem: IMenuItem = 'images'
    useLayoutStore.getState().setActiveMenuItem(menuItem)
    
    const state = useLayoutStore.getState()
    expect(state.activeMenuItem).toBe(menuItem)
  })

  it('should set show menu item', () => {
    useLayoutStore.getState().setShowMenuItem(true)
    
    const state = useLayoutStore.getState()
    expect(state.showMenuItem).toBe(true)
  })

  it('should set show control item', () => {
    useLayoutStore.getState().setShowControlItem(true)
    
    const state = useLayoutStore.getState()
    expect(state.showControlItem).toBe(true)
  })

  it('should set show toolbox item', () => {
    useLayoutStore.getState().setShowToolboxItem(true)
    
    const state = useLayoutStore.getState()
    expect(state.showToolboxItem).toBe(true)
  })

  it('should set active toolbox item', () => {
    const toolboxItem = 'transform'
    useLayoutStore.getState().setActiveToolboxItem(toolboxItem)
    
    const state = useLayoutStore.getState()
    expect(state.activeToolboxItem).toBe(toolboxItem)
  })

  it('should handle all menu item types', () => {
    const menuItems: IMenuItem[] = [
      'uploads', 'templates', 'videos', 'images', 
      'shapes', 'audios', 'transitions', 'texts'
    ]

    menuItems.forEach(item => {
      useLayoutStore.getState().setActiveMenuItem(item)
      const state = useLayoutStore.getState()
      expect(state.activeMenuItem).toBe(item)
    })
  })

  it('should reset active menu item to null', () => {
    useLayoutStore.getState().setActiveMenuItem('images')
    useLayoutStore.getState().setActiveMenuItem(null)
    
    const state = useLayoutStore.getState()
    expect(state.activeMenuItem).toBeNull()
  })

  it('should reset active toolbox item to null', () => {
    useLayoutStore.getState().setActiveToolboxItem('transform')
    useLayoutStore.getState().setActiveToolboxItem(null)
    
    const state = useLayoutStore.getState()
    expect(state.activeToolboxItem).toBeNull()
  })
})