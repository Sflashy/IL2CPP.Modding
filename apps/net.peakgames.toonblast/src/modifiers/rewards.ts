import { logHook, logInfo } from "@il2cpp/core/helpers/logger";
import { getClass, getMethod } from "@il2cpp/core/helpers/resolver";

/**
 * Overrides the rewards given by the game, setting the amount of the first reward to the given value.
 * @param image - The Il2Cpp.Image representing the game's assembly.
 * @param rewardCount - The new amount of the first reward.
 */

export function overrideRewards(image: Il2Cpp.Image, rewardCount: number) {
    const reward = getClass(image, "Assets.Scripts.DataHelpers.Reward");
    const encryptedMethod = getMethod(reward, ".ctor");
    encryptedMethod.implementation = function (type: any, _amount: any, unit: any) {
        //logInfo(`Reward Overridden: ${type} ${_amount} -> ${rewardCount}`);
        this.method(".ctor").invoke(type, rewardCount, unit);
    };
}