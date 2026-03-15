export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="font-heading text-5xl text-secondary">PunchyAI</h1>
        <p className="font-mono text-sm text-muted-foreground tracking-wide uppercase">
          Communication Coach for Investment Professionals
        </p>
        <div className="flex gap-3 justify-center pt-4">
          <span className="inline-block w-3 h-3 rounded-full bg-primary" />
          <span className="inline-block w-3 h-3 rounded-full bg-secondary" />
          <span className="inline-block w-3 h-3 rounded-full bg-success" />
        </div>
      </div>
    </div>
  );
}
