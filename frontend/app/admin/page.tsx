import Link from 'next/link';
import { ArrowUpRight, ClipboardList, FileText, Package, TrendingUp } from 'lucide-react';
import { createSupabase } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const supabase = createSupabase();
  const { data: products } = await supabase.from('products').select('*').order('id');
  const { data: transactions } = await supabase.from('transactions').select('*').order('created_at', { ascending: false });

  const productList = products ?? [];
  const transactionList = transactions ?? [];

  const lowStock = productList.filter((p) => p.stock <= p.min_stock_alert).length;
  const totalSalesToday = transactionList
    .filter((t) => t.created_at?.startsWith(new Date().toISOString().slice(0, 10)))
    .reduce((sum, t) => sum + (t.total_amount ?? 0), 0);

  const stats = [
    { label: 'Total Penjualan Hari Ini', value: new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(totalSalesToday), icon: TrendingUp },
    { label: 'Produk Aktif', value: String(productList.length), icon: Package },
    { label: 'Peringatan Stok Menipis', value: `${lowStock} Barang`, icon: ClipboardList },
    { label: 'Pesanan Masuk', value: String(transactionList.length), icon: FileText }
  ];

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
                  {productList.map((product) => (
                    <tr key={product.id} className="bg-white">
                      <td className="px-4 py-4 text-slate-700">P{String(product.id).padStart(3, '0')}</td>
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
              {transactionList.map((order) => (
                <div key={order.id} className="rounded-3xl border border-slate-200 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium text-slate-800">{order.customer_name}</p>
                      <p className="text-xs text-slate-500">TRX-{String(order.id).padStart(3, '0')}</p>
                    </div>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700">{order.status}</span>
                  </div>
                  <p className="mt-3 text-sm text-slate-600">
                    Total: {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(order.total_amount)}
                  </p>
                </div>
              ))}
              {transactionList.length === 0 && (
                <p className="rounded-3xl border border-dashed border-slate-200 p-4 text-sm text-slate-400">Belum ada transaksi.</p>
              )}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
