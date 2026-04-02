import { createContext, useContext, useRef, useState, type ComponentPropsWithRef, type MouseEvent, type ReactElement, type ReactNode } from "react";
import { cn } from "../../lib/utils";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

gsap.registerPlugin(useGSAP);

interface SearchbarContextValue {
	open: boolean;
	onOpen: () => void;
	onClose: () => void;
	onToggle: () => void;
}

type SearchBarRootProps = { children: ReactNode };
type SearchBarSectionProps = ComponentPropsWithRef<"div">;
type SearchBarButtonProps = ComponentPropsWithRef<"button">;

type SearchBarCompoundComponent = (({ children }: SearchBarRootProps) => ReactElement) & {
	Trigger: ({ children, className, onClick, type, ...props }: SearchBarButtonProps) => ReactElement;
	CloseSearch: ({ children, className, onClick, type, ...props }: SearchBarButtonProps) => ReactElement;
	Head: ({ children, className, ...props }: SearchBarSectionProps) => ReactElement;
	Body: ({ children, className, ...props }: SearchBarSectionProps) => ReactElement;
	ClearInput: ({ children, className, type, ...props }: SearchBarButtonProps) => ReactElement;
	Container: ({ children, className, ...props }: SearchBarSectionProps) => ReactElement;
	InputContainer: ({ children, className, ...props }: SearchBarSectionProps) => ReactElement;
	Overlay: ({ className, ...props }: SearchBarSectionProps) => ReactElement;
	Input: ({ className, ...props }: ComponentPropsWithRef<"input">) => ReactElement;
	ResultsContainer: ({ children, className, ...props }: SearchBarSectionProps) => ReactElement;
};

const SearchbarContext = createContext<SearchbarContextValue | undefined>(undefined);


function useSearchbarCtx() {
	const ctx = useContext(SearchbarContext);
	if (!ctx) throw new Error("[ContextProvider:Error] SearchBar context provider is missing.")
	return ctx;
}


const SearchBarRoot = ({ children }: SearchBarRootProps) => {
	const [open, setOpen] = useState(false);

	const onOpen = () => setOpen(true);
	const onClose = () => setOpen(false);
	const onToggle = () => setOpen(prev => !prev);
	return (
		<SearchbarContext.Provider value={{ open, onOpen, onClose, onToggle }}>
			<div className="relative overflow-hidden">
				{children}
				<Overlay />
			</div>
		</SearchbarContext.Provider>
	)
};


function Trigger({ children, className, onClick, type, ...props }: SearchBarButtonProps) {
	const { onToggle } = useSearchbarCtx();

	const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
		onClick?.(event);
		if (!event.defaultPrevented) onToggle();
	};

	return (
		<button type={type ?? "button"} className={cn("relative", className)} {...props} onClick={handleClick}>
			{children}
		</button>
	)
}

function CloseSearch({ children, className, onClick, type, ...props }: SearchBarButtonProps) {
	const { onClose } = useSearchbarCtx();

	const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
		onClick?.(event);
		if (!event.defaultPrevented) onClose();
	};

	return (
		<button type={type ?? "button"} className={cn("relative", className)} {...props} onClick={handleClick}>
			{children}
		</button>
	)
}



function ClearInput({ children, className, type, ...props }: SearchBarButtonProps) {
	return (
		<button type={type ?? "button"} className={cn("relative", className)} {...props}>
			{children}
		</button>
	)
}


function Overlay({ className, ...props }: SearchBarSectionProps) {
	const { open, onClose } = useSearchbarCtx();
	const overlayRef = useRef<HTMLDivElement>(null);
	useGSAP(() => {
		const ele = overlayRef.current;
		if (!ele) return;
		gsap.to(ele, {
			opacity: open ? 1 : 0,
			pointerEvents: open ? "auto" : "none",
			duration: open ? 0.32 : 0.28,
			ease: open ? "back.out(1.2)" : "back.in(1.2)",
			overwrite: true,
			force3D: true
		})
	}, [open]);
	return (
		<div
			ref={overlayRef}
			onClick={onClose}
			aria-hidden={!open}
			className={cn("fixed inset-0 z-40  opacity-0 pointer-events-none backdrop-blur-[5px] bg-black/70", className)}
			{...props}
		/>
	)
}


function Container({ children, className, ...props }: ComponentPropsWithRef<"div">) {
	const { open } = useSearchbarCtx();
	const containerRef = useRef<HTMLDivElement>(null);

	useGSAP(() => {
		const ele = containerRef.current;
		if (!ele) return;
		gsap.to(ele, {
			y: open ? "0%" : "120%",
			pointerEvents: open ? "auto" : "none",
			immediateRender: false,
			duration: open ? 0.344 : 0.355,
			ease: open ? "back.out(0.99)" : "back.in(0.9)",
			overwrite: true,
			force3D: true
		})
	}, [open]);
	return (
		<div
			ref={containerRef}
			className={cn("fixed inset-0 z-50 w-full h-full flex flex-col md:m-auto md:w-[95vw] md:h-[90vh] translate-y-[120%] will-change-transform transform-gpu", className)}
			aria-hidden={!open}
			data-open={open ? "true" : "false"}
			{...props}
		>
			{children}
		</div>
	)
}


function InputContainer({ children, className, ...props }: ComponentPropsWithRef<"div">) {
	return (
		<div className={cn("relative flex items-center border w-full gap-3", className)} {...props}>
			{children}
		</div>
	)
}

function Head({ children, className, ...props }: ComponentPropsWithRef<"div">) {
	return (
		<div className={cn(className)} {...props}>
			{children}
		</div>
	)
}



function Body({ children, className, ...props }: ComponentPropsWithRef<"div">) {
	return (
		<div className={cn("w-full h-full relative", className)} {...props}>
			{children}
		</div>
	)
}


function ResultContainer({ children, className, ...props }: ComponentPropsWithRef<"div">) {
	return (
		<div className={cn(className)} {...props}>{children}</div>
	)
}

function Input({ className, ...props }: ComponentPropsWithRef<"input">) {
	return <input className={cn("w-full h-full outline-0 border-0", className)} {...props} />
}


const SearchBar = Object.assign(SearchBarRoot, {
	Trigger,
	CloseSearch,
	Head,
	Body,
	ClearInput,
	Container,
	InputContainer,
	Overlay,
	Input,
	ResultsContainer: ResultContainer,
}) as SearchBarCompoundComponent;
export default SearchBar;
