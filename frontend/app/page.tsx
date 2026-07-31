import Link from 'next/link';
import { ShoppingCart, Search, Warehouse, Tag, DollarSign, Box } from 'lucide-react';

const categories = [
  { name: 'Beras & Biji-bijian', icon: Warehouse },
  { name: 'Minyak & Lemak', icon: Tag },
  { name: 'Gula & Bumbu Dapur', icon: Box },
  { name: 'Sembako & Harian', icon: DollarSign }
];

const products = [
  { id: 1, name: 'Beras Premium 5kg', category: 'Beras & Biji-bijian', unit: 'sak 5kg', price: 85000, stock: 12 },
  { id: 2, name: 'Minyak Goreng 2L', category: 'Minyak & Lemak', unit: 'pcs', price: 34000, stock: 5 },
  { id: 3, name: 'Gula Pasir 1kg', category: 'Gula & Bumbu Dapur', unit: 'kg', price: 16000, stock: 8 },
  { id: 4, name: 'Mie Instan 1 dus', category: 'Sembako & Harian', unit: 'paket', price: 68000, stock: 0 }
];

const formatRupiah = (value: number) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value);

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b bg-white shadow-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3 text-lg font-semibold">
            <div className="h-10 w-10 rounded-full bg-emerald-500 text-white flex items-center justify-center">W</div>
            <div>
              <p>WarungKita</p>
              <p className="text-xs text-slate-500">Sembako online dan dashboard stok</p>
            </div>
          </div>

          <div className="hidden items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 md:flex">
            <Search className="h-4 w-4 text-slate-500" />
            <input
              type="search"
              placeholder="Cari produk..."
              className="w-64 bg-transparent text-sm outline-none placeholder:text-slate-400"
            />
          </div>

          <div className="flex items-center gap-4">
            <button className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700">
              <ShoppingCart className="h-4 w-4" />
              Keranjang
            </button>
            <Link
              href="/admin"
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
            >
              Login/Admin
            </Link>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_0.9fr]">
          <div className="rounded-3xl bg-emerald-600 p-10 text-white shadow-xl">
            <span className="inline-flex rounded-full bg-white/15 px-4 py-2 text-sm">Promo hari ini</span>
            <h1 className="mt-6 text-4xl font-semibold leading-tight">Diskon Minyak Goreng & Beras Hari Ini</h1>
            <p className="mt-4 max-w-xl text-base text-slate-100/85">
              Belanja kebutuhan warung kelontong dengan harga terjangkau dan stok terjamin. Checkout cepat via WhatsApp langsung dari produk.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <span className="rounded-2xl bg-white/10 px-4 py-2 text-sm">Beras 5kg</span>
              <span className="rounded-2xl bg-white/10 px-4 py-2 text-sm">Minyak 2L</span>
              <span className="rounded-2xl bg-white/10 px-4 py-2 text-sm">Gula 1kg</span>
            </div>
          </div>
          <div className="grid gap-4 rounded-3xl bg-white p-6 shadow-sm">
            <div className="rounded-3xl bg-slate-50 p-6">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Status stok</p>
              <h2 className="mt-3 text-2xl font-semibold">Aman untuk warung Anda</h2>
              <p className="mt-3 text-sm text-slate-600">Kelola barang harian dan tetap siap layani pelanggan setia setiap hari.</p>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-emerald-600 px-5 py-6 text-white">
                <p className="text-sm">Total Produk</p>
                <p className="mt-4 text-3xl font-semibold">24</p>
              </div>
              <div className="rounded-3xl bg-slate-900 px-5 py-6 text-white">
                <p className="text-sm">Pesanan Masuk</p>
                <p className="mt-4 text-3xl font-semibold">16</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Kategori</p>
              <h2 className="text-3xl font-semibold">Pilih bahan kebutuhan harian</h2>
            </div>
            <Link href="/admin" className="text-sm font-medium text-emerald-600 hover:text-emerald-700">
              Lihat Dashboard Admin
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <div key={category.name} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                    <Icon className="h-6 w-6" />
                  </div>
                  <p className="mt-4 text-lg font-semibold">{category.name}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-14">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Katalog Produk</p>
              <h2 className="text-3xl font-semibold">Produk sembako favorit</h2>
            </div>
            <div className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-600">4 Produk</div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {products.map((product) => (
              <article key={product.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-3 h-44 rounded-3xl bg-slate-100"></div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2 text-sm text-slate-500">
                    <span>{product.category}</span>
                    <span>{product.unit}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900">{product.name}</h3>
                  <p className="text-lg font-semibold text-emerald-600">{formatRupiah(product.price)}</p>
                  <div className="flex items-center justify-between gap-3">
                    <span className={`rounded-full px-3 py-1 text-sm ${product.stock > 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                      {product.stock > 0 ? 'Tersedia' : 'Habis'}
                    </span>
                    <button
                      className="rounded-2xl bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                      disabled={product.stock === 0}
                    >
                      Tambah ke Keranjang
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
