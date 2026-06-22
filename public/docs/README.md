# SiteFramework · order-mgmt 모듈

> **AI Docs Agent 자동 생성** · Sprint S10 · 마지막 갱신 2026-06-22  
> LangGraph 문서 Agent가 코드·OpenAPI 변경을 감지하여 위키 형태로 동기화한 README입니다.

---

## 목차

- [개요](#개요)
- [아키텍처](#아키텍처)
- [API 계약](#api-계약)
- [데이터 모델](#데이터-모델)
- [운영·배포](#운영배포)
- [변경 이력](#변경-이력)

---

## 개요

| 항목 | 내용 |
|------|------|
| **모듈 ID** | `order-mgmt` |
| **도메인** | 수주·발주 관리 |
| **담당 스프린트** | S10 (DTO/MapStruct), S12 (Gateway) |
| **메인 담당** | 기충영 |
| **의존 모듈** | `common-auth`, `common-code`, `inventory-api` (REST only) |

수주 등록·승인·발주 연계까지의 핵심 비즈니스 흐름을 SiteFramework 모듈 경계 내에서 처리합니다.  
**모듈 간 직접 import·DB 접근은 금지**되며, OpenAPI 3.1 계약 기반 REST 통신만 허용됩니다.

---

## 아키텍처

```
┌─────────────┐     OpenAPI      ┌──────────────────┐
│  Next.js UI │ ◄──────────────► │  API Gateway S12 │
└─────────────┘                  └────────┬─────────┘
                                          │ JWT
                                 ┌────────▼─────────┐
                                 │  order-mgmt      │
                                 │  (Spring Boot)   │
                                 └────────┬─────────┘
                                          │ MapStruct DTO
                                 ┌────────▼─────────┐
                                 │  PostgreSQL      │
                                 │  schema: order   │
                                 └──────────────────┘
```

- **Controller** → **Service** → **Repository** 계층 분리, Entity 외부 노출 금지
- **MapStruct**로 Entity ↔ DTO 변환 자동 생성
- **Multi-tenancy(S11)**: `company_id` 기준 스키마 격리

---

## API 계약

| Method | Path | 설명 |
|--------|------|------|
| `GET` | `/api/v1/orders` | 수주 목록 (RealGrid 페이징) |
| `GET` | `/api/v1/orders/{id}` | 수주 상세 |
| `POST` | `/api/v1/orders` | 수주 등록 |
| `PUT` | `/api/v1/orders/{id}/approve` | 수주 승인 |
| `POST` | `/api/v1/orders/{id}/purchase-request` | 발주 요청 연계 |

> OpenAPI 스펙: `openapi/order-mgmt-v1.yaml` · Gateway 라우팅 `/orders/**`

---

## 데이터 모델

### Order (요약)

| 컬럼 | 타입 | 설명 |
|------|------|------|
| `order_id` | UUID | PK |
| `company_id` | VARCHAR | 테넌트 격리 |
| `order_no` | VARCHAR | 수주번호 (네이밍룰 S01) |
| `status` | ENUM | DRAFT · APPROVED · CLOSED |
| `created_at` | TIMESTAMP | 감사 로그 연동 |

---

## 운영·배포

- **CI/CD**: GitLab CI → SonarQube Quality Gate → Docker 이미지
- **Config**: Spring Cloud Config (S03) 중앙 설정
- **CDC(S17)**: 레거시 Oracle ↔ PostgreSQL Debezium 동기화 (PoC 검증 완료)

---

## 변경 이력

| 날짜 | Sprint | 변경 내용 | Agent |
|------|--------|-----------|-------|
| 2026-06-22 | S10 | README 위키 초안 자동 생성 | Docs Agent |
| 2026-06-15 | S10 | MapStruct DTO 패턴 적용 | Claude Code |
| 2026-05-28 | S04 | SiteFramework 모듈 scaffold | Claude Code |

---

*이 문서는 FaSS TFT AI 문서 Agent가 코드·API 변경 시 자동 갱신합니다.*
