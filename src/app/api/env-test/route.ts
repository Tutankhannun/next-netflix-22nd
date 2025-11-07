// src/app/api/env-test/route.ts

// 발급받은 api 코드가 정상적으로 작동하는지 확인용
import { NextResponse } from 'next/server';

export function GET() {
  const hasV3 = Boolean(process.env.TMDB_API_KEY);
  const hasV4 = Boolean(process.env.TMDB_ACCESS_TOKEN);
  return NextResponse.json({
    TMDB_API_KEY_present: hasV3,
    TMDB_ACCESS_TOKEN_present: hasV4,
  });
}
