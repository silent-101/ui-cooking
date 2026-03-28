import { createContext, useContext, useRef, useState, type ComponentPropsWithRef, type ReactNode } from "react";
import { cn } from "../../lib/utils.ts";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

gsap.registerPlugin(useGSAP);

interface sidebar_ctx_t {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
}

const sidebar_ctx = createContext<sidebar_ctx_t | undefined>(undefined);

function useSidebarCtx() {
  const ctx = useContext(sidebar_ctx);
  if (!ctx) throw new Error("[ContextProvider:Erorr] SideBar context provider is Missing.")
  return ctx;
}

function SideBar({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);
  const onToggle = () => setOpen(prev => !prev);
  return (
    <sidebar_ctx.Provider value={{ open, onOpen, onClose, onToggle }}>
      <nav className="relative">
        {children}
      </nav>
      <SideBar.OverLay />
    </sidebar_ctx.Provider>
  )
}

function Trigger({ children, className, ...props }: ComponentPropsWithRef<"button">) {
  const { onToggle } = useSidebarCtx();
  return (
    <button onClick={onToggle} className={cn(className)} {...props}>{children}</button>
  )
}

function Close({ children, className, ...props }: ComponentPropsWithRef<"button">) {
  const { onClose } = useSidebarCtx();
  return (
    <button onClick={onClose} className={cn(className)} {...props}>{children}</button>
  )
}

function OverLay({ className, ...props }: ComponentPropsWithRef<"div">) {
  const { open, onClose } = useSidebarCtx();
  const overlayRef = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    const ele = overlayRef.current;
    if (!ele) return;
    gsap.to(ele, {
      opacity: open ? 1 : 0,
      pointerEvents: open ? "auto" : "none",
      duration: open ? 0.3 : 0.37,
      ease: open ? "power2.out" : "power2.inOut",
      overwrite: true,
      force3D: true
    })
  }, [open]);
  return (
    <div
      ref={overlayRef}
      onClick={onClose}
      aria-hidden={!open}
      className={cn("sidebar-overlay fixed inset-0 z-10 bg-overlay opacity-0 pointer-events-none backdrop-blur-[5px] bg-black/30", className)}
      {...props}
    />
  )
}
const sidebarWidths = {
  base: "w-screen",
  sm: "sm:w-[min(100vw,22rem)]",
  md: "md:w-[clamp(18rem,19vw,22rem)]",
  lg: "lg:w-[clamp(20rem,14vw,20rem)]",
};

function responsive(classes: Record<string, string>) {
  return Object.values(classes).join(" ");
}

function Container({ children, className, ...props }: ComponentPropsWithRef<"div">) {
  const { open } = useSidebarCtx();
  const containerRef = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const ele = containerRef.current;
      if (!ele) return;
      gsap.killTweensOf(ele);
      gsap.to(ele, {
        x: open ? 0 : "-100%",
        pointerEvents: open ? "auto" : "none",
        duration: open ? 0.298 : 0.299,
        ease: open ? "back.out(1.03)" : "back.in(1.2)",
        overwrite: true,
        force3D: true
      })
    },
    { dependencies: [open], scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      aria-hidden={!open}
      data-open={open ? "true" : "false"}
      className={cn("sidebar-container fixed left-0 top-0 z-20 overflow-y-auto bg-neutral-950 h-full flex flex-col will-change-transform transform-gpu -translate-x-full", responsive(sidebarWidths), className)}
      {...props}
    >
      {children}
    </div>
  )
}

function Header({ children, className, ...props }: ComponentPropsWithRef<"div">) {
  return (
    <div className={cn(className)} {...props}>{children}</div>
  )
}


function Body({ children, className, ...props }: ComponentPropsWithRef<"div">) {
  return (
    <div className={cn(className)} {...props}>{children}</div>
  )
}

function Footer({ children, className, ...props }: ComponentPropsWithRef<"div">) {
  return (
    <div className={cn(className)} {...props}>{children}</div>
  )
}



SideBar.Trigger = Trigger;
SideBar.Close = Close;
SideBar.Container = Container;
SideBar.Header = Header;
SideBar.Body = Body;
SideBar.Footer = Footer;
SideBar.OverLay = OverLay;
export default SideBar;
