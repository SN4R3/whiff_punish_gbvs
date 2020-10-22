import keyboard
import random
import eel

import time

class GameLoop:
    def __init__(self, stepsMin, stepsMax, foMin, foMax, sequences):
        print(stepsMin)
        print(stepsMax)
        print(foMin)
        print(foMax)

        self.stepsMin = int(stepsMin)
        self.stepsMax = int(stepsMax)
        self.steps = random.randrange(stepsMin, stepsMax)

        self.foMin = foMin
        self.foMax = foMax
        self.fake_out = random.uniform(float(self.foMin), float(self.foMax))
        self.sequences = sequences
        self.running = True
        
        self.status = 'Not Started'
        self.count = 0
        while self.running:
            self.loop()
            time.sleep(0.032)

    def loop(self):
        if keyboard.is_pressed('esc'):
            self.running = False
            eel.hasStopped()
            keyboard.release('d')
            keyboard.release('A')
            print('stopped')

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
                    self.fake_out = random.uniform(float(self.foMin), float(self.foMax))
                    # roll for attack
                    if random.randrange(0, 3) == 2:
                        time.sleep(0.032)
                        print('ATTACKING')
                        # roll the sequence
                        seq = self.sequences[random.randrange(0, len(self.sequences))]
                        for x in seq:
                            for y in x:
                                if isinstance(y, float) or isinstance(y, int):
                                    time.sleep(y)
                                keyboard.press(y)
                                time.sleep(0.015)
                                keyboard.release(y)
                                print(f'KEY PRESSED:{y}')
                    else:
                        print(f'FAKEOUT:{self.fake_out}s')
                        time.sleep(self.fake_out)

                time.sleep(0.032)

                keyboard.press('d')
                self.status = 'SHIFTING RIGHT'
                self.count = 0
                self.steps = random.randrange(self.stepsMin, self.stepsMax)   
