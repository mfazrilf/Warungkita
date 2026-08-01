import { NextResponse } from 'next/server';
import { createSupabase } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

type Params = { params: { id: string } };

export async function PUT(request: Request, { params }: Params) {
  const supabase = createSupabase();
  const productId = params.id;
  const { adjustment } = await request.json();

  if (adjustment == null || !Number.isInteger(adjustment)) {
    return NextResponse.json({ error: 'Penyesuaian stok harus berupa bilangan bulat' }, { status: 400 });
  }

  const { data: product, error: fetchError } = await supabase
    .from('products')
    .select('stock')
    .eq('id', productId)
    .single();

  if (fetchError || !product) {
    return NextResponse.json({ error: 'Produk tidak ditemukan' }, { status: 404 });
  }

  const newStock = product.stock + adjustment;
  if (newStock < 0) {
    return NextResponse.json({ error: 'Stok tidak boleh negatif' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('products')
    .update({ stock: newStock })
    .eq('id', productId)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: 'Gagal memperbarui stok' }, { status: 500 });
  }
  return NextResponse.json(data);
}
