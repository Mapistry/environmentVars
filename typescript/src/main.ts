import { EnvVars } from "./lib/environmentVars";

let vars = new EnvVars();

console.log(`Current NODE_ENV is ${process.env.NODE_ENV}`)
console.log(`Loggly key is ${process.env.LOGGLY_KEY}`)

console.log(`envVars - Current NODE_ENV is ${vars.envVarMap.get('NODE_ENV')}`);
console.log(`envVars - Loggly key is ${vars.envVarMap.get('LOGGLY_KEY')}`);