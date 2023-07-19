import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import moment from 'moment';

export default {
  async transaksi(data) {
    const workbook = new ExcelJS.Workbook();

    // 1. Buat sheet baru untuk setiap bulan dan tulis datanya
    for (const item of data) {
      const bulan = item.bulan;
      const worksheet = workbook.addWorksheet(`Bulan ${bulan}`);

      worksheet.columns = [
        { header: 'Code Order', key: 'code_order', width: 15 },
        { header: 'Bulan', key: 'bulan', width: 10 },
        { header: 'Tahun', key: 'tahun', width: 10 },
        { header: 'Jumlah Transaksi', key: 'jumlah_transaksi', width: 15 },
        { header: 'Jumlah Detail ID', key: 'jumlah_detail_id', width: 18 },
        { header: 'Nama Client', key: 'nama_client', width: 20 },
        { header: 'Nama Pegawai', key: 'nama_pegawai', width: 20 },
        { header: 'Uang Diterima', key: 'uang_diterima', width: 15 },
        { header: 'Total Bayar', key: 'total_bayar', width: 15 },
        { header: 'Kembalian', key: 'kembalian', width: 15 },
      ];

      const rows = item.data.map(dataItem => ({
        code_order: dataItem.code_order,
        bulan: dataItem.bulan,
        tahun: dataItem.tahun,
        jumlah_transaksi: dataItem.jumlah_transaksi,
        jumlah_detail_id: dataItem.jumlah_detail_id,
        nama_client: dataItem.nama_client,
        nama_pegawai: dataItem.nama_pegawai,
        uang_diterima: dataItem.uang_diterima,
        total_bayar: dataItem.total_bayar,
        kembalian: dataItem.kembalian,
      }));

      // Add rows one by one to the worksheet
      rows.forEach(rowData => {
        worksheet.addRow(rowData);
      });
    }

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, `report-date-${moment().format("DD-MM-YYYY")}.xlsx`);
  },
};
