import * as React from "react";

type DialogContextValue = { open: boolean; onOpenChange?: (open: boolean) => void };
const DialogContext = React.createContext<DialogContextValue>({ open: false });

export function Dialog({
  open,
  onOpenChange,
  children,
}: {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}) {
  React.useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onOpenChange?.(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onOpenChange]);

  return <DialogContext.Provider value={{ open, onOpenChange }}>{children}</DialogContext.Provider>;
}

export function DialogContent({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { open, onOpenChange } = React.useContext(DialogContext);
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onOpenChange?.(false);
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        className={`relative w-full overflow-hidden rounded-3xl border border-border bg-background p-6 text-foreground shadow-2xl ${className}`}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          aria-label="Close dialog"
          onClick={() => onOpenChange?.(false)}
          className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full border border-border bg-background/80 text-lg text-muted-foreground hover:bg-muted"
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
}

export function DialogHeader({ children }: { children: React.ReactNode }) {
  return <div className="text-left">{children}</div>;
}

export function DialogTitle({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <h2 className={className}>{children}</h2>;
}

export function DialogDescription({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <p className={className}>{children}</p>;
}
