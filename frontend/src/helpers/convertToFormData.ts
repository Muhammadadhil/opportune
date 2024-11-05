export default async function convertToFormData<T extends Record<string,unknown>>(data:T):Promise<FormData> {
    const formData = new FormData();

    for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {

            const value = data[key];
            if (Array.isArray(value)) {
                value.forEach((item) => {
                    if (typeof item === "string" || item instanceof Blob) {
                        formData.append(key, item);
                    }
                });
            } else if (typeof value === "string" || value instanceof Blob) {
                formData.append(key, value);
            }
        }
    }
    return formData;
}
