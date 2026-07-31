import Link from 'next/link';
import { ArrowUpRight, Box, ClipboardList, FileText, Package, TrendingUp } from 'lucide-react';

const stats = [
  { label: 'Total Penjualan Hari Ini', value: 'Rp 2.180.000', icon: TrendingUp },
  { label: 'Produk Aktif', value: '32', icon: Package },
  { label: 'Peringatan Stok Menipis', value: '4 Barang', icon: ClipboardList },
  { label: 'Pesanan Masuk', value: '12', icon: FileText }
];

const products = [
  { id: 'P001', name: 'Beras Premium 5kg', category: 'Beras & Biji-bijian', price: 85000, stock: 12, unit: 'sak 5kg' },
  { id: 'P002', name: 'Minyak Goreng 2L', category: 'Minyak & Lemak', price: 34000, stock: 5, unit: 'pcs' },
  { id: 'P003', name: 'Gula Pasir 1kg', category: 'Gula & Bumbu Dapur', price: 16000, stock: 8, unit: 'kg' }
];

const orders = [
  { id: 'TRX-001', customer: 'Ibu Sari', total: 'Rp 140.000', status: 'Pending' },
  { id: 'TRX-002', customer: 'Pak Budi', total: 'Rp 98.000', status: 'Diproses' },
  { id: 'TRX-003', customer: 'Toko Makmur', total: 'Rp 265.000', status: 'Selesai' }
];

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b bg-white shadow-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div className="text-lg font-semibold">Dashboard Admin WarungKita</div>
          <Link href="/" className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100">
            Kembali ke Storefront
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="rounded-3xl bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                  <Icon className="h-5 w-5 text-emerald-600" />
                </div>
                <p className="mt-6 text-3xl font-semibold text-slate-900">{stat.value}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-10 grid gap-6 xl:grid-cols-[1.5fr_1fr]">
          <section className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Inventaris Produk</p>
                <h2 className="text-2xl font-semibold">Kelola stok & barang</h2>
              </div>
              <button className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700">
                <ArrowUpRight className="h-4 w-4" />
                Tambah Produk Baru
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full border-separate border-spacing-0 text-left text-sm">
                <thead className="bg-slate-50 text-slate-600">
                  <tr>
                    <th className="px-4 py-3 font-semibold">ID Produk</th>
                    <th className="px-4 py-3 font-semibold">Nama</th>
                    <th className="px-4 py-3 font-semibold">Kategori</th>
                    <th className="px-4 py-3 font-semibold">Harga</th>
                    <th className="px-4 py-3 font-semibold">Stok</th>
                    <th className="px-4 py-3 font-semibold">Satuan</th>
                    <th className="px-4 py-3 font-semibold">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {products.map((product) => (
                    <tr key={product.id} className="bg-white">
                      <td className="px-4 py-4 text-slate-700">{product.id}</td>
                      <td className="px-4 py-4 text-slate-700">{product.name}</td>
                      <td className="px-4 py-4 text-slate-700">{product.category}</td>
                      <td className="px-4 py-4 text-slate-700">Rp {product.price.toLocaleString('id-ID')}</td>
                      <td className="px-4 py-4 text-slate-700">{product.stock}</td>
                      <td className="px-4 py-4 text-slate-700">{product.unit}</td>
                      <td className="px-4 py-4 space-x-2">
                        <button className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-200">Edit</button>
                        <button className="rounded-full bg-rose-100 px-3 py-1 text-xs font-medium text-rose-700 hover:bg-rose-200">Hapus</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="mb-6">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Pesanan</p>
              <h2 className="text-2xl font-semibold">Transaksi terbaru</h2>
            </div>
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="rounded-3xl border border-slate-200 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium text-slate-800">{order.customer}</p>
                      <p className="text-xs text-slate-500">{order.id}</p>
                    </div>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700">{order.status}</span>
                  </div>
                  <p className="mt-3 text-sm text-slate-600">Total: {order.total}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
