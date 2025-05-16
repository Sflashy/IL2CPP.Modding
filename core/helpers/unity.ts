import { logError, logWarn } from "./logger";
import { getClass } from "./resolver";

export function findObjectOfType(assembly: Il2Cpp.Image, type : string): Il2Cpp.Object | null {
    const unityObject = getUnityObject();
    const object = assembly.class(type);
    const method = unityObject.tryMethod("FindObjectOfType", 1);
    if (method == null) {
        logError("Could not find FindObjectOfType method");
        return null;
    }

    const inflated = method.inflate(object);
    const instance : any = inflated.invoke();

    if (instance.isNull()) {
        logWarn(`No object of type ${object.name} found.`);
        return null;
    }

    return instance;
}

export function findObjectsOfType(assembly: Il2Cpp.Image, type : string): Il2Cpp.Array | null
{
    const unityObject = getUnityObject();
    const object = assembly.class(type);
    const method = unityObject.tryMethod("FindObjectsOfType", 1);
    if (method == null) {
        logError("Could not find FindObjectsOfType method");
        return null;
    }

    const typeObj = object.type.object;
    const resultArray : any = method.invoke(typeObj);
    const result = new Il2Cpp.Array(resultArray);

        if (result.isNull()) {
        logWarn(`No object of type ${object.name} found.`);
        return null;
    }
    const array = new Il2Cpp.Array(result);
    return array;
}

function getUnityObject() : Il2Cpp.Class
{
    const unityAssembly = Il2Cpp.domain.assembly("UnityEngine.CoreModule").image;
    const unityObject = getClass(unityAssembly, "UnityEngine.Object");
    return unityObject;
}