/** @type {import('ts-jest').JestConfigWithTsJest} */
import type {Config} from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    "^.+\\.svg$": "jest-transformer-svg",
    "^.+\\.css$": "jest-transform-css"
 }
}

export default config