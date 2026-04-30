import { MOCK_NAV_LINKS } from './mock-data';
import { cn } from '@/libs/ui/cn';

export const Navigation = () => {
  return (
    <nav className="flex gap-7 ml-5">
      {MOCK_NAV_LINKS.map((link) => (
        <a
          key={link.label}
          className={cn(
            'relative text-sm cursor-pointer py-1.5 transition-colors duration-100 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40',
            link.active
              ? 'text-text-primary'
              : 'text-text-muted hover:text-text-primary',
          )}
        >
          {link.active && (
            <span className="absolute left-0 right-0 -bottom-0.5 h-[1.5px] bg-text-primary" />
          )}
          {link.label}
        </a>
      ))}
    </nav>
  );
};
