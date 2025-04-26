import React from "react";
import { Box, Stack } from "@mui/material";
import GrassSVG from "./GrassSVG"; // your inline SVG component

interface GrassProps {
    primaryColor?: string;
    secondaryColor?: string;
    tertiaryColor?: string | null;
    quaternaryColor?: string | null;
    copies?: number;
    opacity?: number;
}

const Grass: React.FC<GrassProps> = ({
    primaryColor = "#80c93b",
    secondaryColor = "#2b4900",
    tertiaryColor = "#304e15",
    quaternaryColor = "#4b7e1d",
    copies = 10,
    opacity = 1,
}) => {
    return (
        <Stack
            direction={'row'}
            width={'100%'}
            height={'100%'}
            gap={0}
            spacing={0}
            justifyContent={'flex-start'}
            alignItems={'flex-end'}
            overflow={'hidden'}
        >
            {Array.from({ length: copies }).map((_, index) => (
                <Box
                    key={index}
                    sx={{
                        opacity: opacity,
                    }}
                >
                    <GrassSVG
                        primaryColor={primaryColor}
                        secondaryColor={secondaryColor}
                        tertiaryColor={tertiaryColor}
                        quaternaryColor={quaternaryColor}
                    />
                </Box>
            ))}
        </Stack>
    );
};

export default Grass;