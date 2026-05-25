import { readFileSync } from 'fs';
import { join } from 'path';
import { NODE_ENV } from '../config/env.js';

type PackageJson = {
    version: string;
};

function readPackageVersion(): string {
    try {
        const raw = readFileSync(join(process.cwd(), 'package.json'), 'utf-8');
        const pkg = JSON.parse(raw) as PackageJson;
        return pkg.version ?? 'unknown';
    } catch {
        return 'unknown';
    }
}

export function getAppInfo() {
    return {
        name: 'Tell-Me-Something API Server',
        status: 'ok',
        environment: NODE_ENV ?? 'development',
        version: readPackageVersion(),
    };
}
