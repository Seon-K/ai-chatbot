# Festrips 챗봇 MVP

Festrips 챗봇 MVP는 Festrips 웹사이트 내 고객 응대 자동화를 테스트하기 위해 만든 Node.js 기반 프로토타입입니다. 현재 구현된 버전은 `AI 챗봇 버전`과 `Button FAQ 챗봇 버전` 두 가지입니다.

## 배포 링크

- 메인 페이지: https://festrips-ai-chatbot.onrender.com/
- AI 챗봇: https://festrips-ai-chatbot.onrender.com/ai/
- Button FAQ 챗봇: https://festrips-ai-chatbot.onrender.com/button/

## 전체 구현 구조

```text
사용자
-> Festrips 웹사이트 프론트엔드
-> 챗봇 UI
-> Node.js 백엔드 API
-> Festrips FAQ / knowledge base
-> OpenRouter LLM API
-> 응답 생성
-> 프론트 챗봇 화면에 표시
```

프로젝트는 `server.js`를 통해 실행됩니다. `ai/` 폴더는 AI 챗봇 화면을 담당하고, `button/` 폴더는 버튼형 FAQ 챗봇 화면을 담당합니다. AI 챗봇은 프론트엔드에서 `/api/chat`으로 메시지를 보내고, 서버가 OpenRouter API를 호출해 답변을 생성합니다.

## AI 챗봇 버전

AI 챗봇은 사용자가 직접 질문을 입력하면 OpenRouter API를 통해 답변을 생성하는 방식입니다. 단순히 자유롭게 답변하는 구조가 아니라, Festrips FAQ와 운영 기준을 기반으로 답변하도록 프롬프트를 구성했습니다.

주요 기능:

- 사용자가 자유롭게 질문을 입력할 수 있는 채팅 UI
- Node.js 백엔드를 통한 OpenRouter API 연동
- Festrips FAQ와 운영 정책을 반영한 프롬프트 구성
- 예약, 결제, 환불, 바우처, 항공권, 호텔 관련 질문 응대
- 예약별 확인이 필요한 문의는 확정 답변을 하지 않고 상담 요청으로 유도
- 이름, 이메일, 연락처, 예약 코드, 문의 유형, 상세 내용을 입력하는 상담 요청 폼 제공
- 영어, 한국어, 타갈로그어/필리핀어 UI 선택 기능
- 답변 대기 중 로딩 스피너 표시
- 메인 페이지로 돌아가는 버튼 제공

AI 챗봇 처리 흐름:

```text
사용자 질문 입력
-> /api/chat 요청
-> server.js에서 OpenRouter API 호출
-> Festrips knowledge-base와 프롬프트 기준으로 답변 생성
-> 프론트 화면에 답변 표시
-> 담당자 확인이 필요한 경우 상담 요청 폼으로 전환
```

## Button FAQ 챗봇 버전

Button FAQ 챗봇은 AI API를 사용하지 않고, 미리 정의된 FAQ와 시나리오 버튼을 기반으로 작동합니다. 고객이 자주 묻는 질문을 빠르고 일관되게 안내하는 데 적합합니다.

주요 기능:

- 고정된 FAQ 버튼 기반 응대 흐름
- 투어 패키지, 항공권, 호텔, 기존 예약, 취소/환불 등 카테고리 제공
- 사전에 정리한 Festrips FAQ 기반 답변 제공
- 환불, 취소, 결제 확인, 바우처, 탑승객 정보 오류 등은 상담 요청 폼으로 연결
- 상담 요청 폼 제출 후 수정 또는 채팅 종료 선택 가능
- 영어, 한국어, 타갈로그어/필리핀어 UI 선택 기능
- 준비된 답변 표시 전 로딩 스피너 표시
- 메인 페이지로 돌아가는 버튼 제공

Button FAQ 챗봇 처리 흐름:

```text
사용자 챗봇 진입
-> 문의 카테고리 선택
-> 준비된 FAQ 질문 선택
-> 고정 FAQ 답변 제공
-> 추가 문의 또는 채팅 종료 선택
-> 담당자 확인이 필요한 경우 상담 요청 폼으로 전환
```

## 파일별 역할

```text
server.js
```

Node.js 백엔드 서버입니다. 정적 파일을 제공하고, AI 챗봇에서 사용하는 `/api/chat` 요청을 처리합니다. OpenRouter API Key는 `.env` 또는 Render 환경변수에서 읽어 사용합니다.

```text
knowledge-base.js
```

AI 챗봇이 참고하는 Festrips FAQ 및 기본 응대 지식이 들어 있는 파일입니다. AI 답변의 기준이 되는 내용이므로 FAQ나 정책 안내를 수정할 때 확인해야 합니다.

```text
index.html
```

메인 진입 페이지입니다. 사용자가 AI 챗봇 버전과 Button FAQ 챗봇 버전 중 하나를 선택할 수 있도록 구성되어 있습니다.

```text
ai/index.html
ai/script.js
ai/styles.css
```

AI 챗봇 화면을 구성하는 파일입니다. `ai/index.html`은 화면 구조, `ai/script.js`는 채팅 동작과 API 요청 처리, `ai/styles.css`는 AI 챗봇 UI 스타일을 담당합니다.

```text
button/index.html
button/script.js
button/styles.css
```

Button FAQ 챗봇 화면을 구성하는 파일입니다. `button/index.html`은 화면 구조, `button/script.js`는 FAQ 버튼 흐름과 상담 요청 폼 동작, `button/styles.css`는 버튼형 챗봇 UI 스타일을 담당합니다.

```text
package.json
```

프로젝트 실행 정보를 담고 있습니다. 현재는 `npm start` 명령으로 `server.js`를 실행하도록 설정되어 있습니다.

```text
.env.example
```

OpenRouter API 연동에 필요한 환경변수 예시 파일입니다. 실제 API Key는 `.env`에 작성하되 Git에는 커밋하지 않습니다.

```text
README_DEPLOY.md
```

Render 배포 시 필요한 설정을 정리한 문서입니다. 배포 명령, 환경변수, 배포 후 접속 경로를 확인할 수 있습니다.

## 로컬 실행 방법

```bash
npm start
```

실행 후 아래 URL에서 확인할 수 있습니다.

- http://127.0.0.1:5174/
- http://127.0.0.1:5174/ai/
- http://127.0.0.1:5174/button/

## 환경변수

AI 챗봇을 사용하려면 OpenRouter API Key가 필요합니다.

```text
OPENROUTER_API_KEY=your_api_key
OPENROUTER_BASE_URL=https://openrouter.ai/api/v1
OPENROUTER_MODEL=openai/gpt-oss-20b:free
OPENROUTER_SITE_URL=https://YOUR_RENDER_DOMAIN
OPENROUTER_APP_TITLE=Festrips AI Chatbot MVP
```

`.env` 파일은 Git에 커밋하지 않습니다.

## 실제 운영 시 보완 필요사항

현재 프로젝트는 시연 및 개발 검토용 MVP입니다. 실제 운영 단계에서는 아래 기능이 추가되어야 합니다.

- 고객 상담 요청 DB 저장
- Admin 페이지 연동
- 상담 요청 목록, 상세 내용, 처리 상태 관리
- 담당자 메모 기능
- 예약 DB, 결제 시스템, 바우처 발송 이력 등 내부 시스템 연동
- Admin 로그인 및 접근 권한 관리
- 운영 서버 모니터링 및 에러 추적
- 실제 Festrips 웹사이트에 링크, iframe 또는 위젯 스크립트 방식으로 연동
