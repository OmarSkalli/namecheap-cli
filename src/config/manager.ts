import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { NamecheapConfig } from '../api/types';

const CONFIG_DIR = path.join(os.homedir(), '.namecheap');
const CONFIG_FILE = path.join(CONFIG_DIR, 'config.json');

export class ConfigManager {
  static ensureConfigDir(): void {
    if (!fs.existsSync(CONFIG_DIR)) {
      fs.mkdirSync(CONFIG_DIR, { recursive: true, mode: 0o700 });
    }
  }

  static saveConfig(config: NamecheapConfig): void {
    this.ensureConfigDir();
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2), { mode: 0o600 });
  }

  static loadConfig(): NamecheapConfig {
    if (!fs.existsSync(CONFIG_FILE)) {
      throw new Error(
        'Configuration not found. Please run "namecheap init" to set up your credentials.'
      );
    }

    const configData = fs.readFileSync(CONFIG_FILE, 'utf-8');
    return JSON.parse(configData);
  }

  static configExists(): boolean {
    return fs.existsSync(CONFIG_FILE);
  }

  static getConfigPath(): string {
    return CONFIG_FILE;
  }
}
