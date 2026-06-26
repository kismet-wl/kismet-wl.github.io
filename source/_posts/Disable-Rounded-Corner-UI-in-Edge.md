---
title: Disable Rounded Corner UI in Edge
abbrlink: 7918
date: 2026-06-06 16:49:05
tags:
---

该方法适用的Edge版本：
|channel|Version|
|:-----:|:-----:|
|Stable 149|149.0.4022.52|

找到Edge快捷方式的文件位置，将其“属性”中“目标”改为：

`"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" --disable-features=msFeatureGroupNewLookAndFeelHoldout`

该方法仅能影响从快捷方式启动时Edge的UI，无法影响单击链接跳转时启动的Edge的UI。