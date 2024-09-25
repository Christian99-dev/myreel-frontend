export default function Footer() {
  return (
    <footer className="bg-[#000] flex justify-between items-center py-[--spacing-6] px-[--border]">
      <p className="fs-8 text-[#FFF] font-medium p ">YourReel</p>
      <div className="flex gap-[--spacing-2]"> 
        <div className="text-[#fff]">Datenschutz</div>
        <div className="text-[#fff]">Impressum</div>
      </div>
    </footer>
  );
}
