const canSetOrDelete = (search: URLSearchParams) => ({
    setOrDelete: (key: string, value: string | null) => {
        if (value) {
            search.set(key, value);
        } else {
            search.delete(key);
        }
    }
});

export default (...params: any[]) => {
    const search = new URLSearchParams(...params)
    return Object.assign(search, canSetOrDelete(search));
}