import { getClass, getMethod } from "@il2cpp/core/helpers/resolver";

export function overrideCrateAnimation(assembly: Il2Cpp.Image)
{
    const crateController = getClass(assembly, "Galapagos.Duels.CrateController");
    const openCrate = getMethod(crateController, "OpenCrate")
    openCrate.implementation = function (crate: any, force : any) 
    {
        const shopCrateBuff = crate.field("crateBuff").value;
        shopCrateBuff.field("bonusItems").value = 10;
        shopCrateBuff.field("isActive").value = true;
        crate.field("isFree").value = true;
        crate.field("done").value = true;
        crate.field("opened").value = true;
        this.method("ClearState").invoke();
        return true;
    }
}