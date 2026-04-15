import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { amount, currency = 'INR', productId, productName } = await req.json();

    if (!amount || !productId) {
      return NextResponse.json({ success: false, error: 'Amount and productId are required' }, { status: 400 });
    }

    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      return NextResponse.json({ success: false, error: 'Payment gateway not configured' }, { status: 503 });
    }

    const orderData = {
      amount: amount * 100,
      currency,
      receipt: `receipt_${productId}_${Date.now()}`,
      notes: { productId, productName },
    };

    const response = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString('base64')}`,
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      throw new Error('Failed to create Razorpay order');
    }

    const order = await response.json();
    return NextResponse.json({ success: true, data: order });
  } catch (error) {
    console.error('POST /api/payment/create-order error:', error);
    return NextResponse.json({ success: false, error: 'Failed to create order' }, { status: 500 });
  }
}
