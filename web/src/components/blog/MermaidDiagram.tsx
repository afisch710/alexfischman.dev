import React, { useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import mermaid from 'mermaid';

interface MermaidDiagramProps {
  chart: string;
  id?: string;
}

// Initialize Mermaid with simple, working configuration
mermaid.initialize({
  startOnLoad: false,
  theme: 'default',
  securityLevel: 'loose',
  fontFamily: 'inherit',
});

export default function MermaidDiagram({ chart, id }: MermaidDiagramProps) {
  const ref = useRef<HTMLDivElement>(null);
  const chartId = id || `mermaid-${Math.random().toString(36).substr(2, 9)}`;

  useEffect(() => {
    if (ref.current) {
      try {
        // Important: Set loading text first (this seems to fix the timing issue!)
        ref.current.innerHTML = 'Loading diagram...';
        
        // Small delay to ensure proper initialization
        setTimeout(() => {
          if (ref.current) {
            // Render the Mermaid diagram
            mermaid.render(chartId, chart).then((result: { svg: string }) => {
              if (ref.current) {
                ref.current.innerHTML = result.svg;
              }
            }).catch((error: Error) => {
              console.error('Mermaid rendering error:', error);
              if (ref.current) {
                ref.current.innerHTML = `<pre style="color: red; padding: 1rem; background: #ffebee; border-radius: 4px;">Error rendering diagram: ${error.message}</pre>`;
              }
            });
          }
        }, 10); // Small 10ms delay
        
      } catch (error: any) {
        console.error('Mermaid error:', error);
        if (ref.current) {
          ref.current.innerHTML = `<pre style="color: red; padding: 1rem; background: #ffebee; border-radius: 4px;">Error: ${error}</pre>`;
        }
      }
    }
  }, [chart, chartId]);

  return (
    <Box
      ref={ref}
      sx={{
        my: 3,
        textAlign: 'center',
        '& svg': {
          maxWidth: '100%',
          height: 'auto',
        },
        // Force white text for better readability
        '& text': {
          fill: '#ffffff !important',
        },
        '& .messageText': {
          fill: '#ffffff !important',
        },
        '& .labelText': {
          fill: '#ffffff !important',
        },
        // Make note boxes white instead of yellow
        '& .note': {
          fill: '#ffffff !important',
          stroke: '#ffffff !important',
        },
        '& .noteBox': {
          fill: '#ffffff !important',
          stroke: '#ffffff !important',
        },
        '& rect.note': {
          fill: '#ffffff !important',
          stroke: '#ffffff !important',
        },
        // Make all arrows white
        '& .arrowheadPath': {
          fill: '#ffffff !important',
          stroke: '#ffffff !important',
        },
        '& .messageLine0, & .messageLine1': {
          stroke: '#ffffff !important',
        },
        '& path': {
          stroke: '#ffffff !important',
        },
        '& marker path': {
          fill: '#ffffff !important',
          stroke: '#ffffff !important',
        },
        // Actor boxes styling
        '& .actor': {
          fill: '#2d2d2d !important',
          stroke: '#ffffff !important',
        },
        '& rect.actor': {
          fill: '#2d2d2d !important',
          stroke: '#ffffff !important',
        },
        // Comprehensive actor text overrides
        '& .actor text': {
          fill: '#ffffff !important',
        },
        '& text.actor': {
          fill: '#ffffff !important',
        },
        '& .actor-label': {
          fill: '#ffffff !important',
        },
        '& g.actor text': {
          fill: '#ffffff !important',
        },
        // More aggressive text overrides
        '& svg text': {
          fill: '#ffffff !important',
        },
        '& g text': {
          fill: '#ffffff !important',
        },
        '& tspan': {
          fill: '#ffffff !important',
        },
        '& .sequenceNumber': {
          fill: '#ffffff !important',
        },
        // IMPORTANT: Note box text overrides MUST come last to override the above
        '& .note text': {
          fill: '#000000 !important',
        },
        '& .noteText': {
          fill: '#000000 !important',
        },
        '& g.note text': {
          fill: '#000000 !important',
        },
        '& rect.note + text': {
          fill: '#000000 !important',
        },
        '& g[class*="note"] text': {
          fill: '#000000 !important',
        },
        '& text[class*="note"]': {
          fill: '#000000 !important',
        },
      }}
    />
  );
} 