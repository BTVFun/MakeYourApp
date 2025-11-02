import Container from '@/components/Container'
import Button from '@/components/Button'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-bg/80 backdrop-blur supports-[backdrop-filter]:bg-bg/65">
      <span className="pointer-events-none block h-px w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <Container className="flex items-center justify-between py-4">
        <a href="/" className="text-lg font-semibold tracking-tight text-white transition-colors hover:text-primary">
          MakeYourApp
        </a>
        <div className="flex items-center gap-3">
          <Button href="/about">
            {'\u00c0 propos de nous'}
          </Button>
          <Button href="/#contact">Contact</Button>
        </div>
      </Container>
    </header>
  )
}
