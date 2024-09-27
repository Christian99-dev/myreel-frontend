export default function Work() {
  return (
    <section className="px-[--border]">
      <h2 className="fs-7 font-semibold text-pink-very-light text-center pb-[--spacing-3]">
        Schau dir an, was andere geschaffen haben!
      </h2>
      <p className="fs-9 font-medium text-purple-light text-center pb-[--spacing-14]">
        Entdecke beeindruckende Edits von unserer Community auf unserem
        Instagram-Account und lass dich inspirieren.
      </p>

      <div className="flex h-[650px] gap-[--spacing-4]">
        <Box src="/images/muscle.jpg" offset={-40}/>
        <Box src="/images/woman1.jpg" offset={0}/>
        <Box src="/images/woman2.jpg" offset={40}/>
      </div>
    </section>
  );
}

function Box({offset, src, className}: {offset: number, src: string, className?:string}) {
  return (
    <div className={`${className} animate-float relative w-full h-full`}>
      <div className={`border-purple-light border-2 rounded-main shadow-main absolute right-0 left-0 h-full`} style={{top: offset}}>
      <img
          src={src}
          className="object-cover w-full h-full rounded-main"
          alt=""
        />
      </div>
    </div>
  );
}
