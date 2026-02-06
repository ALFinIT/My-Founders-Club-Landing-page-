import { Navbar } from '@/components/navbar'
import { HeroSection } from '@/components/sections/hero'
import { ProblemSection } from '@/components/sections/problem'
import { HowItWorksSection } from '@/components/sections/how-it-works'
import { FeaturesSection } from '@/components/sections/features'
import { SocialProofSection } from '@/components/sections/social-proof'
import { CommunityShowcase } from '@/components/sections/community-showcase'
import { WhatsAppCTASection } from '@/components/sections/whatsapp-cta'
import { StatsSection } from '@/components/sections/stats'
import { PricingSection } from '@/components/sections/pricing'
import { Footer } from '@/components/sections/footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="w-full">
        <HeroSection />
        <ProblemSection />
        <HowItWorksSection />
        <FeaturesSection />
        <SocialProofSection />
        <CommunityShowcase />
        <WhatsAppCTASection />
        <StatsSection />
        <PricingSection />
        <Footer />
      </main>
    </>
  )
}
