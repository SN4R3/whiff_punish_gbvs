from tkinter import *
from GameLoop import GameLoop

class Gui:
    def __init__(self, master):
        self.gl = None

        frame = Frame(master=master)
        frame.place(x = 0, y = 0, relwidth = 1, relheight = 1)

        self.stepsMin = Scale(frame, length=130, orient=HORIZONTAL, label="Min. Steps:", from_=0, to=8)
        self.stepsMin.pack()
        self.stepsMax = Scale(frame, length=130, orient=HORIZONTAL, label="Max. Steps:", from_=0, to=8)
        self.stepsMax.pack()

        self.foMin = Scale(frame, length=130, orient=HORIZONTAL, label="Min. Pause Time (in s):", from_=0, to=2)
        self.foMin.pack()
        self.foMax = Scale(frame, length=130, orient=HORIZONTAL, label="Max. Pause Time (in s):", from_=0, to=2)
        self.foMax.pack()

        self.sequences = [
            ['i', 0.5, 'A+p'],
            ['A+w', 0.15, 'j'],
            ['i', 0.75, 'p']
        ]

        self.quit_btn = Button(
            frame, text="QUIT", fg="red", command=frame.quit
        )
        self.quit_btn.pack(side=LEFT)

        self.start = Button(frame, text="START", command=self.start_loop)
        self.start.pack(side=LEFT)
    
    def start_loop(self):
        self.gl = GameLoop(
            self.stepsMin.get(), 
            self.stepsMax.get(), 
            self.foMin.get(), 
            self.foMax.get(), 
            self.sequences)
    
