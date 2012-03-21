import org.bukkit.scheduler.BukkitScheduler
import org.bukkit.event
import org.bukkit.event.entity
import java.util.logging
import java.lang

from java.lang import Runnable

SCRIPT_PDF = {
    "name" : "Countdown",
    "version" : "1",
    "commands" : {
            "countdown" : { "description" : "Start an countdown", "usage" : "/<command> <time>", "permission" : "countdown" }
        },
    "permissions" : {
            "countdown" : { "description" : "Allows access to /countdown" }
        }

    };

HELPER_VARIABLE_NAME = "helper"
PLUGIN_VARIABLE_NAME = "plugin"
SERVER_VARIABLE_NAME = "server"

SCHEDULER=None
SCHEDULER_ID=None
DEBUG=False

def disableScheduler():
    global SCHEDULER_ID;
    if SCHEDULER_ID == None:
        return
    SCHEDULER=server.getScheduler()
    SCHEDULER.cancelTask(SCHEDULER_ID)
    SCHEDULER_ID=None
    if DEBUG:
        print "[countdown] disabled scheduler",

def enableScheduler(countdown):
    global SCHEDULER_ID;
    if SCHEDULER_ID != None:
        return
    SCHEDULER=server.getScheduler()
    SCHEDULER_ID=SCHEDULER.scheduleSyncRepeatingTask(server.getPluginManager().getPlugin('jxpl'), MySchedule(countdown), 25, 25)
    if DEBUG:
        print "[countdown] enabled scheduler",

class MySchedule(Runnable):
    def __init__(self, countdown):
        Runnable.__init__(self)
        self._countdown=countdown

    def run(self):
        global DEBUG
        if self._countdown == None:
            disableScheduler()
            return

        self._countdown-=1

        if DEBUG:
            print "[countdown] %d" % self._countdown,

        if self._countdown == 60:
            server.broadcastMessage("Noch eine Minute...")
        elif self._countdown <= 0:
            server.broadcastMessage("Ende des Countdowns wurde erreicht!")
            disableScheduler()
        elif self._countdown % 60 == 0:
            server.broadcastMessage("Noch %d Minuten..."  % (self._countdown / 60))
        elif self._countdown == 45:
            server.broadcastMessage("Noch 45 Sekunden...")
        elif self._countdown == 30:
            server.broadcastMessage("Noch 30 Sekunden...")
        elif self._countdown == 10:
            server.broadcastMessage("Noch 10 Sekunden...")
        elif self._countdown == 1:
            server.broadcastMessage("Noch eine Sekunde...")
        elif self._countdown <= 5 and self._countdown > 0:
            server.broadcastMessage("Noch %d Sekunden..." % self._countdown)

def onEnable():
    pass

def onDisable():
    pass

def onCommand(p, command, cl, args):
    countdown=None
    try:
        countdown=int(args[0])
    except:
        if len(args) == 1 and args[0].lower()=="stop":
            p.sendMessage("Countdown stopped")
            disableScheduler()
            return True
        if len(args) == 1 and args[0].lower()=="debug":
            global DEBUG
            DEBUG=not DEBUG
            p.sendMessage("Countdown debug toggled (%s)" % DEBUG)
            return True
        print "Error", args
        return False
    p.sendMessage("Countdown started")
    enableScheduler(countdown)
    return True
