import "frida-il2cpp-bridge";
import { logHook, logInfo, logTrace } from "./logger";
import { getClass, getMethod } from "./resolver";

const RESET = "\x1b[0m";
const BRIGHT = "\x1b[1m";

const RED = "\x1b[31m";
const GREEN = "\x1b[32m";
const YELLOW = "\x1b[33m";
const BLUE = "\x1b[34m";
const MAGENTA = "\x1b[35m";
const CYAN = "\x1b[36m";
const WHITE = "\x1b[37m";

const BG_BLACK = "\x1b[40m";
const BG_RED = "\x1b[41m";
const BG_GREEN = "\x1b[42m";

export async function traceAssembly(assemblyName: string, verbose : boolean = false) {
    logTrace(`${assemblyName} is being traced`);
    const assembly = Il2Cpp.domain.assembly(assemblyName);
    Il2Cpp.trace(verbose).assemblies(assembly).and().attach();
}

export function traceMethod(assembly: Il2Cpp.Image, className: string, methodName: string, verbose : boolean = false) {
    logInfo(`Tracing ${className}.${methodName}`);
    Il2Cpp.trace(verbose)
        .verbose(verbose)
        .classes(assembly.class(className))
        .filterMethods((m) => m.name === methodName)
        .and()
        .attach();
}

/**
 * Traces the given classes and logs all calls to their methods.
 * 
 * @param assembly - The Il2Cpp.Image representing the game's assembly.
 * @param _classes - A list of class names to trace.
 * @param verbose - Whether the trace should log verbose information.
 * @param excludeMethods - A list of method names whose calls should not be logged.
 */
export function traceClass(assembly: Il2Cpp.Image, _classes: string[], verbose : boolean = false, excludeMethods: string[] = []): void {
  logTrace(`Tracing ${_classes.join(", ")}`);
  const classes : Il2Cpp.Class[] = _classes.map(className => assembly.class(className));
  Il2Cpp.trace(verbose).verbose(verbose).classes(...classes).filterMethods((m) => !excludeMethods.includes(m.name)).and().attach();

}

/**
 * Hooks into a specified method of a class within an Il2Cpp assembly,
 * allowing for custom actions before the method is invoked.
 *
 * @param assembly - The Il2Cpp.Image representing the game's assembly.
 * @param className - The name of the class containing the method to be hooked.
 * @param methodName - The name of the method to hook.
 * @param onCall - An optional callback function that executes with the method's
 * arguments when the hooked method is called.
 *
 * This function logs the invocation of the method, including the number of
 * arguments and their values, and allows for custom behavior via the onCall
 * callback before invoking the original method. The return value of the method
 * is also logged.
 */

export function hookMethod(
    assembly: Il2Cpp.Image,
    className: string,
    methodName: string,
    onCall?: (args: any[]) => void
  ) {
    const klass = getClass(assembly, className);
    const method = getMethod(klass, methodName);
  
    logHook(`Hooking ${className}.${methodName}`);
  
    method.implementation = function (...args: any[]) {
      logTrace(`${GREEN}→ ${BRIGHT}${className}.${methodName}${RESET} called with ${CYAN}${args.length}${RESET} arg(s)`);
  
      if (onCall) {
          onCall(args);
      }
  
      args.forEach((arg, index) => {
          try {
              const value = arg?.toString?.() ?? "<null>";
              logTrace(`  ${YELLOW}[arg ${index}]${RESET}: ${WHITE}${value}${RESET}`);
          } catch (e) {
              logTrace(`  ${YELLOW}[arg ${index}]${RESET}: <unrepresentable>`);
          }
      });
  
      const result = this.method(methodName).invoke(...args);
  
      logTrace(`${RED}← ${BRIGHT}Returned:${RESET} ${MAGENTA}${result}${RESET}`);
      return result;
  };
  
  }
