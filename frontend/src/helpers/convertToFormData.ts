export default async function convertToFormData(data) {
    const formData = new FormData();

    for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
            if (Array.isArray(data[key])) {
                data[key].forEach((item) => {
                    formData.append(key, item);
                });
            } else {
                formData.append(key, data[key]);
            }
        }
    }

    return formData;
}
