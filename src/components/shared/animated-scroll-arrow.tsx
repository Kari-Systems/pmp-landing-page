
"use client";

import { ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export function AnimatedScrollArrow({ className }: { className?: string }) {
  return (
    <motion.div
      animate={{ y: [0, 8, 0] }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      className={cn("text-center", className)}
    >
      <ChevronDown className="h-8 w-8 text-primary mx-auto" />
    </motion.div>
  );
}
