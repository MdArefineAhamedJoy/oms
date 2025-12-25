type Props = {
  title: string;
  description?: string;
  children?: React.ReactNode;
};

export default function Card({ title, description, children }: Props) {
  return (
    <div className="glass rounded-lg p-5">
      <div className="text-base font-semibold text-zinc-900 text-zinc-900">
        {title}
      </div>
      {description ? (
        <div className="mt-1 text-sm text-zinc-600 text-zinc-600">
          {description}
        </div>
      ) : null}
      {children ? <div className="mt-3">{children}</div> : null}
    </div>
  );
}


