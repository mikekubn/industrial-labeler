import { z } from "zod/v4";

/**
 * extractEnvVariableToString is a basic function that extracts a variable from the environment.
 * @param variableName - name of the .env variable
 * @param variable
 * @returns string
 */
const extractEnvVariableToString = (variableName: string, variable: string | undefined) => {
  if (!variable) {
    throw new Error(`Environment variable ${variableName} is not set`);
  }

  const parsed = z.string().safeParse(variable);

  if (!parsed.success) {
    throw new Error(`Environment variable ${variableName} is not a string`);
  }

  return parsed.data;
};

export { extractEnvVariableToString };
