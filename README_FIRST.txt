TRADE AGENT MANAGER v25.0.8 — OLD LOGIN + PWA FIX

Изменено:
- возвращен старый визуальный экран входа TradeAgent: верхний бренд, центральный логотип, орбиты, лозунг, форма;
- возвращен старый встроенный список выбора пользователей (не нижний modal-sheet);
- добавлена плавная анимация центрального логотипа, свечения, орбит и точек;
- Firebase-вход «пользователь + код» сохранен; email не возвращен в интерфейс;
- исправлен запуск с иконки iPhone: versioned start_url, standalone version redirect, неблокирующее Firestore persistence;
- добавлен watchdog входа: приложение больше не должно бесконечно висеть на «Проверяю…»;
- Firestore Rules остаются теми же, повторно менять их для v25.0.8 не нужно.

ДЛЯ GITHUB: заменить index.html и manifest.webmanifest. Остальные файлы можно не менять.
ПОСЛЕ ОБНОВЛЕНИЯ: удалить старую иконку TradeAgent с экрана iPhone, открыть https://arekenzi.github.io/TradeAgentManager/?v=25.0.8 в Safari и снова «На экран Домой».
