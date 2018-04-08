/* globals describe, it, expect */

import {
  splitCommandAndInput,
  splitTrackAndPlaylist,
  isInputValidCommand,
  parseCommand
} from './'

describe('test splitCommandAndInput', () => {
  it('should split correctly', () => {
    const input = 'search 1 foo 2 bar 3 baz .   '
    const expected = ['search', '1 foo 2 bar 3 baz .']
    expect(splitCommandAndInput(input)).toEqual(expected)
  })
})

describe('test splitTrackAndPlaylist', () => {
  it('should split correctly', () => {
    const input = '  track a to  b  to   playlist 1 '
    const expected = ['track a to  b', 'playlist 1']
    expect(splitTrackAndPlaylist(input)).toEqual(expected)
  })
})

describe('test isInputValidCommand', () => {
  it('should return true on valid input', () => {
    expect(isInputValidCommand('search foo')).toBe(true)
  })
  it('should return false on invalid input', () => {
    expect(isInputValidCommand('search')).toBe(false)
  })
})

describe('test parseCommand', () => {
  it('should return a search command object', () => {
    const expected = { type: 'search', body: 'foo', requiresAuth: false }
    expect(parseCommand(' search foo   ')).toEqual(expected)
  })
  it('should return an add command object', () => {
    const expected = {
      type: 'add',
      track: 'foo',
      playlist: 'bar',
      requiresAuth: true
    }
    expect(parseCommand(' add foo to bar  ')).toEqual(expected)
  })
  it('should return a correct partial add command object', () => {
    const expected = {
      type: 'add',
      track: 'foo',
      playlist: '',
      requiresAuth: true
    }
    expect(parseCommand(' add foo ')).toEqual(expected)
  })
  it('should return null on invalid input', () => {
    expect(parseCommand('foobar5 sf8 ')).toBeNull()
    expect(parseCommand('search ')).toBeNull()
  })
})
