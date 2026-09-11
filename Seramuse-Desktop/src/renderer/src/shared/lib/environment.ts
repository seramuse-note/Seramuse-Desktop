class Environment {
  private static _instance: Environment | undefined

  readonly mode: string
  readonly isDev: boolean
  readonly isProd: boolean
  readonly apiUrl: string

  private constructor() {
    this.mode = import.meta.env.MODE
    this.isDev = import.meta.env.DEV
    this.isProd = import.meta.env.PROD
    this.apiUrl = this.requireString('VITE_API_URL')
  }

  static get instance(): Environment {
    if (!this._instance) {
      this._instance = new Environment()
    }
    return this._instance
  }

  private requireString(key: keyof ImportMetaEnv): string {
    const value = import.meta.env[key]
    if (typeof value !== 'string' || value === '') {
      throw new Error(`Missing required environment variable: ${key}`)
    }
    return value
  }

  isMode(mode: string): boolean {
    return this.mode === mode
  }
}

export const environment = Environment.instance
