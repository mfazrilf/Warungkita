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
