"use client";
import { cn } from "@/lib/utils";
import { IconMenu2, IconX } from "@tabler/icons-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import React, {
  createContext,
  useContext,
  useRef,
  useState,
} from "react";

type NavTone = "dark" | "light";

/**
 * Shared nav state. `visible` is the "following" (scrolled) state and `tone`
 * is the background the nav is currently sitting over:
 *   - "dark"  -> Figma dark variant (no fill, glass only)
 *   - "light" -> Figma light variant (#CCCCCC @ 40%)
 * A page section can opt into the light variant with `data-nav-tone="light"`.
 */
const NavContext = createContext<{ visible: boolean; tone: NavTone }>({
  visible: false,
  tone: "dark",
});

interface NavbarProps {
  children: React.ReactNode;
  className?: string;
}

interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface NavItemsProps {
  items: {
    name: string;
    link: string;
    /** Text gradient for the (inactive) link. Defaults to green. */
    tone?: "purple" | "green";
  }[];
  className?: string;
  onItemClick?: () => void;
}

interface MobileNavProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface MobileNavHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface MobileNavMenuProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

const isActivePath = (pathname: string, link: string) =>
  link === "/" ? pathname === "/" : pathname.startsWith(link);

export const Navbar = ({ children, className }: NavbarProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const [visible, setVisible] = useState<boolean>(false);
  const [tone, setTone] = useState<NavTone>("dark");

  const detectTone = () => {
    // Look at what is directly underneath the nav and use the closest
    // `data-nav-tone` ancestor; default to dark.
    const navEl = ref.current;
    if (!navEl) return;
    const under = document
      .elementsFromPoint(window.innerWidth / 2, 48)
      .find((el) => !navEl.contains(el));
    const toneAttr = under
      ?.closest("[data-nav-tone]")
      ?.getAttribute("data-nav-tone");
    setTone(toneAttr === "light" ? "light" : "dark");
  };

  useMotionValueEvent(scrollY, "change", (latest) => {
    setVisible(latest > 100);
    detectTone();
  });

  return (
    <NavContext.Provider value={{ visible, tone }}>
      <motion.div
        ref={ref}
        // IMPORTANT: Change this to class of `fixed` if you want the navbar to be fixed
        className={cn("fixed inset-x-0 pt-1 z-40 w-full", className)}
      >
        {React.Children.map(children, (child) =>
          React.isValidElement(child)
            ? React.cloneElement(
                child as React.ReactElement<{ visible?: boolean }>,
                { visible }
              )
            : child
        )}
      </motion.div>
    </NavContext.Provider>
  );
};

