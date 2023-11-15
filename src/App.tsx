import { useState, useRef } from "react";
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useHover,
  useFocus,
  useDismiss,
  useRole,
  useInteractions,
  FloatingPortal,
  arrow,
  FloatingArrow
} from "@floating-ui/react";
import { motion, AnimatePresence, delay } from "framer-motion";

import "./styles.css";

const submenuAnimation = {
  initial: "hidden",
  variants: {
    hidden: {
      opacity: 0,
      transition: {
        type: "spring",
        duration: 0.4,
        bounce: 0,
        staggerChildren: 0.1,
        staggerDirection: -1,
        when: "afterChildren"
      }
    },
    show: {
      opacity: 1,
      transition: {
        type: "spring",
        duration: 0.75,
        bounce: 0,
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  }
};

const itemAnimation = {
  variants: {
    hidden: {
      opacity: 0,
      x: -20,
      transition: {
        stiffness: 1000
      }
    },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        stiffness: 1000
      }
    }
  }
};

const links = ["Sign in", "Create account", "Orders", "Account"];

function Tooltip() {
  const [isOpen, setIsOpen] = useState(false);
  const arrowRef = useRef(null);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: "bottom",
    middleware: [
      offset(5),
      flip({
        fallbackAxisSideDirection: "start"
      }),
      shift(),
      arrow({
        element: arrowRef
      })
    ]
  });

  // Event listeners to change the open state
  const hover = useHover(context, { delay: { open: 0, close: 100 } });
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  // Role props for screen readers
  const role = useRole(context, { role: "tooltip" });

  // Merge all the interactions into prop getters
  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    dismiss,
    role
  ]);

  return (
    <>
      <button
        ref={refs.setReference}
        {...getReferenceProps()}
        style={{ all: "unset" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 18 20"
          width="18"
          height="20"
          fill="#F22613"
        >
          <g clip-path="url(#clip0_665_2346)">
            <path d="M8.99988 11.5507C5.76155 11.5507 3.12744 8.96014 3.12744 5.77535C3.12744 2.59056 5.76155 0 8.99988 0C12.2382 0 14.8723 2.59056 14.8723 5.77535C14.8723 8.96014 12.2382 11.5507 8.99988 11.5507ZM8.99988 2.12225C6.95129 2.12225 5.28537 3.76063 5.28537 5.77535C5.28537 7.79008 6.95129 9.42845 8.99988 9.42845C11.0485 9.42845 12.7144 7.79008 12.7144 5.77535C12.7144 3.76063 11.0485 2.12225 8.99988 2.12225Z"></path>
            <path d="M18 19.2374H15.8421C15.8421 17.1562 12.7088 15.399 9 15.399C5.29124 15.399 2.15793 17.1576 2.15793 19.2374H0C0 15.8942 3.95332 13.2767 9 13.2767C14.0467 13.2767 18 15.8956 18 19.2374Z"></path>
          </g>
          <defs>
            <clipPath id="clip0_665_2346">
              <rect width="18" height="19.2375"></rect>
            </clipPath>
          </defs>
        </svg>
      </button>
      <AnimatePresence>
        <FloatingPortal>
          <motion.div
            className="Tooltip"
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
            {...submenuAnimation}
            animate={isOpen ? "show" : "hidden"}
          >
            <FloatingArrow ref={arrowRef} context={context} fill="#444" />
            {links.map((i) => (
              <motion.div key={i} className="item" {...itemAnimation}>
                {i}
              </motion.div>
            ))}
          </motion.div>
        </FloatingPortal>
      </AnimatePresence>
    </>
  );
}

export default function App() {
  return (
    <div className="App">
      <Tooltip />
    </div>
  );
}
