import { logHook } from "@helpers/logger";
import { getClass, getMethod } from "@helpers/resolver";

/**
 * Overrides the goal count setting of a game.
 *
 * @param assembly - The Il2Cpp.Image representing the game's assembly.
 * @param goalCount - The new goal count to be set.
 *
 * This function locates the encrypted class and method responsible for managing
 * the game's goals and replaces its implementation to set the goal count
 * to the specified value. It logs the change in goal count before invoking
 * the necessary methods with the new goal count.
 */
export function overrideGoalCount(assembly: Il2Cpp.Image, goalCount: number) {
    const encryptedClass = getClass(assembly, "EHDJGBMDHHI");
    const constructor = getMethod(encryptedClass, ".ctor");
    constructor.implementation = function (goalName: any, _goalCount: any) {
        logHook(`Goal Count Overridden: ${_goalCount} → ${goalCount}`);
        return this.method(".ctor").invoke(goalName, goalCount);
    };
}
