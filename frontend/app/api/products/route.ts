import { NextResponse } from 'next/server';
import { createSupabase } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const supabase = createSupabase();
  const { data, error } = await supabase.from('products').select('*').order('id');

  if (error) {
    return NextResponse.json({ error: 'Gagal memuat produk' }, { status: 500 });
  }
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const supabase = createSupabase();
  const body = await request.json();
  const { name, category, price, stock, unit, min_stock_alert } = body;

  if (!name || !category || price == null || stock == null || !unit || min_stock_alert == null) {
    return NextResponse.json({ error: 'Semua field produk wajib diisi' }, { status: 400 });
  }
  if (typeof price !== 'number' || price < 0) {
    return NextResponse.json({ error: 'Harga harus berupa angka positif' }, { status: 400 });
  }
  if (!Number.isInteger(stock) || stock < 0) {
    return NextResponse.json({ error: 'Stok harus berupa bilangan bulat non-negatif' }, { status: 400 });
  }
  if (!Number.isInteger(min_stock_alert) || min_stock_alert < 0) {
    return NextResponse.json({ error: 'Min stock alert harus berupa bilangan bulat non-negatif' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('products')
    .insert({ name, category, price, stock, unit, min_stock_alert })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: 'Gagal menambahkan produk' }, { status: 500 });
  }
  return NextResponse.json(data, { status: 201 });
}
