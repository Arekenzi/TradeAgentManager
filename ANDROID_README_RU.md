# Trade Agent Manager — Android

База Web Manager: **v27.0.25**. Android shell: **1.0.0**.

## Что уже заложено
- Android 8.0+ (`minSdk 26`), target Android API 35.
- Адаптация через существующую responsive-верстку Web Manager; WebView занимает доступный экран на телефонах и планшетах.
- Portrait / landscape, cutout, разные DPI, системные панели.
- Android Back: сначала история Manager, затем выход.
- File chooser, внешние ссылки, `wa.me`/WhatsApp, PDF/Excel через системные обработчики.
- Интернет только HTTPS.
- При недоступности GitHub Pages открывается встроенный snapshot v27.0.25.
- Web Manager загружается с `https://arekenzi.github.io/TradeAgentManager/`, поэтому обычные web-изменения после публикации на GitHub Pages появляются в Android без пересборки APK.
- GitHub Actions автоматически собирает debug APK при изменениях Android-папки.

## Первая сборка в GitHub
1. Добавить папку `android` и `.github/workflows/android-apk.yml` в репозиторий TradeAgentManager.
2. Commit + Push в `main`.
3. GitHub → Actions → **Android APK** → Run workflow.
4. После завершения открыть run → Artifacts → **TradeAgent-Manager-Android**.

## Подписанный APK для постоянной установки
Один раз создать keystore и сохранить его навсегда. Для GitHub Actions добавить Secrets:
- `ANDROID_KEYSTORE_BASE64`
- `ANDROID_KEYSTORE_PASSWORD`
- `ANDROID_KEY_ALIAS`
- `ANDROID_KEY_PASSWORD`

Важно: один и тот же applicationId (`kz.tradeagent.manager`) + один и тот же keystore позволяют устанавливать новые версии поверх старых. Потеря keystore означает, что старую установленную версию нельзя будет штатно обновить новым APK.

## Версии
Android: `android/app/build.gradle` → `versionCode` увеличивать на 1 при каждом APK; `versionName` менять, например 1.0.0 → 1.0.1.
Web: продолжает свою ветку v27.0.x независимо.

## Когда APK НЕ надо пересобирать
Если меняется HTML/CSS/JS, заказы, каталог, таблицы, дизайн и т.п. в опубликованном Web Manager — Android подхватит изменения с GitHub Pages.

## Когда APK надо пересобирать
Если меняется Android shell: разрешения, камера, push, биометрия, загрузки, нативные интеграции, package id, target/min SDK и т.п.
