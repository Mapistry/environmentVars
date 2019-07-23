import path = require('path');
import * as dotenv from 'dotenv';

export interface IEnvVars {
    fileName?: string;
    filePath?: string;
    envVars?: Map<string, string>;

    getEnvVar(varName: String): string;
    getAppEnv(): string;
}

export class EnvVars implements IEnvVars {
    public fileName?: string;    
    public filePath?: string;
    public envVarMap?: Map<string, string>;

    constructor(filePath?: string, fileName?: string) {
        this.filePath = filePath || process.cwd();
        this.fileName = fileName || '.env';
        this.envVarMap = new Map();

        this.parseEnvVars();
    }
  
    /**
    * This function returns the value of the environment variable
    * @param varName 
    */
    public getEnvVar = (varName: string): string => {
        return this.envVarMap.get(varName);
    }

    /**
    * This function returns the value of the NODE_ENV variable
    */
    public getAppEnv = (): string => {
        return this.envVarMap.get('NODE_ENV');
    }

    private parseEnvVars = (): Map<string, string> => {
        let pathToEnvFile = path.join(this.filePath, this.fileName);

        let options: dotenv.DotenvOptions = {
            path: pathToEnvFile,
            encoding: 'UTF-8'
        };

        let result = dotenv.config(options);

        if (result.error) {
            throw result.error;
        } else {
            let entries = Object.entries(result.parsed);

            entries.forEach(entry => {
                this.envVarMap.set(entry[0], entry[1].toString())
            });
            return this.envVarMap;
        }
    }
}