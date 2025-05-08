import "frida-il2cpp-bridge";
import { logHook, logInfo } from "@helpers/logger";
import { getClass, getMethod } from "@helpers/resolver";
import { overrideGoalCount } from "modifiers/goal";
import { overrideRewards } from "modifiers/rewards";
import { overrideDifficulty } from "modifiers/difficulty";
import { overrideMoveCount } from "modifiers/move";

export enum Difficulty {
    NOT_INITIALIZED = 0,
    VERY_EASY = 1,
    EASY = 2,
    MEDIUM = 3,
    HARD = 4,
    SUPER_HARD = 5,
}

/**
 * Registers all level hooks at once.
 *
 * @param assembly - The Il2Cpp.Image representing the game's assembly.
 */

export function registerLevelHooks(assembly: Il2Cpp.Image) {
    overrideDifficulty(assembly, Difficulty.SUPER_HARD);
    overrideGoalCount(assembly, 0);
    overrideMoveCount(assembly, 50);
    overrideRewards(assembly, 1337);
    instantlyCompleteLevel(assembly);
    logHook("Level hooks registered");
}


function instantlyCompleteLevel(assembly: Il2Cpp.Image) {
    const encryptedClass = getClass(assembly, "GONMKHLOBJO");
    const encryptedMethod = getMethod(encryptedClass, "Save");
    encryptedMethod.implementation = function (data : any) {
        this.method("Save").invoke(data);
        const caravanTopLevel = this.field("EEOHMEMMHIA").value as unknown as Il2Cpp.Class;
        caravanTopLevel.method("StopLast5Moves").invoke();

        //triggers win screen
        this.method("BEOMCOEAOOC").invoke();
        this.method("OBIDBHGHODG").invoke();
        this.method("DKNIJNHDKDM").invoke();

        //show directly win screen (this breaks the game, the hooks above are working fine though)
        //this.method("FPKINMDGIEK").invoke();
        //this.method("EOMMIFOFDNN").invoke();
    }
}