export const NavBody = ({ children, className, visible }: NavBodyProps) => {
  const { tone } = useContext(NavContext);

  return (
    <motion.div
      animate={{
        // Same width as the static state (max-w-7xl); only the offset changes
        width: "100%",
        y: visible ? 20 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 50,
      }}
      style={{
        minWidth: "800px",
      }}
      data-tone={visible ? tone : undefined}
      className={cn(
        "relative z-[60] mx-auto hidden w-full max-w-7xl flex-row items-center justify-between self-start rounded-full bg-transparent px-4 py-3 lg:flex dark:bg-transparent",
        visible && "pd-nav-body",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

export const NavItems = ({ items, className, onItemClick }: NavItemsProps) => {
  const pathname = usePathname();
  const { visible } = useContext(NavContext);
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <motion.div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "absolute inset-0 hidden flex-1 flex-row items-center ml-8 justify-center lg:flex",
        visible
          ? "space-x-2 lg:space-x-2"
          : "space-x-2 text-sm font-medium text-zinc-600 transition duration-200 hover:text-zinc-800 lg:space-x-2",
        className
      )}
    >
      {items.map((item, idx) => {
        // Following state: Figma glass pills with gradient text
        if (visible) {
          const active = isActivePath(pathname, item.link);
          return (
            <Link
              onClick={onItemClick}
              className="pd-nav-pill h-9 px-4 text-[15px]"
              data-active={active}
              aria-current={active ? "page" : undefined}
              key={`link-${idx}`}
              href={item.link}
            >
              <span className="pd-nav-text" data-tone={item.tone ?? "green"}>
                {item.name}
              </span>
            </Link>
          );
        }

        // Static state: unchanged
        return (
          <Link
            onMouseEnter={() => setHovered(idx)}
            onClick={onItemClick}
            className="relative px-4 text-md py-2 text-foreground"
            key={`link-${idx}`}
            href={item.link}
          >
            {hovered === idx && (
              <motion.div
                layoutId="hovered"
                className="absolute inset-0 h-full w-full rounded-full bg-primary/60 dark:bg-neutral-950/80"
              />
            )}
            <span className="relative z-20">{item.name}</span>
          </Link>
        );
      })}
    </motion.div>
  );
};

export const MobileNav = ({ children, className, visible }: MobileNavProps) => {
  const { tone } = useContext(NavContext);

  return (
    <motion.div
      animate={{
        width: visible ? "90%" : "100%",
        paddingRight: visible ? "12px" : "0px",
        paddingLeft: visible ? "12px" : "0px",
        y: visible ? 20 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 50,
      }}
      data-tone={visible ? tone : undefined}
      className={cn(
        "relative z-50 mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center justify-between bg-transparent px-0 py-2 lg:hidden",
        visible && "pd-nav-body",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

export const MobileNavHeader = ({
  children,
  className,
}: MobileNavHeaderProps) => {
  return (
    <div
      className={cn(
        "flex w-full flex-row items-center justify-between",
        className
      )}
    >
      {children}
    </div>
  );
};

export const MobileNavMenu = ({
  children,
  className,
  isOpen,
  onClose,
}: MobileNavMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={cn(
            "absolute inset-x-0 top-16 z-50 flex w-full flex-col items-stretch justify-start gap-3 rounded-[28px] bg-black/70 px-4 py-6 backdrop-blur-2xl shadow-[0_0_30.3px_-4px_rgba(0,0,0,0.53),inset_1px_1px_0_rgba(255,255,255,0.14)]",
            className
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const MobileNavToggle = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => {
  return isOpen ? (
    <IconX
      className="pd-nav-icon cursor-pointer"
      onClick={onClick}
      aria-label="Close menu"
    />
  ) : (
    <IconMenu2
      className="pd-nav-icon cursor-pointer"
      onClick={onClick}
      aria-label="Open menu"
    />
  );
};

export const NavbarLogo = () => {
  const { visible } = useContext(NavContext);

  return (
    <Link
      href="/"
      className="relative z-20 mr-4 flex items-center px-2 py-1 text-sm font-normal text-black"
    >
      <Image
        src={visible ? "/assets/pd-logo-sm.png" : "/assets/pd-logo.png"}
        alt="logo"
        width={30}
        height={30}
      />
      {!visible && (
        <Image src="/assets/pd-banner.png" alt="logo" width={150} height={30} />
      )}
    </Link>
  );
};

export const NavbarButton = ({
  href,
  as: Tag = "a",
  children,
  className,
  variant: variantProp = "primary",
  ...props
}: {
  href?: string;
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "dark" | "gradient" | "pill";
} & (
  | React.ComponentPropsWithoutRef<"a">
  | React.ComponentPropsWithoutRef<"button">
)) => {
  const { visible } = useContext(NavContext);
  const variant = variantProp === "pill" && !visible ? "primary" : variantProp;

  if (variant === "pill") {
    return (
      // @ts-ignore
      <Tag
        // @ts-ignore
        href={href || undefined}
        // @ts-ignore
        className={cn(
          "pd-nav-pill relative z-20 h-9 px-5 text-[15px]",
          className
        )}
        {...props}
      >
        <span className="pd-nav-text" data-tone="purple">
          {children}
        </span>
      </Tag>
    );
  }

  const baseStyles =
    "px-4 py-2 rounded-md bg-white button bg-primary text-black text-sm font-bold relative cursor-pointer hover:-translate-y-0.5 transition duration-200 inline-block text-center";

  const variantStyles: Record<string, string> = {
    primary:
      "shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]",
    secondary: "bg-transparent shadow-none dark:text-white",
    dark: "bg-black text-white shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]",
    gradient:
      "bg-gradient-to-b from-blue-500 to-blue-700 text-white shadow-[0px_2px_0px_0px_rgba(255,255,255,0.3)_inset]",
  };

  return (
    // @ts-ignore
    <Tag
    // @ts-ignore
      href={href || undefined}
      // @ts-ignore
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {children}
    </Tag>
  );
};
