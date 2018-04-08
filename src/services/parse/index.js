/**
 * Methods for parsing command input
 */

const createCommandObject = (type, payload, requiresAuth = false) => ({ type, ...payload, requiresAuth })

/**
 * Returns true if trimmed input is formatted correctly.
 * @param {string} input 
 */
export const isInputValidCommand = (input) => {
  return input.includes(' ')
}

/**
 * Splits a valid input into it's command and body
 * @param {string} input 
 */
export const splitCommandAndInput = (input) => {
  const command = input.split(' ', 1)[0]
  const rest = input.substr(command.length + 1)
  return [command, rest].map(s => s ? s.trim() : s)
}

export const splitTrackAndPlaylist = (body) => {
  const splitString = ' to '
  const splitPoint = body.lastIndexOf(' to ')
  const hasSplitPoint = splitPoint !== -1
  const track = hasSplitPoint
    ? body.substring(0, splitPoint)
    : body
  const playlist = hasSplitPoint
    ? body.substring(splitPoint + splitString.length)
    : ''
  return [track, playlist].map(s => s ? s.trim() : s)
}

export const parseCommand = (input) => {
  // remove outer spaces
  const sanatisedInput = input.trim()
  // check input makes sense
  if (!isInputValidCommand(sanatisedInput)) {
    return null
  }
  // parse the command and the body
  const [command, body] = splitCommandAndInput(sanatisedInput)
  // return valid commands as a command object
  switch (command) {
    case 's':
    case 'search':
      return createCommandObject('search', { body })

    case 'a':
    case 'add': {
      const [track, playlist] = splitTrackAndPlaylist(body)
      return createCommandObject('add', { track, playlist }, true)
    }

    default:
      return null
  }
}
