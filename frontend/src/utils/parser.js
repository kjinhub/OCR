export function parsePrescription(text) {
  let result = [];
  const drug = text.match(/[가-힣A-Za-z]+정/);
  const dosage = text.match(/\d+\s?(mg|정)/);
  const times = text.match(/하루\s?\d회/);
  const timing = text.match(/식후|식전/);

  if (drug) result.push(drug[0]);
  if (dosage) result.push(dosage[0]);
  if (times) result.push(times[0]);
  if (timing) result.push(timing[0]);

  return result.join(", ");
}
