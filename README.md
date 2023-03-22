![alt text](https://res.cloudinary.com/dx06ztif0/image/upload/v1678952647/Screen_Recording_2023-03-16_at_16.36.57_ww5g39.gif)

## [LIVE](https://the-new-kim.github.io/color-palette-generator/)

## Project Overview:

색체 조화론을 이용한 색조합 추천 앱 (Toy project). 색조합은 Base color를 기준으로 나머지 색상들을 Generate Methode(색체 조화론)에 따라 생성됨. 생성된 색조합의 각 생상들은 사용자에 의해 추가, 삭제, 이동, 변경이 가능하며, 모든 과정은 Localstorage에 저장되어 재열람이 가능(Redo & Undo)

## What I did:

- 색조합 생성 로직 함수(utilities) 구현:
  - generateSingleColor: Pallete를 생성하는데 가장 기본이 되는 함수, (hue,saturation,lightness)를 인수로 받음
  - generateMultipleColors: generate methode를 인수로 받아 generateSingleColor함수를 호출해 여러개의 색상을 생성
  - generatePalette: 색상을 생성하기 전에 현재 Palette에 대한 다양한 조건들을 인수를 받아 혹은 Random하게 생성해줌
- Beautiful DND를 이용한 Palette 내의 색위치 변경 등
