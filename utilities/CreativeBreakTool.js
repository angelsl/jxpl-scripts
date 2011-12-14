importPackage(org.bukkit.event);
importPackage(org.bukkit);
importPackage(java.util.logging);
importPackage(java.lang);

VALID_ITEMS = [256, 257, 258, // iron spade/pick/axe
               269, 270, 271, // wood spade/pick/axe
               273, 274, 275, // stone spade/pick/axe
               277, 278, 279, // diamond s/p/a
               284, 285, 286, // gold s/p/a
               280] // stick

SCRIPT_PDF = {
    "name" : "CreativeBreakTool",
    "version" : "1",
    };


function onLoad() {
    helper.registerEvent(Event.Type.BLOCK_BREAK, Event.Priority.High, "onBlockBreak");
    helper.registerEvent(Event.Type.PLAYER_INTERACT, Event.Priority.High, "onPlayerInteract");
}

function onEnable() {}
function onDisable() {}

function onBlockBreak(type, eventArgs)
{
    if(eventArgs.getPlayer().getGameMode().getValue() == 1 && VALID_ITEMS.indexOf(eventArgs.getPlayer().getItemInHand().getTypeId()) == -1) {
        eventArgs.setCancelled(true);
        eventArgs.getBlock().getState().update();
        eventArgs.getPlayer().sendMessage("\u00A74Please equip a stick, pick/axe or shovel to break blocks.");
    }
}

function onPlayerInteract(type, eventArgs)
{
    if(eventArgs.getAction() == Packages.org.bukkit.event.block.Action.LEFT_CLICK_BLOCK && eventArgs.getPlayer().getGameMode().getValue() == 1 && VALID_ITEMS.indexOf(eventArgs.getPlayer().getItemInHand().getTypeId()) == -1) {
        try {
            var block = eventArgs.getClickedBlock();
            net.minecraft.server.Block.byId[block.getTypeId()].b(block.getWorld().getHandle(), block.getX(), block.getY(), block.getZ(), eventArgs.getPlayer().getHandle());
            block.getWorld().getHandle().douseFire(null, block.getX(), block.getY(), block.getZ(), Packages.org.bukkit.craftbukkit.block.CraftBlock.blockFaceToNotch(eventArgs.getBlockFace()));
        } catch(e) { helper.log(Level.INFO, "Error while manually calling block interact. Are you on CraftBukkit? " + e.rhinoException); }
    }
}
