import Image from "next/image";

export default function EasiestDietToFollow() {
  return (
    <div id="easiest-diet-to-follow">
      <div
        style={{
          backgroundImage: 'url("/sky2.jpg")',
        }}
        className="bg-cover bg-center w-full"
      >
        <header className="bg-white/50 px-4 py-1">
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
              Easiest Diet To Follow
            </h2>
          </div>
        </header>

        <div className="text-center italic py-20">
          <div className="text-4xl font-semibold">
            Our App makes dieting -<br />
            Simple, Easy & Quick
          </div>

          <div className="my-10 w-full">
            <Image
              src="/mobile-app.png"
              alt="Mobile App"
              width={400}
              height={1000}
              className="mx-auto h-full w-full max-w-4xl object-contain"
            />
          </div>
        </div>
      </div>

      <div className="section px-4 py-20 text-lg">
        <div>
          <div className="my-10 w-full relative">
            <Image
              src="/mobile-app.png"
              alt="Mobile App"
              width={400}
              height={1000}
              className="mx-auto h-[450px] w-full max-w-4xl object-cover object-top"
            />
            <div className="absolute bottom-0 left-0 right-0 h-[100px] bg-linear-to-b from-transparent to-white"></div>
          </div>
          <p className="text-center text-2xl">
            <b>
              This is what we mean by -<br />
              Simple, Easy & Quick
            </b>
          </p>
          <p className="mt-10 space-y-4">
            <DotLeader
              title="All the cooking can be done in a"
              value="MICROWAVE OVEN."
            />
            <DotLeader
              title="Nearly all of the three snacks per day require"
              value="NO PREPARATION."
            />
            <DotLeader
              title="All of the recipes can be prepared and cooked in"
              value="UNDER 5 MINUTES."
            />
            <DotLeader
              title="The total prep and cooking time for the 3 meals and  3 snacks per day averages"
              value="UNDER 20 MINUTES."
            />
            <DotLeader
              title="Other Diets (Top 8 Rated Diets) The total prep and cooking time for just 3 meals per day averages"
              value="1 TO 2 HOURS."
            />
            <p>
              NOTE: The 8 other diets that we compared are from US News and
              World Report - Best Diets of 2025 for Healthy Eating
            </p>
          </p>
        </div>

        <div className="my-20">
          <p className="text-center">
            <b>
              A fully integrated diet plan that does
              <br />
              all the dieting grunt work for you.
              <br />
              All you have to do is follow it.
            </b>
          </p>
          <br />
          Most diet and weight loss apps are little more than tracking devices.
          But instead of making dieting easier, these tracking apps amount to
          “time consuming drudgery.” Every day you are expected to track
          everything you eat, everything you do, your steps, your water intake,
          and even your sleep. It’s a lot of work, and for what? The only
          tracking that effectively contributes to weight loss is weight
          tracking, and you will definitely be able to do that on our app.
          <br />
          <br />
          Here are some of the things provided in our Satisfill Diet app that
          will make your diet experience
          <b> simple, easy, and quick.</b>
          <br />
          <br />
          <b>The foods are at your local supermarket:</b> Everybody, whether you
          are on a diet or not, goes to their local supermarket at least once a
          week to buy groceries. It’s convenient and easy. With the Satisfill
          Diet and our web app, you will be doing exactly the same thing. This
          is because nearly all of the foods needed in the Satisfill Diet are
          right there in your local supermarket.
          <br />
          <br />
          <b>Food List:</b> Our app contains a complete and detailed food list
          of all the supermarket groceries needed in the 28-day meal plans, and
          we have &apos;pre-selected&apos; these foods for you. With each food
          listed, you will be given a complete food description, the brand name,
          the container weight, the manufacturer, and the nutrition facts. With
          the complete and detailed information provided, you will be able to
          find each and every food you need easily and quickly.
          <br />
          <br />
          <p className="pl-10 md:pl-20">
            <b>Other Diets:</b> All the major diets only provide a very general
            description of each food, like Low Fat Yogurt, so you are forced to
            sort through the entire yogurt section before determining on your
            own which yogurt to select. Making these selections on your own can
            take a lot of time and effort.
          </p>
          <br />
          <b>Food Availability:</b> All of the foods needed on the Satisfill
          Diet are common foods and readily available at your local supermarket.
          Even the few foods that need to be ordered online, are readily
          available. <br />
          <br />
          <p className="pl-10 md:pl-20">
            <b>Other Diets:</b> All the major diets use a high number of gourmet
            or exotic recipes. As a result, many of the ingredients, like
            Coconut Yogurt Unsweetened, are very difficult to find.
          </p>
          <br />
          <b>Recipe List:</b> Our app contains a complete list of all the
          recipes used in the 28-day meal plans, and without exception, every
          recipe is <b>simple, easy, and quick.</b>
          <br />
          <br />
          <b>Meal Plans:</b> Our app provides a complete 28-day meal plan, at
          the following calorie levels —
          <p className="pl-10 md:pl-20">
            1200 Calories
            <br />
            1500 Calories
            <br />
            1800 Calories
            <br />
            2100 Calories
            <br />
          </p>
          <br />
          Developing four 28-day meal plans, that are nutritious and satisfying,
          with 3 meals and 3 snacks per day, at set calorie levels that are are
          quick and easy, was extremely challenging. But mission accomplished —
          we did it. We have done all the meal planning grunt work for you. All
          you need to do is make the commitment and follow the plans.
          <br />
          <br />
          <p className="pl-10 md:pl-20">
            <b>Other Diets:</b> Needless to say, none of the other major diets
            have come close to providing meal plans that are so complete, yet so
            quick, simple, and easy to follow.
          </p>
          <br />
          <b>Starting Shopping List:</b> Our app contains a complete list of
          everything needed to Get Started, including the first week&apos;s
          grocery shopping list. This list also contains important non-food
          items, like a Digital Kitchen Scale, a Thermal Lunch Box, and various
          food containers for the lunch box, so you can easily pack up your
          lunch and your morning and afternoon snacks, and take them with you to
          work.
          <br />
          <br />
          <b>Weekly Shopping List:</b> As you follow the daily meal plans each
          week, our app will automatically generate a weekly shopping list for
          the coming week.
          <br />
          <br />
        </div>
      </div>
    </div>
  );
}

function DotLeader({ title, value }: { title: string; value: string }) {
  return (
    <div className="flex md:items-end flex-col md:flex-row">
      <div className="max-w-md">{title}</div>
      <div
        className="flex-1 mx-2 mb-2"
        style={{
          borderBottom: "2px dotted #9CA3AF",
          borderSpacing: "8px",
          background:
            "repeating-linear-gradient(to right, #9CA3AF 0, #9CA3AF 2px, transparent 2px, transparent 8px)",
          height: "1px",
        }}
      ></div>
      <div className="shrink-0 font-bold text-blue-700">{value}</div>
    </div>
  );
}
