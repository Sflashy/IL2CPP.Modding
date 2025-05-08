import "frida-il2cpp-bridge"
import { logHook, logInfo, logTrace} from "@helpers/logger";
import { getClass, getMethod } from "@helpers/resolver";

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

export function traceAssembly(assemblyName: string, verbose : boolean = false) {
    logInfo(`${assemblyName} is being traced`);
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

export function traceClass(assembly: Il2Cpp.Image, _classes: string[], verbose : boolean = false): void {
  logTrace(`Tracing ${_classes.join(", ")}`);
  const classes : Il2Cpp.Class[] = _classes.map(className => assembly.class(className));
  Il2Cpp.trace(verbose).verbose(verbose).classes(...classes).and().attach();

}

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
