import { logHook } from "@il2cpp/core/helpers/logger";
import { getClass, getMethod } from "@il2cpp/core/helpers/resolver";

export function overrideDamageReceive(assembly: Il2Cpp.Image, damageReceived: number) {
    logHook("Immunity hook registered");
    const healthManager = getClass(assembly, "HealthManager");
    const dealDamage = getMethod(healthManager, "DealDamage");
    dealDamage.implementation = function (_damageReceived: any)
    {
        //logHook(`Damage Received: ${_damageReceived} → ${damageReceived}`);
        _damageReceived = damageReceived;
        this.method("DealDamage").invoke(_damageReceived);
    }
}