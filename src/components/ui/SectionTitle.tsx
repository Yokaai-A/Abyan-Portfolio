interface SectionTitleProps {
  title: string;
  subtitle?: string;
}

export default function SectionTitle({ title, subtitle }: SectionTitleProps) {
  return (
    <div className="text-center mb-12">
      <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
      {subtitle && <p className="text-zinc-400 mt-2">{subtitle}</p>}
    </div>
  );
}
