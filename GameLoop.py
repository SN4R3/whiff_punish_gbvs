import keyboard
import random

import time

class GameLoop:
    def __init__(self, stepsMin, stepsMax, foMin, foMax, sequences):
        self.stepsMin = stepsMin
        self.stepsMax = stepsMax
        self.steps = random.randrange(stepsMin, stepsMax)

        self.foMin = foMin
        self.foMax = foMax
        self.fake_out = random.uniform(self.foMin, self.foMax)
        self.sequences = sequences

        
        self.status = 'Not Started'
        self.count = 0
        while True:
            self.loop()
            time.sleep(0.032)

    def loop(self):
        if keyboard.is_pressed('esc'):
            quit()

        print(self.status)
        print(f'Steps: {self.steps}')

        if self.status == 'Not Started':
            self.count = 0
            self.status = 'SHIFTING RIGHT'
            keyboard.press('d')
        elif self.status == 'SHIFTING RIGHT':
            self.count = self.count + 1
            if self.count >= self.steps:
                keyboard.release('d')
                time.sleep(0.032)
                keyboard.press('A')
                self.status = 'SHIFTING LEFT'
                self.count = 0
        elif self.status == 'SHIFTING LEFT':
            self.count = self.count + 1
            if self.count >= self.steps:
                keyboard.release('A')

                if random.randrange(0, 3) == 2:
                    self.fake_out = random.uniform(self.foMin, self.foMax)
                    # roll for attack
                    if random.randrange(0, 3) == 2:
                        print('ATTACKING')
                        # roll the sequence
                        seq = self.sequences[random.randrange(0, len(self.sequences))]
                        for x in seq:
                            if isinstance(x, float):
                                time.sleep(x)
                            else:
                                keyboard.press(x)
                                time.sleep(0.15)
                                keyboard.release(x)
                                print(f'KEY PRESSED:{x}')
                    else:
                        print(f'FAKEOUT:{self.fake_out}s')
                        time.sleep(self.fake_out)

                time.sleep(0.032)

                keyboard.press('d')
                self.status = 'SHIFTING RIGHT'
                self.count = 0
                self.steps = random.randrange(self.stepsMin, self.stepsMax)  


# def listener(sc):
#     global running
#     if keyboard.is_pressed('ctrl+shift+alt'):
#         running = False
#     if keyboard.is_pressed('esc'):
#         quit()
        
#     if keyboard.is_pressed('ctrl+shift+space'):
#         print('~START~')
#         running = True
#         ls.enter(0.1, 1, loop, (ls,))
#         ls.run()

#     s.enter(0.1, 1, listener, (sc,))

# s.enter(0.1, 1, listener, (s,))
# s.run()