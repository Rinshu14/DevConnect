

export const setThemeInLocalStorage = (key: string, value: string) => {
    try {
        localStorage.setItem(key, value);
    }
    catch (err: any) {
        throw new Error(err.message)
    }
};

export const getThemeFromLocalStorage = (key: string) => {
    try {
        return localStorage.getItem(key);
    }
    catch (err: any) {
        throw new Error(err.message)
    }
};

