export default function AboutDeveloper({ builderName }) {
  return (
    <section className="py-10 max-w-7xl mx-auto px-4">
      <h2 className="text-4xl font-semibold mb-4">About {builderName}</h2>

      <p className="text-gray-600 leading-relaxed text-lg">
        {builderName} is a reputed real estate developer known for delivering
        high-quality residential and commercial projects. With a strong presence
        in major cities, they focus on modern design, quality construction, and
        timely delivery.
      </p>
    </section>
  );
}
