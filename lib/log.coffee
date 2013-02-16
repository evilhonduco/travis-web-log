@Log = ->
  @listeners = []
  @
$.extend Log.prototype,
  trigger: () ->
    args = Array::slice.apply(arguments)
    event = args[0]
    @trigger('start', event) unless event == 'start' || event == 'stop'
    listener.notify.apply(listener, [@].concat(args)) for listener in @listeners
    @trigger('stop', event) unless event == 'start' || event == 'stop'
  set: (num, string) ->
    @trigger('receive', num, string)
    @engine ||= new Log.Live(@)
    @engine.set(num, string)

Log.Listener = ->
$.extend Log.Listener.prototype,
  notify: (log, event, num) ->
    @[event].apply(@, [log].concat(Array::slice.call(arguments, 2))) if @[event]

require 'log/buffer'
require 'log/deansi'
require 'log/engine/live'
require 'log/folds'
require 'log/instrument'
require 'log/renderer/fragment'
require 'log/renderer/jquery'
