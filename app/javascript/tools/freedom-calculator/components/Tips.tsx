import React from "react";
import TipCard from "../../../components/tip-card/TipCard";
import { ClockIcon, BookIcon, FundsIcon } from "../../../components/icons";

export default function Tips(): JSX.Element {
  return (
    <div className="flex flex-col">
      <TipCard
        title="Adopting survival instincts"
        icon={<BookIcon className="bg-teal text-teal" />}
      >
        Financial independence has more to do with avoiding screw-ups than
        making sound decisions. Because for most people, keeping wealth is
        harder than acquiring it. For enduring wealth, a healthy combination of
        moderation (great savings rate!) and skepticism (ignoring the noise) is
        a proven formula.
      </TipCard>

      <TipCard
        title="Becoming financially unbreakable"
        icon={<ClockIcon className="bg-red text-red" />}
        className="mt-4"
      >
        A long-term financial strategy should be built around survival.
        Compounding is incredible but it has one prerequisite - time. Meaning,
        it only works if you can stick around, stay focused, and avoid taking
        risks that will wipe you out.
      </TipCard>

      <TipCard
        title="Your savings rate is key"
        icon={<FundsIcon className="bg-blue text-blue" />}
        className="mt-4"
      >
        Focusing on what you can control is the key to boosting your financial
        health. And while many factors contribute to accumulating wealth — a
        robust savings rate can do most of the heavy lifting. You can save money
        on a high income, a low income, or a variable income. You simply have to
        set the goal, and stick to it.
      </TipCard>
    </div>
  );
}
