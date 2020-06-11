const result = document.getElementById("resultPressure")
const weightModifier = {
  23: 50,
  25: 40,
  28: 30,
  30: 20,
  32: 10,
};
getWidth = () => $("#width label.active input").val()
getSystem = () => $("#system label.active input").val()
getWeight = () => $("#weight").val()

psiToBar = (psi) => psi * 0.0689476
rounded = (value) => value.toFixed(1)

calculatePsiPressure = (weight, width) => {
  if (!weightModifier.hasOwnProperty(width)) {
    console.error(`unknown width ${width}`);
    return NaN;
  };
  // i dont really remember where i got this formula from
  magicMultiplier = 0.726
  magicAddition = 3.33
  return weight * magicMultiplier + weightModifier[width] + magicAddition;
};

preformatMessage = (psiPressure, metricSystem) => {
  var pressure;
  if (metricSystem == 'bar') {
    pressure = psiToBar(psiPressure);
  } else {
    pressure = psiPressure;
  };
  return `${rounded(pressure)} ${metricSystem}`;
};

createMessage = () => preformatMessage(
  calculatePsiPressure(getWeight(), getWidth()),
  getSystem(),
);

update = () => result.value = createMessage();

$("#weight").on("input", () => update());
$(".btn").on("click", () => update());
update();
