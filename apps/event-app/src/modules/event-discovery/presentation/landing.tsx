import { Hero } from './hero';
import { FeaturedGrid } from './featured-grid';
import { CategoryBand } from './category-band';

type LandingProps = {
  savedSet: Set<string>;
  onToggleSave: (id: string) => void;
};

export const Landing = ({ savedSet, onToggleSave }: LandingProps) => (
  <>
    <Hero />
    <FeaturedGrid onToggleSave={onToggleSave} savedSet={savedSet} />
    <CategoryBand />
  </>
);
