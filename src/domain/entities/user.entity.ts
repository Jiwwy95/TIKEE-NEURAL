export class User {
  constructor(
    public id: string | undefined, 
    public email: string,
    public password: string,
    public role: 'admin' | 'analista' | 'lector',
    public roles: string[],
    public activeModules: string[],
    public name: string,
  ) {
    this.role = role ?? 'lector';
    this.roles = roles && roles.length > 0 ? roles : [this.role];
    this.activeModules = activeModules ?? [];
    this.name = name ?? '';
  }
}
