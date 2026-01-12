
import * as XLSX from 'xlsx';

export const exportToExcel = (data: Record<string, unknown>[], filename: string) => {
    if (!data || data.length === 0) {
        console.warn("No data to export");
        return;
    }

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");

    // Auto-width columns
    const maxWidth = 50;
    const colWidths = Object.keys(data[0]).map(key => {
        return { wch: Math.min(maxWidth, key.length + 5) }; // Simple estimation
    });
    worksheet['!cols'] = colWidths;

    XLSX.writeFile(workbook, `${filename}.xlsx`);
};
