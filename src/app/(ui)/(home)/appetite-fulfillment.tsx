import { cn } from "@/lib/utils";
import Image from "next/image";

export default function AppetiteFulfillment() {
  return (
    <div id="appetite">
      <div
        style={{
          backgroundImage: 'url("/sky.jpg")',
        }}
        className="bg-cover bg-center w-full"
      >
        <header className="bg-white/90 px-4 py-4">
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
              Appetite Fulfillment
            </h2>
          </div>
        </header>

        <div className="text-center italic py-20 px-4">
          <div className="text-3xl md:text-4xl font-semibold mb-2">
            The Science of
          </div>
          <div className="text-4xl md:text-5xl  font-semibold">
            Appetite Fulfillment
          </div>

          <div className="my-20">
            <Image
              src="/appetite-fulfillment.png"
              alt="Appetite Fulfillment Illustration"
              width={400}
              height={400}
              className="mx-auto w-full max-w-lg object-contain"
            />
          </div>

          <div className="font-semibold mb-2">
            <span className="text-3xl md:text-4xl">
              {" "}
              The solution to the problem of
              <br /> why nearly all diets fail –
            </span>
            <br /> <span className="text-4xl md:text-5xl">Constant Hunger</span>
          </div>
        </div>
      </div>

      <div
        className={cn("py-20 text-lg px-4 max-w-[770px] mx-auto leading-5.5")}
      >
        <div>
          <h4 className="text-sky-700 text-xl mb-4">
            <b>
              Physical Hunger — <i>Your Stomach</i>
            </b>
          </h4>
          When your stomach is empty, you experience true physical hunger, which
          is characterized by a profound empty feeling in your stomach. This
          physical hunger can only be relieved by eating a sufficient quantity
          or volume of food.
          <br />
          <br />
          Foods high in <b>dietary fiber</b>, sometimes called food bulk or
          roughage, like fruits, vegetables, and whole grains, have long been
          recognized as the most effective foods for filling your stomach, so
          you experience a feeling of fullness. Foods high in <b>protein</b>,
          including vegetable proteins, are also considered to be very effective
          foods for filling your stomach, and giving you a feeling of fulness.
          <br />
          <br />
          The Satisfill Diet is especially high in both dietary fiber and
          protein, to ensure that your stomach feels comfortably full throughout
          the day.
          <br />
          <br />
          <b>Frequency of Eating:</b> Not only is a diet high in dietary fiber
          and protein important in achieving a feeling of fulness, but so is the
          frequency of your eating. Studies have clearly shown that eating 6
          smaller meals and snacks per day, rather than 3 large meals, better
          regulates your blood sugar levels and your metabolism, and is better
          at maintaining a feeling of fulness in your stomach. This is why, with
          the Satisfill Diet, you will be eating 6 times a day, consisting of 3
          meals and 3 snacks. As a result, you will always feel some sense of
          fulness, and never experience the hunger pangs usually associated with
          dieting.
          <br />
          <br />
        </div>

        <div>
          <h4 className="text-green-600 text-xl mb-4">
            <b>
              Taste Hunger — <i>Your Palate</i>
            </b>
          </h4>
          Just as compelling as the need to satisfy the physical hunger in your
          stomach is the need to satisfy the taste hunger in your mouth, and on
          your palate. You need the nourishment that comes from food to sustain
          your life, but you also need the pleasure and satisfaction that only
          comes from the taste of food. Indeed, food was made not just to be
          eaten, but to be tasted, savored, and enjoyed. <br />
          <br />
          <h4 className="text-green-600">
            <b>
              The Satisfill Diet may be the best tasting diet plan ever
              developed.
            </b>
          </h4>
          Knowing how critically important flavor and taste are to Appetite
          Fulfillment, everything has been done to make every meal and snack a
          great taste experience. Not only are all the foods rich in flavor and
          taste, but the variety of tastes is unparalleled, incorporating the
          full spectrum of the 7 food flavors — salt, sweet, sour, bitter, fat,
          spicy, and umami or savory. Our foods will be a veritable smorgasboard
          of flavor, and a wonderland for your taste buds to enjoy. Ultimately,
          you won&apos;t feel like you are on a diet at all. Instead, you will
          feel like you are eating the most flavorful, tasty, and delicious
          foods that you have ever had in your life.
          <br />
          <br />
          <b className="text-green-600">Comfort Foods:</b> Comfort foods are
          sometimes described as foods that people turn to during times of
          emotional stress. However, in the context of Appetite Fulfillment,
          comfort foods are -- foods that we are familiar with, foods that we
          are used to eating, foods that we grew up with, and foods that give us
          a feeling of well-being. Typically, these are foods that are part of
          our heritage, our culture, and the American Cuisine.
          <br />
          <br />
          <b className="text-green-600">
            The Satisfill Diet is American Cuisine at its finest, featuring many
            of the Comfort Foods that we have grown to know and love —
          </b>
          <div className="grid grid-cols-1 italic sm:grid-cols-3 max-w-xl mx-auto font-normal">
            {[
              "Cold Cereal",
              "Turkey Sandwich",
              "Veggie Burger",
              "Hot Cereal",
              "Tomato & Cheese Sandwich",
              "Baked Potato",
              "Apple, Banana, Orange",
              "PB & Jelly Sandwich",
              "Grilled Chicken",
              "Raisins, Prunes, Figs",
              "Tossed Green Salad",
              "Mexican Casserole",
              "Yogurt & Berries",
              "Spinach Salad",
              "Minestrone Soup",
              "Protein Bar",
              "Carrot Raisin Salad",
              "Chicken Noodle Soup",
            ].map((food, i) => (
              <div key={i}>{food}</div>
            ))}
          </div>
        </div>

        <div className="mt-20">
          <p className="text-orange-500 mb-4 text-xl font-bold">
            Psychological Hunger - <i>Your Mind</i>
          </p>
          Food doesn&apos;t just reside in grocery stores, and restaurants, and
          in your pantry and refrigerator at home. Food is very much in your
          mind as well. You think about food a lot, and this is not surprising,
          since you eat it several times a day. Seeing food, smelling it, or
          just thinking about it, can trigger your appetite and desire for food,
          whether you are hungry or not.
          <br />
          <br />
          There is currently a lot of focus in the diet industry on
          psychological hunger, often referred to as emotional eating or eating
          behavior. The premise is that if we can better understand emotional
          eating and why we binge and overeat, then our eating behavior will
          change. Unfortunately, this premise simply isn&apos;t valid. A
          fundamental tenant of behavior science is this -<br />
          <b className="pl-20">
            A change in action needs to precede a change in behavior.
          </b>
          <br />
          <br />
          In other words, you need an action plan for eating differently first,
          before you can expect a change in your eating behavior. One of the
          greatest attributes of the Satisfill Diet is that it provides a
          <b>“structured action plan”</b> for eating right to lose weight. With
          the Satisfill Diet, you will be given a clear diet plan to follow, and
          from this, your eating habits will change, and your eating behavior
          will change as well.
          <br />
          <br />
          Just as thinking about food can have a negative affect on your eating,
          and trigger your appetite and desire for food, it can also have a very
          positive affect. As mentioned, with the Satisfill Diet you will be
          eating 6 times a day, consisting of 3 meals and 3 snacks per day.
          Knowing in your mind that you can eat frequently, every 2 to 3 hours,
          will completely calm your mind, and help prevent the thinking that
          brings on emotional eating and food cravings.
          <br />
          <br />
          The Satisfill Diet will completely change, in a profound and positive
          way, your food mindset, and how you think about food.
        </div>
      </div>
    </div>
  );
}
