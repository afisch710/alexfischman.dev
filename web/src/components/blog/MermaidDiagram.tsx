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
        // Simple white text override for readability
        '& text': {
          fill: '#ffffff !important',
        },
        '& .messageText': {
          fill: '#ffffff !important',
        },
        '& .noteText': {
          fill: '#ffffff !important',
        },
        '& .labelText': {
          fill: '#ffffff !important',
        },
      }}
    />
  );
} 