import { ArrowRight, Gamepad2, Heart, Plus, Users } from 'lucide-react';
import { Heading } from '@/libs/ui/heading';
import { Text } from '@/libs/ui/text';

const steps = [
  {
    id: 1,
    title: 'Create or join a room',
    description: 'One of you creates a room and shares the code.',
  },
  {
    id: 2,
    title: 'Play together',
    description: 'Answer questions, reveal answers, and score points.',
  },
  {
    id: 3,
    title: 'Grow closer',
    description: 'Discover new things and strengthen your connection.',
  },
] as const;

export const Starter = () => {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-cyan-500/20 blur-[90px]" />
        <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-fuchsia-500/20 blur-[100px]" />
      </div>

      <div className="grid grid-cols-1 gap-6">
        <header className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-center">
          <div className="space-y-2">
            <Text.L1 as="p" className="text-fuchsia-300">
              Welcome back, Tom!
            </Text.L1>
            <Heading level={1} className="max-w-[520px] text-slate-100">
              Ready for
              <br />
              game night?
            </Heading>
            <Text.B1 as="p" className="max-w-[440px] text-slate-300">
              Create a new room or join an existing one to start your next
              session.
            </Text.B1>
          </div>

          <div className="relative hidden h-[150px] lg:block">
            <div className="absolute left-9 top-3 flex h-28 w-28 -rotate-12 items-center justify-center rounded-[22px] border border-fuchsia-300/35 bg-slate-900/45">
              <Gamepad2 size={40} className="text-fuchsia-300/90" />
            </div>
            <div className="absolute left-[140px] top-6 flex h-28 w-28 rotate-[8deg] items-center justify-center rounded-[22px] border border-fuchsia-300/30 bg-slate-900/40">
              <Users size={38} className="text-fuchsia-300/80" />
            </div>
            <Heart
              size={16}
              className="absolute left-[205px] top-[-2px] fill-fuchsia-400 text-fuchsia-400"
            />
          </div>
        </header>

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          <article className="rounded-xl border border-cyan-300/30 bg-linear-to-r from-fuchsia-900/45 to-slate-900/70 p-5 shadow-[0_10px_32px_rgba(8,10,30,0.5)]">
            <div className="flex items-center gap-4">
              <div className="flex h-[84px] w-[84px] shrink-0 items-center justify-center rounded-full border border-cyan-300/35 bg-slate-900/45">
                <Gamepad2 size={35} className="text-fuchsia-300" />
              </div>

              <div className="min-w-0 space-y-2">
                <Text.L1 as="p" className="text-slate-300">
                  Create new room
                </Text.L1>
                <Heading level={2} className="text-slate-100">
                  Start a new game
                </Heading>
                <Text.B2 as="p" className="max-w-[340px] text-slate-300">
                  Create a private room and invite your partner to join with a
                  code.
                </Text.B2>
                <button
                  type="button"
                  className="mt-1 inline-flex h-11 items-center gap-2 rounded-[10px] bg-linear-to-r from-fuchsia-500 to-pink-500 px-5 text-white shadow-[0_0_14px_rgba(236,72,153,0.45)] transition hover:brightness-110"
                >
                  <Plus size={16} />
                  <Text.L1 as="span" className="text-white">
                    Create new room
                  </Text.L1>
                </button>
              </div>
            </div>
          </article>

          <article className="rounded-xl border border-cyan-300/30 bg-slate-900/60 p-5 shadow-[0_10px_32px_rgba(8,10,30,0.5)]">
            <div className="flex items-center gap-4">
              <div className="flex h-[84px] w-[84px] shrink-0 items-center justify-center rounded-full border border-cyan-300/35 bg-slate-900/45">
                <Users size={34} className="text-fuchsia-300" />
              </div>

              <div className="min-w-0 space-y-2">
                <Text.L1 as="p" className="text-slate-300">
                  Join existing room
                </Text.L1>
                <Heading level={2} className="text-slate-100">
                  Join with a code
                </Heading>
                <Text.B2 as="p" className="max-w-[350px] text-slate-300">
                  Enter a room code to join an existing game created by your
                  partner.
                </Text.B2>

                <div className="mt-1 flex w-full max-w-[370px] items-center gap-2">
                  <input
                    type="text"
                    placeholder="Enter 6-character code"
                    className="h-11 w-full rounded-[10px] border border-cyan-300/25 bg-slate-950/40 px-4 text-slate-100 placeholder:text-slate-400 focus:border-fuchsia-300/70 focus:outline-none"
                  />
                  <button
                    type="button"
                    aria-label="Join room"
                    className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] border border-cyan-300/25 bg-slate-950/40 text-slate-200 transition hover:border-fuchsia-300/70 hover:text-white"
                  >
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </article>
        </div>

        <section className="rounded-xl border border-cyan-300/25 bg-slate-900/60 p-5 shadow-[0_10px_32px_rgba(8,10,30,0.5)]">
          <Text.L1 as="p" className="mb-4 text-slate-300">
            How it works
          </Text.L1>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:items-start">
            {steps.map((step, idx) => (
              <div key={step.id} className="flex items-start gap-3">
                <div className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-fuchsia-300/45 bg-fuchsia-500/20">
                  <Text.B1 as="span" className="text-fuchsia-300">
                    {step.id}
                  </Text.B1>
                </div>
                <div className="min-w-0">
                  <Heading level={5} className="text-slate-100">
                    {step.title}
                  </Heading>
                  <Text.B2 as="p" className="mt-1 text-slate-300">
                    {step.description}
                  </Text.B2>
                </div>

                {idx < steps.length - 1 && (
                  <ArrowRight
                    size={18}
                    className="ml-auto mt-1 hidden text-slate-400 md:block"
                  />
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
