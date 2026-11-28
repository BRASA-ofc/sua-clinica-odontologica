import { Footer } from '../components/layout/Footer'
import { Navbar } from '../components/layout/Navbar'
import { ScrollProgress } from '../components/layout/ScrollProgress'
import { SectionRail } from '../components/layout/SectionRail'
import { WhatsAppButton } from '../components/layout/WhatsAppButton'
import { AeroSky } from '../components/aero/AeroSky'
import { GlobalEffects } from '../components/aero/GlobalEffects'
import { Benefits } from '../sections/Benefits'
import { Contact } from '../sections/Contact'
import { Dentist } from '../sections/Dentist'
import { Faq } from '../sections/Faq'
import { Hero } from '../sections/Hero'
import { Services } from '../sections/Services'
import { Steps } from '../sections/Steps'
import { Testimonials } from '../sections/Testimonials'

export function Home() {
  return (
    <div className="relative">
      <AeroSky />
      <GlobalEffects />
      <ScrollProgress />
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[80] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:font-bold"
      >
        Pular para o conteúdo
      </a>
      <Navbar />
      <main id="conteudo" className="relative z-10">
        <Hero />
        <Benefits />
        <Services />
        <Steps />
        <Dentist />
        <Testimonials />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <SectionRail />
      <WhatsAppButton />
    </div>
  )
}
