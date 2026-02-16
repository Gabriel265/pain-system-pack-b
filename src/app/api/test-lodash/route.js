// src/app/api/test-lodash/route.js
import { NextResponse } from 'next/server';
import _ from 'lodash';

export async function GET() {
  const numbers = [1, 2, 3, 4, 5];
  const doubled = _.map(numbers, (n) => n * 2);

  return NextResponse.json({ doubled });
}
