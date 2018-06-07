export default function setOrDelete(this: URLSearchParams, key: string, value: string | null) {
    if (value) {
        this.set(key, value);
    } else {
        this.delete(key);
    }
}
