export function HomePage() {
  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-10">
      <h1 className="text-3xl font-bold">Главная</h1>
      <p className="mt-3 text-base">
        Тут будет основной контент. Пока — простой текст-заглушка, чтобы проверить структуру FSD и
        импорты.
      </p>

      <section className="mt-8">
        <h2 className="text-xl font-semibold">Что дальше</h2>
        <ul className="mt-3 list-inside list-disc">
          <li>Разнести бизнес-логику по `features`/`entities`</li>
          <li>Добавить реальные страницы и роуты в `app/`</li>
          <li>Подключить API-клиент в `shared/api`</li>
        </ul>
      </section>
    </main>
  );
}
