# shadcn-ui 테스트 

## 환경세팅

### 주요 환경파일들은 아래와 같으며, 무슨 파일이며, 어떤 코드를 추가 작업하였는지 작성

- vite.config.ts        ( vite config 파일                          / 추가 작업 : import alias 경로 설정 )
- tsconfig.app.json     ( app config 파일                           / 추가 작업 : import alias 경로 설정 및 baseURL 설정 )
- tailwind.config.js    ( tailwind config 파일                      / 추가 작업 : shadcn ui add 시 자동으로 코드가 추가되었을 뿐 default 유지 )
- postcss.config.js     ( tailwind를 사용하기 위한 postcss config 파일  / 추가 작업 : x )
- components.json       ( shadcn config 파일로 shadcn init 시 설정한 초기 세팅 수정 가능 / 추가 작업 : shadcn add 시 추가되는 파일이나 import 경로 설정 )
- .eslintrc.cjs         ( eslint 파일                               / 추가 작업 : import 시 Barrel 파일로만 import 해올 수 있도록 )
- .vscode/settings.json ( vscode setting 파일                       / 추가 작업 : 인텔리센스로 자동 import 추천항목에서 일부 라이브러리 추천되지 않도록 )

### import 관련 eslint 라이브러리는

```json
    "eslint-import-resolver-alias": "^1.1.2",
    "eslint-plugin-import": "^2.29.1",
```

### 문의사항 있으시면 연락 남기셈
