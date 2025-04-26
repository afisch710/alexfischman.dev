// "use client";

// import { Box } from '@mui/material';
// import React from 'react';

// interface PageBaseProps {
//     children: React.ReactNode;
// }

// export default function PageBase({ children }: PageBaseProps) {
//     const scrollContainerRef = React.useRef<HTMLDivElement>(null);
//     React.useEffect(() => {
//         scrollContainerRef.current?.scrollTo({ top: 0 });
//     }, []);

//     return (
//         <Box
//             sx={{
//                 width: "100%",
//                 height: "100dvh",
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "center",
//                 position: "relative",
//                 zIndex: 10,
//                 overflowY: "auto",
//             }}
//         >
//             <Box
//                 ref={scrollContainerRef}
//                 sx={{
//                     flexGrow: 1,
//                     width: { xs: "95%", md: "85%" },
//                     maxWidth: "1200px",
//                     mx: "auto",
//                     overscrollBehaviorY: "none",
//                 }}
//             >
//                 {children}
//             </Box>
//             <Box
//                 sx={{
//                     position: "fixed",
//                     top: 0,
//                     left: 0,
//                     width: "100vw",
//                     height: "100dvh",
//                     // backgroundColor: "rgba(0,0,0,0.1)",
//                     // backdropFilter: "blur(2px) brightness(0.9)",
//                     zIndex: 5,
//                     pointerEvents: "none",
//                 }}
//             />
//         </Box>
//     );
// }