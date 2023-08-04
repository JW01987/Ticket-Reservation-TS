<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# 🎟️ TypeScript 공연예매 서비스 만들기

## 🔧 사용한 기술

`TypeScript` `NestJS` `TypeORM`

## 📒 ERD & API

### ERD

![](https://velog.velcdn.com/images/jw01987/post/5dafcd74-e1d2-4fef-9fe8-9fc12718cad6/image.png)

### API

![](https://velog.velcdn.com/images/jw01987/post/f4d72d30-e0e9-439f-9863-6182ca8c4433/image.png)
![](https://velog.velcdn.com/images/jw01987/post/77de2721-5f47-49fb-a076-ed8f6a4c04f5/image.png)

[더 자세한 API는 노션으로](https://www.notion.so/8b929d479e7e47d5be2931f50b5314e9)

## 🛠️ 개발 과정

NestJS와 TypeORM으로 백엔드를 구현

인증에 JWT, AuthGuard를 사용하여  
유저의 아이디와 역할정보를 가진 토큰을 Cookie에 저장  
![](https://velog.velcdn.com/images/jw01987/post/01b99995-3303-42f1-a4ee-45562297ec08/image.png)
저장된 토큰을 기반으로 공연 추가, 예매 기능에 접근 할 수 있게 적용  
![](https://velog.velcdn.com/images/jw01987/post/1de908a8-47dc-4a45-9e8c-84eb366b1de2/image.png)

좌석 예매 로직 구현

- 장바구니를 생성 후 좌석을 생성
  ![](https://velog.velcdn.com/images/jw01987/post/9df7b482-c37b-44b3-b649-2d52dfc5d9bb/image.png)
- 해당하는 좌석을 모두 가져온 후 가격을 책정해 결제, 상태를 변경해서 저장
  ![](https://velog.velcdn.com/images/jw01987/post/9defbd8f-b9e0-424b-ae8f-1bf8d02f2208/image.png)

## ⚽️ 트러블 슈팅

NestJS

> NestJS를 처음 써봤다  
> 과제 기간이 다행이도 2주 정도라 미리 한 번 체험하고 강의 들을 시간이 되어서  
> 나름 무난하게 사용했다

인증

> 이번과제에서 가장 어려웠던 일을 말하라면 당연히 "인증"이다  
> 흐름을 이해하는 것이 어렵고 오래걸렸다  
> [공식문서가 가장 이해하기 쉬웠고 많은 도움을 받았다](https://docs.nestjs.com/security/authentication)

순환 종속성, 의존성

> 가장 많이 오류를 냈던 파트
> 오류를 어떻게 해결해야할지 몰라서 많이 헤맸다  
> [해결방법 링크](https://velog.io/@jw01987/ERROR-ExceptionHandler-Nest-cant-resolve-dependencies-of-the-SeatsService-SeatRepository-.-Please-make-sure-that-the-argument-dependency-at-index-1-is-available-in-the-SeatsModule-context)

## 🌟 느낀점

NestJS는 흐름이나 이런것들이 이해가 가는데  
TypeORM은 아직 너무 부족한 느낌이다

테스트 코드를 사용해 보고싶어 Jest를 만져봤는데  
과제제출 기한이 얼마 남지 않아, 도입하지 못해 아쉽다

## 오류 해결 링크

- [Repository 오류](https://velog.io/@jw01987/typeerror-this.userrepository.createUser-is-not-a-function)
- [Import 오류](https://velog.io/@jw01987/NestJs-n%EA%B0%9C%EC%9D%98-%EC%9D%B8%EC%88%98%EA%B0%80-%ED%95%84%EC%9A%94%ED%95%9C%EB%8D%B0-m%EA%B0%9C%EB%A5%BC-%EA%B0%80%EC%A0%B8%EC%99%94%EC%8A%B5%EB%8B%88%EB%8B%A4-%EC%98%A4%EB%A5%98)
- [Jest 경로 오류](https://velog.io/@jw01987/Jest-%EA%B2%BD%EB%A1%9C-%EB%AC%B8%EC%A0%9C)
- [순환 의존성 오류](https://velog.io/@jw01987/ERROR-ExceptionHandler-Nest-cant-resolve-dependencies-of-the-SeatsService-SeatRepository-.-Please-make-sure-that-the-argument-dependency-at-index-1-is-available-in-the-SeatsModule-context)
