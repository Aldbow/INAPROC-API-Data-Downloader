/* eslint-disable no-undef */
importScripts("https://cdn.sheetjs.com/xlsx-latest/package/dist/xlsx.full.min.js");

self.onmessage = function (e) {
    const { data, filename } = e.data;

    try {
        if (!data || data.length === 0) {
            throw new Error("No data to export");
        }

        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Data");

        // Auto-width columns
        const maxWidth = 50;
        const colWidths = Object.keys(data[0]).map((key) => {
            return { wch: Math.min(maxWidth, key.length + 5) }; // Simple estimation
        });
        worksheet["!cols"] = colWidths;

        // Generate binary string
        const wbout = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

        // Send back the buffer
        self.postMessage({ status: "success", buffer: wbout, filename: `${filename}.xlsx` });
    } catch (error) {
        self.postMessage({ status: "error", message: error.message });
    }
};
