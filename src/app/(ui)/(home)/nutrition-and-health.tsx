import Image from "next/image";

const nutritionData = [
  {
    nutrient: "Calories",
    guideline: "",
    cal1200: "1222",
    cal1800: "1814",
    level: "",
  },
  {
    nutrient: "Dietary Fiber",
    guideline: "At least 25g (F) 35g (M)",
    cal1200: "35g",
    cal1800: "46g",
    level: "High",
  },
  {
    nutrient: "Protein",
    guideline: "At least 46g (F) 56g (M)",
    cal1200: "68g",
    cal1800: "86g",
    level: "High",
  },
  {
    nutrient: "Sodium",
    guideline: "Range of 2,500 to 4,500mg",
    cal1200: "2,995mg",
    cal1800: "3,884mg",
    level: "Ideal",
  },
  {
    nutrient: "Total Fat",
    guideline: "Less than 30% of Calories",
    cal1200: "22.8%",
    cal1800: "21.8%",
    level: "Low",
  },
  {
    nutrient: "Saturated Fat",
    guideline: "Less than 10% of Calories",
    cal1200: "5.9%",
    cal1800: "5.0%",
    level: "Low",
  },
  {
    nutrient: "Added Sugars",
    guideline: "Less than 10% of Calories",
    cal1200: "7.5%",
    cal1800: "6.0%",
    level: "Low",
  },
];

export default function NutritionAndHealth() {
  return (
    <div id="nutrition-and-health">
      <div>
        <header className="px-4 py-4 bg-sky-200">
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
              Nutrition & Health
            </h2>
          </div>
        </header>

        <div className="text-center pt-20">
          <div>
            <div className="text-3xl md:text-4xl font-semibold text-sky-700">
              The Satisfill Diet is -
            </div>

            <div className="my-10 w-full max-w-[400px] mx-auto">
              <div className="max-w-md mx-auto rounded overflow-hidden">
                <div className="grid grid-cols-2 text-white font-bold text-2xl md:text-3xl">
                  <div className="bg-sky-700 text-center py-4">HIGH</div>
                  <div className="bg-green-600 text-center py-4">LOW</div>
                </div>

                <div className="grid grid-cols-2 text-black font-bold text-xl md:text-2xl">
                  <div className="bg-sky-200 text-center py-4 space-y-4">
                    <div>Fiber</div>
                    <div>Protein</div>
                  </div>

                  <div className="bg-green-200 text-center py-4 space-y-4">
                    <div>Calories</div>
                    <div>Fat</div>
                    <div>Sugar</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-20 px-4 pb-20 text-lg max-w-[770px] mx-auto leading-5.5">
        <p>
          In addition to being the most satisfying diet, and the easiest diet to
          follow, the Satisfill Diet is also the <b>smartest way to eat</b>, if
          your ultimate goal is disease prevention, and achieving optimum health
          and longevity.
        </p>
        <div>
          <p className="text-center text-green-600 text-2xl md:text-3xl font-semibold mt-10 mb-3">
            A Plant-Based Semi-Vegetarian Diet
          </p>
          The Satisfill Diet is a plant-based vegetarian diet, but a more
          modified or flexible vegetarian diet, sometimes called a
          Semi-Vegetarian or Flexitarian Diet. It entails no red meat, and
          plant-based foods most of the time, but it allows for some poultry,
          seafood, dairy products, and eggs. This is the diet that most
          vegetarians follow.{" "}
          <b>
            All the major health organizations and most experts agree that a
            plant-based vegetarian diet is the healthiest diet to follow.
          </b>
        </div>
        <div className="mt-20">
          <p className="text-center text-sky-700 text-2xl md:text-3xl font-semibold mb-3">
            Meets or Exceeds Most Dietary Guidelines
          </p>
          The Satisfill Diet meets or exceeds nearly all the major dietary
          guidelines established by most health agencies, including the American
          Heart Association, American Cancer Society, and American Dietetic
          Association.
        </div>
        <table className="w-full mt-5 max-w-xl mx-auto">
          <thead>
            <tr className="[&>td]:py-2 [&>td]:align-bottom [&>td]:underline-offset-2 text-left ">
              <td>
                <u>Nutrient</u>
              </td>
              <td>
                <u>Dietary Guideline</u>
              </td>
              <td>
                1200 <br /> <u>Calories</u>
              </td>
              <td>
                1800
                <br /> <u>Calories</u>
              </td>
              <td>
                <u>Level</u>
              </td>
            </tr>
          </thead>
          <tbody>
            {nutritionData.map((row, index) => (
              <tr key={index} className="[&>td]:py-3">
                <td className="">{row.nutrient}</td>
                <td className="">{row.guideline}</td>
                <td className="text-center">{row.cal1200}</td>
                <td className="text-center">{row.cal1800}</td>
                <td className="text-center">{row.level}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <br />
        <br />
        Not only does the Satisfill Diet meet or exceed nearly all the major
        dietary guidelines established by most health agencies,{" "}
        <b>
          but it performs just as well when compared to the{" "}
          <i>
            US News and World Report rating the 8 Best Diets of 2025 for Healthy
            Eating —
          </i>
        </b>
        <div className="grid md:grid-cols-2 mt-5 md:pl-15 mb-20">
          {[
            "Mediterranean Diet",
            "Flexitarian Diet",
            "DASH Diet",
            "Volumetrics Diet",
            "MIND Diet",
            "Dr Weil’s Anti-Inflammatory Diet",
            "Mayo Clinic Diet",
            "TLC Diet",
          ].map((diet) => (
            <div key={diet}>{diet}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
