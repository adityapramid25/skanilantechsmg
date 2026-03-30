'use client';

import { motion, useInView } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import { Briefcase, Users, Code, Trophy } from 'lucide-react';

const facts = [
  { id: 1, label: 'Projects Done', value: 150, icon: Briefcase, suffix: '+' },
  { id: 2, label: 'Team Members', value: 45, icon: Users, suffix: '' },
  { id: 3, label: 'Lines of Code', value: 1.2, icon: Code, suffix: 'M' },
  { id: 4, label: 'Awards Won', value: 12, icon: Trophy, suffix: '' },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 2000;
      const increment = end / (duration / 16); // 60fps

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(start);
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <span ref={ref} className="text-3xl sm:text-4xl font-display font-bold text-primary tracking-tight">
      {count % 1 !== 0 ? count.toFixed(1) : Math.floor(count)}
      {suffix}
    </span>
  );
}

export function FunfactsSection() {
  return (
    <section className="py-16 bg-white border-t border-slate-200 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {facts.map((fact, index) => (
            <motion.div
              key={fact.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center text-center p-6 rounded-2xl bg-gradient-to-br from-white to-white hover:from-primary/5 hover:to-primary/10 border border-slate-200 hover:border-primary/30 transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-primary/20"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
                <fact.icon className="w-6 h-6" />
              </div>
              <AnimatedCounter value={fact.value} suffix={fact.suffix} />
              <p className="text-sm text-slate-600 mt-2 font-medium">{fact.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
