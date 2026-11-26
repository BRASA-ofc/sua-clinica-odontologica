import { Footer } from '../components/layout/Footer'
import { Navbar } from '../components/layout/Navbar'
import { AeroSky } from '../components/aero/AeroSky'
import { GlobalEffects } from '../components/aero/GlobalEffects'
import { Marquee } from '../components/aero/Marquee'
import { ScrollProgress } from '../components/layout/ScrollProgress'
import { SectionRail } from '../components/layout/SectionRail'
import { WhatsAppButton } from '../components/layout/WhatsAppButton'
import { Contact } from '../sections/Contact'
import { Dentist } from '../sections/Dentist'
import { Differentials } from '../sections/Differentials'
import { Hero } from '../sections/Hero'
import { Proposal } from '../sections/Proposal'
import { Services } from '../sections/Services'
import { Shine } from '../sections/Shine'
import { Trust } from '../sections/Trust'

export function Home() {
  return (
    <div className="relative">
      <AeroSky />
      <GlobalEffects />
      <ScrollProgress />
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[80] focus:rounded-full focus:bg-white focus:font-bold focus:px-4 focus:py-2"
      >
        Pular para o conteúdo
      </a>
      <Navbar />
      <main id="conteudo" className="relative z-10">
        <Hero />
        <Marquee />
        <Shine />
        <Proposal />
        <Dentist />
        <Trust />
        <Services />
        <Differentials />
        <Contact />
      </main>
      <Footer />
      <SectionRail />
      <WhatsAppButton />
    </div>
  )
}
