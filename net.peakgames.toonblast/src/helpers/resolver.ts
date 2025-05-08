import { logError } from "./logger";

/**
 * Finds a class by name in the given image and returns its corresponding Il2Cpp.Class
 * object. If the class is not found, it logs an error and re-throws the exception.
 *
 * @param {Il2Cpp.Image} image - The IL2CPP image in which to search for the class.
 * @param {string} className - The name of the class to search for.
 * @returns {Il2Cpp.Class} The Il2Cpp.Class object corresponding to the class with the given name.
 * @throws {Error} If the class with the given name could not be found.
 */
export function getClass(image: Il2Cpp.Image, className: string): Il2Cpp.Class {
    try {
        return image.class(className);
    } catch (e) {
        logError(`Class not found: ${className}`);
        throw e;
    }
}

/**
 * Finds a method by name in the given class and returns its corresponding Il2Cpp.Method
 * object. If the method is not found, it logs an error and re-throws the exception.
 *
 * @param {Il2Cpp.Class} clazz - The class in which to search for the method.
 * @param {string} methodName - The name of the method to search for.
 * @returns {Il2Cpp.Method} The Il2Cpp.Method object corresponding to the method with the given name.
 * @throws {Error} If the method with the given name could not be found.
 */
export function getMethod(clazz: Il2Cpp.Class, methodName: string): Il2Cpp.Method {
    try {
        return clazz.method(methodName);
    } catch (e) {
        logError(`couldn't find method ${methodName} in class ${clazz.name}`);
        throw e;
    }
}
