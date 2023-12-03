import type { user } from "./interfaces"

export function setUser(user: user): void {
    window.sessionStorage.setItem('user', JSON.stringify(user));
}

export function getUser(): user | undefined {
    const user = window.sessionStorage.getItem('user');
    if(user !== null) {
        let parsed = JSON.parse(user);
        return parsed;
    }
    return;
}

export function isLoggedIn(): boolean {
    const user = getUser();
    if (user != undefined) {
        return !!user.token;
    }
    return false;
}

export function getToken(): string | undefined {
    const user = getUser();
    return user?.token;
}

export function getRole(): string | undefined{
    const token = getToken();
    if(token)
    {
        const payload = atob(token.split('.')[1])
        const parsed = JSON.parse(payload);
        return parsed.role;
    }
    return undefined;
}
    