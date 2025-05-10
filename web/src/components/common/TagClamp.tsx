import React, { useMemo, useState, useEffect } from 'react';
import { Box, Chip } from '@mui/material';

interface TagClampProps {
    tags: string[];
    maxLines?: number;
    containerWidth?: number; // in px
    chipSx?: object;
}

// Module-scoped canvas for text measurement
const canvas = typeof window !== 'undefined' ? document.createElement('canvas') : null;
function measureTextWidth(text: string, font: string): number {
    if (!canvas) return 0;
    const context = canvas.getContext('2d');
    if (!context) return 0;
    context.font = font;
    return context.measureText(text).width;
}

export default function TagClamp({ tags, maxLines = 2, containerWidth = 300, chipSx = {} }: TagClampProps) {
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        setHydrated(true);
    }, []);

    // These should match your Chip font styling
    const font = '500 0.8125rem \'Roboto\', \'Helvetica\', \'Arial\', sans-serif';
    const chipHorizontalPadding = 24; // px, left+right padding for MUI Chip
    const chipGap = 8; // px, gap between chips

    const { visibleTags, hiddenCount } = useMemo(() => {
        let lines: number[][] = [[]];
        let currentLineWidth = 0;
        let currentLine = 0;
        let i = 0;
        for (; i < tags.length; i++) {
            const tag = tags[i];
            const tagWidth = Math.ceil(measureTextWidth(tag, font)) + chipHorizontalPadding;
            if (currentLineWidth + tagWidth > containerWidth) {
                if (lines.length === maxLines) break;
                lines.push([]);
                currentLine++;
                currentLineWidth = 0;
            }
            lines[currentLine].push(i);
            currentLineWidth += tagWidth + chipGap;
        }
        let visibleTags = lines.flat().map(idx => tags[idx]);
        let hiddenCount = tags.length - visibleTags.length;
        if (hiddenCount > 0) {
            let plusChipWidth = Math.ceil(measureTextWidth(`+${hiddenCount}`, font)) + chipHorizontalPadding;
            while (visibleTags.length > 0) {
                let lastLine = lines[lines.length - 1].map(idx => tags[idx]);
                let lastLineWidth = lastLine.reduce((sum, tag) => sum + Math.ceil(measureTextWidth(tag, font)) + chipHorizontalPadding + chipGap, 0);
                if (lastLineWidth + plusChipWidth <= containerWidth) break;
                visibleTags.pop();
                lines[lines.length - 1].pop();
                hiddenCount = tags.length - visibleTags.length;
                plusChipWidth = Math.ceil(measureTextWidth(`+${hiddenCount}`, font)) + chipHorizontalPadding;
            }
        }
        return { visibleTags, hiddenCount };
    }, [tags, maxLines, containerWidth, font, chipHorizontalPadding, chipGap]);

    // Fallback for first render (before hydration)
    if (!hydrated) {
        const fallbackCount = 8;
        const hiddenCountFallback = tags.length - fallbackCount;
        return (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, position: 'relative', minHeight: 32, maxWidth: containerWidth, overflow: 'hidden' }}>
                {tags.slice(0, fallbackCount).map((tag, idx) => (
                    <Chip key={idx} label={tag} size="small" sx={{ borderRadius: '8px', ...chipSx }} />
                ))}
                {hiddenCountFallback > 0 && (
                    <Chip
                        label={`+${hiddenCountFallback}`}
                        size="small"
                        sx={{ borderRadius: '8px', background: '#eee', color: '#333', ...chipSx }}
                    />
                )}
            </Box>
        );
    }

    // After hydration, show the measured result
    return (
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 1,
                position: 'relative',
                minHeight: 32,
                maxWidth: containerWidth,
                overflow: 'hidden',
            }}
        >
            {visibleTags.map((tag, idx) => (
                <Chip
                    key={idx}
                    label={tag}
                    size="small"
                    sx={{ borderRadius: '8px', ...chipSx }}
                />
            ))}
            {hiddenCount > 0 && (
                <Chip
                    label={`+${hiddenCount}`}
                    size="small"
                    sx={{ borderRadius: '8px', background: '#eee', color: '#333', ...chipSx }}
                />
            )}
        </Box>
    );
} 