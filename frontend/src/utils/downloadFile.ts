export async function downloadFile(url: string, filename: string) {
    try {
        console.log("downloadFile:", url, filename);
        const fileResponse = await fetch(url);
        const blob = await fileResponse.blob();
        const downloadLink = window.URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = downloadLink;
        a.download = filename;

        document.body.appendChild(a);
        a.click();
        a.remove();

        // Clean up the temporary URL
        window.URL.revokeObjectURL(downloadLink);
    } catch (error) {
        console.error("Download failed:", error);
        throw error; 
    }
}