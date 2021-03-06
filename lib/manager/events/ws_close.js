'use strict'

const debug = require('debug')('bfx:api:manager:events:ws:close')

/**
 * Notifies ws2:close and closes the websocket if it hasn't already been closed
 * elsewhere (managedClose flag)
 *
 * @param {Manager} m
 * @param {number} wsID
 */
module.exports = (m, wsID) => {
  const ws = m.getWS(wsID)

  if (!ws) {
    debug('ws connection closed unsafely: %d', wsID)
    return
  }

  m.notifyPlugins('ws2', 'ws', 'close', { wsID })
  m.emit('ws2:close', { wsID })

  if (!ws.managedClose) {
    debug('removing connection (%d)', wsID)
    m.closeWS(wsID)
  }

  debug('ws client connection closed (%d)', wsID)
}
