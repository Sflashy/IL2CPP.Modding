import { logHook } from "@helpers/logger";
import { getClass, getMethod } from "@helpers/resolver";


/**
 * Overrides the move count in the game with a specified value.
 * 
 * @param image - The Il2Cpp.Image representing the game's assembly.
 * @param moveCount - The new move count to be set.
 * 
 * This function locates the encrypted class and method responsible for managing
 * the move count and replaces its implementation to set the move count to the 
 * specified value. It logs the change in move count before invoking the 
 * necessary methods with the new move count.
 */

export function overrideMoveCount(image: Il2Cpp.Image, moveCount: number) {
    const encryptedClass = getClass(image, "GONMKHLOBJO");
    const encryptedMethod = getMethod(encryptedClass, "PPHDIHDFBHF");
    encryptedMethod.implementation = function (_moveCount: any) {
        logHook(`Move Count Overridden: ${_moveCount} → ${moveCount}`);
        return this.method("PPHDIHDFBHF").invoke(moveCount);
    };
}