// export function Divider() {
//   return (
//     <i
//       className={cn(
//         "relative z-10 w-full py-4 flex flex-col justify-center",
//         "before:inset-x-0 before:h-px before:absolute before:top-0 before:-z-10 before:bg-gradient-to-r before:from-transparent before:via-accent-foreground before:to-transparent before:max-w-7xl before:mx-auto"
//       )}
//     />
//   );
// }

export function Divider() {
  return (
    <i className="block border-t border-dashed border-primary opacity-40 mb-4" />
  );
}
