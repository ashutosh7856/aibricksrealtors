const toPositiveNumber = (value) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : null;
};

const normalizeSingleFloorPlan = (plan = {}) => {
  const normalized = {
    name: typeof plan.name === "string" ? plan.name.trim() : "",
    image: typeof plan.image === "string" ? plan.image.trim() : "",
    carpetArea: toPositiveNumber(plan.carpetArea),
    price: toPositiveNumber(plan.price),
  };

  if (!normalized.name || !normalized.image || normalized.carpetArea === null || normalized.price === null) {
    return null;
  }

  return normalized;
};

export const normalizeFloorPlansFromBody = (body = {}) => {
  const incomingFloorPlans = Array.isArray(body.floorPlans) ? body.floorPlans : [];
  const normalizedFloorPlans = incomingFloorPlans
    .map((plan) => normalizeSingleFloorPlan(plan))
    .filter(Boolean);

  const floorPlanImages = normalizedFloorPlans.length > 0
    ? normalizedFloorPlans.map((plan) => plan.image)
    : Array.isArray(body.floorPlanImages)
      ? body.floorPlanImages.filter((url) => typeof url === "string" && url.trim())
      : [];

  return {
    floorPlans: normalizedFloorPlans,
    floorPlanImages,
  };
};
