// "use client";
// import { usePathname } from "next/navigation";
// import { AnimatePresence, motion } from "framer-motion";

// export default function Transition({ children }) {
//   const pathname = usePathname();

//   return (
//     <AnimatePresence mode="wait" initial={false}>
//       <motion.div
//         key={pathname}
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         exit={{ opacity: 0, y: -20 }}
//         transition={{ duration: 0.4, ease: "easeInOut" }}
//       >
//         {children}
//       </motion.div>
//     </AnimatePresence>
//   );
// }
