import { differentials } from '../data/clinic'
import { Photo } from '../components/ui/Photo'
import { Reveal } from '../components/ui/Reveal'

export function Differentials() {
  return (
    <section id="diferenciais" className="scroll-mt-28 bg-ice/45">
      <div className="mx-auto grid max-w-6xl gap-16 px-5 py-28 md:px-8 lg:grid-cols-12">
        <div className="lg:sticky lg:top-32 lg:col-span-4 lg:self-start">
          <Reveal>
            <p className="text-[11px] tracking-[0.32em] text-lagoon uppercase">{differentials.kicker}</p>
            <h2 className="mt-4 font-display text-[clamp(2.2rem,3.6vw,3.6rem)] leading-[0.98] font-semibold tracking-[-0.04em] text-navy">
              {differentials.title}
            </h2>
          </Reveal>
        </div>
        <div className="flex flex-col gap-20 lg:col-span-8">
          {differentials.items.map((item, index) => (
            <Reveal key={item.index} delay={index * 0.05}>
              <article>
                <p className="font-display text-sm tracking-[0.2em] text-silver">{item.index}</p>
                <h3 className="mt-3 max-w-lg font-display text-3xl leading-tight font-semibold tracking-tight text-navy md:text-4xl">
                  {item.title}
                </h3>
                <p className="mt-4 max-w-xl text-navy/75">{item.text}</p>
                <div className="mt-6 overflow-hidden rounded-[1.8rem] bg-mist">
                  <Photo
                    src={item.image}
                    alt={item.imageAlt}
                    className={`aspect-[16/10] w-full object-cover transition-transform duration-700 hover:scale-[1.03] ${
                      index === 1 ? 'object-[70%_40%]' : ''
                    }`}
                  />
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
