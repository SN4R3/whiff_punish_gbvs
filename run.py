import eel
import keyboard
import time

from GameLoop import GameLoop

global gl

eel.init('view', allowed_extensions=['.js', '.html', '.css'])


@eel.expose  # Expose this function to Javascript
def print_hello_from_header():
    print("")


@eel.expose
def on_button_clicked():
    print("")
    eel.showAlert("")

@eel.expose
def startLoop(stepsMin,stepsMax,foMin,foMax,seq):
    print('starting')
    eel.isRunning()
    time.sleep(5)
    gl = GameLoop(stepsMin, stepsMax, foMin, foMax, seq)

eel.start('html/index.html', port=9999)