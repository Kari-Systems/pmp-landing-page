
import type { PropsWithChildren } from 'react';
import { cn } from '@/lib/utils';

interface PageContainerProps extends PropsWithChildren {
  className?: string;
}

export function PageContainer({ children, className }: PageContainerProps) {
  return (
    <div className={cn("container mx-auto px-4 py-8 sm:px-6 lg:px-12 xl:px-16", className)}>
      {children}
    </div>
  );
}

export function Section({ children, className, id }: PropsWithChildren<{ className?: string, id?: string }>) {
  return (
    <section id={id} className={cn("py-12 md:py-16 lg:py-20", className)}>
      {children}
    </section>
  );
}

export function SectionTitle({ children, className }: PropsWithChildren<{ className?: string }>) {
  return (
    <h2 className={cn("text-3xl font-bold tracking-tight text-center sm:text-4xl lg:text-5xl font-headline mb-12 md:mb-16", className)}>
      {children}
    </h2>
  );
}
