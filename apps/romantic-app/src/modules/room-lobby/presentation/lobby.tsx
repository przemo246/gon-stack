import {
  CircleHelp,
  ArrowLeft,
  Clock3,
  Users,
  Gamepad2,
  Sparkles,
  Link2,
  Heart,
} from 'lucide-react';
import { Avatar } from '@/libs/ui/avatar';
import { Badge } from '@/libs/ui/badge';
import { Button } from '@/libs/ui/button';
import { Card } from '@/libs/ui/card';
import { Heading } from '@/libs/ui/heading';
import { Link } from '@/libs/ui/link';
import { Separator } from '@/libs/ui/separator';
import { Text } from '@/libs/ui/text';
import { useContext } from './context';

const roomInfo = [
  { icon: Gamepad2, label: 'Category', value: 'Couples - Deep Connection' },
  { icon: Sparkles, label: 'Difficulty', value: 'Medium' },
  { icon: Clock3, label: 'Estimated time', value: '30-45 min' },
  { icon: Users, label: 'Players', value: '2 players' },
] as const;

const steps = [
  {
    icon: Link2,
    title: 'Invite your partner',
    description: 'Share the code or link to invite them.',
  },
  {
    icon: Users,
    title: 'Both join the room',
    description: 'They enter the code to join the same room.',
  },
  {
    icon: Heart,
    title: 'Start the game',
    description: 'When both players are in, the game begins!',
  },
] as const;

export const Lobby = () => {
  const ctx = useContext();
  const roomCode = ctx.useRoomCode() ?? '------';

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[1280px] flex-col">
      <div className="flex-1 px-3 pb-8 pt-6 tn:px-4 sm:px-6 sm:pt-8 lg:px-8 lg:pt-10">
        <Link href="/" className="mb-6 inline-flex md:mb-8" variant="secondary">
          <ArrowLeft /> Back to home
        </Link>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
          <section className="space-y-4 md:space-y-5">
            <div className="space-y-2">
              <Text.L1 as="p">Room lobby</Text.L1>
              <Heading
                level={2}
                className="text-3xl leading-tight sm:text-4xl lg:text-5xl"
              >
                Waiting for your partner
              </Heading>
              <Text.B1 className="max-w-2xl">
                Share the code below or invite your partner to join. The game
                starts when both players are in.
              </Text.B1>
            </div>

            <Card className="overflow-hidden p-0">
              <div className="space-y-4 p-4 sm:p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="space-y-2">
                    <Text.L1 as="p">Room code</Text.L1>
                    <Text.T2
                      as="p"
                      className="text-5xl leading-none tracking-[0.12em] text-primary-300 sm:text-6xl"
                    >
                      {roomCode}
                    </Text.T2>
                  </div>

                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-1 sm:justify-items-end">
                    <Button type="button" className="h-10 px-4 py-2">
                      Copy code
                    </Button>
                    <Button
                      type="button"
                      variant="secondary"
                      className="h-10 px-4 py-2"
                    >
                      Share link
                    </Button>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-3 p-4 sm:p-5">
                <Text.L1 as="p">Players</Text.L1>
                <div className="flex items-start gap-3">
                  <Avatar size="sm" initials="T" />
                  <div className="min-w-0 space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <Text.B2 as="p" className="text-text-primary">
                        Tom
                      </Text.B2>
                      <Badge variant="primary">You</Badge>
                    </div>
                    <Text.B3 className="text-success">Ready to play</Text.B3>
                  </div>
                </div>

                <div className="rounded-xl border border-dashed border-secondary-300/35 bg-surface-50/45 p-3">
                  <div className="flex items-start gap-2">
                    <span
                      className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full border border-secondary-300/45 bg-surface-100/70"
                      aria-hidden="true"
                    >
                      <CircleHelp size={12} className="text-text-tertiary" />
                    </span>
                    <div className="space-y-0.5">
                      <Text.B2 as="p" className="text-text-secondary">
                        Waiting for partner to join...
                      </Text.B2>
                      <Text.C1 as="p">Share the code or link above</Text.C1>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </section>

          <aside className="w-full lg:sticky lg:top-6">
            <Card className="space-y-5 p-4 sm:p-5">
              <div className="space-y-3">
                <Text.L1 as="p">Room info</Text.L1>
                <div className="space-y-3">
                  {roomInfo.map(({ icon: Icon, label, value }) => (
                    <div
                      key={label}
                      className="grid grid-cols-[1fr_auto] gap-x-3 gap-y-1"
                    >
                      <div className="flex items-center gap-2">
                        <Icon
                          size={15}
                          className="text-primary-300"
                          aria-hidden="true"
                        />
                        <Text.B2 as="p" className="text-text-primary">
                          {label}
                        </Text.B2>
                      </div>
                      <Text.B2
                        as="p"
                        className="text-right text-text-secondary"
                      >
                        {value}
                      </Text.B2>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <Text.L1 as="p">How it works</Text.L1>
                <ul className="space-y-3">
                  {steps.map(({ icon: Icon, title, description }) => (
                    <li key={title} className="flex items-start gap-3">
                      <span
                        className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full border border-primary-300/40 bg-primary-500/15"
                        aria-hidden="true"
                      >
                        <Icon size={13} className="text-primary-300" />
                      </span>
                      <div className="space-y-0.5">
                        <Text.B2 as="p" className="text-text-primary">
                          {title}
                        </Text.B2>
                        <Text.C1 as="p">{description}</Text.C1>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl border border-secondary-300/35 bg-secondary-500/12 p-3">
                <Text.B2 as="p" className="text-text-primary">
                  Tip
                </Text.B2>
                <Text.C1 as="p">
                  Keep this tab open. We&apos;ll notify you when your partner
                  joins.
                </Text.C1>
              </div>
            </Card>
          </aside>
        </div>
      </div>

      <div className="px-3 tn:px-4 sm:px-6 lg:px-8">
        <Separator className="border-secondary-300/35" />
      </div>

      <footer className="px-3 pb-4 pt-4 tn:px-4 sm:px-6 lg:px-8">
        <Text.B2 as="p" className="text-center">
          Have questions? Check out{' '}
          <Link
            href="#"
            variant="primary"
            className="text-primary-300 underline underline-offset-2 hover:text-primary-200"
          >
            how it works
          </Link>{' '}
          or{' '}
          <Link
            href="#"
            variant="primary"
            className="text-primary-300 underline underline-offset-2 hover:text-primary-200"
          >
            contact support
          </Link>
          .
        </Text.B2>
      </footer>
    </div>
  );
};
