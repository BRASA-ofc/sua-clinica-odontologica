import { dentist } from '../data/clinic'
import { Photo } from '../components/ui/Photo'
import { Reveal } from '../components/ui/Reveal'

export function Dentist() {
  return (
    <section id="dentista" className="scroll-mt-28 bg-foam/55">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-28 md:px-8 lg:grid-cols-12">
        <Reveal className="relative lg:col-span-6">
          <div className="absolute -top-5 -left-4 hidden h-full w-full rounded-[2.4rem] border border-silver/80 lg:block" />
          <div className="relative overflow-hidden rounded-[2.4rem] bg-mist">
            <Photo
              src={dentist.portrait}
              alt={dentist.portraitAlt}
              priority
              className="aspect-[4/5] h-auto max-h-[82vh] w-full object-cover object-[22%_18%]"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/35 via-transparent to-transparent" />
            <p className="absolute right-5 bottom-5 left-5 text-sm text-white/90">
              {dentist.imageNote}
            </p>
          </div>
        </Reveal>

        <div className="lg:col-span-6">
          <Reveal>
            <p className="text-[11px] tracking-[0.32em] text-lagoon uppercase">Quem cuida</p>
            <h2 className="mt-4 font-display text-[clamp(2.3rem,4vw,4rem)] leading-[0.96] font-semibold tracking-[-0.04em] text-navy">
              {dentist.title}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-navy/75">{dentist.bio}</p>
          </Reveal>

          <Reveal delay={0.12} className="mt-10 border-t border-navy/10 pt-8">
            <p className="font-display text-3xl font-semibold tracking-tight text-navy">
              {dentist.name}
            </p>
            <p className="mt-1 text-navy/75">{dentist.role}</p>
            <p className="mt-2 text-xs tracking-[0.14em] text-lagoon uppercase">
              {dentist.fictionNote}
            </p>
            <p className="mt-4 text-sm text-navy/70">{dentist.credential}</p>
          </Reveal>

          <Reveal delay={0.18} className="mt-8 grid gap-8 sm:grid-cols-2">
            <div>
              <p className="text-[11px] tracking-[0.22em] text-navy/45 uppercase">Atuação</p>
              <p className="mt-2 text-navy">{dentist.years}</p>
              <p className="mt-1 text-xs text-navy/55">{dentist.yearsNote}</p>
            </div>
            <div>
              <p className="text-[11px] tracking-[0.22em] text-navy/45 uppercase">Abordagem</p>
              <p className="mt-2 text-navy">{dentist.approach}</p>
            </div>
          </Reveal>

          <Reveal delay={0.22} className="mt-8">
            <p className="text-[11px] tracking-[0.22em] text-navy/45 uppercase">
              Formação demonstrativa
            </p>
            <ul className="mt-3 space-y-2">
              {dentist.formation.map((item) => (
                <li key={item} className="text-sm text-navy/80">
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-navy/55">{dentist.formationNote}</p>
          </Reveal>

          <Reveal delay={0.26}>
            <ul className="mt-8 flex flex-wrap gap-2">
              {dentist.differentials.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-navy/10 bg-white/70 px-4 py-2 text-sm text-navy"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
