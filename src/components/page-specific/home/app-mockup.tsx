export function AppMockupSection() {
  return (
    <section className="py-16 bg-gradient-to-b from-background to-background/50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline mb-4">
            Coming Soon
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our mobile app is currently in development. Stay tuned for a seamless property listing experience designed specifically for Hyderabad.
          </p>
        </div>
        <div className="relative h-[400px] bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl flex items-center justify-center">
          <div className="text-center space-y-4">
            <p className="text-muted-foreground">App mockups coming soon</p>
            <div className="text-sm text-muted-foreground/60">
              [ Placeholder for app interface previews ]
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}