export class User {
  constructor(
    public id: string,
    public email: string,
    public password: string,
    public role: string = 'lector',
    public roles: string[] = [],
    public activeModules: string[] = [],
  ) {
    this.role = role ?? 'lector';
    this.roles = roles && roles.length > 0 ? roles : [this.role];
    this.activeModules = activeModules ?? [];
  }
}
