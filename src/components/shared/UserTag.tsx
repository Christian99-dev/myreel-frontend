const UserTag = ({ name, id }: { name: string; id: number }) => {
  // Definiere die Benutzer-Themen-Farben als Tailwind-Klassen
  const userThemeClasses = [
    "bg-user-theme-1",
    "bg-user-theme-2",
    "bg-user-theme-3",
    "bg-user-theme-4",
    "bg-user-theme-5",
    "bg-user-theme-6",
  ];

  // Wähle die Klasse basierend auf der ID
  const colorClass = userThemeClasses[id % userThemeClasses.length];

  // Extrahiere das erste Zeichen des Namens und mache es groß
  const initial = name.charAt(0).toUpperCase();

  return (
    <div
      className={`flex font-semibold items-center justify-center rounded-[999px] ${colorClass} size-[--spacing-7] text-[#fff]`}
    >
      {initial}
    </div>
  );
};

export default UserTag;
