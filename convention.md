# 프론트 협업 컨벤션 (STORIX | 김윤성, 이채연)

## 1) Git & 브랜치

- ### 브랜치:
  ```
  main        → 배포용(배포 완료된 안정 버전)
  develop     → 개발 통합 브랜치
  feature/*   → 기능 개발 브랜치
  ```
- ### 작업 플로우

1.  작업 전 최신 develop 가져오기

    ```
    git checkout develop
    git pull origin develop
    ```

2.  새 기능 브랜치 생성

    ```
    git checkout -b feature/home-k-show
    ```

3.  작업 & 커밋

    ```
    git add .
    git commit -m "feat(home): add k-show list"
    ```

4.  원격 브랜치로 push

        ```
        git push origin feature/home-k-show
        ```

5.  PR 생성

    - base: develop
    - compare: feature/home-k-show

6.  리뷰 후 Merge
    - Merge target: develop
    - Merge type: Squash and merge (여러 커밋을 하나로 병합)

배포 후 버그 발생 시 hotfix/\* → main & develop 양쪽에 병합- 커밋 단위

## 2) 커밋 (Conventional Commits)

```
feat(home): add k-show list
fix(api): handle empty results
refactor(ui): extract PosterCard
chore(config): add tailwind plugin
docs(readme): add run guide
```

- 작은 단위로 자주 커밋
- 커밋 메시지는 Conventional Commits 규칙 유지

## 3) 폴더/네이밍

- 라우트: `app/(section)/page.tsx`
- 컴포넌트: `components/<domain>/<PascalCase>.tsx`
- 훅: `hooks/useSomething.ts`
- 유틸: `lib/utilName.ts`
- 타입: `types/domain.ts`
- 경로 alias: `@/*`
- 변수 네이밍: `camelCase`

## 4) 스타일/반응형

- **Tailwind만 사용**(임의 색상 X).
- 디자인 시스템 반영

## 5) Open API 사용 규칙

- 외부 API는 **서버 프록시**(`/api/*`)만 통해 호출 (키 노출 금지).
- fetch 래퍼 단일화:

```ts
// lib/apiClient.ts
type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: { message: string; code?: string };
};
export async function apiFetch<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, init);
  const json: ApiResponse<T> = await res.json();
  if (!json.success) throw new Error(json.error?.message ?? "API Error");
  return json.data as T;
}
```

- 호출 예:

```ts
export const getTrending = () => apiFetch(`/api/tmdb?path=/trending/all/day`);
```

## 6) 서버/클라이언트 경계

- 기본 **서버 컴포넌트**. 상호작용 필요한 것만 `'use client'`.
- 데이터는 서버에서 패칭 → 프리젠테이션 컴포넌트에 props로 전달.

## 7) 이미지

- `next/image` 필수, 원격 도메인 허용 설정.
- `alt`: “제목 + 용도” (예: `alt="Dune poster"`)

## 8) 접근성

- 클릭 요소는 `button`/`a` 사용, `div onClick` 금지.
- 아이콘 버튼 `aria-label` 필수. 포커스 링 유지.

## 9) 코드 품질

- TS `strict: true`
- ESLint + Prettier + Tailwind plugin
