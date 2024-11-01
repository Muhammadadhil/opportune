

export default async function convertToFormData(data) {
    const formData = new FormData();

    for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
            if (key === "images") {
                data[key].forEach((file:File, index:number) => {
                    formData.append(`images`, file);
                });
            } else {
                formData.append(key, data[key]);
            }
        }
    }

    return formData;
}
 