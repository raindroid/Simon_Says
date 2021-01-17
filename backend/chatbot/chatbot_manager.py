import subprocess
import os, fcntl
from sys import stderr
import time

class ChatBotManager(object):
    process_limit = 100

    def __init__(self) -> None:
        super().__init__()
        self.process_pool = [False] * self.process_limit
        self.command = f"python {os.path.dirname(__file__)}/../../Bot/bot.py".split()
    
    def kill(self, pid):
        self.process_pool[pid].kill()
        print(f"Process {pid} got killed")
    
    def read_process_msg(process):
        fcntl.fcntl(process.stdout.fileno(), fcntl.F_SETFL, os.O_NONBLOCK)
        output = ''
        temp = True
        while process.poll() is None and (output.strip() == '' or (temp != '' and temp is not None)):
            temp = ''
            try:
                temp = process.stdout.read()
                # print(f"temp {temp}")
                if temp != ''and temp != None:
                    output += temp.decode('utf-8')
            except IOError:
                pass
            time.sleep(.3)    # short sleep before attempting another read
        return output.strip()
    
    def read_msg(self, pid, init_delay=0.1):
        if pid > self.process_limit: return None
        for i, process in enumerate(self.process_pool):
            if process != False and process.poll() != None:
                self.process_pool[i] = False
        if self.process_pool[pid] is False:
            return None
        # time.sleep(init_delay)
        return ChatBotManager.read_process_msg(self.process_pool[pid])

    def create_new(self):
        pid = 0
        print("Creating chat thread")
        while pid < len(self.process_pool) and self.process_pool[pid] != False:
            if self.process_pool[pid].poll() != None:
                break
            pid += 1
        if pid >= len(self.process_pool): return None
        
        self.process_pool[pid] = subprocess.Popen(self.command, bufsize=2, stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.DEVNULL)
        print(f"SUCCEED - p{pid}")
        return pid

    def send_msg(self, pid, msg: str):
        if pid > self.process_limit: return None
        for i, process in enumerate(self.process_pool):
            if process != False and process.poll() != None:
                self.process_pool[i] = False
        if self.process_pool[pid] is False:
            print("Tests END 2")
            return None
        
        process = self.process_pool[pid]
        msg = msg.replace('\n', '\t').strip() # in case a new line during message
        process.stdin.write((msg + '\n').encode('utf-8'))
        if self.process_pool[pid].poll() != None: 
            print("Tests END 1")
            return None
        return pid
        

if __name__ == "__main__":
    test_amount = 1
    bots = ChatBotManager()
    for i in range(test_amount):
        bots.create_new()
    
    # time.sleep(6)
    for i in range(test_amount):
        print(bots.read_msg(i, 0))
    
    alive = True
    while alive:
        alive = False
        for i in range(test_amount):
            a = input()
            bots.send_msg(i, a)
        # time.sleep(3)
        for i in range(test_amount):
            msg = bots.read_msg(i, 0)
            if msg != '' and msg != None:
                alive = True
                print(msg)
    
    print("Tests passed")


