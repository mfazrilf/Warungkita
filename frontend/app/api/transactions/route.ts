import { NextResponse } from 'next/server';
import { createSupabase } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const supabase = createSupabase();
  const { data, error } = await supabase.from('transactions').select('*').order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: 'Gagal memuat transaksi' }, { status: 500 });
  }
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const supabase = createSupabase();
  const body = await request.json();
  const { customer_name, total_amount, status } = body;

  if (!customer_name || total_amount == null || !status) {
    return NextResponse.json({ error: 'Semua field transaksi wajib diisi' }, { status: 400 });
  }
  if (typeof total_amount !== 'number' || total_amount <= 0) {
    return NextResponse.json({ error: 'Total amount harus berupa angka positif' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('transactions')
    .insert({ customer_name, total_amount, status, created_at: new Date().toISOString() })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: 'Gagal menyimpan transaksi' }, { status: 500 });
  }
  return NextResponse.json(data, { status: 201 });
}
