export default function Tutorial() {
  return (
    <section className="px-[--border]">
      <h2 className="fs-7 font-semibold text-pink-very-light text-center pb-[--spacing-3]">
        Möchtest du deine Videos der Welt zeigen?
      </h2>
      <p className="fs-9 font-medium text-purple-light text-center pb-[--spacing-14]">
        Folge diesen einfachen Schritten, um atemberaubende Edits zu erstellen
        und mit der Community zu teilen!
      </p>

      <div className="w-full flex flex-col gap-[--spacing-5]">
        {[
          {
            header: "1. Erstelle eine Gruppe",
            title: "Um eine Gruppe zu erstellen, klicke auf diesen Button",
          },
          {
            header: "2. Füge Mitglieder hinzu",
            title:
              "Lade Mitglieder in deine Gruppe ein, indem du ihre E-Mail-Adresse eingibst",
          },
          {
            header: "3. Erstelle ein Edit",
            title:
              "Wähle einen Song und erstelle ein neues Edit für deine Gruppe",
          },
          {
            header: "4. Wähle Slots aus",
            title: "Reserviere Slots im Edit, um deine Beiträge hinzuzufügen",
          },
          {
            header: "5. Lade es auf Instagram hoch",
            title:
              "Veröffentliche dein Edit direkt auf Instagram mit einem Klick",
          },
        ].map(({ header, title }, key) => (
          <Box key={key} header={header} text={title} left={key % 2 === 0} />
        ))}
      </div>
    </section>
  );
}

function Box({
  header,
  text,
  left,
}: {
  header: string;
  text: string;
  left: boolean;
}) {
  return (
    <div
      className={`p-[--spacing-4] border-purple-light border-2 rounded-main w-[35%] shadow-main ${
        left ? "mr-auto" : "ml-auto"
      }`}
    >
      <h3 className="fs-8 font-bold text-pink-very-light pb-[--spacing-2] text-left">
        {header}
      </h3>
      <p className="fs-9 font-normal text-purple-light text-left">{text}</p>
    </div>
  );
}
