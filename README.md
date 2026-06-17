# 차세대 FaSS 플랫폼 구축 6월 중간 보고

(주)제때 차세대 FaSS 플랫폼 구축 6월 중간 보고 자료를 Next.js 기반 슬라이드 뷰어로 제공합니다.

## 로컬 개발

```bash
npm install
npm run dev
```

브라우저에서 [http://localhost:3000/report_fassmid/slides/1/](http://localhost:3000/report_fassmid/slides/1/) 로 접속합니다.

## 빌드

```bash
npm run build
```

정적 파일은 `out/` 디렉터리에 생성됩니다.

## GitHub Pages 배포

1. 이 저장소를 GitHub에 push합니다.
2. 저장소 **Settings → Pages** 에서 Source를 **GitHub Actions** 로 설정합니다.
3. `main` 브랜치에 push하면 `.github/workflows/deploy.yml` 이 자동으로 빌드·배포합니다.

배포 URL: `https://kk00701903-hub.github.io/report_fassmid/`

## 슬라이드 조작

- **이전/다음**: 화면 하단 버튼, `←` `→` `PageUp` `PageDown`, 또는 `Space`
- **처음/끝**: `Home` / `End` 키
- **발표 모드 (P)**: 전체화면 + 슬라이드 화면 채우기, 좌우 클릭 영역으로 이동, UI 자동 숨김
- **전체화면 (F)**: 브라우저 전체화면
- **목차**: 상단 목차 버튼에서 31개 슬라이드로 즉시 이동
- **스와이프**: 모바일/터치에서 좌우 스와이프로 이동
- **슬라이드 옵션 (O)**: HTML 파일 업로드, 제목 편집, 순서 변경 (localStorage 저장)
- **개발 상세**: 기본 슬라이드의 코드·프로세스 아이콘 버튼 (상단)

## 프로젝트 구조

- `public/slides/` — 원본 HTML 슬라이드 (1.html ~ 31.html)
- `app/slides/[id]/` — 슬라이드 뷰어 페이지
- `components/` — PresentationPlayer, SlideStage
- `lib/slideDetails.ts` — 슬라이드별 개발자 상세 자료 (코드·프로세스)
- `app/slides/[id]/details/[detailId]/` — 상세 자료 독립 페이지
