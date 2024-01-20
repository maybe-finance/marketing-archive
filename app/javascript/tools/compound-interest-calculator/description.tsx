import React from "react";

export default function Description(): JSX.Element {
  return (
    <div className="px-4">
      <h2 className="mb-6 text-3xl font-black font-display">
        What is compound interest and how does it work?
      </h2>
      <p className="mb-6 text-2xl">
        Compound interest is a powerful tool that can help you grow your money.
        But what exactly is compound interest? It's when the interest you earn
        on an investment begins to earn interest itself, creating a "snowball
        effect" that can lead to significant growth over time.
      </p>
      <h3 className="mt-8 mb-3 text-2xl font-black font-display">
        How compound interest works
      </h3>
      <p className="mb-6 text-lg text-gray-200">
        To understand how compound interest works, let's say you invest $1,000
        at a 5% annual rate of return. After one year, you would have earned $50
        in interest for a total balance of $1,050.
      </p>
      <p className="mb-6 text-lg text-gray-200">
        However, in year two, your interest would be calculated not on the
        original $1,000 investment but on the new balance of $1,050. This means
        you would earn $52.50 in interest during year two, for a new total
        balance of $1,102.50.
      </p>
      <p className="mb-6 text-lg text-gray-200">
        And in year three, your interest would be calculated on the new balance
        of $1,102.50, resulting in an additional $55.13 in interest and a new
        total balance of $1,157.63.
      </p>
      <p className="mb-6 text-lg text-gray-200">
        As you can see, your investment earns more interest each year than it
        did the previous year—a phenomenon known as compounding.
      </p>
      <p className="mb-6 text-lg text-gray-200">
        Compounding occurs because investments are typically held for more than
        one year and reinvested periodically. When this happens, the earnings
        from the investment—which include both capital gains and dividends—are
        added back into the investment account so that they can continue to grow
        and compound over time. This creates a snowball effect that can lead to
        significant growth over time.
      </p>
      <h3 className="mt-8 mb-3 text-2xl font-black font-display">
        How you can use compound interest to grow your wealth
      </h3>
      <p className="mb-6 text-lg text-gray-200">
        Now that we've talked about how compounding works let's discuss how you
        can use it to grow your wealth.{" "}
        <b>The first step is to start investing early</b>—the sooner you start
        investing, the longer your money has to compound and grow.
      </p>
      <p className="mb-6 text-lg text-gray-200">
        For example, if you start investing at age 25 and don't retire until age
        65, your money will have 40 years to compound before you need to access
        it. However, if you wait until age 35 to start investing, you'll only
        have 30 years for your money to grow—10 fewer years than if you had
        started sooner.
      </p>
      <p className="mb-6 text-lg text-gray-200">
        The second step is to invest regularly—the more frequently you invest
        (within reason), the faster your money will grow through compounding.
        For example, assume you can invest $500 per month starting at age 25
        with an average annual return of 8%. If you make monthly contributions
        for 40 years until age 65 and don't touch the money until then, you'll
        have nearly $2 million when you retire! If you had waited 10 years to
        start investing (so that your investment period was only 30 years
        instead of 40), your nest egg would only be worth about $1 million at
        retirement—half as much as if you had started sooner.
      </p>
      <p className="mb-6 text-lg text-gray-200">
        The third step is to reinvest your earnings—this allows them to continue
        compounding and helps accelerate the growth of your investment account.
        For example, let's say you have an investment account with a beginning
        balance of $10,000 that earns 10% annually. If you don't reinvest the
        earnings each year but allow them to remain in the account so they can
        continue earning interest themselves (i.,e., compounding), then after
        five years, your account balance will have grown to nearly $16,000!
        However, suppose you don't reinvest those earnings but instead take them
        out of the account so they're no longer working for you (i.,e., not
        compounding), then after five years. In that case, your account balance
        will only be worth about $14,000—nearly $2k less than if had allowed
        those earnings stay invested and continue compounding.
      </p>
    </div>
  );
}
