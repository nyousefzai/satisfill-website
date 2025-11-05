import SubscriptionCard from "@/components/common/subscription-card";
import Image from "next/image";
import { Fragment } from "react/jsx-runtime";

const exerciseData = [
  {
    title: "Obesity –",
    items: [
      { name: "1. Insulin Resistance", result: "Yes" },
      { name: "2. Blood Sugar Levels", result: "Yes" },
      { name: "3. Muscle Oxygen Utilization", result: "Yes" },
      { name: "4. Basal Metabolic Rate", result: "Yes" },
      { name: "5. Metabolizing Body Fat", result: "Yes" },
      { name: "6. Fat Metabolizing Enzymes", result: "Yes" },
    ],
  },
  {
    title: "Heart Disease—",
    items: [
      { name: "7. Strengthening The Heart", result: "Yes" },
      { name: "8. LDL Cholesterol Levels", result: "Yes" },
      { name: "9. HDL Cholesterol Levels", result: "Yes" },
      { name: "10. LDL Cholesterol Oxidation", result: "Yes" },
      { name: "11. High Blood Pressure", result: "Yes" },
    ],
  },
  {
    title: "Blood Clotting Risk Factors:",
    items: [
      { name: "13. Platelet Adhesiveness", result: "Yes" },
      { name: "14. Lipoprotein(a) Levels", result: "Yes" },
      { name: "15. Homocysteine Levels", result: "Yes" },
      { name: "16. Triglyceride Levels", result: "Yes" },
      { name: "17. Fibrinogen Levels", result: "Yes" },
      { name: "18. Blood Viscosity", result: "Yes" },
    ],
  },
  {
    title: "Cancer –",
    items: [
      { name: "19. Immune System Function", result: "Yes" },
      { name: "20. Cell DNA Condition", result: "---" },
      {
        name: "21. Types of Cancer Affected: Breast, Colon, and Prostate",
        result: "Yes",
      },
    ],
  },
];

