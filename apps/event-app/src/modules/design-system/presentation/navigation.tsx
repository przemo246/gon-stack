export type NavigationItem = {
  id: string;
  label: string;
};

export type NavigationGroup = {
  key: string;
  label: string;
  rootId: string;
  items: NavigationItem[];
};

type NavigationProps = {
  groups: NavigationGroup[];
  activeGroupKey: string;
  activeSectionId: string;
  onNavigate: (groupKey: string, sectionId: string) => void;
};

export const Navigation = ({
  groups,
  activeGroupKey,
  activeSectionId,
  onNavigate,
}: NavigationProps) => {
  return (
    <aside className="xl:sticky xl:top-6 xl:self-start xl:max-h-[calc(100vh-3rem)]">
      <div className="rounded-2xl border border-border-default bg-bg-surface p-5 space-y-5 flex flex-col xl:max-h-[calc(100vh-3rem)]">
        <div className="flex flex-col min-h-0 flex-1">
          <p className="text-xs font-mono uppercase tracking-widest text-text-muted shrink-0">
            On this page
          </p>
          <nav className="mt-3 text-sm overflow-y-auto flex-1 space-y-4 pr-1">
            {groups.map((group) => (
              <div key={group.key} className="space-y-2">
                <button
                  type="button"
                  onClick={() => onNavigate(group.key, group.rootId)}
                  className={
                    activeGroupKey === group.key
                      ? 'font-semibold text-text-primary text-left'
                      : 'text-text-muted hover:text-text-primary text-left transition-colors'
                  }
                >
                  {group.label}
                </button>
                <div className="pl-3 flex flex-col gap-1.5 border-l border-border-default">
                  {group.items.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => onNavigate(group.key, item.id)}
                      className={
                        activeSectionId === item.id
                          ? 'text-accent font-medium text-left transition-colors'
                          : 'text-text-muted hover:text-text-primary text-left transition-colors'
                      }
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </div>
      </div>
    </aside>
  );
};
