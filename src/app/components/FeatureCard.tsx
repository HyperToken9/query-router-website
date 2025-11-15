export default function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div
      className="
        px-4 pt-4 pb-[25px]
      bg-pink-100/30 rounded-[10px]
        border-2 sm:border-3 border-pink-100/60
      "
    >
      {/* Card */}
      <div className="flex flex-row items-center gap-[10px] mb-[5px] md:items-start md:flex-col">
        {icon}
        <h5 className="text-4 text-gray-950 font-bold">{title}</h5>
      </div>

      <p className="mr-[10px] text-[14px] text-pink-950 leading-normal font-regular">
        {description}
      </p>
    </div>
  );
}
