function HomeFeatures() {
  const features = [
    {
      title: "Për Punonjësit",
      text: "Krijo profilin, ngarko CV dhe portfolio, dhe apliko në mundësi pune në fushën e IT.",
    },
    {
      title: "Për Punëdhënësit",
      text: "Posto njoftime pune, menaxho aplikantët dhe gjej kandidatët më të përshtatshëm.",
    },
    {
      title: "Proces i strukturuar",
      text: "Çdo hap është i organizuar: nga profili, aplikimi, dokumentet dhe statusi i kandidatit.",
    },
  ];

  return (
    <section className="bg-[#07152f] px-6 pb-24 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 md:grid-cols-3">
          {features.map((item) => (
            <div
              key={item.title}
              className="rounded-[2rem] border border-white/10 bg-white/10 p-7 shadow-xl shadow-blue-950/30 backdrop-blur-xl"
            >
              <h3 className="text-xl font-black">{item.title}</h3>
              <p className="mt-4 text-sm leading-7 text-blue-100/70">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HomeFeatures;