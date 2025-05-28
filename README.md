# 🪖 곰신 커플을 위한 공유 캘린더

기존의 군인/곰신 커플은 군대라는 장소와 연락의 제약으로 인해 많은 문제를 겪어왔습니다. 
상호 단절이 자연스럽고, 이에 불화가 생길 시에 풀기 어려운 문제가 발생합니다. 이러한 문제점이 더욱 가중될 수 있다는 것은 군인/곰신 커플이 가지는 필연적인 어려움입니다. 

### 사랑꾼은  **상호 이해(감정, 일정)를 바탕으로 표현을 도와주어 군인과 곰신의 관계 유지를 돕는 커플 공유 캘린더 서비스입니다.**
### 사랑꾼 서비스 배포 주소 : https://www.sarangkkun.site
![team4_thumbnail_web](https://github.com/user-attachments/assets/e912ac8d-e99c-48cb-9302-e2eaf53e7c06)

# 👨‍👧‍👦 팀 소개

### **팀명 : 방산소년단**

| **분야** | **이름** | **포지션** | **내용** |
| :---: | :---: | --- | --- |
| 기획 | 방산들 | 📈 PM, 서비스 기획 | 유저 리서치, 와이어프레임 작성, 기능정의서 작성  |
| 기획 | 강현규 | 📈 서비스 기획 | 유저 리서치, 와이어프레임 작성, UX 라이팅, <br /> WBS작성 |
| 디자인 | 박세린 | 🎨 디자인 리드 | 서비스 브랜딩, UX/UI 디자인, GUI 디자인 |
| 디자인 | 현명화 | 🎨 디자인 | 서비스 브랜딩, UX/UI 디자인, GUI 디자인 |
| 개발 | 윤병현 | 📱  프론트엔드 리드 | 화면 UI 구현, API 연동 |
| 개발 | 김유민 | 📱 프론트엔드 | 화면 UI 구현, API 연동 |
| 개발 | 전호영 | 💻 백엔드 리드 | API 구현, ERD 설계, 서버 배포 |
| 개발 | 김영록 | 💻 백엔드 | API 구현, ERD 설계, 서버 배포 |

---

# 📱 주요기능

<img width="1534" alt="Frame 2087327984" src="https://github.com/user-attachments/assets/b443b690-be71-46c0-9129-c3e031e9f2dd" />


# 💻 개발(Development)

> **깃허브 레포지토리**
> 
- https://github.com/Gomushim

> **배포 URL 및 API 명세서**
> 
- https://sarangkkun.site/
- https://api.sarangkkun.site/swagger-ui/index.html#/

>
> **시스템 아키텍쳐**
><img width="1462" alt="Image" src="https://github.com/user-attachments/assets/d519c766-61c7-45bb-ba07-cf07c1bf3190" />

---

## **🌟 프론트엔드**

### 🔧 프론트엔드 기술 스택

| 기술 | 설명 |
|------|------|
| **TypeScript** | 타입 안정성을 통해 유지보수성과 리팩터링 효율 향상 |
| **React + Vite** | 컴포넌트 기반 구조 + 빠른 번들링과 HMR 제공 |
| **PWA** | 모바일 설치 가능, 웹 푸시 알림 등 기능 제공 |
| **Tailwind CSS** | 유틸리티 기반 CSS로 빠르고 일관된 스타일링 |
| **shadcn/ui** | 접근성과 커스터마이징이 강력한 UI 컴포넌트 라이브러리 |
| **Zustand** | 간단하고 가벼운 전역 상태 관리 |
| **React Query** (`@tanstack/react-query`) | 서버 상태 관리, 캐싱, 리페칭 자동화 |
| **Axios** | HTTP 요청/응답 처리 및 인터셉터 설정 |
| **MSW** | API mocking으로 프론트 개발 병렬화 지원 |
| **Vitest** | Vite와 통합된 빠른 테스트 실행 환경 |

<br>

---

<br>

## **🌟 백엔드**

> **ERD 설계도:** ![Image](https://github.com/user-attachments/assets/9f8d7844-795f-4bd2-87f1-cfa82ea2c83c)
>

> **API 명세서:** https://sarang-backend.o-r.kr/swagger-ui/index.html

---

### 🔧 백엔드 기술 스택

| 기술 | 설명 |
|------|------|
| **Kotlin** | 간결한 문법, Java 호환성, Null 안정성 |
| **Spring Boot** | 설정 자동화, 내장 톰캣 서버 제공 |
| **Spring Data JPA** | 객체 중심의 DB 접근, SQL 최소화 |
| **JUnit5** | 유연한 테스트 작성 가능 |
| **Mockito** | 의존성 모킹 및 메서드 호출 검증 |
| **CoderabbitAI** | AI 기반 코드 리뷰 및 보안/성능 개선 |
| **MySQL 8.x** | 성능 향상, 공간 데이터 등 최신 기능 제공 |
| **Docker** | 배포 및 개발 환경 통일화 |
| **Github Actions** | CI/CD 자동화 파이프라인 구축 |
| **Naver Cloud Platform (NCP)** | 국내 클라우드 인프라 사용 (서버, VPC, CDN 등) |

## 🟩 NCP 사용 스택

| 서비스 | 사용 목적 및 설명 |
|--------|------------------|
| **Server** | 백엔드 배포 서버로 사용 |
| **VPC (Virtual Private Cloud)** | 클라우드 내 전용 네트워크 확보를 위해 사용 |
| **Container Registry** | 백엔드 및 프론트엔드 Docker 이미지 저장용 사설 레지스트리 사용 <br> - Public Registry의 보안 이슈 방지 <br> - 이미지의 취약점 분석 및 보안성 향상 |
| **Object Storage** | 이미지 정적 파일 저장 및 제공 <br> - NCP CDN과 연결하여 빠르고 효율적인 콘텐츠 전달 |



