export declare class User {
    id: string | undefined;
    email: string;
    password: string;
    role: 'admin' | 'analista' | 'lector';
    roles: string[];
    activeModules: string[];
    name: string;
    constructor(id: string | undefined, email: string, password: string, role: 'admin' | 'analista' | 'lector', roles: string[], activeModules: string[], name: string);
}
