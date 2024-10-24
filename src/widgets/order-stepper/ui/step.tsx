export function Step({
  num,
  title,
  description,
}: {
  num: number;
  title: string;
  description: string;
}) {
  return (
    <li className="flex items-center space-x-4 rtl:space-x-reverse">
      <span className="flex lg:text-2xl lg:font-bold items-center justify-center w-10 h-10 lg:w-16 lg:h-16 bg-primary text-primary-foreground rounded-full shrink-0">
        {num}
      </span>
      <span>
        <h3 className="lg:text-xl font-bold leading-tight">{title}</h3>
        <p className="text-sm">{description}</p>
      </span>
    </li>
  );
}
