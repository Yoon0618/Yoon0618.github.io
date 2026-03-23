---
title: "Debye shielding을 처음 감각적으로 이해해 보기"
description: "전하가 왜 국소적으로 가려지는지, Debye length가 어떤 규모를 뜻하는지 짧은 글로 정리했다."
pubDate: 2026-03-20
type: article
category: "기초 개념"
tags:
  - Debye length
  - quasi-neutrality
  - shielding
series: "기초 플라즈마 물리"
seriesOrder: 1
draft: false
---

플라즈마 전체는 대체로 quasi-neutral하지만, 국소적인 전하 불균형은 얼마든지 생길 수 있다. 핵심은 그 불균형이 얼마나 멀리 영향을 전달하느냐다.

점전하를 플라즈마 안에 넣으면 주변 전자와 이온이 재배치되면서 전위를 빠르게 깎아낸다. 이때 전위가 유의미하게 남는 대표적인 길이 척도가 Debye length이다.

$$
\lambda_D = \sqrt{\frac{\varepsilon_0 k_B T_e}{n_e e^2}}
$$

이 식을 볼 때 중요하게 느껴지는 점은 두 가지다.

1. 전자 온도 $T_e$가 높을수록 열운동이 강해져 차폐가 느슨해진다.
2. 전자 밀도 $n_e$가 클수록 더 짧은 거리에서 전위가 가려진다.

결국 Debye length는 "플라즈마가 전기적 섭동을 어디까지 허용하는가"를 말해주는 길이 척도다. 시스템 크기 $L$이 $\lambda_D$보다 훨씬 크면, 내부 대부분 영역에서는 quasi-neutral한 묘사가 잘 맞는다.
