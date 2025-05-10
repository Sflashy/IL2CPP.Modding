import { logHook, logInfo } from "@il2cpp/core/helpers/logger";
import { getClass, getMethod } from "@il2cpp/core/helpers/resolver";
import { Difficulty } from "@hooks/level";

/**
 * Overrides the difficulty setting of a game.
 * 
 * @param assembly - The Il2Cpp.Image representing the game's assembly.
 * @param difficulty - The new difficulty level to be set.
 * 
 * This function locates the encrypted class and method responsible for managing
 * the game's difficulty and replaces its implementation to set the difficulty
 * to the specified value. It logs the change in difficulty level before invoking
 * the necessary methods with the new difficulty.
 */

export function overrideDifficulty(assembly: Il2Cpp.Image, difficulty: Difficulty) {
    const encryptedClass = getClass(assembly, "FFJHPMKBHLF");
    const encryptedMethod = getMethod(encryptedClass, "HJDNHPOJBCG");
    encryptedMethod.implementation = function (diff: any) : any {
        //logHook(`Difficulty Overridden: ${diff} → ${Difficulty[difficulty]}`);
        return encryptedMethod.invoke(difficulty);
    };
}