export default function MembershipPlansAndPricing() {
  const plans = [
    {
      title: "1 Month Plan",
      description: "$45.00",
    },
    {
      title: "4 Month Plan",
      description: (
        <>
          $100.00 <br />
          $25/month x 4
        </>
      ),
      highlight: true,
    },
    {
      title: "12 Month Plan",
      description: (
        <>
          $180.00 <br />
          $15/month x 12
        </>
      ),
    },
  ];

  return (
    <div id="plans-pricing">
      <div>
        <header className="px-4 py-1 bg-sky-200">
          <div className="section flex items-center gap-4">
            <div>
              <Image
                src="/satisfill-diet.png"
                alt="Satisfill Logo"
                width={150}
                height={50}
                className="max-h-[100px] w-auto"
              />
            </div>

            <h2 className="text-4xl font-semibold text-sky-700">
              Membership Plans & Pricing
            </h2>
          </div>
        </header>

        <div className="section px-4 pt-20 pb-20 text-lg [&_td]:p-4 [&_table]:mx-auto">
          <div className="grid md:grid-cols-3 gap-8 justify-center">
            {plans.map((plan) => (
              <SubscriptionCard
                key={plan.title}
                title={plan.title}
                description={plan.description}
                highlight={!!plan.highlight}
              />
            ))}
          </div>
          <div className="mt-8 text-center">
            NOTE: Each membership plan is billed upfront, and will auto-renew,
            unless it is cancelled.
          </div>

          <div className="my-20">
            <h4 className="text-2xl">
              <b>
                The Satisfill Diet Plan is not only simple and easy, it is also
                very Budget Friendly and Affordable —
              </b>
            </h4>

            <table>
              <tr className="[&>td]:border-b [&>td]:border-gray-300">
                <td></td>
                <td>1200 Calories</td>
                <td>1800 Calories</td>
              </tr>
              <tr>
                <td>
                  Estimated Weekly Food Cost:
                  <br />
                </td>
                <td>$99.00</td>
                <td>$133.00</td>
              </tr>
              <tr>
                <td>
                  This is for groceries purchased at your local supermarket.
                  (Based on foods purchased at Safeway Supermarkets in the San
                  Francisco Bay Area, with no discounts, January 2025.)
                </td>
              </tr>
            </table>
          </div>

          <div className="my-20">
            <h4 className="text-2xl">
              <b>
                Estimated Cost to Stock Your Refrigerator and Pantry with Food
                and Non-Food Items to Start the Diet Plan –
              </b>
            </h4>

            <table>
              <tr className="[&>td]:border-b [&>td]:border-gray-300">
                <td></td>
                <td>1200 Calories</td>
                <td>1800 Calories</td>
              </tr>
              <tr>
                <td>Supermarket Foods (7 to 90 days)</td>
                <td>$200.00</td>
                <td>$263.00</td>
              </tr>
              <tr>
                <td>Online Foods (60 to 90 days)</td>
                <td>$72.00</td>
                <td>$91.00</td>
              </tr>
              <tr>
                <td>Non-Food Items (One Time Purchase) </td>
              </tr>
              <tr>
                <td className="pl-8!">
                  Purchased In Store --
                  <br /> Measuring Cups <br />
                  Food Containers <br />
                  Dressing Container
                </td>
                <td>$23.00</td>
                <td>$23.00</td>
              </tr>
              <tr>
                <td className="pl-8!">
                  Purchased Online -<br /> Digital Kitchen Scale <br />
                  Thermal Lunch Box
                </td>
                <td>$27.00</td>
                <td>$27.00</td>
              </tr>
              <tr>
                <td>Total</td>
                <td>$322.00</td>
                <td>$404.00</td>
              </tr>
            </table>
            <br />
            <br />
            <p>
              NOTE: You will be provided with all the info that you need to
              purchase all of these items both in store and online.{" "}
            </p>
          </div>

          <div>
            <h4 className="text-center text-3xl font-semibold text-sky-700">
              Our Mission:
            </h4>
            <h5 className="text-center text-2xl font-semibold  text-sky-700">
              Fighting Obesity and Overweight
            </h5>
            <b className="text-center block mt-4">
              The current Obesity Epidemic is the #1 health crisis in America
              and in the world today.
            </b>
            <p className="text-center mt-6 italic max-w-md mx-auto">
              <b>
                “For the first time in human history, obesity has surpassed
                starvation as a cause of death.” <br />
                <span className="text-base">-- The Lancet Medical Journal</span>
              </b>

              <Image
                src="/obese.png"
                alt="Obesity Statistics"
                width={600}
                height={400}
                className="mx-auto mt-6"
              />
              <span className="text-center text-sm">
                Source: Center of Disease Control (CDC)
              </span>
            </p>
            <b>
              According to the CDC (Centers for Disease Control and Prevention),
              Obesity has now become the #3 Killer in the U.S., accounting for
              over 500,000 deaths each year.
            </b>
            <br />
            <br />
            The four leading causes of death in America today are —
            <div className="pl-8 mt-4 mb-4">
              Heart Disease
              <br />
              Cancer
              <br />
              Obesity
              <br />
              Diabetes
            </div>
            These four diseases account for 80% of all deaths, a total of over 2
            million deaths each year.
            <br />
            <br />
            <b>But obesity stands alone as a killer. Here’s why —</b>
            <br />
            <br />
            <b>
              Of the four major lifestyle diseases, obesity is clearly the “most
              pervasive.” Meaning, that it aggravates and makes worse, every
              other major disease and health problem —
            </b>
            including Heart Disease, Cancer, Diabetes, Arteriosclerosis, and
            Hypertension. In fact, a number of studies have established strong
            links between obesity and more than 30 other medical conditions.
            <br />
            <br />
            <b>
              No other health condition known to man today comes close to
              reeking he kind of internal systemic destruction of the body, as
              does obesity.
            </b>
            <br />
            Obesity is this nation&apos;s #1 health crisis and it represents the
            greatest threat facing the American people and the world today.
          </div>

          <div className="mt-10">
            <p className="text-sky-700 text-2xl my-4">
              <b>Join the fight and make a difference.</b>
            </p>
            I’m Jeff Lenn, the founder of Satisfill Foods and the Satisfill Diet
            Plan. Satisfill has given my life meaning and purpose, and I will be
            forever grateful that I have been able to do something worthwhile,
            and really make a difference in people’s lives. You can make a
            difference too.
            <br />
            <br />
            In 2017, when Satisfill Foods was formed, our mission was clear —
            Fighting Obesity and Overweight. I want to personally invite you to
            support our mission, and join the fight. By joining the fight, you
            can make a difference, not only in your own life, but in the lives
            of the staggering 72% of American adults that are struggling with
            obesity and overweight.
            <br />
            <br />
            <b>Here is how you can join the fight and make a difference —</b>
            <br />
            <br />
            <b>First,</b> become a subscription member of the Satisfill Diet
            Plan for as little as $15 per month, and start losing weight and
            getting healthy.
            <br />
            <br />
            <b>Second,</b> make a donation to the Obesity Action Coalition.
            Since its inception in 2005, the OAC has become the nation’s leading
            voice on obesity. Today, with more than 70,000 members, the OAC is a
            nonprofit organization focused solely on — raising awareness and
            improving access to the prevention and treatment of the disease of
            obesity.
            <br />
            <br />
            To make a donation, simply go to the OAC website (link) and click on
            Donate.
            <br />
            <br />
            Thank you for making a difference.
            <br />
            <br />
            Jeff Lenn Founder
          </div>

          <div className="mt-10">
            <div className="max-w-3xl mx-auto">
              <p className="text-center text-2xl text-sky-700">
                <b>The Underlying Cause of the Obesity Epidemic</b>
              </p>
              <br />
              As human beings, we are hard-wired to overeat, as a survival
              mechanism, when given the opportunity.
              <br />
              <br />
              As human beings, we are also prone to seek ease and comfort,
              whenever possible.
              <br />
              <br />
              Tragically, life in America today has enabled us to realize both
              inclinations – to overeat and to take it easy – to the extreme.
              <br />
              <br />
              On the one hand, we are overwhelmed with food – food is
              convenient, tasty, cheap, and available anywhere, and at any time.
              <br />
              <br />
              On the other hand, this is the age of the -- sedentary lifestyle
              -- Both of these trends have combined to create the “perfect
              storm” for Obesity and Overweight, and they have become the #1
              health crisis in America today.
            </div>

            <div className="flex wrap gap-10 text-center mt-10">
              <div className="w-full">
                <p className="italic font-semibold text-xl">Overeating</p>
                <Image
                  src="/obese-eating.png"
                  alt="Overeating"
                  width={300}
                  height={200}
                  className="w-full"
                />
                <span className="text-center">Source: Elephant Journal</span>
              </div>

              <div className="w-full">
                <p className="italic font-semibold text-xl">
                  Sedentary Lifestyle
                </p>
                <Image
                  src="/sitting.png"
                  alt="Sedentary Lifestyle"
                  width={300}
                  height={200}
                  className="w-full"
                />
                <span className="text-center">Source: Everyday Health</span>
              </div>
            </div>
          </div>

          <div className="my-20">
            <div>
              <p className="text-center text-2xl text-sky-700">
                <b>The Principle of Energy Balance</b>{" "}
              </p>
              <br />
              The diet industry is huge, at over $70 Billion in annual revenue.
              It is fueled by and thrives on two unfortunate trends. One, the
              constant proliferation of diet theories, books, and fads, from the
              recent Keto diet craze, to the ongoing debate over low fat vs low
              carb diets. Two, the constant demand by a gullible public for the
              next quick-fix, magic bullet, and miracle diet, which will save
              them from having to face “weight reality.” In spite of these
              misguided trends, for over 50 years, the medical and scientific
              community, along with every major health organization in the
              country has steadfastly proclaimed the following fundamental
              truth:{" "}
              <b>
                The key to weight loss and permanent weight control is in
                understanding and applying the principle of Energy Balance.
              </b>
              <br />
              <br />
              Energy balance, or calorie balance, is what determines your body
              weight. Energy balance is simply the interplay between your energy
              input and your energy output. The energy balance equation looks
              like this —
              <Image
                src="/energy-in-out.png"
                alt="Energy Balance Equation"
                width={600}
                height={200}
                className="mx-auto w-full max-w-3xl my-6"
              />
            </div>

            <div>
              <p className="text-green-700 mb-4">
                {" "}
                <b>Energy Input</b>
              </p>{" "}
              We input energy when we eat. The food we consume provides
              calories. Calories are simply a unit of energy or heat. The food
              we eat and the drink we consume provide different amounts of
              energy — Protein and Carbohydrates each provide 4 calories per
              gram, whereas fat provides 9 calories per gram.
            </div>

            <div>
              <p className="text-red-700 mt-10 mb-4">
                {" "}
                <b>Energy Output</b>
              </p>{" "}
              Basal Metabolic Rate (BMR) — 60-75% of calories burned.
              <br />
              Even when you’re sleeping, your body uses energy to perform basic
              functions like breathing and blood circulation. The energy used
              for these basic functions is called your basal metabolic rate
              (BMR), and it makes up roughly 60-75% of the total number of
              calories you burn each day.
              <br />
              <br />
              Food Digestion — 10% of calories burned.
              <br />
              The thermic effect of food when you eat and digest meals and
              snacks makes up roughly 10% of the calories you burn each day.
              <br />
              <br />
              Activities of Daily Living — 15-30% of calories burned.
              <br />
              All the physical activities that you engage in each day, like
              walking, getting dressed, fixing meals, your work, and of course,
              physical exercise, makes up roughly 15-30% of the calories you
              burn each day.
              <br />
              <br />
              If you lead a “sedentary lifestyle,” as most adults do, like
              sitting at a computer most of the day, the calories you burn each
              day is probably around 15%. However, if you lead a “physically
              active lifestyle,” wherein your work is physically demanding
              and/or you engage in daily physical exercise, the calories you
              burn each day is probably closer to 30%.
              <br />
              <br />
            </div>

            <div>
              <p className="text-green-700">
                {" "}
                <b> How Energy Balance Works</b>
              </p>
              If your energy input and your energy output are perfectly
              balanced, you won’t gain or lose weight — your weight will remain
              stable.
              <br />
              <br />
              <b>Positive Energy Balance:</b> This occurs when your energy input
              is greater than your energy output. That is, you eat more calories
              than your body needs, and you store the excess energy or calories
              as fat. This results in weight gain. The storage of approximately
              3,500 excess calories as fat equals one pound of body weight
              gained.
              <br />
              <br />
              <b className="pl-8">
                Weight Gain = Energy Input &gt; Energy Output
              </b>
              <br />
              <br />
              <b> Negative Energy Balance:</b> This occurs when you burn more
              calories than you consume. When this imbalance occurs, your body
              burns stored energy (fat) in order to function. This results in
              weight loss. The burning of approximately 3,500 calories of stored
              fat equals one pound of body weight lost.
              <br />
              <br />
              <b className="pl-8">
                {" "}
                Weight Loss = Energy Output &gt; Energy Input
              </b>
              <br />
              <br />
              Ultimately, for optimum weight loss, weight control, and overall
              health, you need to harness both parts of the energy balance
              equation. Think of it as an “energy balance one-two-punch.” To
              maximize weight loss and weight control, you need to do two things
              simultaneously —<br />
              <br />
              <div className="flex justify-around items-center wrap gap-4">
                <b className="text-green-700">Diet — Eat fewer calories</b>{" "}
                <b className="text-red-700">Exercise — Burn more calories</b>
              </div>
            </div>
          </div>

          <div>
            <p className="text-center text-2xl text-sky-700">
              <b>Body Mass Index (BMI)</b>{" "}
            </p>
            <br />
            BMI is generally regarded as the easiest and most credible method
            currently available for calculating your body fatness, as well as
            classifying body fatness into standard weight categories. In fact,
            most health experts, and nearly all health agencies, like the CDC
            (Center for Disease Control and Prevention), use the BMI as the
            “Gold Standard” for accessing body fatness.
            <br />
            <br />
            BMI does not measure body fat directly, but instead, uses a formula
            to calculate your body fatness as a number, based on your height and
            weight. The other methods used to measure body fat directly are much
            more difficult to conduct, and more expensive, they include --
            skinfold thickness measurements (with calipers), underwater
            weighing, bioelectrical impedance, dual- energy x-ray absorptiometry
            (DXA), and isotope dilution.
            <br />
            <br />
            BMI is calculated the same way for men, women, and children. The
            calculation is based on the following formula: weight (Ibs) /
            [height (in)] squared x 703
            <br />
            <br />
            That is — BMI is calculated by dividing weight in pounds by height
            in inches, squared, and multiplying by a factor of 703.
            <br />
            <br />
            <p className="pl-8">
              Example: 135 lbs weight, 69 in height (5°9”)
              <br />
              Calculation: 135/(69 x 69 =4,761) x 703 = 19.93
            </p>
            <br />
            Standard Weight Categories have been established by dividing the BMI
            numbers into four ranges, as shown below —<br />
            <table>
              <tr className="[&>td]:border-b [&>td]:border-gray-300">
                <td>BMI</td>
                <td>Weight Category</td>
              </tr>
              <tr>
                <td>Below 18.5</td>
                <td>Underweight</td>
              </tr>
              <tr>
                <td>18.5 to 24.9</td>
                <td>Normal or Healthy Weight</td>
              </tr>
              <tr>
                <td>25.0 to 29.9</td>
                <td>Overweight</td>
              </tr>
              <tr>
                <td>30.0 and Above</td>
                <td>Obesity</td>
              </tr>
            </table>
            <br />
            Although the above BMI calculation is fairly simple to do and is
            exact, there is even a simpler and more graphic way to determine
            your BMI number, by using one of the many BMI Charts that are
            available, like the one below. <br /> <br />
            Directions: To get your BMI from the chart, all you need to do is
            find your weight at the left, and your height at the top. Then,
            going right from your weight, and going down from your height, find
            your BMI number where the two columns intersect. <br /> <br />
            <h4 className="text-center text-2xl font-semibold">
              Body Mass Index (BMI)
            </h4>
            <Image
              src="/bmi.png"
              alt="Body Mass Index Chart"
              width={800}
              height={1200}
              className="mx-auto w-full my-6"
            />
          </div>

          <div className="my-20">
            <p className="text-center text-2xl text-sky-700">
              <b>Exercise</b>{" "}
            </p>
            <br />
            <b>Introduction</b>
            <br />
            The underlying cause of Obesity and Overweight is two-fold —
            <p className="pl-8">
              Overeating
              <br />
              Sedentary Lifestyle
            </p>{" "}
            <br />
            The key to weight loss is understanding the Principle of Energy
            Balance —
            <p className="pl-8">
              Energy Input — How much you eat.
              <br />
              Energy Output — How much you move (exercise).
            </p>
            <br />
            Ultimately, for optimum weight control, and overall health, you need
            to harness both parts of the energy balance equation. Think of it as
            an “energy balance one-two-punch.” To maximize weight control, you
            need to do two things simultaneously —
            <p className="pl-8 font-semibold">
              Diet — Eat fewer calories
              <br />
              Exercise — Burn more calories
            </p>
            <br />
            There’s a wonderful <b>‘synergy’</b> that comes into play between
            diet and exercise. Once you start to eat right to lose weight, you
            will naturally want to start exercising right to lose weight. In
            other words, the more you do one, the more you will want to do the
            other, and vice versa.
            <br />
            <br />
            <b>Aerobic Exercise</b>
            <br />
            The term aerobic means “with oxygen.” Aerobic Exercise, sometimes
            called Endurance Exercise or Cardiorespiratory Exercise, or just
            Cardio, strengthens and conditions your heart and lungs. It gets
            your heart pumping and your lungs breathing, by engaging the large
            muscles of your lower body.
            <br />
            <br />
            <b>Benefits of Aerobic Exercise</b>
            <br />
            Here are some of the many health benefits derived from Aerobic
            Exercise —
            <ul className="list-disc pl-8">
              <li>Improves Cardiorespiratory Health</li>
              <li>Lowers Blood Pressure</li>
              <li>Regulates Blood Sugar</li>
              <li>Regulates Body Weight</li>
              <li>Strengthens Immune System</li>
              <li>Improves Brain Function</li>
              <li>Reduces Stress, Anxiety, and Depression</li>
              <li>Improves Mood</li>
              <li>Improves Sleep</li>
              <li>
                But the most important health benefit derived from Aerobic
                Exercise, that encompasses nearly all of the benefits listed
                above, is this —
              </li>
              <li>Improves Metabolic Function</li>
            </ul>
          </div>

          <div>
            <p className="text-center text-2xl text-sky-700">
              <b> Aerobic Exercise and Metabolic Function</b>{" "}
            </p>
            <br />
            Regular aerobic exercise is the key to optimum human metabolic
            function, and it plays a major role in weight control, overall
            health, and longevity.
            <br />
            <br />
            The best way to explain the importance of metabolic function is to
            draw an <b>‘analogy.’</b>
            <br />
            <br />
            ‘We all know that an engine is what powers a car, and in order to
            run properly, an engine needs to be tuned up. An engine that isn’t
            tuned up will run badly, perform poorly, and it may even stall-out
            and die. On the other hand, an engine that is properly tuned up will
            run smoothly, perform well, it will be very reliable, and it will
            last a long time.{" "}
            <b>
              In a similar way, our metabolism is the engine that powers our
              bodies, and in order to run properly, our metabolism needs to be
              tuned up as well.
            </b>{" "}
            Regular aerobic exercise is how we tune up our metabolism. If we
            don’t engage in regular aerobic exercise, our metabolic engine gets
            out of tune, and it begins to run badly — insulin resistance is
            triggered — and this leads to fat storage, weight gain, obesity, and
            major health problems.
            <br />
            <br />
            <b>
              {" "}
              There is now overwhelming scientific evidence that 20 of the 21
              metabolic conditions associated with Obesity, Heart Disease, and
              Cancer, are significantly improved through regular aerobic
              exercise —
            </b>
            <table className="font-semibold [&_td]:p-0!">
              <tr>
                <td></td>
                <td>
                  Published Scientific Validation That Condition is Improved
                  Through
                </td>
              </tr>
              <tr className="[&>td]:border-b [&>td]:border-gray-300">
                <td>Metabolic Condition</td>
                <td>Regular Aerobic Exercise</td>
              </tr>
              {exerciseData.map((group) => (
                <Fragment key={group.title}>
                  <tr>
                    <td colSpan={2}>
                      <strong>{group.title}</strong>
                    </td>
                  </tr>
                  {group.items.map((item) => (
                    <tr key={item.name}>
                      <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{item.name}</td>
                      <td>{item.result}</td>
                    </tr>
                  ))}
                </Fragment>
              ))}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
