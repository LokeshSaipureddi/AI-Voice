import Link from "next/link";
import { PageLayout } from '~/components/client/page-layout';
import { getHistoryItems } from '~/lib/history';
import { auth } from "~/server/auth";
import { db } from "~/server/db";
import { SoundEffectsGenerator } from '~/components/client/sound-effects/sound-effects-generator';

export default async function SoundEffectsGeneratePage() {
  const session = await auth();
  const userId = session?.user.id;

  let credits = 0;

  if (userId) {
    const user = await db.user.findUnique({
      where: { id: userId },
      select: {
        credits: true,
      },
    });
    credits = user?.credits ?? 0;
  }


  const soundEffectsTabs = [
    {
      name: "Generate",
      path: "/app/sound-effects/generate",
    },
    {
      name: "History",
      path: "/app/sound-effects/history",
    },
  ];


  return (
    <PageLayout
      title={"Sound Effects"}
      showSidebar={false}
      tabs={soundEffectsTabs}
      service="make-a-sound"
    >
      <SoundEffectsGenerator credits={credits} />
    </PageLayout>
  );
}
